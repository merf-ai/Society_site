from .models import User, Friends, Message
from .extra_logic import EmailSenderMixin, user_urlsafe_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password
from .serializers import UserSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .extra_logic import CustomObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from users.pagination import FriendsListPagination
from django.db.models import Q, F
from rest_framework.pagination import PageNumberPagination
from users.raw_sql import make_query_find_friends
from django.core.exceptions import ObjectDoesNotExist
from string import ascii_letters
from random import choice

# Create your views here.


class Register(APIView, EmailSenderMixin):
    template_mail = "users\\user_verification_message.html"
    subject_message = "Подтверждение верификации"
    verified_url = r"users/reg/success"

    def post(self, request):
        """Обработка формы регистрации"""
        serializer = UserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"data": request.data, "errors": serializer.errors})
        else:
            serializer.save()
            us = User.objects.all().get(email=serializer.validated_data["email"])
            super().send_mail_verify(request, us.email)
            return Response(
                {"success_message": "Вы успешно зарегистрировались, подтвердите почту!"}
            )

    def get_extra_context_html_message(self, *args, **kwargs):
        return {
            "url_delete": super().prepare_url_verification(
                kwargs["request"], kwargs["user"], "users\\reg\\user_delete"
            )
        }


class VerifyEmail(APIView):
    def get(self, request, *args, **kwargs):
        user = user_urlsafe_decode(kwargs["uid"])
        is_token_true = default_token_generator.check_token(user, kwargs["token"])

        if user is not None and is_token_true:
            user.email_verified = True
            user.save()
            return Response({"message": f"Ваша почта подтверждена, {user.first_name}!"})
        return Response({"message": "Ссылка недействительна!"})


class PasswordReset(APIView, EmailSenderMixin):
    template_mail = "users\\password_reset_messege.html"
    subject_message = "Сброс пароля"
    verified_url = r"users/password_reset/new_password"

    def post(self, request):
        try:
            user = User.objects.get(email=request.data["email"])
            self.send_mail_verify(request, user.email)
        except ObjectDoesNotExist:
            return Response({"message": "Пользователь с таким email не найден!"})

        return Response({"message": "Сообщение отправлено на почту!"})


class PasswordResetNewPassword(APIView):
    def get(self, request, *args, **kwargs):
        return Response()

    def post(self, request, *args, **kwargs):
        user = user_urlsafe_decode(kwargs["uid"])
        is_true_token = default_token_generator.check_token(user, kwargs["token"])

        if user is not None and is_true_token:
            user.password = make_password(request.data["password"])

            if user.email_verified is False:
                user.email_verified = True
                user.save()
                return Response(
                    {"message": "Пароль успешно изменён! Ваша почта подтверждена!"}
                )
            user.save()
        else:
            return Response({"message": "Ссылка недействительна!"})

        return Response({"message": "Пароль успешно изменён!"})


class UserMistakeRegistration(APIView):
    def get(self, request, *args, **kwargs):
        user = user_urlsafe_decode(kwargs["uid"])
        is_true_token = default_token_generator.check_token(user, kwargs["token"])

        if user is not None and is_true_token:
            User.objects.filter(id=user.id).delete()
        return Response(
            {
                "message": "Спасибо за переход по ссылке, если хотите можете зарегистрироваться на нашем сайте!"
            }
        )


class LoginView(CustomObtainAuthToken):
    pass


class IsUserAuth(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response()


class ProfileData(APIView):
    """Информация для профиля по токену"""

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserSerializer(request.user)
        data_user = serializer.data
        for deletion_data in ["username", "email", "password"]:
            data_user.pop(deletion_data)
        return Response({**data_user})


class FriendsListView(ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = FriendsListPagination
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        str_query = make_query_find_friends(
            request.user.id,
            (
                "sex",
                "first_name",
                "last_name",
                "middle_name",
                "username",
            ),
            True,
        )
        self.queryset = Friends.objects.raw(str_query)
        return super().get(request, *args, **kwargs)

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, for_friends=True, **kwargs)


class MessageView(APIView, PageNumberPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    page_size = 25

    def post(self, request, *args, **kwargs):
        queryset = (
            Message.objects.filter(
                (
                    Q(sender__username=request.user.username)
                    & Q(reciever__username=kwargs["username"])
                )
                | (
                    Q(reciever__username=request.user.username)
                    & Q(sender__username=kwargs["username"])
                )
            )
            .values("content", "data_created", "sender__username", "id")
            .order_by("-data_created")
        )
        results = self.paginate_queryset(queryset, request, view=self)
        return self.get_paginated_response(results)


class CreateNewMessage(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        reciever = User.objects.get(username=kwargs["reciever"])
        content = request.data.get("message")
        new_message = Message.objects.create(
            reciever=reciever, sender=request.user, content=content
        )
        return Response(
            {
                "content": content,
                "data_created": new_message.data_created,
                "sender__username": request.user.username,
            }
        )


class PeopleList(ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = FriendsListPagination
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        self.queryset = User.objects.all().exclude(
            Q(username=request.user.username) | Q(is_superuser=True)
        )
        return super().get(request, *args, **kwargs)

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class(*args, for_friends=True, **kwargs)


class TestView(APIView):
    def post(self, request):
        messages = [
            "".join([choice(ascii_letters) for i in range(30)]) for a in range(30)
        ]
        user_ghoul = User.objects.get(username="ghoul")
        user_hulio = User.objects.get(username="hulio")
        for a in messages:
            Message.objects.create(sender=user_ghoul, reciever=user_hulio, content=a)
        return Response()

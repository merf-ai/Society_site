from users.views import *
from django.urls import path

urlpatterns = [
    path('reg/', Register.as_view()),
    path('reg/success/<str:uid>/<str:token>/', VerifyEmail.as_view()),
    path('reg/user_delete/<str:uid>/<str:token>/', UserMistakeRegistration.as_view()),

    path('friends_list/', FriendsListView.as_view()),
    path('login/', LoginView.as_view()),
    path('isauth/', IsUserAuth.as_view()),
    path('profile_data/', ProfileData.as_view()),
    path('messages/<str:username>', MessageView.as_view()),

    path('test/', TestView.as_view()),

    path('password_reset/', PasswordReset.as_view()),
    path('password_reset/new_password/<str:uid>/<str:token>/',  PasswordResetNewPassword.as_view())
]
from rest_framework.serializers import *
from users.models import User, Message
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['sex', 'first_name', 'last_name', 'middle_name', 'email', 'password', 'username']

    def __init__(self, *args, **kwargs):
        if 'email' not in self.Meta.fields:
            self.Meta.fields.extend(('email', 'password', 'username'))
        if kwargs.get('for_friends'): # add logic here for optional viewing
            kwargs.pop('for_friends')
            self.Meta.fields = self.Meta.fields
            for field in ('email', 'password'):
                self.Meta.fields.remove(field)
        super(UserSerializer, self).__init__(*args, **kwargs)

    def create(self, validated_data: dict) :
        password = make_password(validated_data['password'])
        validated_data.update({'password': password})
        return User.objects.create(**validated_data)


class CustomTokenSerializer(AuthTokenSerializer):
    

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = ('content', 'data_created')

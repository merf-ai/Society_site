from django.db import models
from django.contrib.auth.models import AbstractUser, User as BaseUser
from django.utils.translation import gettext_lazy as _
from rest_framework.serializers import ValidationError

def contain_invalid_symbols_in_username(value):
        invalid_symbols = ['@', '!', '.', '*', '#']
        for invalid_symbol in invalid_symbols:
            if invalid_symbol in value:
                raise ValidationError('Логин содержит один из недопустимых символов: @, !, ., *, #')
            




class User(AbstractUser):
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[contain_invalid_symbols_in_username],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )

    CHOICES = [
        ('Мужской', 'M'),
        ('Женский', 'W')
    ]

    first_name = models.CharField(_("first name"), max_length=150, blank=False)
    sex = models.CharField(
                           choices=CHOICES, 
                           max_length=100
                           )
    middle_name = models.CharField(
                                    max_length=100, 
                                    blank=True
                                   )
    email = models.EmailField(_("email address"), unique=True)
    email_verified = models.BooleanField(default=False)
    REQUIRED_FIELDS = ["email", "sex"]

    class Meta:
        ordering = ['id']


class Friends(models.Model):
    sender = models.ForeignKey(
                                User,
                                on_delete=models.CASCADE,
                                related_name='user_sender'
                                )
    reciever = models.ForeignKey(
                                User,
                                on_delete=models.CASCADE,
                                related_name='user_reciever'
                                )
    is_accepted = models.BooleanField()

    class Meta:
        unique_together = [['sender', 'reciever']]


class Posts(models.Model):
    poster = models.ForeignKey(
                                User,
                                on_delete=models.CASCADE,
                                related_name='user_poster'
                                )
    data_created = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=1000)
    #photo = models.ImageField(blank=True)


class Message(models.Model):
    sender = models.ForeignKey(
                                User,
                                on_delete=models.CASCADE,
                                related_name='user_ms_sender'
                                )
    reciever = models.ForeignKey(
                                User,
                                on_delete=models.CASCADE,
                                related_name='user_ms_reciever'
                                )
    content = models.CharField(max_length=200)
    data_created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.sender == self.reciever:
            raise ValueError('Users cannot send media messages to themselves!')
        return super().save(*args, **kwargs)


from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


# Create your models here.

    

class User(AbstractUser):
    CHOICES = [
        ('Мужской', 'M'),
        ('Женский', 'W')
    ]
    first_name = models.CharField(_("first name"), max_length=150, blank=False)
    sex = models.CharField(choices=CHOICES, max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(_("email address"), unique=True)
    email_verified = models.BooleanField(default=False)
    REQUIRED_FIELDS = ["email", "sex"]


class Friends(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_sender')
    reciever = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_reciever')
    is_accepted = models.BooleanField()

    class Meta:
        unique_together = [['sender', 'reciever']]


class Posts(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_poster')
    data_created = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=1000)
    #photo = models.ImageField(blank=True)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_ms_sender')
    reciever = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_ms_reciever')
    content = models.CharField(max_length=200)
    data_created = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = [['sender', 'reciever']]
from django.contrib import admin
from django.db import models
from django.core.validators import MaxValueValidator


# Create your models here.

class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)


class Cafe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    location = models.CharField(max_length=100)
    available_seat = models.IntegerField()
    tags = models.ManyToManyField(Tag)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    name = models.CharField(max_length=10)
    is_staff = models.BooleanField(default=False)
    tag_search = models.CharField(max_length=1000, null=True)
    cafe_id = models.ForeignKey(Cafe, on_delete=models.CASCADE, null=True)


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    cafe_id = models.ForeignKey(Cafe, on_delete=models.CASCADE)
    content = models.CharField(max_length=50)
    rating = models.IntegerField(validators=[MaxValueValidator(5)])


# Register model to Django Admin site
admin.site.register(Cafe)
admin.site.register(Tag)
admin.site.register(User)
admin.site.register(Comment)
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

    @staticmethod
    def getCafesByTag(tag=None):
        try:
            cafes = Tag.objects.filter(name=tag).first().cafe_set.all()
        except:
            cafes = Cafe.objects.all()

        return cafes


class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=20, unique=True)  # email
    password = models.CharField(max_length=20)
    name = models.CharField(max_length=10)
    tag_search = models.CharField(max_length=1000, null=True)

    @staticmethod
    def getUser(user_id):
        try:
            return User.objects.filter(user_id=user_id).first()
        except:
            return None

    @staticmethod
    def getUserByLogin(user_id, password):
        return User.objects.filter(user_id=user_id, password=password).first()


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

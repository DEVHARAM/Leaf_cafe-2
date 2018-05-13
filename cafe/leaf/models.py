from django.db import models

# Create your models here.
class User(models.Model):
    id=models.IntegerField(primary_key=True)
    user_id=models.CharField(max_length=20)
    password=models.CharField(max_length=20)
    name=models.CharField(max_length=10)
    is_staff=models.BooleanField(default=True)
    tag_search=models.CharField(max_length=1000)
    cafe_id=models.IntegerField()

class Tag(models.Model):
    id=models.IntegerField(primary_key=True,foreign_key=True)
    name=models.CharField(max_length=45)

class Cafe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    location = models.CharField(max_length=100)
    available_seat = models.IntegerField()
    tag_id = models.IntegerField()

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    cafe_id = models.ForeignKey(Cafe, on_delete=models.CASCADE)
    content = models.CharField(max_length=50)
    rating = models.IntegerField()
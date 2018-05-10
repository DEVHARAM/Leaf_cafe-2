from django.db import models

# Create your models here.
class User(models.Model):
    id=models.IntegerField(primary_key=True)
    user_id=models.CharField(max_length=20)
    password=models.CharField(max_length=20)
    name=models.CharField(max_length=10)
    is_staff=models.BooleanField(default=True)
    tag_search=models.CharField(max_length=1000)
    cafe_id=models.IntegerField(default=0)

class Tag(models.Model):
    id=models.IntegerField(primary_key=True,foreign_key=True)
    name=models.CharField(max_length=45)


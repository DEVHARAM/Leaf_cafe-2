# Generated by Django 2.0.5 on 2018-06-06 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leaf', '0004_auto_20180603_1846'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_staff',
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.RemoveField(
            model_name='user',
            name='cafe_id',
        ),
    ]
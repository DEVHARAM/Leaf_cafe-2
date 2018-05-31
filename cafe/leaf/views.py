from django.core import serializers
from django.shortcuts import render
from .models import *

def main(request):
    cafe_data = serializers.serialize('json', Cafe.objects.all())
    return render(request, 'main.html', {"cafe_data": cafe_data})


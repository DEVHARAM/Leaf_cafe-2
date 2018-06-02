import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from .models import *


def main(request):
    if 'tag' in request.GET:
        try:
            cafes = Tag.objects.filter(name=request.GET['tag']).first().cafe_set.all()
        except:
            cafes = []
    else:
        cafes = Cafe.objects.all()

    cafe_data = serializers.serialize('json', cafes, fields=('name', 'location', 'available_seat'))
    return render(request, 'main.html', {"cafe_data": cafe_data})


def cafe_detail(request, cafe_id):
    tags = [t.name for t in Cafe.objects.filter(id=cafe_id).first().tags.all()]
    return HttpResponse(json.dumps(tags), content_type='application/json')
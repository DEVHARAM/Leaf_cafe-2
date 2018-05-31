from django.shortcuts import render
from .models import *

def main(request):
    cafe_data=Cafe.objects.all();
    return render(request, 'main.html', {"cafe_data=":cafe_data})

# def showDatalist(request):
#     cafes = Cafe.objects.all()
#     tags = Tag.objects.all()
#     return render(request, 'leaf/templates/show_data_list.html', {'cafes': cafes,'tags':tags})
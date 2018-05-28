from django.shortcuts import render
from .models import *

def main(request):
    return render(request, 'main.html', {})

# def showDatalist(request):
#     cafes = Cafe.objects.all()
#     tags = Tag.objects.all()
#     return render(request, 'leaf/templates/show_data_list.html', {'cafes': cafes,'tags':tags})
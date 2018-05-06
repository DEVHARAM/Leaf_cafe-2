# from django.http import HttpResponse
#
#
# def leaf(request):
#     return HttpResponse("Hello, world. You're at the leaf.")

from django.shortcuts import render
from django.template.loader import get_template


def main(request):
    return render(request, 'leaf/templates/main.html', {})
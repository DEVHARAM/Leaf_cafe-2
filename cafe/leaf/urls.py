from django.urls import path

from . import views

urlpatterns = [
    path('orange/', views.main),
]
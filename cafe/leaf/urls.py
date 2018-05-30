from django.urls import path

from . import views

urlpatterns = [
    path('main', views.main),
    # path('insert/data/cafe',views.cafe_data),
    # path('show/data/', views.showDatalist)
]
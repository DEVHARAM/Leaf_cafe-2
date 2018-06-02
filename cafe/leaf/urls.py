from django.urls import path

from leaf.models import Cafe
from . import views

urlpatterns = [
    path('', views.main),
    path('cafe/<cafe_id>', views.cafe_detail),
    # path('insert/data/cafe',views.cafe_data),
    # path('show/data/', views.showDatalist)
]
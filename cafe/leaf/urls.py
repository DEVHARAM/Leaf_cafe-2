from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('cafe/<cafe_id>', views.cafe_detail),
    path('cafe/comment/<cafe_id>', views.cafe_comment),
    path('signin', views.signin),
    path('signup', views.signup)
]

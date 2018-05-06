from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('leaf/', include('leaf.urls')),
    path('admin/', admin.site.urls),
]
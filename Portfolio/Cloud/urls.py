from django.urls import path
from .views import cloudView


urlpatterns = [
    path('', cloudView)
]
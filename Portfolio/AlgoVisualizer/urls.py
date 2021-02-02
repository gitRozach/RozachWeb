from django.urls import path
from .views import algoVisualizerView


urlpatterns = [
    path('', algoVisualizerView)
]

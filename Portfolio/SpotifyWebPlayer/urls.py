from django.urls import path
from .views import spotifyWebPlayerView


urlpatterns = [
    path('', spotifyWebPlayerView)
]
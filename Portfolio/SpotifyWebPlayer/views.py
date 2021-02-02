from django.shortcuts import render


def spotifyWebPlayerView(request):
    return render(request, 'spotifyWebPlayer.html')

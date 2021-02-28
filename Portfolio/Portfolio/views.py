from django.shortcuts import render


def indexView(request):
    return render(request, 'Portfolio/index.html')

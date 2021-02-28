from django.shortcuts import render


def cloudView(request):
    return render(request, 'cloud.html')

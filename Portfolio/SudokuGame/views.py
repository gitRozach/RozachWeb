from django.http.response import HttpResponse
from django.shortcuts import render

def index_view(request):
    return render(request, 'SudokuGame/index.html')

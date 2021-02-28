from django.shortcuts import render


def algoVisualizerView(request, *args, **kwargs):
    return render(request, 'algoVisualizer.html')

from django.http import JsonResponse
from rest_framework.decorators import api_view
from ..models import BOJ

@api_view(['POST'])
def verify(request):
    if BOJ.objects.filter(name=request.data["boj"]).exists():
        return JsonResponse({"result":"complete","message":"존재하는 백준아이디입니다."})
    return JsonResponse({"result": "error", "message": "존재하지 않는 백준아이디입니다."})

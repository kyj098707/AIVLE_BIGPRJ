from django.http import JsonResponse
from rest_framework.decorators import api_view
from ..models import RecRival
from ..serializers.boj import RecRivalSerializers
from rest_framework.response import Response
import pandas as pd

@api_view(['POST'])
def verify(request):
    df = pd.read_csv("./users.csv")
    found = request.data["boj"] in df['handle'].unique()
    if found:
        return JsonResponse({"result":"complete","message":"존재하는 백준아이디입니다."})
    return JsonResponse({"result": "error", "message": "존재하지 않는 백준아이디입니다."})


@api_view(['GET'])
def list_rec_rival(request):
    rec_rivals = RecRival.objects.filter(follower=request.user)
    serializers = RecRivalSerializers(rec_rivals, many=True)

    return Response(serializers.data)
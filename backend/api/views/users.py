from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from ..serializers.users import JoinSerializer, MyTokenObtainPairSerializer
from ..models import Rival, MTeamUser, Team, BOJ

User = get_user_model()


@api_view(['GET'])
@login_required
def verify_token(request):
    if request.user.is_authenticated:
        return JsonResponse({"response":"success"})
    return JsonResponse({"response":"error"})


@api_view(['POST'])
def join(request):
    with transaction.atomic():
        serializer = JoinSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        if BOJ.objects.filter(name=request.data["boj"]).exists():
            boj = BOJ.objects.get(name=request.data["boj"])
            obj.boj = boj
            obj.save()
    return Response(serializer.data)


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def handle_rival(request, pk):
    challenger = request.user
    target = get_object_or_404(User, pk=pk)
    if not Rival.objects.filter(user=challenger, rival=target).exists():
        Rival.objects.create(user=challenger,rival=target)
    else:
        rival = Rival.objects.get(user=challenger,rival=target)
        rival.delete()
    return HttpResponse(200)


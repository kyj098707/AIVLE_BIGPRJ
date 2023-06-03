from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from ..serializers.users import JoinSerializer, MyTokenObtainPairSerializer
from ..models import Rival

User = get_user_model()



@api_view(['POST'])
def join(request):
    serializer = JoinSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
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
    return HttpResponse(201)
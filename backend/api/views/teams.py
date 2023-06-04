from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Problem, MTeamUser, Team
from ..serializers.teams import (TeamCreateSerializers,
                                 )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_team(request):
    serializer = TeamCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    team = serializer.save(leader=request.user)
    MTeamUser.objects.create(team=team,user=request.user)
    return Response(serializer.data)


@api_view(['POST'])
def add_user_to_team(request, pk):
    team = get_object_or_404(Team, pk=pk)
    if MTeamUser.objects.filter(user=request.user, team=team).exists():
        return JsonResponse({"response":"이미 존재하는 회원입니다."})
    MTeamUser.objects.create(user=request.user, team=team)
    return HttpResponse(200)
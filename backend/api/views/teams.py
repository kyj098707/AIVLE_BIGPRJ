from django.contrib.auth import get_user_model
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Problem, MTeamUser, Team, Request, Invite
from ..serializers.teams import (TeamCreateSerializers,
                                MTeamUserSerializers,
                                TeamSerializers
                                 )

User= get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_my_team(request):
    # 자기가 속한 팀 보여주기
    user = request.user
    m_team_user = MTeamUser.objects.filter(user=user)
    public_team_user = [tu for tu in m_team_user if tu.team.visibility==True]
    serializer = MTeamUserSerializers(m_team_user,many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_team(request):
    # 자기가 속한 팀 보여주기
    teams = Team.objects.all()
    serializer = TeamSerializers(teams,many=True)

    return Response(serializer.data[:5])



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_team(request):
    serializer = TeamCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    team = serializer.save(leader=request.user)
    MTeamUser.objects.create(team=team,user=request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_accept_invitation(request, pk):
    # 유저가 팀 초대 승락
    team = get_object_or_404(Team, pk=pk)
    if MTeamUser.objects.filter(user=request.user, team=team).exists():
        return JsonResponse({"response":"이미 존재하는 회원입니다."})
    if not Invite.objects.filter(user=request.user, team=team).exists():
        return JsonResponse({"response": "no_invitation"})
    with transaction.atomic():
        MTeamUser.objects.create(user=request.user, team=team)
        inv = Invite.objects.get(user=request.user, team=team)
        inv.delete()
    return HttpResponse(200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def team_accept_request(request, team_pk, user_pk):
    # 팀에서 유저 가입 승락
    team = get_object_or_404(Team, pk=team_pk)
    user = get_object_or_404(User, pk=user_pk)
    if MTeamUser.objects.filter(user=user, team=team).exists():
        return JsonResponse({"response":"already_exists_error"})
    if not Request.objects.filter(user=user,team=team).exists():
        return JsonResponse({"response":"no_request"})
    with transaction.atomic():
        MTeamUser.objects.create(user=user, team=team)
        req = Request.objects.get(user=user,team=team)
        req.delete()
    return HttpResponse(200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def req(request, team_pk):
    # 유저가 팀에 요청을 넣음
    team = get_object_or_404(Team, pk=team_pk)
    user = request.user
    if MTeamUser.objects.filter(user=user, team=team).exists():
        return JsonResponse({"response":"already_exists_error"})
    if Request.objects.filter(user=user, team=team).exists():
        return JsonResponse({"response":"이미 존재하는 회원입니다."})
    Request.objects.create(user=user, team=team)
    return HttpResponse(200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def invite(request, team_pk, user_pk):
    # 팀이 유저를 초대함
    team = get_object_or_404(Team, pk=team_pk)
    user = get_object_or_404(User, pk=user_pk)
    if MTeamUser.objects.filter(user=user, team=team).exists():
        return JsonResponse({"response":"already_exists_error"})
    if Invite.objects.filter(user=user, team=team).exists():
        return JsonResponse({"response":"이미 존재하는 회원입니다."})
    Invite.objects.create(user=user, team=team)
    return HttpResponse(200)


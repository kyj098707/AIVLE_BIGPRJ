from django.contrib.auth import get_user_model
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Problem, MTeamUser, Team, Request, Invite,Workbook,MProblemWorkbook,MWorkbookUser,Solved
from ..serializers.teams import TeamCreateSerializers,MTeamUserSerializers,\
                                TeamSerializers,TeamDetailSerializers,TeamUserSerializers,\
                                InviteSerializers,RequestSerializers, WorkbookSerializers,\
                                ProblemTagSerializers,AwardSerializers,AchievementSerializers


User= get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detail_team(request, pk):
    team = get_object_or_404(Team, pk=pk)
    serializer = TeamDetailSerializers(team)
    return Response(serializer.data)

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
    # 전체 팀 랭크 보여주기
    teams = Team.objects.all()
    serializer = TeamSerializers(teams,many=True)

    return Response(serializer.data[:5])



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_team(request):
    if not request.data["name"]:
        return JsonResponse({"result":"error","msg":"킹덤 이름을 지정해주세요"})
    if not request.data["description"]:
        return JsonResponse({"result":"error","msg":"킹덤 소개를 해주세요"})
    if int(request.data["num_members"]) <= 0:
        return JsonResponse({"result":"error","msg":"인원은 1명 이상이어여 합니다."})
    serializer = TeamCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    team = serializer.save(leader=request.user)
    MTeamUser.objects.create(team=team,user=request.user,is_leader=True)
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
    user = request.user
    invites = Invite.objects.filter(user=user)
    serializer = InviteSerializers(invites, many=True)

    return Response(serializer.data)


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
    reqs = Request.objects.filter(team=team)
    req_serializer = RequestSerializers(reqs, many=True)
    members = MTeamUser.objects.filter(team=team)
    mem_serializer = TeamUserSerializers(members,many=True)
    return JsonResponse({"reqs":req_serializer.data, "members":mem_serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def req(request):
    # 유저가 팀에 요청을 넣음

    user = request.user
    if not Team.objects.filter(name=request.data["name"]).exists():
        return JsonResponse({"result":"error","msg":"잘못된 이름의 그룹입니다."})
    else:
        team = Team.objects.filter(name=request.data["name"])[0]
    if MTeamUser.objects.filter(user=user, team=team).exists():
        return JsonResponse({"result":"error","msg":"이미 속한 계정입니다."})
    if Request.objects.filter(user=user, team=team).exists():
        return JsonResponse({"result":"error","msg":"이미 요청된 계정입니다."})
    Request.objects.create(user=user, team=team)
    return JsonResponse({"result":"complete","msg":"요청이 완료되었습니다."})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def invite(request, team_pk):
    # 팀이 유저를 초대함
    team = get_object_or_404(Team, pk=team_pk)
    if not User.objects.filter(username=request.data["name"]).exists():
        return JsonResponse({"result":"error","msg":"잘못된 이름의 유저입니다."})
    else:
        user = User.objects.filter(username=request.data["name"])[0]
    if MTeamUser.objects.filter(user=user, team=team).exists():
        return JsonResponse({"result":"error","msg":"이미 속한 계정입니다."})
    if Invite.objects.filter(user=user, team=team).exists():
        return JsonResponse({"result":"error","msg":"이미 요청된 계정입니다."})
    Invite.objects.create(user=user, team=team)
    return JsonResponse({"result":"complete","msg":"요청이 완료되었습니다."})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user(request, pk):
    team = get_object_or_404(Team,pk=pk)
    m_team_user = MTeamUser.objects.filter(team=team)
    serializer = TeamUserSerializers(m_team_user, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_invite(request):
    user = request.user
    invites = Invite.objects.filter(user=user)
    serializer = InviteSerializers(invites,many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_req(request, pk):
    team = get_object_or_404(Team,pk=pk)
    req = Request.objects.filter(team=team)
    serializer = RequestSerializers(req,many=True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_workbook(request, pk):
    team = get_object_or_404(Team, pk=pk)
    name= request.data["name"]
    problem_ids = request.data["problems"]
    mtu = MTeamUser.objects.filter(team=team)
    with transaction.atomic():
        workbook = Workbook.objects.create(title=name, team=team, count=len(problem_ids))
        for problem_id in problem_ids:
            problem = Problem.objects.get(id=problem_id)
            MProblemWorkbook.objects.create(problem=problem, workbook=workbook)

        for e in mtu:
            cnt = 0
            team_member = e.user.boj
            for problem_id in problem_ids:
                problem = Problem.objects.get(id=problem_id)
                # 팀 멤버 등록
                if Solved.objects.filter(boj=team_member, problem=problem).exists():
                    cnt += 1
            MWorkbookUser.objects.create(workbook=workbook,user=e.user,count=cnt)

    workbooks = Workbook.objects.filter(team=team)
    serializer = WorkbookSerializers(workbooks, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_workbook(request, pk):
    team = get_object_or_404(Team, pk=pk)
    workbooks = Workbook.objects.filter(team=team)
    serializer = WorkbookSerializers(workbooks, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def problem_tag(request):
    if Problem.objects.filter(number=request.GET["id"]).exists():
        problem = Problem.objects.filter(number=request.GET["id"])[0]
    else:
        return HttpResponse(404)
    serializer = ProblemTagSerializers(problem)
    return Response(serializer.data)


def get_award_data(members, e):
    sorted_members = members.order_by(e)
    awarded = AwardSerializers(sorted_members, many=True)
    return awarded.data

@api_view(['GET'])
def award_list(request, team_pk):
    team = get_object_or_404(Team, pk=team_pk)
    members = MTeamUser.objects.filter(team=team)

    streak_data = get_award_data(members,'-user__boj__streak')
    solved_data = get_award_data(members,'-user__boj__solved_count')
    rating_data = get_award_data(members,'-user__boj__rating')

    return JsonResponse({"streak":streak_data,"solved":solved_data,"rating":rating_data})

@api_view(['GET'])
def achievement_award_list(request, team_pk):
    team = get_object_or_404(Team, pk=team_pk)
    workbooks = Workbook.objects.filter(team=team)
    result = []
    for workbook in workbooks:
        mbu = MWorkbookUser.objects.filter(workbook=workbook).order_by("-count")
        serializer = AchievementSerializers(mbu, many=True)
        result.append(serializer.data)
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def team_image_upload(request, team_pk):
    team = get_object_or_404(Team, pk = team_pk)
    print("!@!@",request.FILES)
    image_file = request.FILES['selectedImage']
    team.image = image_file
    team.save()

    return Response({'message': '이미지가 성공적으로 업로드되었습니다.'})
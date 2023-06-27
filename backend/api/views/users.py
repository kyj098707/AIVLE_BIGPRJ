from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from ..serializers.users import JoinSerializer, MyTokenObtainPairSerializer
from ..models import Rival, MTeamUser, Team, BOJ, Solved, Problem
from ..validator.join import signup_validate
import pandas as pd

User = get_user_model()


@api_view(['GET'])
@login_required
def verify_token(request):
    if request.user.is_authenticated:
        return JsonResponse({"response":"success"})
    return JsonResponse({"response":"error"})



@api_view(['POST'])
def join(request):
    boj_name= request.data["boj"]
    df = pd.read_csv("./user_info.csv")
    filtered_df = df[df['handle'] == boj_name]
    tier = filtered_df['tier'].values[0]
    solved_count = filtered_df['solvedCount'].values[0]
    streak = filtered_df['maxStreak'].values[0]
    rating = filtered_df['rating'].values[0]
    ranking = filtered_df['rank'].values[0]
    solved = filtered_df["solved_problem"].values[0]
    if not BOJ.objects.filter(name=boj_name).exists():
        with transaction.atomic():
            boj = BOJ.objects.create(name=boj_name, tier=tier,solved_count=solved_count,streak=streak,rating=rating,ranking=ranking)
            if not solved == "[]":
                solved_problem = solved[1:-1].split(",")
                for number in solved_problem:
                    if number[0] == "'":
                        num = number[1:-1]
                    else:
                        num = number[2:-1]
                    try:
                        problem = Problem.get.objects(number=num)
                        Solved.objects.create(boj=boj, problem=problem)
                    except Exception as e:
                        print(e)
    else:
        boj = BOJ.objects.get(name=boj_name)


    username = request.data["username"]
    password = request.data["password"]
    email = request.data["email"]
    validation_response = signup_validate(username, password, email)
    if validation_response["validation"]:
        with transaction.atomic():
            serializer = JoinSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            obj = serializer.save()
            obj.boj = boj
            obj.save()
    return Response(validation_response)


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


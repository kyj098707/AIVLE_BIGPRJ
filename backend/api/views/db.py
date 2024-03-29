import pandas as pd
from django.http import HttpResponse
from rest_framework.decorators import api_view
from ..models import Problem, MProblemType, Type, BOJ, Solved
from django.db import transaction
## 초기 db 관련 셋팅

@api_view(["GET"])
def create_problem_db(request):
    problem_csv = pd.read_csv("./problems.csv")
    problems = problem_csv.loc[:,["problemId","titleKo","level","tags","acceptedUserCount","averageTries"]]


    for i,rows in problems.iterrows():
        title = rows["titleKo"]
        if len(str(title)) > 100:
            title = title[:80]
        number = rows["problemId"]
        level = rows["level"]
        if rows["tags"] == '[]':
            tags = ""
        else:
            tags = rows["tags"].split("name': '")[1].split(",")[0]
        userCount = int(rows["acceptedUserCount"])
        avgTries = float(rows["averageTries"])
        problem = Problem.objects.create(title=title, number=number,level=level,type=tags,userCount = userCount,avgTries=avgTries)

    return HttpResponse(201)

@api_view(["GET"])
def create_more_problem_db(request):
    problem_csv = pd.read_csv("./problems.csv")
    problems = problem_csv.loc[:,["problemId","acceptedUserCount","averageTries"]]

    with transaction.atomic():
        for i,rows in problems.iterrows():
            try:
                problem = Problem.objects.get(number=str(int(rows["problemId"])))
                problem.userCount = int(rows["acceptedUserCount"])
                problem.avgTries = float(rows["averageTries"])
                problem.save()
            except Exception as e:
                print(e)
    return HttpResponse(201)


@api_view(["GET"])
def create_boj_info(request):

    solved_csv = pd.read_csv("./solved_problems.csv")
    users_csv = pd.read_csv("./users.csv")
    merged_csv = pd.merge(solved_csv,users_csv,on="handle")
    user_info = merged_csv.loc[:, ["handle","solved_problem","solvedCount","tier","rating","maxStreak","rank"]]


    for i,rows in user_info.iterrows():
        if i < 11500:
            continue
        if i == 12000:
            break

        ###
        dicto = {}
        a = Problem.objects.all()
        for i in a :
            dicto[i.number] = i

        boj_list = []
        solved_list = []
        boj = BOJ(name=rows["handle"],tier=rows["tier"],solved_count=rows["solvedCount"],streak=rows["maxStreak"],rating=rows["rating"],ranking=rows["rank"])
        boj_list.append(boj)
        if rows["solved_problem"] == "[]":
            print("no_solved_user", i)
            continue
        solved_problem = rows["solved_problem"][1:-1].split(",")
        for number in solved_problem:
            if number[0] == "'":
                num = number[1:-1]
            else:
                num = number[2:-1]
            try:
                problem = dicto[num]
                solved_list.append(Solved(boj=boj, problem=problem))
            except Exception as e:
                print(e)
        BOJ.objects.bulk_create(boj_list)
        Solved.objects.bulk_create(solved_list)

    return HttpResponse(201)
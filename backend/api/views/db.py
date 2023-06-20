import pandas as pd
from django.http import HttpResponse
from rest_framework.decorators import api_view
from ..models import Problem, MProblemType, Type, BOJ, Solved
from django.db import transaction
## 초기 db 관련 셋팅

@api_view(["GET"])
def create_problem_db(request):
    problem_csv = pd.read_csv("./problems.csv")
    problems = problem_csv.loc[:,["problemId","titles","level","tags"]]

    with transaction.atomic():
        for i,rows in problems.iterrows():
            try:
                raw_title = rows["titles"].split("title")[1].split(",")[0]
                title=raw_title[4:-1]
                number = rows["problemId"]
                level = rows["level"]

                problem = Problem.objects.create(title=title, number=number,level=level)
                if not rows["tags"] == '[]':
                    raw_tags_list = rows["tags"].split("name")[1].split(",")[0]
                    tags_list = raw_tags_list[4:-1]
                else:
                    tags_list = ["없음"]
                for tag in tags_list:
                    if not Type.objects.filter(name=tag).exists():
                        Type.objects.create(name=tag)
                    type_entity = Type.objects.get(name=tag)
                    MProblemType.objects.create(problem=problem,type=type_entity)
            except:
                print(rows["problemId"],rows["titles"],rows["tags"])
    return HttpResponse(201)


@api_view(["GET"])
def create_boj_info(request):

    solved_csv = pd.read_csv("./solved_problems.csv")
    users_csv = pd.read_csv("./users.csv")
    merged_csv = pd.merge(solved_csv,users_csv,on="handle")
    user_info = merged_csv.loc[:, ["handle","solved_problem","solvedCount","tier","rating","maxStreak","rank"]]

    with transaction.atomic():

        for i,rows in user_info.iterrows():
            if i == 1000000:
                break
            print(i)

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
                except:
                    print(number)
            BOJ.objects.bulk_create(boj_list)
            Solved.objects.bulk_create(solved_list)

    return HttpResponse(201)
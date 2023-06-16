import pandas as pd
from django.http import HttpResponse
from rest_framework.decorators import api_view
from ..models import Problem, MProblemType, Type
from django.db import transaction
## 초기 db 관련 셋팅

@api_view(["GET"])
def create_problem_db(request):
    problem_csv = pd.read_csv("./problems.csv")
    problems = problem_csv.loc[:,["problemId","titles","level","tags"]]

    with transaction.atomic():

        for i,rows in problems.iterrows():
            try:
                title = rows["titles"].split("title': '")[1].split("'")[0].rstrip()
                number = rows["problemId"]
                level = rows["level"]

                problem = Problem.objects.create(title=title, number=number,level=level)
                tags_list = rows["tags"].split("'name': '")[1].split("'")[0].rstrip().split(" / ")
                for tag in tags_list:
                    if not Type.objects.filter(name=tag).exists():
                        Type.objects.create(name=tag)
                    type_entity = Type.objects.get(name=tag)
                    MProblemType.objects.create(problem=problem,type=type_entity)
            except:
                print(number)
                print(rows["tags"])
    return HttpResponse(201)


@api_view(["GET"])
def create_boj_info(request):

    problem_info_csv = pd.read_csv("./solved_problems.csv")
 #   problems = problem_csv.loc[:,["problemId","titles","level","tags"]]
    print(problem_info_csv)
    # with transaction.atomic():
    #
    #     for i,rows in problems.iterrows():
    #         try:
    #             title = rows["titles"].split("title': '")[1].split("'")[0].rstrip()
    #             number = rows["problemId"]
    #             level = rows["level"]
    #
    #             problem = Problem.objects.create(title=title, number=number,level=level)
    #             tags_list = rows["tags"].split("'name': '")[1].split("'")[0].rstrip().split(" / ")
    #             for tag in tags_list:
    #                 if not Type.objects.filter(name=tag).exists():
    #                     Type.objects.create(name=tag)
    #                 type_entity = Type.objects.get(name=tag)
    #                 MProblemType.objects.create(problem=problem,type=type_entity)
    #         except:
    #             print(number)
    #             print(rows["tags"])
    return HttpResponse(201)
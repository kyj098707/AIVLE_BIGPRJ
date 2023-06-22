import openai
from django.http import JsonResponse
from rest_framework.decorators import api_view


@api_view(['POST'])
def hint(request):
    openai.api_key = ""
    problem_id = request.data["problem_id"]


    prompt = f"""나는 지금 알고리즘 문제를 풀고 있어,
    내가 풀고 있는 문제의 링크는 다음과 같아
    'https://www.acmicpc.net/problem/{problem_id}'
    하지만 나는 바로 정답을 알고 싶지 않고 힌트를 3번에 걸쳐서 줬으면 좋겠어, 힌트 형식은 3차례에 걸쳐서 줘 
    '힌트만 주면 돼'
    
    예시를 들어서
    'https://www.acmicpc.net/problem/2667'의 문제의 경우 다음과 같이 대답을 해주면 돼
    '
    1. 해당 문제는 BFS 또는 DFS 알고리즘을 사용하는 문제입니다.
    2. 방문 여부를 체크 해주는 변수를 같이 사용하면 더 쉽게 풀 수 있습니다.
    3. 주어진 맵의 범위를 벗어 나기 쉽기 때문에 이점을 조심해야합니다.
    ' 
    '형식은 꼭 지켜줘'
    """

    try :
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        result = completion.choices[0].message.content
        hint1, hint2, hint3 = result.split("\n")
        return JsonResponse({"hint1":hint1,"hint2":hint2,"hint3":hint3})
    except :
        return JsonResponse({"hint1":"현재는 GPT가 너무 바쁩니다.","hint2":"","hint3":""})
import requests
import time
import pandas as pd 

headers = {"Accept": "application/json"}

def get_user_problem(handle: str, page: int):
    url = f"https://solved.ac/api/v3/search/problem?query=%20s%40{handle}&page={page}"
    response = requests.get(url, headers=headers)
    result = response.json().get("items")
    problem_per_page = set()
    
    for item in result:
        problem_per_page.add(str(item.get("problemId")))

    return problem_per_page


def get_solved_user_problem(handle: str, args_time_interval):
    url = f"https://solved.ac/api/v3/search/problem?query=%20s%40{handle}&page=1"
    response = requests.get(url, headers=headers)
    num_problem = response.json().get("count")
    
    start_page = 1
    end_page = int(num_problem / 50) + (num_problem % 50 > 0)
    time_interval = args_time_interval
    
    problem_set = set()

    try:
        print(f"{handle} 크롤링 중")
        for page in range(start_page, end_page+1):
            problem_set_per_page = get_user_problem(handle, page)
            problem_set = problem_set.union(problem_set_per_page)
            time.sleep(time_interval)
            
        print(f"problems: {problem_set}")

    except:
        print(f"크롤링 {handle} 실패")
        pass

    return list(problem_set)
    

user = pd.read_csv('users.csv', encoding='utf-8')
handles = user['handle'].tolist()
solved_problem = []
count = 0
#start_rank번 부터 end_rank-1번까지 크롤링
start_rank = int(input('시작 랭킹: '))
end_rank = int(input('종료 랭킹: '))
# 1~3이 적당 오류뜨면 1초씩 늘리기
arg_time = int(input('지연 시간 설정(1~3 추천 오류뜨면 1씩 증가): '))
for handle in handles[start_rank:end_rank]:
    count += 1
    try:
        solved_problem.append(get_solved_user_problem(handle, arg_time))
        time.sleep(1)
    except:
        print("연결 실패")
        solved_problem.append('')
    #100번당 중간 저장
    if count % 100 == 0:
        df = pd.DataFrame({'solved_problem':solved_problem})
        df.to_csv(f'solved{start_rank}-{end_rank}.csv', index=False)

df = pd.DataFrame({'solved_problem':solved_problem})
df.to_csv(f'solved{start_rank}-{end_rank}.csv', index=False)
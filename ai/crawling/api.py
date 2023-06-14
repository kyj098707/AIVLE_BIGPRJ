import requests
import pandas as pd
import time

headers = {"Accept": "application/json"}

#유저 전체 크롤링
def get_users(args_time_interval):
    time_interval = args_time_interval
    url = "https://solved.ac/api/v3/ranking/tier"
    users = pd.DataFrame()
    
    try:
        response = requests.get(url, headers=headers)
        user_num = response.json().get('count')
        pages = user_num // 50 + 1
    except:
        print("Connection Failed")
        return

    for page in range(1, pages):
        try:
            page_url = f"{url}?page={page}"
            user_res = requests.get(page_url, headers=headers)
            users = pd.concat([users,pd.DataFrame(user_res.json().get('items'))], ignore_index=True)
            print(f"{page}페이지 크롤링중...")
        except:
            print(f"{page}페이지 크롤링 실패")
            pass
        time.sleep(time_interval)
    users.to_csv('users.csv', index=False)
    return users

#문제 전체 크롤링
def get_problem(args_time_interval):
    time_interval = args_time_interval
    url = "https://solved.ac/api/v3/search/problem"
    querystring = {"query": " ", "page": "1"}
    problems = pd.DataFrame()
    try:
        response = requests.get(url, headers=headers, params=querystring)
        problem_num = response.json().get('count')
        pages = int(problem_num / 50) + (problem_num % 50 > 0) + 1
    except:
        print("Connection Failed")
        return

    for page in range(1, pages):
        q = {"query": " ", "page": f"{page}"}
        try:
            page_url = f"{url}?page={page}"
            problem_res = requests.get(url, headers=headers, params=q)
            problems = pd.concat([problems,pd.DataFrame(problem_res.json().get('items'))], ignore_index=True)
            print(f"{page}페이지 크롤링중...")
        except:
            print(f"{page}페이지 크롤링 실패")
            pass
        time.sleep(time_interval)
    problems.to_csv('problems.csv', index=False)
    return problems

#이름 받아서 한페이지 크롤링 
def get_user_problem(handle: str, page: int):
    url = f"https://solved.ac/api/v3/search/problem?query=%20s%40{handle}&page={page}"
    response = requests.get(url, headers=headers)
    result = response.json().get("items")
    problem_per_page = set()
    
    for item in result:
        problem_per_page.add(str(item.get("problemId")))

    return problem_per_page

#이름 받아서 전체 페이지 크롤링
def get_solved_user_problem(handle: str, args_time_interval):
    url = f"https://solved.ac/api/v3/search/problem?query=%20s%40{handle}&page=1"
    response = requests.get(url, headers=headers)
    num_problem = response.json().get("count")
    
    start_page = 1
    end_page = int(num_problem / 50) + (num_problem % 50 > 0) + 1
    time_interval = args_time_interval
    problem_set = set()
    
    try:
        print(f"{handle} 크롤링 중")
        for page in range(start_page, end_page):
            problem_set_per_page = get_user_problem(handle, page)
            problem_set = problem_set.union(problem_set_per_page)
            time.sleep(time_interval)
            
        print(f"problems: {problem_set}")
        return problem_set
    
    except:
        print(f"크롤링 {handle} 실패")
        pass
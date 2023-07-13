import time
import json
import requests
from crawling.mapping import Problems
from crawling.query import get_problem_by_problem_id, update_problem, insert_problem, delete_problem
from sqlalchemy.orm import Session

headers = { "Content-Type": "application/json" }
base_url = "https://solved.ac/api/v3/"
search_problem_url = "search/problem"

# problems에 handle이 있는지 확인
def get_id_from_problem(db: Session, problemId: int):
    problem_found = get_problem_by_problem_id(db, problemId)
    if isinstance(problem_found, Problems):
        return problem_found.problemId
    
    return -1

# 문제 데이터 한페이지씩 크롤링
def scrap_problem_per_page(db: Session, page: int):
    url = base_url + search_problem_url
    querystring = {"query": " ", "page": f"{page}"}

    response = requests.request("GET", url, headers=headers, params=querystring)

    result = dict()
    result["item"] = json.loads(response.text).get("items")
    for item in result["item"]:
        problem = Problems()
        problem.problemId = int(item.get("problemId"))
        problem.titleKo = item.get("titleKo")
        problem.isSolvable = item.get("isSolvable")
        problem.acceptedUserCount = int(item.get("acceptedUserCount"))
        problem.level = int(item.get("level"))
        problem.averageTries = int(item.get("averageTries"))
        problem.official = item.get("official")
        
        tags = []
        tags_ko = []
        tags_data = item.get("tags")

        if tags_data:
            for tag in tags_data:
                tags.append(tag.get("key"))
                tags_ko.append(tag.get('displayNames')[0]['name'])
            problem.tags = ",".join(tags)
            problem.tags_ko = " / ".join(tags_ko)
        
        # 이미 존재하면 UPDATE
        id_exist = get_id_from_problem(db, problem.problemId)
        if id_exist != -1:
            problem.problemId = id_exist
            update_problem(db, problem)
        # 존재하지 않으면 INSERT
        else:
            insert_problem(db, problem)

# 위 함수로 전체 문제 크롤링
def scrap_problem(db: Session, args_time_interval):
    time_interval = args_time_interval
    url = base_url + search_problem_url
    querystring = {"query": " ", "page": "1"}

    try:
        response = requests.request("GET", url, headers=headers, params=querystring)
        num_problem = json.loads(response.text).get("count")
    except:
        print("Connection Failed")
        return

    start_page = 1
    end_page = int(num_problem / 50) + (num_problem % 50 > 0)

    for page in range(start_page, end_page + 1):
        try:
            print(f"Get page {page} now and still {end_page - page} left!")
            scrap_problem_per_page(db, page)
        except:
            print(f"Scraping page {page} failed")
            pass
        time.sleep(time_interval)


import time
import json
import http.client
from crawling.mapping import ProblemsSolved
from sqlalchemy.orm import Session
from crawling.query import get_problem_solved_by_handle, update_problem_solved, \
    insert_problem_solved, delete_problem_solved, get_all_handles, search_column

conn = http.client.HTTPSConnection("solved.ac")
headers = { "Content-Type": "application/json" }
search_problem_url = "/api/v3/search/problem"

# solved_problems에서 handle 있는지 확인
def get_id_from_problem_solved(db: Session, handle: str):
    problem_solved_found = get_problem_solved_by_handle(db, handle)
    if isinstance(problem_solved_found, ProblemsSolved):
        return problem_solved_found.handle

    return -1

# handle 값으로 유저가 푼 문제 데이터 한 페이지씩 크롤링
def scrap_problem_solved_by_handle_per_page(handle: str, page: int):
    conn.request("GET", f"{search_problem_url}?query=%20s%40{handle}&page={page}", headers=headers)
    res = conn.getresponse()
    data = res.read()
    try:
        result = json.loads(data.decode("utf-8")).get("items")
        problem_per_page = set()

        for item in result:
            problem_per_page.add(str(item.get("problemId")))
        
        return problem_per_page
    
    except:
        print(f"Scraping handle {handle} {page} is null")
        pass


# 위 함수로 유저의 전체 푼 문제 크롤링 -> db에 이미 유저가 있으면 updated_users에서 새로 푼 문제 수 가져와서 그만큼만 업데이트
def scrap_problem_solved_by_handle(db: Session, handle: str, args_time_interval):
    time_interval = args_time_interval
    
    id_exist = get_id_from_problem_solved(db, handle)
    print(f"id exis: {id_exist}")

    problem_solved = ProblemsSolved()
    problem_solved.handle = handle
    if id_exist != -1:
        updated = search_column('updatedCount', 'updated_users', 'handle', handle )
        updatedCount = updated.get('updatedCount')
        
        print(f"Get handle {handle} now!")
        if updatedCount <= 1 or updatedCount is None:
            return print(f"handle {handle} is not updated!")
        else:
            conn.request("GET", f"{search_problem_url}?query=%20s%40{handle}&page=1", headers=headers)
            res = conn.getresponse()
            data = res.read()

            num_problem_solved = json.loads(data.decode("utf-8")).get("count")
            time.sleep(time_interval)
            
            end_page = int(num_problem_solved / 50) + (num_problem_solved % 50 > 0)
            
            updated_page = int(updatedCount / 50) + (updatedCount % 50 > 0)
            reverse_end = end_page - updated_page
            problem_solved = ProblemsSolved()
            problem_solved.handle = handle
            problem = search_column('solved_problem', 'solved_problems', 'handle', handle)
            problem_set = set(problem.get('solved_problem').split(','))
            
            for page in range(end_page, reverse_end-1, -1):
                problem_set_per_page = scrap_problem_solved_by_handle_per_page(handle, page)
                problem_set = problem_set.union(problem_set_per_page)
                time.sleep(time_interval)
        problem_solved.solved_problem = ",".join(list(problem_set))
        print(f"handle {handle} is updated!")
        update_problem_solved(db, problem_solved)

    else:
        
        start_page = 2
        print(f"Get handle {handle} now!")
        conn.request("GET", f"{search_problem_url}?query=%20s%40{handle}&page=1", headers=headers)
        res = conn.getresponse()
        data = res.read()

        num_problem_solved = json.loads(data.decode("utf-8")).get("count")
        time.sleep(args_time_interval)
            
        end_page = int(num_problem_solved / 50) + (num_problem_solved % 50 > 0)
        
        result = json.loads(data.decode("utf-8")).get("items")
        problem_per_page = set()

        for item in result:
            problem_per_page.add(str(item.get("problemId")))
                    
        for page in range(start_page, end_page + 1):
            problem_set_per_page = scrap_problem_solved_by_handle_per_page(handle, page)
            problem_set = problem_set.union(problem_set_per_page)
            time.sleep(time_interval)
        problem_solved.solved_problem = ",".join(list(problem_set))
        print(f"handle {handle} is updated!")
        insert_problem_solved(db, problem_solved)
        

def scrap_problem_solved(db: Session, args_time_interval):
    handles = get_all_handles(db)
    ### handles 리스트 범위 지정
    for handle in handles:
        try:
            scrap_problem_solved_by_handle(db, handle, args_time_interval)

            time.sleep(args_time_interval)
        except:
            print("Connection failed")

import time
import json
import requests
from crawling.mapping import Users
from crawling.query import *
from sqlalchemy.orm import Session

headers = { "Content-Type": "application/json" }
base_url = "https://solved.ac/api/v3/"
search_user_url = "ranking/tier"

def get_id_from_user(db: Session, handle: str):
    user_found = get_user_by_handle(db, handle)
    if isinstance(user_found, Users):
        return user_found.handle

    return -1

def scrap_user_per_page(db: Session, page: int):
    url = base_url + search_user_url
    querystring = {"page": f"{page}"}

    response = requests.request("GET", url, headers=headers, params=querystring)

    result = dict()
    result["item"] = json.loads(response.text).get("items")

    for item in result["item"]:
        user = Users()
        user.handle = item.get("handle")
        user.solvedCount = int(item.get("solvedCount"))
        user.userClass = int(item.get("class"))
        user.tier = int(item.get("tier"))
        user.rating = int(item.get("rating"))
        user.ratingByProblemsSum = int(item.get("ratingByProblemsSum"))
        user.ratingByClass = int(item.get("ratingByClass"))
        user.ratingBySolvedCount = int(item.get("ratingBySolvedCount"))
        user.rivalCount = int(item.get("rivalCount"))
        user.reverseRivalCount = int(item.get("reverseRivalCount"))
        user.maxStreak = int(item.get("maxStreak"))
        user.rank = int(item.get("rank"))

        user_updated = UsersUpdated()
        id_exist = get_id_from_user(db, user.handle)
        if id_exist != -1:
            user.handle = id_exist
            solved = search_column('solvedCount', 'users', 'handle', user.handle)
            user_updated.handle = user.handle
            user_updated.updatedCount = (user.solvedCount-solved.get('solvedCount'))
            update_user(db, user)
            update_users_updated(db, user_updated)
        # 존재하지 않으면 INSERT
        else:
            user_updated.handle = user.handle
            user_updated.updatedCount = user.solvedCount
            insert_user(db, user)
            insert_users_updated(db, user_updated)

def scrap_user(db: Session, args_time_interval):
    url = base_url + search_user_url
    querystring = {"page": "1"}

    try:
        response = requests.request("GET", url, headers=headers, params=querystring)
        num_user = json.loads(response.text).get("count")
    except:
        print("Connection Failed")
        return

    start_page = 1
    end_page = int(num_user / 50) + (num_user % 50 > 0)
    #end_page = 1
    time_interval = args_time_interval

    for page in range(start_page, end_page + 1):
        try:
            print(f"Get page {page} now and still {end_page - page} left!")
            scrap_user_per_page(db, page)
        except:
            print(f"Scraping page {page} failed")
            pass
        time.sleep(time_interval)

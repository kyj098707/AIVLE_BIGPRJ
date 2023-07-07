from crawling.database import session_local
from crawling.get_problems import scrap_problem
from crawling.get_users import scrap_user
from crawling.get_solved_problems import scrap_problem_solved
from crawling.get_class_problems import get_class_problems, db_to_df

def main(args):
    with session_local() as db:
        target_data = args.target_data
        if target_data == 'problem':
            scrap_problem(db, args)
        elif target_data == 'user':
            scrap_user(db, args)
        elif target_data == 'problem_solved':
            scrap_problem_solved(db, args)

def get_problem_main(args_time_interval):
    with session_local() as db:
        scrap_problem(db, args_time_interval)

def get_user_main(args_time_interval):
    with session_local() as db:
        scrap_user(db, args_time_interval)
        
def get_solved_problem_main(args_time_interval):
    with session_local() as db:
        scrap_problem_solved(db, args_time_interval)

def get_class_problem_main():
    db_to_df()
    get_class_problems()

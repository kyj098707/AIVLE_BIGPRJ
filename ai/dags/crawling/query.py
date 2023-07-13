from sqlalchemy.orm import Session
from crawling.mapping import Users, Problems, ProblemsSolved, UsersUpdated
from crawling.database import mycursor

# users table
def get_user_by_handle(db: Session, handle: str):
    return db.query(Users).filter(Users.handle == handle).first()

def update_user(db:Session, user:Users):
    db.query(Users).filter(Users.handle == user.handle).update({
        column: getattr(user, column) for column in Users.__table__.columns.keys()
    })
    db.commit()

def insert_user(db:Session, user:Users):
    db.add(user)
    db.commit()

def delete_user(db:Session, handle: str):
    user = db.query(Users).filter(Users.handle == handle).first()
    db.delete(user)
    db.commit()


# problems table
def get_problem_by_problem_id(db: Session, problemId: int):
    return db.query(Problems).filter(Problems.problemId == problemId).first()

def update_problem(db:Session, problem:Problems):
    db.query(Problems).filter(Problems.problemId == problem.problemId).update({
        column: getattr(problem, column) for column in Problems.__table__.columns.keys()
    })
    db.commit()

def insert_problem(db:Session, problem:Problems):
    db.add(problem)
    db.commit()

def delete_problem(db:Session, problemId: int):
    problem = db.query(Problems).filter(Problems.problemId == problemId).first()
    db.delete(problem)
    db.commit()

def get_all_handles(db: Session):
    return [handle[0] for handle in db.query(Users.handle).distinct()] 


# solved_problems table
def get_problem_solved_by_handle(db: Session, handle: str):
    return db.query(ProblemsSolved).filter(ProblemsSolved.handle == handle).first()

def update_problem_solved(db:Session, solved_problems:ProblemsSolved):
    db.query(ProblemsSolved).filter(ProblemsSolved.handle == solved_problems.handle).update({
        column: getattr(solved_problems, column) for column in ProblemsSolved.__table__.columns.keys()
    })
    db.commit()

def insert_problem_solved(db:Session, solved_problems:ProblemsSolved):
    db.add(solved_problems)
    db.commit()

def delete_problem_solved(db:Session, handle:str):
    solved_problems = db.query(ProblemsSolved).filter(ProblemsSolved.handle == handle).first()
    db.delete(solved_problems)
    db.commit()


# updated_users table
def get_users_updated_by_handle(db:Session, handle:str):
    return db.query(UsersUpdated).filter(UsersUpdated.handle == handle).first()

def update_users_updated(db:Session, updated_users:UsersUpdated):
    db.query(UsersUpdated).filter(UsersUpdated.handle == updated_users.handle).update({
        column: getattr(updated_users, column) for column in UsersUpdated.__table__.columns.keys()
    })
    db.commit()

def insert_users_updated(db:Session, updated_users:UsersUpdated):
    db.add(updated_users)
    db.commit()

def delete_users_updated(db:Session, handle:str):
    updated_users = db.query(UsersUpdated).filter(UsersUpdated.handle == handle).first()
    db.delete(updated_users)
    db.commit()

# SEARCH TABLE
def search_column(column, table, where, like):
    mycursor.execute(f"SELECT {column} FROM {table} WHERE {where} Like '{like}'")
    return mycursor.fetchone()

def search_table(table):
    sql = f"SELECT * FROM {table};"
    mycursor.execute(sql)
    result = mycursor.fetchall()
    return result


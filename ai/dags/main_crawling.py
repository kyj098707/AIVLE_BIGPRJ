from crawling.main import get_problem_main, get_user_main, get_solved_problem_main, get_class_problem_main
import pendulum
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

TIME_INTERVAL = 3
local_tz = pendulum.timezone("Asia/Seoul")

def get_problem():
    get_problem_main(TIME_INTERVAL)
    return {"result": "get_problem 완료!"}

def get_user():
    get_user_main(TIME_INTERVAL)
    return {"result": "get_user 완료!"}

def get_solved_problem():
    get_solved_problem_main(TIME_INTERVAL)
    return {"result": "get_problem_solved 완료!"} 

def get_class_problem():
    get_class_problem_main()
    return {"result": "get_class_problem 완료!"} 

default_args = {
    'depends_on_past': False,  # 이전 DAG의 Task가 성공, 실패 여부에 따라 현재 DAG 실행 여부가 결정. False는 과거의 실행 결과 상관없이 매일 실행한다
    'start_date': datetime(2023, 7, 12, tzinfo=local_tz),
    'retires': 3,  # 실패시 재시도 횟수
    'retry_delay': timedelta(minutes=5)  # 만약 실패하면 5분 뒤 재실행
}

with DAG(
        dag_id='airflow_crawling',
        default_args=default_args,
        schedule_interval= '@once',
        tags=['Algoking']
) as dag:
    # PythonOperator 사용
    task1 = PythonOperator(
        task_id = 'get_problem',  # task의 id
        python_callable = get_problem,  # 실행할 python 함수
        retries = 3
    )

    task2 = PythonOperator(
        task_id = 'get_user',  # task의 id
        python_callable = get_user,  # 실행할 python 함수
        retries = 3
    )

    task3 = PythonOperator(
        task_id = 'get_problem_solved',  # task의 id
        python_callable = get_solved_problem,  # 실행할 python 함수
        retries = 3
    )

    task4 = PythonOperator(
        task_id = 'get_class_problem',  # task의 id
        python_callable = get_class_problem,  # 실행할 python 함수
        retries = 4
    )


    task1 >> task2 >> task3 >> task4 # task1 이후에 task2 실행
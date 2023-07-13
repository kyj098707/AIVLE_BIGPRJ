from modeling.rec_problems.main import problem_preprocessing, recvae_train, multivae_train, multidae_train, problem_infer
from modeling.rec_rivals.rec_rivals_knn import rival_knn_main
from query import *
from mapping import RecommendProblems, RecommendRivals
import pendulum
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import DB
import pymysql
from tqdm import tqdm

TIME_INTERVAL = 3
local_tz = pendulum.timezone("Asia/Seoul")

def create_connection():
    DB_URl = f"mysql+pymysql://{DB['USER']}:{DB['PASSWORD']}@{DB['HOST']}:{DB['PORT']}/{DB['NAME']}"
    engine = create_engine(DB_URl, connect_args={'charset':'utf8'})
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return session_local

def create_db_read():
    db = pymysql.connect(host = DB['HOST'],
                     port = int(DB['PORT']),
                     user = DB['USER'],
                     password = DB['PASSWORD'],
                     db = DB['NAME'])
    return db
##########################################################################################################
def rec_problem_preprocess():
    db2 = create_db_read()
    problem_preprocessing(db=db2)
    db2.close()
    return {"Problem 전처리 완료"}

def rec_recvae_train(): 
    recvae_train()
    return {"RECVAE 모델 훈련 완료"}

def rec_multivae_train(): 
    multivae_train()
    return {"Multi-VAE 모델 훈련 완료"}

def rec_multidae_train(): #학습해서 베스트 score 저장
    multidae_train()
    return {"Multi-DAE 모델 훈련 완료"}

def get_id_from_rec_problems(db: Session, handle: str):
    handle_found = get_rec_problems_by_handle(db, handle)
    if isinstance(handle_found, RecommendProblems):
        return handle_found.handle
    return -1

def rec_problems_bestcheck(): # 저장된 score 비교해서 best 모델 선정 및 디비 저장
    db2 = create_db_read()
    session_local = create_connection()
   
    output = problem_infer(db2)
    output.columns = ['handle', 'rec_problems']

    with session_local() as db:
        for i in tqdm(range(0, len(output))):
            if i == 0:
                print(output.handle[i])
            rec_gen_pb = RecommendProblems()
            rec_gen_pb.handle = output.handle[i]
            rec_gen_pb.rec_problems = output.rec_problems[i]

            id_exist = get_id_from_rec_problems(db, rec_gen_pb.handle)
            if id_exist != -1:
                rec_gen_pb.handle = id_exist
                update_rec_problems(db, rec_gen_pb)
            # 존재하지 않으면 INSERT
            else:
                insert_rec_problems(db, rec_gen_pb)
    db2.close()
    return {"모델의 결과 recommend_problems 테이블에 저장 완료!"}

def get_id_from_rec_rivals(db: Session, handle: str):
    handle_found = get_rec_rivals_by_handle(db, handle)
    if isinstance(handle_found, RecommendRivals):
        return handle_found.handle
    
def rec_rival_knn():    
    db2 = create_db_read()
    session_local = create_connection()

    output = rival_knn_main()

    with session_local() as db:
        for i in tqdm(range(0, len(output))): 
            rec_rival = RecommendRivals()
            rec_rival.handle = output.handle[i]
            rec_rival.rec_rivals = output.rec_rivals[i]
            id_exist = get_id_from_rec_rivals(db, rec_rival.handle)
            if id_exist != -1:
                rec_rival.id = id_exist
                update_rec_rivals(db, rec_rival)
            # 존재하지 않으면 INSERT
            else:
                insert_rec_rivals(db, rec_rival)
    db2.close()

    return {"Rival 추천 KNN 완료!"}



##########################################################################################################
default_args = {
    'depends_on_past': False,  # 이전 DAG의 Task가 성공, 실패 여부에 따라 현재 DAG 실행 여부가 결정. False는 과거의 실행 결과 상관없이 매일 실행한다
    'start_date': datetime(2023, 7, 12, tzinfo=local_tz),
    'retires': 3,  # 실패시 재시도 횟수
    'retry_delay': timedelta(minutes=5)  # 만약 실패하면 5분 뒤 재실행
}

with DAG(
        dag_id='airflow_modelingwling',
        default_args=default_args,
        schedule_interval= '@once',
        tags=['Algoking']
) as dag:
    
    rp1= PythonOperator(
        task_id='rec_problem_preprocess',
        python_callable = rec_problem_preprocess,  # 실행할 python 함수
        retries = 3
    )
    rp2= PythonOperator(
        task_id='rec_recvae_train',
        python_callable = rec_recvae_train,  # 실행할 python 함수
        retries = 3
    )
    rp3 = PythonOperator(
        task_id='rec_multivae_train',
        python_callable = rec_multivae_train,  # 실행할 python 함수
        retries = 3
    )
    rp4 = PythonOperator(
        task_id='rec_multidae_train',
        python_callable = rec_multidae_train,  # 실행할 python 함수
        retries = 3
    )
    rp5 = PythonOperator(
        task_id='rec_problems_bestcheck',
        python_callable = rec_problems_bestcheck,  # 실행할 python 함수
        retries = 3
    )

    rr1 = PythonOperator(
        task_id='rec_rival_knn',
        python_callable = rec_rival_knn,  # 실행할 python 함수
        retries = 3
    )
    rp1 >> [rp2, rp3, rp4] >> rp5 >> rr1 
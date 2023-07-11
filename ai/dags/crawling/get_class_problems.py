from sklearn.preprocessing import MinMaxScaler
from crawling.query import search_table
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings("ignore")

def db_to_df():
    pd.DataFrame(search_table('problems')).to_csv('/home/sun/airflow/dags/dataset/problems.csv', index=False)
    pd.DataFrame(search_table('solved_problems')).to_csv('/home/sun/airflow/dags/dataset/solved_problems.csv', index=False)
    pd.DataFrame(search_table('users')).to_csv('/home/sun/airflow/dags/dataset/users.csv', index=False)

def get_class_problems():
    problems = pd.read_csv('/home/sun/airflow/dags/dataset/problems.csv')
    solved_problems = pd.read_csv('/home/sun/airflow/dags/dataset/solved_problems.csv')
    users = pd.read_csv('/home/sun/airflow/dags/dataset/users.csv')
    
    # 전처리
    solved_problems.dropna(inplace=True)
    solved_problems.drop(solved_problems[solved_problems.solved_problem.isnull()].index, axis=0, inplace=True)

    users = users[users.handle.isin(solved_problems.handle)]
    users.drop(users[users.handle.isin(list(set(users[users.solvedCount == 0].handle) - set(solved_problems.handle)))].index, axis=0, inplace=True)

    gudegi = [24900, 24901, 24902, 24903, 24904, 24905, 24906, 24907, 24908, 24909, 24910, 24911, 
            21292, 21293, 21294, 21295, 21296, 21297, 21298, 21299, 
            18821, 18822, 18823, 18824, 18825, 18826, 18827, 18828, 18829, 18830, 18831, 18832, 18833, 18834, 18835, 18836, 
                17106, 17107, 17108, 17109, 17110, 17111, 17112, 17113, 17114, 17115, 17116, 17117, 17118, 17119, 17120, 
            15629, 15630, 15631, 15632, 15633, 15634, 15635, 15636, 15637, 15638, 15639, 15640, 15641, 15642, 15643]
    problems = problems[problems.isSolvable == True]
    problems = problems[problems.official == True]
    problems = problems[problems['level'] != 0]
    problems = problems[~problems.problemId.isin(gudegi)]

    problems.reset_index(inplace=True, drop=True)
    solved_problems.reset_index(inplace=True, drop=True)
    users.reset_index(inplace=True, drop=True)

    # 레벨별 문제풀이수
    user_problems = solved_problems[['handle', 'solved_problem']]
    user_problems['problems'] = user_problems['solved_problem']
    user_problems['problems'] = user_problems['problems'].str.split(',')
    user_problems = user_problems.explode('problems')
    user_problems.drop(user_problems[user_problems.problems == ''].index, axis=0, inplace=True)
    user_problems.drop(columns='solved_problem',inplace=True)
    user_problems['problems'] = user_problems['problems'].astype(int)
    user_problems = pd.merge(user_problems, problems[['problemId', 'level']], left_on='problems', right_on='problemId', how='left')
    user_problems = user_problems.groupby(['handle', 'level']).size().reset_index(name='count')
    users_info = user_problems.pivot_table(index="handle", columns=["level"], aggfunc=np.sum, values='count', fill_value=0)

    scaler = MinMaxScaler()
    num_vars = list(users_info.columns)
    if not users_info.empty:
        users_info[num_vars] = scaler.fit_transform(users_info[num_vars])
    else:
        print("Error: Empty DataFrame")


    real_users = users[['handle', 'solvedCount', 'userClass', 'tier', 'ratingByClass', 'ratingBySolvedCount', 'ratingByProblemsSum']]
    scaler = MinMaxScaler()
    num_vars = ['solvedCount', 'userClass', 'tier', 'ratingByClass', 'ratingBySolvedCount', 'ratingByProblemsSum']
    real_users[num_vars] = scaler.fit_transform(real_users[num_vars])

    real_users = pd.merge(users_info, real_users, on='handle')
    real_users = real_users.sort_values('handle')
    real_users.reset_index(drop=True, inplace=True)
    real_users.to_csv('/home/sun/airflow/dags/dataset/class_problems.csv', index=False)
    return real_users

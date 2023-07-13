import pandas as pd
import numpy as np
from modeling.rec_problems.utils import *
from modeling.rec_problems.config import *
from modeling.rec_problems.preprocess import preprocess_all
from modeling.rec_problems.inference import inference
from modeling.rec_problems.train_multivae import train_multivae
from modeling.rec_problems.train_multidae import train_multidae
from modeling.rec_problems.train_recvae import train_recvae
import json

def make_train_data(db):
    df_solved_problems = pd.read_sql('SELECT * FROM solved_problems', db)
    df_solved_problems['solved_problem'] = df_solved_problems['solved_problem'].str.split(',')
    df_solved_problems = df_solved_problems.replace(['', 'null'], [np.nan, np.nan])
    df_solved_problems = df_solved_problems.explode('solved_problem').dropna().reset_index(drop=True)
    df_solved_problems = df_solved_problems.replace(['', 'null'], [np.nan, np.nan])
    df_solved_problems = df_solved_problems.dropna()
    df_solved_problems = df_solved_problems.astype({'handle':'str', 'solved_problem':'int'})
    df_solved_problems.columns = ['user', 'item']

    raw_data = df_solved_problems

    df_problems = pd.read_sql('select * from problems', db)
    problems_drop = ['titles', 'isPartial', 'votedUserCount', 'sprout', 
                'givesNoRating', 'givesNoRating', 'metadata', 'isLevelLocked']
    gudegi = [24900, 24901, 24902, 24903, 24904, 24905, 24906, 24907, 24908, 24909, 24910, 24911, 
          21292, 21293, 21294, 21295, 21296, 21297, 21298, 21299, 
           18821, 18822, 18823, 18824, 18825, 18826, 18827, 18828, 18829, 18830, 18831, 18832, 18833, 18834, 18835, 18836, 
            17106, 17107, 17108, 17109, 17110, 17111, 17112, 17113, 17114, 17115, 17116, 17117, 17118, 17119, 17120, 
           15629, 15630, 15631, 15632, 15633, 15634, 15635, 15636, 15637, 15638, 15639, 15640, 15641, 15642, 15643]
    df_problems = df_problems.drop(columns=problems_drop, axis=1)
    df_problems = df_problems.drop(index = df_problems.loc[df_problems['isSolvable'] == False].index)
    df_problems = df_problems.drop(index = df_problems.loc[df_problems['official'] == False].index)
    df_problems = df_problems[~df_problems.problemId.isin(gudegi)]
    df_problems = df_problems[~df_problems.tags.isnull()].reset_index(drop=True)

    raw_data = raw_data[raw_data['item'].isin(df_problems['problemId'].values)].reset_index(drop=True)

    return raw_data, df_problems

def problem_preprocessing(db):
    raw_data, df_problems = make_train_data(db)

    print("Preprocessing Start !")
    preprocess_all(raw_data, df_problems, db)

def recvae_train():
    print("Train Start !")
    train_recvae()

def multivae_train():
    print("Train Start !")
    train_multivae()

def multidae_train():
    print("Train Start !")
    train_multidae()

def problem_infer(db):
    raw_data, df_problems = make_train_data(db)

    print("Inference Start!!")
    output = inference(raw_data, df_problems, db)
    output.item = output.item.astype(str)
    output = output.groupby('user')['item'].apply(lambda x: "%s" % ','.join(x))
    output = pd.DataFrame(output)
    output = output.reset_index()

    return output
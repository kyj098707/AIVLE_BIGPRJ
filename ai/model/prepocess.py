import pandas as pd
import numpy as np
import os
import json
import torch
from torch import nn
from utils import *
from config import *

raw_dir = args.raw_dir
pro_dir = os.path.join(args.dataset)

# raw 데이터 불러오기
df_problems = pd.read_csv(raw_dir + '/problems.csv', encoding='utf-8')
df_users = pd.read_csv(raw_dir + '/users.csv', encoding='utf-8')
df_problems_solved = pd.read_csv(raw_dir + '/solved_problems.csv')

# 문자열 리스트로
df_problems['tags'] = df_problems['tags'].apply(lambda x: str_to_list(x)) 
df_problems_solved['solved_problem'] = df_problems_solved['solved_problem'].apply(lambda x: str_to_list(x)) 

# 딕셔너리 값 추출
df_problems['tags'] = df_problems['tags'].apply(lambda x: dic_to_list(x)) 

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
df_problems.to_csv(raw_dir + '/problems_pre.csv', index=False, encoding='utf-8')

temp = df_problems_solved.explode('solved_problem').dropna().reset_index(drop=True)
temp = temp.astype({'handle':'str', 'solved_problem':'int'})
temp = temp[temp['solved_problem'].isin(df_problems.problemId.values)].reset_index(drop=True)
temp.solved_problem = temp.solved_problem.astype(str)
temp = temp.groupby('handle')['solved_problem'].apply(list)
temp = pd.DataFrame(temp)
temp = temp.reset_index()
temp.to_csv(raw_dir + '/solved_problems_pre.csv', index=False, encoding='utf-8')

unique_uid = pd.unique(temp['handle'])
print('len(unique_uid): ', len(unique_uid))
print("(BEFORE) unique_uid: ", unique_uid)
np.random.seed(2023)
idx_perm = np.random.permutation(unique_uid.size)
unique_uid = unique_uid[idx_perm]
print("(AFTER) unique_uid: ", unique_uid)

n_users = unique_uid.size
n_heldout_users = int(n_users * 0.1)

tr_users = unique_uid[:(n_users - n_heldout_users * 2)]
val_users = unique_uid[(n_users - n_heldout_users * 2): (n_users - n_heldout_users)]
te_users = unique_uid[(n_users - n_heldout_users):]

print("train데이터에 사용할 사용자 수: ", len(tr_users))
print("valid데이터에 사용할 사용자 수: ", len(val_users))
print("test데이터에 사용할 사용자 수: ", len(te_users))

tr_plays = temp.loc[temp['handle'].isin(tr_users)]
tr_plays = pd.DataFrame(tr_plays.explode('solved_problem'))

unique_sid = pd.unique(temp['solved_problem'].explode())

if not os.path.exists(pro_dir):
    os.makedirs(pro_dir)

item2id = dict((sid, i) for (i, sid) in enumerate(unique_sid))
user2id = dict((pid, i) for (i, pid) in enumerate(unique_uid))

with open(os.path.join(pro_dir, 'item2id.json'), 'w', encoding="utf-8") as f:
    json.dump(item2id, f, ensure_ascii=False, indent="\t")
        
with open(os.path.join(pro_dir, 'user2id.json'), 'w', encoding="utf-8") as f:
    json.dump(user2id, f, ensure_ascii=False, indent="\t")

with open(os.path.join(pro_dir, 'unique_sid.txt'), 'w') as f:
    for sid in unique_sid:
        f.write('%s\n' % sid)

with open(os.path.join(pro_dir, 'unique_uid.txt'), 'w') as f:
    for uid in unique_uid:
        f.write('%s\n' % uid)

#Validation과 Test에는 input으로 사용될 tr 데이터와 정답을 확인하기 위한 te 데이터로 분리되었습니다.
print('Data Split Start!')
val_plays = temp.loc[temp['handle'].isin(val_users)]
val_plays = pd.DataFrame(val_plays.explode('solved_problem'))
val_plays_tr, val_plays_te = split_train_test_proportion(val_plays)

te_plays = temp.loc[temp['handle'].isin(te_users)]
te_plays = pd.DataFrame(te_plays.explode('solved_problem'))
te_plays_tr, te_plays_te = split_train_test_proportion(te_plays)

train_data = numerize(tr_plays, user2id, item2id)
train_data.to_csv(os.path.join(pro_dir, 'train.csv'), index=False)

vad_data_tr = numerize(val_plays_tr, user2id, item2id)
vad_data_tr.to_csv(os.path.join(pro_dir, 'validation_tr.csv'), index=False)

vad_data_te = numerize(val_plays_te, user2id, item2id)
vad_data_te.to_csv(os.path.join(pro_dir, 'validation_te.csv'), index=False)

test_data_tr = numerize(te_plays_tr, user2id, item2id)
test_data_tr.to_csv(os.path.join(pro_dir, 'test_tr.csv'), index=False)

test_data_te = numerize(te_plays_te, user2id, item2id)
test_data_te.to_csv(os.path.join(pro_dir, 'test_te.csv'), index=False)
print("Data Split Done!")

# item_tag_emb
print("Item tag emb start!")
set_tags = set()
for tags in df_problems['tags'].dropna().values:
    for tag in tags:
        set_tags.add(tag)
        
df_tags = df_problems[['problemId', 'tags']]
df_tags = df_tags.explode('tags').dropna().reset_index(drop=True)
df_tags = df_tags[df_tags['problemId'].astype(str).isin(unique_sid)].reset_index(drop=True)

emb = nn.Embedding(len(set_tags), 300)
tag_emb = pd.DataFrame(df_tags['tags'].value_counts().index.values, columns=['tags'])

dict_tag_idx = dict()
for i, j in enumerate(df_tags['tags'].value_counts().index.values):
    dict_tag_idx[j] = i

list_emb = []
dict_tag_emb = dict()
for i in df_tags['tags'].value_counts().index.values:
    list_emb.append(emb(torch.tensor(dict_tag_idx[i])).detach().numpy())
    dict_tag_emb[i] = emb(torch.tensor(dict_tag_idx[i])).detach().numpy()

df_tag_emb = pd.concat([tag_emb, pd.DataFrame(list_emb)], axis=1)
df_tags2 = pd.merge(df_tags, df_tag_emb, on='tags', how='left')
tag2emb = df_tags2.iloc[:, 2:].values
df_tags['emb'] = list(tag2emb) 

total = []
def item_genre_emb_mean(i):
    total.append(np.mean(df_tags[df_tags['problemId'] == i].emb))

item_genre_emb_idx = pd.DataFrame(list(df_tags['problemId'].unique()), columns=['problemId'])
item_genre_emb_idx.problemId.apply(lambda x: item_genre_emb_mean(x))
item_genre_emb = pd.DataFrame(total)
item_genre_emb.index = df_tags['problemId'].unique()

item_genre_emb = item_genre_emb.reset_index()
item_genre_emb['index'] = item_genre_emb['index'].astype(str).apply(lambda x : item2id[x])
item_genre_emb = item_genre_emb.set_index('index')
item_genre_emb = item_genre_emb.sort_index()

item_genre_emb = item_genre_emb.T
print(item_genre_emb.shape)

item_genre_emb.to_csv(pro_dir + '/item_tag_emb.csv', index=False)
print('Item tag emb Done!')

model_score = dict()
model_score['recvae'] = 0
model_score['multivae'] = 0
model_score['multidae'] = 0
with open(os.path.join(pro_dir, 'model_score.json'), 'w', encoding="utf-8") as f:
    json.dump(model_score, f, ensure_ascii=False, indent="\t")


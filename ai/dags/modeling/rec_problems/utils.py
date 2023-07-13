import numpy as np
import pandas as pd
import bottleneck as bn
import torch
from scipy import sparse
from math import log, floor, ceil

def ndcg(X_pred, heldout_batch, k=100):
    '''
    Normalized Discounted Cumulative Gain@k for binary relevance
    ASSUMPTIONS: all the 0's in heldout_data indicate 0 relevance
    '''
    batch_users = X_pred.shape[0]
    idx_topk_part = bn.argpartition(-X_pred, k, axis=1)
    topk_part = X_pred[np.arange(batch_users)[:, np.newaxis],
                       idx_topk_part[:, :k]]
    idx_part = np.argsort(-topk_part, axis=1)

    idx_topk = idx_topk_part[np.arange(batch_users)[:, np.newaxis], idx_part]

    tp = 1. / np.log2(np.arange(2, k + 2))

    e = 0.000001

    DCG = (heldout_batch[np.arange(batch_users)[:, np.newaxis],
                         idx_topk].toarray() * tp).sum(axis=1)
    IDCG = np.array([(tp[:min(n, k)]).sum()
                     for n in heldout_batch.getnnz(axis=1)]) + e
    return DCG / IDCG

def recall(X_pred, heldout_batch, k=100):
    batch_users = X_pred.shape[0]

    idx = bn.argpartition(-X_pred, k, axis=1)
    X_pred_binary = np.zeros_like(X_pred, dtype=bool)
    X_pred_binary[np.arange(batch_users)[:, np.newaxis], idx[:, :k]] = True

    e = 0.000001

    X_true_binary = (heldout_batch > 0).toarray()
    tmp = (np.logical_and(X_true_binary, X_pred_binary).sum(axis=1)).astype(
        np.float32)
    #-------------------------
    # print('tmp :', len(tmp))
    # print('np.minimum(k, X_true_binary.sum(axis=1) :',len(np.minimum(k, X_true_binary.sum(axis=1))))
    #-------------------------
    recall = tmp / np.minimum(k, X_true_binary.sum(axis=1) + e)
    return recall

def sparse2torch_sparse(data):
    """
    Convert scipy sparse matrix to torch sparse tensor with L2 Normalization
    This is much faster than naive use of torch.FloatTensor(data.toarray())
    https://discuss.pytorch.org/t/sparse-tensor-use-cases/22047/2
    """
    samples = data.shape[0]
    features = data.shape[1]
    coo_data = data.tocoo()
    indices = torch.LongTensor([coo_data.row, coo_data.col])
    row_norms_inv = 1 / np.sqrt(data.sum(1))
    row2val = {i : row_norms_inv[i].item() for i in range(samples)}
    values = np.array([row2val[r] for r in coo_data.row])
    t = torch.sparse.FloatTensor(indices, torch.from_numpy(values).float(), [samples, features])
    return t

def naive_sparse2tensor(data):
    return torch.FloatTensor(data.toarray())

def numerize_for_infer(tp, profile2id, show2id):
    uid = tp['user'].apply(lambda x: profile2id[str(x)])
    sid = tp['item'].apply(lambda x: show2id[str(x)])
    return pd.DataFrame(data={'uid': uid, 'sid': sid}, columns=['uid', 'sid'])

def split_train_test_proportion(data, test_prop=0.2):
    '''
    data -> DataFrame
    
    train과 test를 8:2 비율로 나눠주는 함수.
    '''
    data_grouped_by_user = data.groupby('user')
    tr_list, te_list = list(), list()

    np.random.seed(2023)
    
    for _, group in data_grouped_by_user:
        n_items_u = len(group)
        
        if n_items_u >= 5:
            idx = np.zeros(n_items_u, dtype='bool') # 'False'가 n_items_u개 만큼 채워진 array
            
            # n_items_u개 중에서 20%의 인덱스를 랜덤으로 뽑아서 해당 인덱스를 'True'로 바꿈
            idx[np.random.choice(n_items_u, size=int(test_prop * n_items_u), replace=False).astype('int64')] = True
                    
            tr_list.append(group[np.logical_not(idx)]) # 'False'인 것을 tr_list에 추가
            te_list.append(group[idx]) # 'True'인 것을 te_list에 추가
        
        else:
            tr_list.append(group)
    
    data_tr = pd.concat(tr_list)
    data_te = pd.concat(te_list)

    return data_tr, data_te

#level 스케일링              
def min_max(lv):
    if lv <= 5:
        return 0, 7
    elif lv <= 10:
        return 5, 12
    elif lv <= 13:
        return 8, 16
    elif lv <= 15:
        return 11, 18
    else:
        return (floor(lv-log(lv, 2)), ceil(lv+log(lv, 3)))
    
def infer(user, item, dict_user_lv, dict_item_lv, id2show, infer_cnt):
    pred = np.array([])
    user_lv = dict_user_lv[user]
    cnt = 0
    mini, maxi = min_max(user_lv)
    item = sorted(item, reverse=True)
    for i in item:
        item_lv = dict_item_lv[int(id2show[i])]
        if mini <= item_lv <= maxi:
            pred = np.append(pred, i)
            cnt += 1
    
        if cnt == infer_cnt:
            return pred
    else:
        # print('else user :', user)
        if len(pred) < infer_cnt:
            for i in item:
                if i not in pred:
                    pred = np.append(pred, i)

                if len(pred) == infer_cnt:
                    return np.array(pred)
                
def de_numerize(tp, re_p2id, re_s2id):
    uid2 = tp['user'].apply(lambda x: re_p2id[x])
    sid2 = tp['item'].apply(lambda x: re_s2id[x])
    return pd.DataFrame(data={'uid': uid2, 'sid': sid2}, columns=['uid', 'sid'])

def numerize(tp, profile2id, show2id):
    uid = tp['user'].apply(lambda x: profile2id[x])
    sid = tp['item'].apply(lambda x: show2id[x])
    return pd.DataFrame(data={'uid': uid, 'sid': sid}, columns=['uid', 'sid'])
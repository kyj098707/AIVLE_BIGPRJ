import numpy as np
import pandas as pd
import torch
import random



class args:
    pro_dir = 'ai/model/dataset'
    raw_dir = 'ai/rawdata'
    model_dir = 'ai/model/models'
    hidden_dim = 600
    latent_dim = 200
    batch_size = 500
    beta = None
    gamma = 0.005
    lr = 5e-4
    n_epochs = 50
    n_enc_epochs = 3
    n_dec_epochs = 1
    not_alternating = False
    seed = 2023
    early_stopping = 5
    total_anneal_steps = 200000
    anneal_cap = 0.2
    wd = 0.00
    log_interval = 100
    save = 'model.pth'
    log_dir = 'ai/model/logs'
    infer_cnt = 20
    


#환결 설정 고정
def fix_seed(seed):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)

def numerize_for_infer(tp, profile2id, show2id):
    uid = tp['handle'].apply(lambda x: profile2id[str(x)])
    sid = tp['solved_problem'].apply(lambda x: show2id[str(x)])
    return pd.DataFrame(data={'uid': uid, 'sid': sid}, columns=['uid', 'sid'])

def load_n_items(dataset):
        unique_sid = list()
        with open(os.path.join(dataset, 'unique_sid.txt'), 'r') as f:
            for line in f:
                unique_sid.append(line.strip())
        n_items = len(unique_sid)
        return n_items

    
device = 'cuda' if torch.cuda.is_available() else 'cpu'

### import raw_data

# 해당 폴더에 rawdata다운 받아서 두기 
raw_data = pd.read_csv(raw_dir + '/solved_problems_pre.csv')
df_problems = pd.read_csv(raw_dir + '/problems_pre.csv')
df_users = pd.read_csv(raw_dir + '/users.csv')
raw_data['solved_problem'] = raw_data['solved_problem'].apply(lambda x: str_to_list(x)) 

### raw_data -> preprocess

# 해당 폴더에 dataset다운 받아서 두기


with open(pro_dir + '/item2id.json', 'r', encoding="utf-8") as f:
    show2id = json.load(f)

with open(pro_dir + '/user2id.json', 'r', encoding="utf-8") as f:
    profile2id = json.load(f)

infer_df = numerize_for_infer(raw_data.explode('solved_problem'), profile2id, show2id)


n_items = load_n_items(pro_dir) #아이템 개수

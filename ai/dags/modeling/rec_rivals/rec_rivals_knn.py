import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors

def remove_self(x):
    if x[0] in x[1]:
        return np.delete(x[1],np.where(x[0]==x[1])[0])
    else:
        return x[1][:6]
    
def rival_knn_main(db):   
    data = pd.read_sql('SELECT * FROM clsss_solved', db)
    print('데이터 로드 완료')
    
    knn = NearestNeighbors(n_neighbors=7, p=2)
    df_data = np.array(data.iloc[:, 1:])
    knn.fit(df_data)
    rival_idx = knn.kneighbors(df_data, return_distance=False)
    print('knn 학습 완료')
    
    result = ([[k, v] for k, v in zip(list(range(len(rival_idx))), rival_idx)])
    df_result = pd.DataFrame(result, columns=['handle', 'rec_rival'])
    df_result[1] = df_result.apply(remove_self, axis=1)
    df_result = df_result[1]
    df_result['rec_rival'] = df_result['rec_rival'].str.strip(",")
    lst_rivals = [','.join(list(data.loc[x, 'handle'])) for x in df_result.index]

    target_users = list(df_data.handle)
    output = pd.DataFrame(target_users, columns=['handle'])
    output['rec_rivals'] = lst_rivals
    output.index += 1
    output.index.name = 'id'
    output.to_csv('/home/sun/airflow/dags/dataset/rec_rival_knn_output.csv')

    print('라이벌 추천 완료!')
    return output
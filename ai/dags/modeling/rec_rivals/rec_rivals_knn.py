import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors

def remove_self(x):
    if x[0] in x[1]:
        return np.delete(x[1],np.where(x[0]==x[1])[0])
    else:
        return x[1][:6]
    
def rival_knn_main():   
    df_data = pd.read_csv('/home/ubuntu/airflow/dags/dataset/class_problems.csv')
    print('데이터 로드 완료')
    
    knn = NearestNeighbors(n_neighbors=7, p=1)
    data= np.array(df_data.iloc[:,1:])
    knn.fit(data)
    rival_idx= knn.kneighbors(data, return_distance=False)
    print('knn 학습 수행 완료!')
    result=([[k,v] for k,v in zip(list(range(len(rival_idx))),rival_idx)])
    df_result= pd.DataFrame(result)
    df_result[1]= df_result.apply(remove_self, axis=1)
    df_result= df_result[1]
    lst_rivals= [','.join(list(df_data['handle'].iloc[x].values)) for x in df_result]
    target_users= list(df_data.handle)

    output = pd.DataFrame(target_users, columns=['handle'])
    output['rec_rivals'] = lst_rivals
    output.to_csv('/home/ubuntu/airflow/dags/dataset/rec_rival_knn_output.csv', index=False)

    print('라이벌 추천 완료!')
    return output
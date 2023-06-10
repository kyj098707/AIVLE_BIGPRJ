import axios from "axios";
import { React, useEffect, useState } from "react";
import { Card } from 'antd';

const apiUrl = "http://localhost:8000/api/team/list/"

export default function GroupRanking() {
    const [groupList, setGroupList] = useState([]);
    const [rank, setRank] = useState(1);
    useEffect(() => {
        const headers = {
        }
        axios.get(apiUrl, { headers: headers })
            .then(response => {
                const { data } = response
                console.log(data)
                setGroupList(data)

            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div className="my_kingdom_all">
            <Card title=" 🔥 전체 킹덤 랭킹" bordered={false} style={{ width: 300 }}>
                
                {groupList.map((group,index) => {
                    const { name, num_members, description, leader } = group
                    const rank = index+1
                    return (
                        <div className="ranking_list">
                        <div className="ranking_num">
                            {rank}
                            </div>
                        <div>
                        <div className="rank_info">
                        <div className="fw-bold"> 팀명 :  {name} </div>
                        <div> 리더 : {leader.username}</div>
                        </div>
                        </div>
                        </div>
                    )
                })}
            </Card>

        </div>
    );

}
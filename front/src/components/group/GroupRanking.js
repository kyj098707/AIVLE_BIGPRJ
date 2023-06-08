import axios from "axios";
import { React, useEffect, useState } from "react";
import { Card } from 'antd';

const apiUrl = "http://localhost:8000/api/team/list/"

export default function GroupList() {
    const [groupList, setGroupList] = useState([]);
    const [rank, setRank] = useState(1);
    useEffect(() => {
        const headers = {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MjAzODQ5LCJpYXQiOjE2ODYxODU4NDksImp0aSI6Ijc2YTMzNmI3YmEzZDQxMzM5YmVhNDY4OWM3YmE2ZjhjIiwidXNlcl9pZCI6M30.QtDX7_n8N_pzFtDTjrhRAD4pwzdzN2d54IGbPl7w5Wg`
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
import axios from "axios";
import { React, useEffect, useState } from "react";
import { Button, Card } from 'antd';

const apiUrl = "http://localhost:8000/api/users/invite/list/"

export default function GroupInvite() {
    const [inviteList, setInviteList] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("access")
            const headers = {
                'Authorization' : `Bearer ${token}`
            }
        axios.get(apiUrl, { headers: headers })
            .then(response => {
                const { data } = response
                setInviteList(data)

            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const inviteClick = (id, e) => {
        const token = localStorage.getItem("access")
            const headers = {
                'Authorization' : `Bearer ${token}`
            }

        axios.post(`http://localhost:8000/api/team/${id}/users/`,{}, { headers: headers })
            .then(response => {
                e.preventDefault();
                window.location.reload();

            })
            .catch(error => {
                console.log(error);
            });
            
    }
    
    return (
        <div className="group_invite_all">
            <Card title=" 📩 그룹 초대장" bordered={false} style={{ width: 300 }}>
                
                {inviteList.map((invite) => {
                    const {team} = invite
                    return (
                        <div className="group_invite_list">
                        <div>
                        <div className="group_info">
                        <div className="fw-bold"> 팀명 : {team.name} </div>
                        <div className="invite_btn"> 
                        <Button size="small" onClick={(e)=>{inviteClick(team.id,e)}}> 수락하기 </Button>
                        </div>
                        </div>
                        </div>
                        </div>
                    )
                })}
            </Card>

        </div>
    );

}
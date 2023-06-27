import axios from "axios";
import { React, useEffect, useState } from "react";
import { Button } from 'antd';
import { SlEnvelopeOpen } from "react-icons/sl";

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
        <div className="group_card invite_card">
            <div className="group_card_title invite_card_title">
                <span>📩 그룹 초대장</span>
            </div>
            <div className="group_card_content invite_card_content">
                {inviteList.length !== 0 ? 
                    (inviteList.map((invite) => {
                        const {team} = invite
                        return (
                            <div className="group_invite_list">
                                <div className="group_info">
                                    <div className="fw-bold">팀명 : {team.name}</div>
                                        <div className="invite_btn"> 
                                        <Button size="small" onClick={(e)=>{inviteClick(team.id,e)}}>수락하기</Button>
                                    </div>
                                </div>
                            </div>
                    )})) : 
                    (
                        <div className="emptyInvites">
                            <SlEnvelopeOpen size={40}/>
                            <span>No invites</span>
                        </div>
                    )}
            </div>
        </div>
    );
}
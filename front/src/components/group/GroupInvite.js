import axios from "axios";
import { React, useEffect, useState } from "react";
import { SlEnvelopeOpen } from "react-icons/sl";
import { AiOutlineCheck } from "react-icons/ai";
import { Domain } from '../Store';

export default function GroupInvite() {
    const [inviteList, setInviteList] = useState([]);

    useEffect(() => {
        const apiUrl = Domain + "users/invite/list/"
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
            });
    }, []);

    const inviteClick = (id, e) => {
        const apiUrl = Domain + `team/${id}/users/`
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        axios.post(apiUrl, {}, { headers: headers })
            .then(response => {
                e.preventDefault();
                window.location.reload();

            })
            .catch(error => {
            });
    }
    
    return (
        <div className="group_card invite_card">
            <div className="group_card_title invite_card_title">
                <span>📩 킹덤 초대장</span>
            </div>
            <div className="group_card_content invite_card_content">
                {inviteList.length !== 0 ? 
                    (
                        <table>
                            <thead>
                                <tr>
                                    <th style={{width: '170px'}}>킹덤명</th>
                                    <th>수락</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inviteList.map((invite, idx) => {
                                    const {team} = invite
                                    let setCNLastTd1 = ''
                                    let setCNLastTd2 = ''

                                    if(idx>1 && inviteList.length === idx+1) {
                                        setCNLastTd1 = 'last-td1'
                                        setCNLastTd2 = 'last-td2'
                                    }
                                    return (
                                        <tr>
                                            <td className={`${setCNLastTd1}`}>
                                                {team.name}
                                            </td>
                                            <td className={`${setCNLastTd2}`}>
                                                <div onClick={(e)=>{inviteClick(team.id,e)}}>
                                                    <AiOutlineCheck/>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="emptyInvites">
                            <SlEnvelopeOpen size={45}/>
                            <span>No invites</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
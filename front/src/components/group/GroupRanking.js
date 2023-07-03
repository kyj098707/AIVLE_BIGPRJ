import axios from "axios";
import { React, useEffect, useState } from "react";
import { Domain } from '../Store';

export default function GroupRanking() {
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        const apiUrl = Domain + "team/list/"
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        axios.get(apiUrl, { headers: headers })
            .then(response => {
                const { data } = response
                setGroupList(data)

            })
            .catch(error => {
            });
    }, []);

    return (
        <div className="group_card my_kingdom_rank">
            <div className="group_card_title my_kingdom_rank_title">
                <span>🔥 킹덤 랭킹</span>
            </div>
            <div className="group_card_content my_kingdom_rank_content">
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '100px'}}>순위</th>
                            <th>킹덤명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList.map((group,idx) => {
                            if(idx > 4) return
                            
                            const { name, num_members, description, leader } = group
                            const rank = idx+1
                            let setCNLastTd1 = ''
                            let setCNLastTd2 = ''

                            if(idx===4) {
                                setCNLastTd1 = 'last-td1'
                                setCNLastTd2 = 'last-td2'
                            }
                            return (
                                <tr>
                                    <td className={`${setCNLastTd1}`}>
                                        {idx<3 ? (<img src={`img/rank_${rank}.gif`} alt={`${rank}`}/>) : (<span>{rank}</span>)}
                                    </td>
                                    <td className={`${setCNLastTd2}`}>
                                        {name}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
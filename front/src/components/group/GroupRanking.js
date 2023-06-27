import axios from "axios";
import { React, useEffect, useState } from "react";

const apiUrl = "http://localhost:8000/api/team/list/"

export default function GroupRanking() {
    const [groupList, setGroupList] = useState([]);
    const [rank, setRank] = useState(1);

    useEffect(() => {
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
                console.log(error);
            });
    }, []);

    return (
        <div className="group_card my_kingdom_rank">
            <div className="group_card_title my_kingdom_rank_title">
                <span>🔥 킹덤 랭킹</span>
            </div>
            <div className="group_card_content my_kingdom_rank_content">
                {groupList.map((group,index) => {
                    if(index > 3) return
                    
                    const { name, num_members, description, leader } = group
                    const rank = index+1
                    return (
                        <div className="ranking_list">
                            <div className="ranking_num">
                                {index<3 ? (<img src={`img/rank_${rank}.gif`} alt={`${rank}`}/>) : (rank)}
                            </div>
                            <div className="rank_info">
                                <div className="fw-bold">{name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
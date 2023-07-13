import '../../scss/group.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Domain, DjangoUrl } from '../Store';

export default function GroupList() {
    const [groupList, setGroupList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = Domain + "team/myteam/"
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
        <>
            {groupList.length !== 0 ? (
                <div className="my_kingdom_list">
                    {groupList.map((group,idx) => {
                        const { team } = group;
                        const { id,name, cur_members,num_members, description, leader,image,solveCnt,workbookCnt,rating_avg } = team

                        const isOdd = idx%2===1 ? '' : 'kbBg'
                        
                        return (
                            <div className={`kingdomBox ${isOdd}`}>
                                <div className='kbTop'>
                                    <span>{name}</span>
                                    <button onClick={()=>navigate('/group/'+id)}>입장하기</button>
                                </div>
                                <div className='kbBottom'>
                                    <div className='kbMark'>
                                        <img src= {`${DjangoUrl}${image}/`} className='' />
                                    </div>
                                    <div className='kbInfo'>
                                        <p>{description}</p>
                                        <ul>
                                            <li><span className='info'>리더</span>{leader.username}</li>
                                            <li><span className='info'>푼 문제 수</span>{solveCnt}</li>
                                            <li><span className='info'>레이팅</span>{rating_avg}</li>
                                            <li><span className='info'>인원</span>{cur_members}/{num_members}</li>
                                            <li><span className='info'>문제집 수</span>{workbookCnt}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className='nothingKingdom'>
                    <img src='/img/nothing_kingdom.png'/>
                    <span>현재 가입한 킹덤이 없습니다.</span>
                </div>
            )}
        </>
    );
}
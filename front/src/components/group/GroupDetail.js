import '../../css/group/group.css'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import axios from 'axios';
import { Menu } from 'antd';
import { Avatar } from 'antd'; 

export default function GroupDetail(){
    const {id} = useParams();
    const apiUrl = `http://localhost:8000/api/team/${id}/`;
    const [teamDetail, setTeamDetail] = useState("");
    const [current, setCurrent] = useState('main');
    const items = [
        {
        //진행상황 보여주기
          label: 'Main',
          key: 'main',
        },
        {
        // 멤버들
          label: 'Member',
          key: 'member',
        },
        {        // 멤버들
          label: 'Problem',
          key: 'problem',
        }
        ,];
    useEffect(() => {
        const headers = {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MzEwMzI2LCJpYXQiOjE2ODYyOTIzMjYsImp0aSI6IjQ3YzJjY2ZiZjE3YjQxODc4OTUxMWUwOWEyM2QxYzMzIiwidXNlcl9pZCI6MX0.vqz834Ni_So0UFwZ_E1WrHQoFEPP1XgaLMw0LV59ZNI`
        }
        axios.get(apiUrl, { headers: headers })
            .then(response => {
                const { data } = response
                console.log(data)
                setTeamDetail(data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };

    return (
        <div className="group_detail_all">
            <div className='detail_menu_bar'>
            
            <Avatar />
            {teamDetail.description}
            <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />;

            </div>
            <div className='detail_contents'>
            {teamDetail.id} 페이지 디테일 페이지입니다
            {teamDetail.description}
            </div>
            
            
        </div>
    );
}
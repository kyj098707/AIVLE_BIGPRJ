import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useState,useEffect } from "react";
import { CrownOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Card, Menu } from 'antd';
import GroupMember from "./GroupMember"
import GroupProblem from './GroupProblem';
import GroupAward from './GroupAward'
import axios from 'axios';

export default function GroupDetail() {
  const { id } = useParams();
  const apiUrl = `http://localhost:8000/api/team/${id}/`;
  const [activeLink, setActiveLink] = useState("");
  const [teamDetail, setTeamDetail] = useState("");
  const [curContent, setCurContent] = useState(0);

  // 유저 정보 불어오기
  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    axios.get(apiUrl, { headers: headers })
        .then(response => {
            const { data } = response
            setTeamDetail(data)
        })
        .catch(error => {
            console.log(error);
        });
  }, []);

  const onClick = (e) => {
    setActiveLink("/"+e)
    switch (e) {
      case "award":
        return setCurContent(1)
      case "problem":
        return setCurContent(2)
      default:
        return setCurContent(0)
    }
  };
  
  return (
    <div className="group_detail_all">

      <div className='detail_sidebar'>
        <Card>
          <div className='detail_avatar'>
            <Avatar size={128} icon={<CrownOutlined />} />
          </div>
          <div className='group_name'>
            <h4>{teamDetail.name}</h4>
          </div>
          <div className='group_description'>
            {teamDetail.description}
          </div>
        </Card>

        <div>
          <ul className='detail_menu'>
            <li onClick={() => onClick("member")}
                className={activeLink === '/member' ? 'active': ''}
            >
              <span>Member</span>
              <div><RightOutlined /></div>
            </li>
            <li onClick={() => onClick("award")}
                className={activeLink === '/award' ? 'active': ''}
            >
              <span>Award</span>
              <div><RightOutlined /></div>
            </li>
            <li onClick={() => onClick("problem")}
                className={activeLink === '/problem' ? 'active': ''}
            >
              <span>Problem</span>
              <div><RightOutlined /></div>
            </li>
          </ul>
        </div>
      </div>

      {
        {
          0: <GroupMember />,
          1: <GroupAward />,
          2: <GroupProblem />
        }[curContent]
      }
      
    </div>

  );
}
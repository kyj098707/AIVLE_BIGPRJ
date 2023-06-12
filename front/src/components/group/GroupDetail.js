import '../../css/group/group.css'
import { useParams } from "react-router-dom";
import { React, useState } from "react";
import {CrownOutlined} from '@ant-design/icons';
import { Avatar, Card, Menu } from 'antd';
import GroupMember from "./GroupMember"
import GroupProblem from './GroupProblem';
import GroupAward from './GroupAward'

export default function GroupDetail() {
  const { id } = useParams();
  const [teamDetail, setTeamDetail] = useState("");
  const [current, setCurrent] = useState('member');
  const [curContent, setCurContent] = useState(0);
  const items = [
    {
      //멤버들
      label: 'Member',
      key: 'member',
    },
    {
      // 랭킹
      label: 'Award',
      key: 'award',
    },
    {
      // 문제
      label: 'Problem',
      key: 'problem',
    }
    ,];
  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
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

        <div className='detail_menu'>
          <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />
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
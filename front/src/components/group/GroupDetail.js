import '../../css/group/group.css'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Table, Menu, Input, Button } from 'antd';


export default function GroupDetail() {
  const { id } = useParams();
  const [member, setMember] = useState([])
  const apiUrl = `http://localhost:8000/api/team/${id}/`;
  const [teamDetail, setTeamDetail] = useState("");
  const [current, setCurrent] = useState('member');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  var users = []
  const items = [
    {
      //멤버들
      label: 'Member',
      key: 'member',
    },
    {
      // 랭킹
      label: 'Ranking',
      key: 'ranking',
    },
    {
      // 문제
      label: 'Problem',
      key: 'problem',
    }
    ,];
  const columns = [
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Solved',
      dataIndex: 'solved',
    },
    {
      title: 'Tier',
      dataIndex: 'tier',
    },
  ];
  const onChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameError("")
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    axios.get(`http://localhost:8000/api/team/14/users/list/`, { headers: headers })
      .then(response => {
        const { data } = response
        setMember(data);
      })
      .catch(error => {
        console.log(error);

      });
    axios.get(apiUrl, { headers: headers })
      .then(response => {
        const { data } = response
        setTeamDetail(data)
      })
      .catch(error => {
        console.log(error);
      });


    // 유저 정보 불어오기
  }, []);
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const inviteMember = (event) => {
    console.log(name, id);
    async function fn() {

      const token = localStorage.getItem("access")
      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const response = await axios.post(`http://localhost:8000/api/team/${id}/invite/`, {
        "name": name
      }, { headers: headers })
      console.log(response)
    }
    fn();
  }
  return (

    <div className="group_detail_all">

      {member.map(m => {
        const { position, solved, user } = m;
        let tmp = { "position": position, "solved": solved, "tier": user.tier, "name": user.username };
        users.push(tmp)
      })}
      <div className='detail_sidebar'>
        <Card>
          <div className='detail_avatar'>
            <Avatar size={128} icon={<UserOutlined />} />
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
      <div className='detail_contents'>
        <div className='add_member'>
          <div className='add_member_input' onChange={onChangeName} >
            <Input placeholder="초대할 사람의 아이디를 입력해주세요" />
          </div>
          <div className='add_member_btn'>
            <Button type="dashed" onClick={inviteMember}> 초대 </Button>
          </div>
        </div>
        <div className='member_table'>
          <Table columns={columns} dataSource={users} />
        </div>
      </div>


    </div>
  );
}
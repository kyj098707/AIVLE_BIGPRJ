import '../../scss/group.scss'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input } from 'antd'
import GroupCreateModal from './GroupCreateModal';
import GroupList from './GroupList'
import GroupInvite from './GroupInvite'
import GroupRanking from './GroupRanking'
import axios from 'axios';

export default function Group() {
  const [createGroupModalOn, setCreateGroupModalOn] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");


  const onChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameError("")
    }
  };

  const requestClick = () => {
    const token = localStorage.getItem("access")
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

    axios.post(`http://localhost:8000/api/team/req/`,{"name":name}, { headers: headers })
        .then(response => {
            console.log(response)

        })
        .catch(error => {
            console.log(error);
        });
        
}

  return (
    <div className='group_all'>
      <GroupCreateModal show={createGroupModalOn} onHide={setCreateGroupModalOn} />
      
      {/* 배너 */}
      <div className='group_div'>
        <img src="img/white_algoking1.png" alt="logo" className="logo2" />
        <div className='group_disciription'>
          <h3>
            알고킹덤에서 다같이 준비하고,
            <br />코딩테스트를 합격해보세요
          </h3>
          <h5>킹덤을 만들어, 다같이 설정한 문제집을 풀고 진행 상황을 체크할 수 있어요
            <br /> 킹덤들끼리 문제를 풀어 상위권 랭킹에도 도전해보세요!
          </h5>
          <Button className='create_kingdom' onClick={() => setCreateGroupModalOn(true)}>알고킹덤 건설</Button>

        </div>
      </div>

      {/* Container */}
      <div className='group_contents_all'>

        {/* remote controller */}
        <div className='group_ranking'>
          <GroupRanking />
          <GroupInvite />
        </div>

        {/* main content */}
        <div className='group_contents'>
          <div className='group_search'>
            <div className='search_member_input' onChange={onChangeName} >
              <Input placeholder="가입할 킹덤의 아름을 입력해주세요" />
            </div>
            <div>
              <Button type="dashed" size='small' onClick={requestClick}> 요청 </Button>
            </div>
          </div>
          <GroupList />
        </div>

      </div>

    </div>
  );
}
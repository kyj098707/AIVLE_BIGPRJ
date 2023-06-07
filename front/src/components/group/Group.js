import React, { useState } from 'react'
import '../../css/group/group.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GroupCreateModal from './GroupCreateModal';

export default function Login() {
    const [createGroupModalOn, setCreateGroupModalOn] = useState(false);



  return (
    
    <div className='group_all'>
        <GroupCreateModal show={createGroupModalOn} onHide={setCreateGroupModalOn}/>
    <div className='group_div'> 
    <img src="img/white_algoking1.png" alt="logo" className="logo2" />
    <div className='group_disciription'>
    <h3>
    알고킹덤에서 다같이 준비하고,
    <br/>코딩테스트를 합격해보세요
    </h3>
    <h5>킹덤을 만들어, 다같이 설정한 문제집을 풀고 진행 상황을 체크할 수 있어요
    <br/> 킹덤들끼리 문제를 풀어 상위권 랭킹에도 도전해보세요!
    </h5>
    <Button className='create_kingdom' onClick={ ()=>setCreateGroupModalOn(true)}>알고킹덤 건설</Button>

    </div>
    </div>
    
    
    </div>
  );
}
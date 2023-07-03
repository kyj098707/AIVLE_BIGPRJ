import React, { useState } from 'react'
import { Input } from 'antd'
import GroupCreateModal from './GroupCreateModal';
import { Domain } from '../Store';
import GroupList from './GroupList'
import axios from 'axios';

// Modal 팝업 관련
import AlertError from '../temp/AlertError';
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// Modal 팝업 관련

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

  const requestClickByName = () => {
    const apiUrl = Domain + `team/req/`
    const token = localStorage.getItem("access")
    const headers = { 'Authorization' : `Bearer ${token}` }

    axios.post(apiUrl ,{"name":name}, { headers: headers })
        .then(response => {
          const {data} = response
          openModal();
          setModalMsg(data.msg);
        })
        .catch(error => {
        });
  }
    // Modal 팝업 관련
    const [isOpen, setIsOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState('에러입니다.');
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
    // Modal 팝업 관련

  return (
    <>
        <GroupCreateModal show={createGroupModalOn} onHide={setCreateGroupModalOn} />
      
        {/* main content */}
        <h3 className="my_kingdom_header">🐊 나의 킹덤</h3>

        <div className='group_controller'>
            <div className='create_kingdom'>
                <button onClick={() => setCreateGroupModalOn(true)}><span>킹덤 건설하기</span></button>
            </div>

            <div className='group_search'>
                <span>킹덤 검색</span>
                <div className='search_member_input' onChange={onChangeName} >
                    <Input placeholder="가입할 킹덤명을 입력해 주세요." />
                </div>
                <button onClick={requestClickByName}>요청 보내기</button>
            </div>
        </div>
        <GroupList />

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={{
            content: {
              width: "285px",
              height: "300px",
              zIndex: "11",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "20px",
              boxShadow: "5px 5px 20px rgba($gray, 10%)",
              overflow: "hidden",
              // backgroundColor:'#B0DB7D' Success일 때,
              backgroundColor:'#EF8D9C',
            },
            overlay: {
              zIndex: 100,
            },
          }}
        >
          <AlertError alertMessage={modalMsg} setIsOpen={setIsOpen} />
        </Modal>
    </>
  );
}
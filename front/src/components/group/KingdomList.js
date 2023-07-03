import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import GroupCreateModal from './GroupCreateModal';
import { Domain } from '../Store';
import GroupList from './GroupList'
import axios from 'axios';

// Modal 팝업 관련
import AlertError from '../temp/AlertError';
import AlertSuccess from '../temp/AlertSuccess';
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// Modal 팝업 관련

export default function Group() {
  const [createGroupModalOn, setCreateGroupModalOn] = useState(false);
  const [kingdomList, setKingdomList] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    const apiUrl = Domain + 'team/list/'
    const token = localStorage.getItem("access")
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.get(apiUrl, { headers: headers })
        .then(response => {
            setKingdomList(response.data);
        })
        .catch(error => {
        });
  }, []);

  // Modal 팝업 관련
  const [isOpen, setIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('에러입니다.');
  const [openType, setOpenType] = useState(true); // true : Success 오픈, false : Error 오픈
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // Modal 팝업 관련


  const onChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameError("")
    }
  };

  const requestClick = (name) => {
    const apiUrl = Domain + 'team/req/'
    const token = localStorage.getItem("access")
    const headers = { 'Authorization' : `Bearer ${token}` }

    axios.post(apiUrl,{"name":name}, { headers: headers })
        .then(response => {
          const {data} = response
          openModal();
          setModalMsg(data.msg);
          {data.result === "error" ? setOpenType(false) : setOpenType(true)}
        })
        .catch(error => {
        });
  }
  const requestClickByName = () => {
    const apiUrl = Domain + 'team/req/'
    const token = localStorage.getItem("access")
    const headers = { 'Authorization' : `Bearer ${token}` }

    axios.post(apiUrl, {"name":name}, { headers: headers })
        .then(response => {
          const {data} = response
          openModal();
          setModalMsg(data.msg);
          {data.result === "error" ? setOpenType(false) : setOpenType(true)}
        })
        .catch(error => {
        });
  }
  return (
    <>
        <GroupCreateModal show={createGroupModalOn} onHide={setCreateGroupModalOn} />
      
        {/* main content */}
        <h3 className="my_kingdom_header">🐊 킹덤리스트</h3>

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

        <table className='kingdomListTable'>
          <thead>
            <tr>
              <th>킹덤명</th>
              <th style={{width:'145px'}}>리더</th>
              <th style={{width:'105px'}}>인원</th>
              <th style={{width:'130px'}}>가입신청</th>
            </tr>
          </thead>

          <tbody>
            {kingdomList.map((item,idx) => {
              const { id,name, num_members, description, leader } = item

              const isOdd = idx%2===1 ? '' : 'klBg'
                
              return (
                <tr className={`item ${isOdd}`}>
                  <td>{name}</td>
                  <td>{leader.username}</td>
                  <td>{num_members}</td>
                  <td>
                    <button onClick={()=>requestClick(name)}>신청하기</button>  
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
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
              backgroundColor: openType ? '#B0DB7D':'#EF8D9C',
            },
            overlay: {
              zIndex: 100,
            },
          }}
        >
          {openType === true ? (<AlertSuccess alertMessage={modalMsg} setIsOpen={setIsOpen} />):(<AlertError alertMessage={modalMsg} setIsOpen={setIsOpen} />)}
          
        </Modal>
    </>
  );
}
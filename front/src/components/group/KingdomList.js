import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import GroupCreateModal from './GroupCreateModal';
import GroupList from './GroupList'
import axios from 'axios';

export default function Group() {
  const [createGroupModalOn, setCreateGroupModalOn] = useState(false);
  const [kingdomList, setKingdomList] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const temp = {

  }

  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.get(`http://localhost:8000/api/team/list/`, { headers: headers })
        .then(response => {
            setKingdomList(response.data);
        })
        .catch(error => {
            console.log(error);
        });
  }, []);


  const onChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameError("")
    }
  };

  const requestClick = () => {
    const token = localStorage.getItem("access")
    const headers = { 'Authorization' : `Bearer ${token}` }

    axios.post(`http://localhost:8000/api/team/req/`,{"name":name}, { headers: headers })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
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
            <button onClick={requestClick}>요청 보내기</button>
          </div>
        </div>

        <table className='kingdomListTable'>
          <thead>
            <tr>
              <th>킹덤명</th>
              <th>리더</th>
              <th>인원</th>
              <th>가입신청</th>
            </tr>
          </thead>

          <tbody>
            {kingdomList.map((item,idx) => {
              const { id,name, num_members, description, leader } = item

              const isOdd = idx%2===1 ? '' : 'klBg'
                
              return (
                <tr className={`item ${isOdd}`}>
                  <td>{name}</td>
                  <td style={{width:'145px'}}>{leader.username}</td>
                  <td style={{width:'105px'}}>{num_members}</td>
                  <td style={{width:'130px'}}>
                    <button>신청하기</button>  
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

    </>
  );
}
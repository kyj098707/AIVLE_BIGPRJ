import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import GroupCreateModal from './GroupCreateModal';
import { Domain } from '../Store';
import GroupList from './GroupList'
import axios from 'axios';

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
            console.log(error);
        });
  }, [])

  const onChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameError("")
    }
  }

  const requestClick = (name) => {
    const apiUrl = Domain + 'team/req/'
    const token = localStorage.getItem("access")
    const headers = { 'Authorization' : `Bearer ${token}` }

    axios.post(apiUrl,{"name":name}, { headers: headers })
        .then(response => {
          const {data} = response
          alert(data.msg)
        })
        .catch(error => {
            console.log(error);
        });
  }

  const requestClickByName = () => {
    const apiUrl = Domain + 'team/req/'
    const token = localStorage.getItem("access")
    const headers = { 'Authorization' : `Bearer ${token}` }

    axios.post(apiUrl, {"name":name}, { headers: headers })
        .then(response => {
          const {data} = response
          alert(data.msg)
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

    </>
  );
}
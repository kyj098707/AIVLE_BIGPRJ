import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useState,useEffect } from "react";
import { CrownOutlined, RightOutlined,EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const showModal = () => {
    setIsModalOpen(true);
};


const handleCancel = () => {
    setIsModalOpen(false);
};

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
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    const token = localStorage.getItem("access")
    const headers = {
        'Authorization' : `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    }
    
    axios.post(`http://localhost:8000/api/team/${id}/upload/`, {selectedImage}, {headers:headers})
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        // 업로드 실패 시 처리할 코드
      });
  };
  
  return (
    <div className="group_detail_all">

      <div className='detail_sidebar'>
        <div className='groupProfile'>
          <div className='detail_avatar'>
            <img src= {`http://localhost:8000${teamDetail.image}/`} className='detail_avatar' />
          </div>
          <button className="detail_edit_btn" onClick={showModal}><EditOutlined /></button>

          <Modal title="킹덤 이미지 변경" open={isModalOpen} onOk={handleImageUpload} onCancel={handleCancel}>
            <div>
              <input type="file" onChange={handleImageChange} />
            </div>
          </Modal>

          <div className='group_name'>
            <h4>{teamDetail.name}</h4>
          </div>

          <div className='group_description'>
            {teamDetail.description}
          </div>
        </div>

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
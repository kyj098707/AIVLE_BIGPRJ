import '../../css/group/group.css'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Avatar, Card, Table, Input, Button, Modal, Badge, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function GroupProblem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workbookList, setWorkbookList] = useState([]);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const { id } = useParams();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createWorkbook = () => {
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const apiUrl = `http://localhost:8000/api/team/${id}/workbook/create/`;
    axios.post(apiUrl, {},{headers:headers})
      .then(response => {
        const {data} = response;
        console.log(data)
        setWorkbookList(data)
      })
      .catch(error => {
        console.log(error)
      })
  };

  return (
    <div className='problem_all'>
      <div>
        <Button onClick={createWorkbook}>
          문제집 추가
        </Button>

      </div>
      <Carousel afterChange={onChange}>
        {
          workbookList && workbookList.map(workbook =>{
            console.log(workbook)
            return (
              <div style={contentStyle}>
                {workbook.id}
                <br/>
                {workbook.title}
              </div>
            );
          })
        }
      </Carousel>
    </div>

  );
}
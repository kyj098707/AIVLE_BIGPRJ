import '../../scss/group.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHref, useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Avatar, Card, Table, Input, Button, Modal, Carousel,Divider,Tag } from 'antd';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function GroupProblem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workbookList, setWorkbookList] = useState([]);
  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');
  const [candiWB, setCandiWB] = useState([]);
  const columns = [
    {
      title: '문제 번호',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '문제 이름',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '티어',
      dataIndex: 'tier',
      key: 'tier',
    },
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
    },
    
  ];
  const closeTag = (problem, e) => {
    e.preventDefault();
    setCandiWB(candiWB.filter(wb => wb.number !== problem.number));
  }
  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeProblem = (event) => {
    setProblem(event.target.value);
  };

  const addProblem = () => {
    let is_duplicated = false;
    candiWB.map(wb=> {
      if (wb.number==problem) is_duplicated=true;
    })
    const apiUrl = `http://localhost:8000/api/workbook/tag/`
    axios.get(apiUrl, { params: {id:problem}})
      .then((response)=>{
        const {data} = response
        if (data != "404"){
          const {id,title,number,color,url} = data
          const problemInfo = {id:id,title:title,number:number,color:color,url:url}
          if (!is_duplicated) {
            setCandiWB([...candiWB,problemInfo])
          }
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/team/${id}/workbook/list/`
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    axios.get(apiUrl, { headers: headers })
      .then(response => {
        const { data } = response
        setWorkbookList(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  

  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#000',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#fff',
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
    console.log(candiWB);
    let problems = []
    candiWB.map(wb => {
      problems.push(wb.id)
    })
    console.log(problems)
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const apiUrl = `http://localhost:8000/api/team/${id}/workbook/create/`;
    axios.post(apiUrl, {name:name,problems:problems}, { headers: headers })
      .then(response => {
        const { data } = response;
        setWorkbookList(data)
        setIsModalOpen(false);
      })
      .catch(error => {
        console.log(error)
      })
  };

  return (
    <div className='workbook-container'>
      <div className='groupDetailTitle'>
          <span>Problem</span>
      </div>

      <div className='add_problem'>
        <div className='collectionProblem'>
          {
            workbookList?.map((workbook, idx) => {
              return(
                <>
                <div className='cpItem'>
                  <span>{workbook.title}</span>
                  <span className='close'>X</span>
                </div>
                </>
              )
            })
          }
        </div>
      
        <button type="dashed" onClick={showModal}
        >
          <span>문제집 추가</span>
        </button>
          {/* <div className='request_badge'>
              <Badge count={numReq} onClick={showModal}>
                  <Avatar shape="square" size="large" icon={<MailOutlined />} />
              </Badge>
              <Modal title="킹덤 가입" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <Card>
                      {
                          reqList && reqList.map(r => {
                              console.log(r);
                              const { user } = r

                              return (
                                  <div className='request_list'>
                                      <div>
                                          <div> 이름 : {user.username} </div>
                                          <div> 티어 : {user.tier} </div>
                                      </div>
                                      <div className='request_btn'>
                                          <Button size="large" onClick={(e) => { requestClick(user.pk, e) }}> 수락하기 </Button>
                                      </div>
                                  </div>
                              );
                          })
                      }
                  </Card>
              </Modal>
          </div> */}
      </div>
      
      <div>
        <Button onClick={showModal}>
          문제집 추가
        </Button>
        <Modal title="문제집 생성"
               open={isModalOpen}
               onCancel={handleCancel}
               footer={[<Button key="submit"
               onClick={createWorkbook}
               type="primary">생성하기</Button>,]}
        >
          <Card>

          문제집 이름
          <div className='workbook_name' onChange={onChangeName} >
              <Input placeholder="문제집 이름" />
          </div>
          
          <div>
            추가할 문제집
            <div className='add_problem' onChange={onChangeProblem}>
            <Input size="small" placeholder="추가할 문제(백준 번호)" />
            </div>
            <Button onClick={addProblem}>추가</Button>
          </div>
          <Divider>문제 추가</Divider>
          {candiWB && candiWB.map(wb => {
            const {id,number,title,color,url} = wb
              return (
              <Tag color={color} closable onClose={(e)=>{closeTag({number},e)}}>{number}. {title}</Tag>
            );
          })}
          </Card>
        </Modal>
      </div>
      
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={8}
        slidesPerView={2}
        // navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        className='workbook-swiper'
      >
        { 
        
          workbookList && workbookList.map(workbook => {
            
            const dataSource = []
            return (
              <SwiperSlide className='workbook-slide'>
              <div style={contentStyle}>
              <Card className='workbook-card'>
                <h3 className='aa'>{workbook.title}</h3>
                <Divider>문제집 리스트</Divider>
                {workbook.problem_list && workbook.problem_list.map(data => {
                  
                  let types = ''
                  {data.problem.type && data.problem.type.map(t => {
                    types = types + " "+t.type.name
                  })}
                  let dataInfo = {title:data.problem.title, tier:data.problem.tier, number:data.problem.number, type:types}
                  dataSource.push(dataInfo)
                })}
                <Table dataSource={dataSource} columns={columns} pagination={false}/>
              
              </Card></div>
              
              </SwiperSlide>
            );
            
          }
          )
        }
</Swiper>
    </div>

  );
}
import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Card, Table, Input, Button, Modal, Divider, Tag } from 'antd';
import { ThreeCircles } from  'react-loader-spinner'
import { ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function GroupProblem() {
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workbookList, setWorkbookList] = useState([]);
  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');
  const [candiWB, setCandiWB] = useState([]);
  const [cpItem, setCpItem] = useState([]);
  const columns = [
    {
      title: '문제 번호',
      dataIndex: 'number',
      key: 'number',
      align: "center",
      width: "135px",
    },
    {
      title: '문제 이름',
      dataIndex: 'title',
      key: 'title',
      align: "center",
    },
    {
      title: '티어',
      dataIndex: 'tier',
      key: 'tier',
      align: "center",
      width: "175px",
    },
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
      align: "center",
      width: "210px",
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
    setLoading(true)
    const apiUrl = `http://localhost:8000/api/team/${id}/workbook/list/`
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }

    axios.get(apiUrl, { headers: headers })
        .then(response => {
          const { data } = response
          setWorkbookList(data)

          let temp = []
          data[0]?.problem_list.map(problem => {
            const { number, title, tier, type } = problem.problem
            

            let tmp = { "number": number, "title": title, "tier": tier, "type": type.slice(0,-1)}
            temp.push(tmp)
          })
          setCpItem(temp)
          setLoading(false)
        })
        .catch(error => {
          console.log(error);
        });
  }, []);
    

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
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createWorkbook = () => {
    if(name===''){
      alert("문제집 이름을 작성해 주세요.")
      return
    }
    if(candiWB.length===0){
      alert("문제를 등록해 주세요.")
      return
    }

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

  const deleteWorkbook = (wid) => {
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const apiUrl = `http://localhost:8000/api/team/${id}/workbook/${wid}/delete/`;
    axios.delete(apiUrl, {}, { headers: headers })
      .then(response => {
        const { data } = response;
        console.log(data)
        setWorkbookList(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const clickedCpItem = (idx) => {
    let temp = []
    workbookList[idx].problem_list.map(problem => {
      const { number, title, tier, type } = problem.problem      
      let tmp = { "number": number, "title": title, "tier": tier, "type": type.slice(0,-1)}
      temp.push(tmp)
    })
    setCpItem(temp)
  }

  const handleRowClick = (row) => {
    window.open(`https://www.acmicpc.net/problem/${row.number}`, '_blank')
  }

  return (
    <div className='workbook-container'>
      <div className='groupDetailTitle'>
          <span>Problem</span>
      </div>

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

      {
        loading ?
        (
          <div className='loading'>
            <ThreeCircles
              height="100"
              width="100"
              color="#75D779"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
            />
            <span>L o a d i n g ...</span>
          </div>
        ) : 
        ( <>
          <div className='add_problem'>
            <div className='collectionProblem'>
              {
                workbookList.length !== 0 ? (
                  workbookList.map((workbook, idx) => {
                    return(
                      <>
                      <div className='cpItem'
                          onClick={()=>clickedCpItem(idx)}
                      >
                        <span>{workbook.title}</span>
                        <span className='close' onClick={()=>deleteWorkbook(workbook.id)}>X</span>
                      </div>
                      </>
                    )
                    })
                ) : (
                  <div className='cpNone'>
                    <span>문제집을 생성해 주세요.</span>
                  </div>
                )
                
              }
            </div>
          
            <button type="dashed" onClick={showModal}>
              <span>문제집 추가</span>
            </button>
          </div>

          {
            <Table
              columns={columns}
              dataSource={cpItem}
              rowClassName={()=>'cpItemRow'}
              onRow={(row, idx)=>({
                onClick: ()=> handleRowClick(row)
              })}
            />
          }
          </>
        )
      }
    </div>
  );
}
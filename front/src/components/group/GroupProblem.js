import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Card, Table, Input, Button, Modal, Divider, Tag } from 'antd';
import { ThreeCircles } from  'react-loader-spinner'
import axios from 'axios';

export default function GroupProblem() {
  const [loading, setLoading] = useState(true)
  const [modalLoading, setModalLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workbookList, setWorkbookList] = useState([]);
  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');
  const [candiWB, setCandiWB] = useState([]);
  const [clickedCpTitle, setClickedCpTitle] = useState('');
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
      sorter: (a, b) => {
        const order = ['UnRating', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
        const tierComparison = order.indexOf(a.mainTier) - order.indexOf(b.mainTier);
        if (tierComparison === 0) {
          const subOrder = ['I', 'II', 'III', 'IV', 'V'];
          return subOrder.indexOf(a.subTier) - subOrder.indexOf(b.subTier);
        }
        return tierComparison;
      },
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
        setProblem('')
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
            let tmp = { 
              "number": number, 
              "title": title, 
              "tier": tier, 
              "type": type.slice(0,-1),
              "mainTier": tier.split(' ')[0], 
              "subTier": tier.split(' ')[1], 
            }
            temp.push(tmp)
          })
          setClickedCpTitle(data[0]?.title)
          setCpItem(temp)
          setLoading(false)
        })
        .catch(error => {
          console.log(error);
        });
  }, []);
    
  const { id } = useParams();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createWorkbook = () => {
    setModalLoading(true)

    if(name===''){
      alert("문제집 이름을 작성해 주세요.")
      return
    }
    if(candiWB.length===0){
      alert("문제를 등록해 주세요.")
      return
    }

    let problems = []
    candiWB.map(wb => {
      problems.push(wb.id)
    })

    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const apiUrl = `http://localhost:8000/api/team/${id}/workbook/create/`;
    axios.post(apiUrl, {name:name,problems:problems}, { headers: headers })
      .then(response => {
        const { data } = response;
        setWorkbookList(data)
        setModalLoading(false)
        setIsModalOpen(false)
        setName('')
        setCandiWB([])
        setClickedCpTitle(name)
        setCpItem(candiWB)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteWorkbook = (wid) => {
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const apiUrl = `http://localhost:8000/api/team/${id}/workbook/${wid}/delete/`;
    axios.delete(apiUrl, {}, { headers: headers })
      .then(response => {
        const { data } = response;
        setWorkbookList(data)
        setClickedCpTitle('')
        setCpItem([])
      })
      .catch(error => {
        console.log(error)
      })
  }

  const clickedCpItem = (idx) => {
    let temp = []
    workbookList[idx].problem_list.map(problem => {
      const { number, title, tier, type } = problem.problem      
      let tmp = { 
        "number": number, 
        "title": title, 
        "tier": tier, 
        "type": type.slice(0,-1),
        "mainTier": tier.split(' ')[0], 
        "subTier": tier.split(' ')[1], 
      }
      temp.push(tmp)
    })
    setClickedCpTitle(workbookList[idx].title)
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

      <Modal 
        title={<span className='gModalTitle'>문제집 생성</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="submit"
                  type="primary"
                  loading={modalLoading}
                  onClick={createWorkbook}
          >생성하기</Button>,]}
      >
        <Card>
          <div className='workbook_name'>
            <span className='cpModal-content-title'>문제집 이름</span>
            <div>
              <Input
                placeholder="문제집 이름"
                onChange={onChangeName}
                value={name}
                style={{ width: '295px' }} 
              />
            </div>
          </div>
          
          <div className='cpModal-add-problem'>
            <span className='cpModal-content-title'>문제 추가</span>
            <div>
              <Input
                placeholder="추가할 문제(백준 번호)"
                onChange={onChangeProblem}
                value={problem}
                style={{ width: '200px' }} 
              />
              <Button 
                type="primary"
                onClick={addProblem}
                style={{ marginLeft: '15px',
                         width: '80px'}}
              >추가</Button>
            </div>
          </div>

          <Divider>추가한 문제</Divider>
          {candiWB && candiWB.map(wb => {
            const {id,number,title,color,url} = wb
              return (
                <Tag
                  color={color}
                  closable
                  onClose={(e)=>{closeTag({number},e)}}
                >
                  <span>{number}. {title}</span>
                </Tag>
              )
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
            <div className='groupCollectionProblem'>
              {
                workbookList.length !== 0 ? (
                  workbookList.map((workbook, idx) => {
                    return(
                      <>
                      <div className='gcpItem'
                          onClick={()=>clickedCpItem(idx)}
                      >
                        <span>{workbook.title}</span>
                        <div className='close' onClick={()=>deleteWorkbook(workbook.id)}>X</div>
                      </div>
                      </>
                    )
                    })
                ) : (
                  <div className='gcpNone'>
                    <span>문제집을 생성해 주세요.</span>
                  </div>
                )
                
              }
            </div>
          
            <button type="dashed" onClick={showModal}>
              <span>문제집 추가</span>
            </button>
          </div>

          <div className='gcpTitle'>
          {
            workbookList.length !== 0 && ( clickedCpTitle )
          }
          </div>

          <Table
            columns={columns}
            dataSource={cpItem}
            showSorterTooltip={false}
            rowClassName={()=>'gcpItemRow'}
            onRow={(row, idx)=>({
              onClick: ()=> handleRowClick(row)
            })}
          />
          
          </>
        )
      }
    </div>
  );
}
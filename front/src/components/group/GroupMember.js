import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import axios from 'axios';
import { MailOutlined } from '@ant-design/icons';
import { SlEnvelopeOpen } from "react-icons/sl";
import { Avatar, Card, Table, Input, Button, Modal, Badge } from 'antd';

export default function GroupMember() {

    const onChangeName = (event) => {
        setName(event.target.value);
        if (event.target.value !== "") {
            setNameError("")
        }
    };
    const { id } = useParams();
    const [member, setMember] = useState([])
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameError, setNameError] = useState('');
    const [numReq, setNumReq] = useState(0);
    const [reqList, setReqList] = useState([]);
    
    var users = []
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const columns = [
        {
            title: '직책',
            dataIndex: 'position',
            align: "center",
        },
        {
            title: '이름',
            dataIndex: 'username',
            align: "center",
        },
        {
            title: '백준 아이디',
            dataIndex: 'boj',
            align: "center",
        },
        {
            title: '푼 문제',
            dataIndex: 'solved',
            align: "center",
        },
        {
            title: '최대 잔디',
            dataIndex: 'streak',
            align: "center",
        },
        {
            title: '레이팅',
            dataIndex: 'rating',
            align: "center",
        },
        {
            title: '티어',
            dataIndex: 'tier',
            align: "center",
        },
    ];
    const modalColumns = [
        {
            title: '아이디',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: '티어',
            dataIndex: 'tier',
            key: 'tier',
            align: 'center',
            width: "145px",
        },
        {
            title: ' ',
            key: 'action',
            align: 'center',
            width: "135px",
            render: (text, record) => (
              <Button onClick={() => requestClick(record.pk)}>수락</Button>
            ),
          },
    ];
    let modalDataSource = []


    const requestClick = (userId, e) => {
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        axios.post(`http://localhost:8000/api/team/${id}/users/${userId}/`, {}, { headers: headers })
            .then(response => {
                console.log(response);
                const { data } = response;
                const { reqs, members } = data;
                setReqList(reqs);
                setMember(members);
                setNumReq(numReq - 1);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        axios.get(`http://localhost:8000/api/team/${id}/users/list/`, { headers: headers })
            .then(response => {
                const { data } = response
                setMember(data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:8000/api/team/${id}/req/list/`, { headers: headers })
            .then(response => {
                const { data } = response
                setNumReq(data.length);
                setReqList(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    const inviteMember = (event) => {
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        axios.post(`http://localhost:8000/api/team/${id}/invite/`, {
            "name": name
        }, { headers: headers })
        .then((response)=>{
            const {data} = response
            alert(data.msg)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
        <>
            {member && member.map(m => {
                console.log(m)
                const { position, solved, user,tier,boj } = m;
                let tmp = { "position": position, "username" : user.username,"boj":boj.name ,"tier": tier,  "streak":boj.streak,"rating":boj.rating,"solved":boj.solved_count};
                users.push(tmp)
            })}

            <div className='groupMembers'>
                <div className='groupDetailTitle'>
                    <span>Member</span>
                </div>

                <p>
                    <span>Total :</span>
                    <span style={{marginLeft:'5px'}}>{member.length}</span>
                </p>

                <div className='add_member'>
                    <span>초대장</span>
                    <div className='add_member_input' onChange={onChangeName} >
                        <Input placeholder="초대할 사람의 아이디를 입력해 주세요" />
                    </div>
                    <button type="dashed" onClick={inviteMember}>
                        <span>보내기</span>
                    </button>
                    
                    <div>
                        <Badge count={numReq} onClick={showModal}>
                            <Avatar shape="square" size="large" icon={<MailOutlined />} />
                        </Badge>
                        <Modal
                            className='gmModal'
                            title={<span className='gModalTitle'>가입 신청 목록</span>}
                            open={isModalOpen}
                            onCancel={handleCancel}
                            width={550}
                            footer={[
                              <Button key="back" onClick={handleCancel}
                              >닫기</Button>
                            ]}
                        >
                            {
                                reqList && reqList.map(r => {
                                    const { pk, username } = r.user
                                    let temp = { "pk": pk, "username": username, "tier": "Platinum III" }
                                    modalDataSource.push(temp)
                                })
                            }
                            {                                    
                                numReq !== 0 ? (
                                    <Table 
                                        dataSource={modalDataSource}
                                        columns={modalColumns}
                                    />
                                ) : (
                                    <Card>
                                        <div className="emptyApply">
                                            <SlEnvelopeOpen size={40}/>
                                            <span>가입 신청자가 없습니다.</span>
                                        </div>
                                    </Card>
                                )
                            }
                        </Modal>
                    </div>
                </div>
                
                <Table columns={columns} dataSource={users} />
            </div>
        </>
    );
}
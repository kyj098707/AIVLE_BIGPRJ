import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import axios from 'axios';
import { MailOutlined } from '@ant-design/icons';
import { Avatar, Card, Table,Input, Button, Modal, Badge } from 'antd';

export default function GroupMember() {

    const onChangeName = (event) => {
        setName(event.target.value);
        if (event.target.value !== "") {
            setNameError("")
        }
    };
    const { id } = useParams();
    const [member, setMember] = useState([])
    const [teamDetail, setTeamDetail] = useState("");
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameError, setNameError] = useState('');
    const [numReq, setNumReq] = useState(0);
    const [reqList, setReqList] = useState([]);
    
    var users = []
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const columns = [
        {
            title: '직책',
            dataIndex: 'position',
        },
        {
            title: '이름',
            dataIndex: 'username',
        },
        {
            title: '백준 아이디',
            dataIndex: 'boj',
        },
        {
            title: '푼 문제',
            dataIndex: 'solved',
        },
        {
            title: '최대 잔디',
            dataIndex: 'streak',
        },
        {
            title: '레이팅',
            dataIndex: 'rating',
        },
        {
            title: '티어',
            dataIndex: 'tier',
        },
    ];


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
        async function fn() {

            const token = localStorage.getItem("access")
            const headers = {
                'Authorization': `Bearer ${token}`
            }

            const response = await axios.post(`http://localhost:8000/api/team/${id}/invite/`, {
                "name": name
            }, { headers: headers })
            console.log(response)
        }
        fn();
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
                    <span></span>
                </p>

                <div className='add_member'>
                    <span>초대장</span>
                    <div className='add_member_input' onChange={onChangeName} >
                        <Input placeholder="초대할 사람의 아이디를 입력해 주세요" />
                    </div>
                    <button type="dashed" onClick={inviteMember}>보내기</button>
                    <div className='request_badge'>
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
                    </div>
                </div>
                
                <div className='member_table'>
                    <Table columns={columns} dataSource={users} />
                </div>
            </div>

        </>
    );
}
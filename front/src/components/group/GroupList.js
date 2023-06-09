import axios from "axios";
import { React, useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import '../../css/group/group.css'
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const apiUrl = "http://localhost:8000/api/team/myteam/"


export default function GroupList() {
    const [groupList, setGroupList] = useState([]);
    useEffect(() => {
        const headers = {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MjAzODQ5LCJpYXQiOjE2ODYxODU4NDksImp0aSI6Ijc2YTMzNmI3YmEzZDQxMzM5YmVhNDY4OWM3YmE2ZjhjIiwidXNlcl9pZCI6M30.QtDX7_n8N_pzFtDTjrhRAD4pwzdzN2d54IGbPl7w5Wg`
        }
        axios.get(apiUrl, { headers: headers })
            .then(response => {
                const { data } = response
                setGroupList(data)

            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div className="my_kingdom_all">
            <h3 className="my_kingdom_header" > 나의 킹덤들</h3>

            {groupList.map(group => {
                const { team } = group;
                const { name, num_members, description, leader } = team
                
                return (
                    <div className="my_kingdom_list">
                        <ListGroup>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold"> 팀명 :  {name} </div>
                                    <div> 각오 : {description} </div>
                                    <div> 리더 : {leader.username}</div>
                                    <div>
                                        <Badge bg="primary" pill>
                                            남은 인원 : {num_members}
                                        </Badge>

                                    </div>

                                </div>
                            
                                <Button variant="outline-primary" >
                                    자세히 보기
                                </Button>

                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )
            })}
        </div>
    );


}
import axios from "axios";
import { React, useEffect, useState } from "react";
import {Card} from "antd"
import Badge from 'react-bootstrap/Badge';
import '../../css/group/group.css'
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8000/api/team/myteam/"


export default function GroupList() {
    const [groupList, setGroupList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const headers = {
            'Authorization': `Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MzEwMzI2LCJpYXQiOjE2ODYyOTIzMjYsImp0aSI6IjQ3YzJjY2ZiZjE3YjQxODc4OTUxMWUwOWEyM2QxYzMzIiwidXNlcl9pZCI6MX0.vqz834Ni_So0UFwZ_E1WrHQoFEPP1XgaLMw0LV59ZNI`
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
            <Card>
            <h3 className="my_kingdom_header" > 🐊 나의 킹덤들</h3>

            {groupList.map(group => {
                const { team } = group;
                const { id,name, num_members, description, leader } = team
                
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
                            
                                <Button variant="outline-primary" onClick={()=>navigate('/group/'+id)}>
                                    자세히 보기
                                </Button>

                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )
            })
            }</Card>
        </div>

    );


}
import { React, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/group/group.css'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const GroupCreateModal = ({ show, onHide }) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [numMembers, setNumMembers] = useState(0);
    const [visibility, setVisibility] = useState(false);
    const [description, setDescription] = useState('')
    const [nameError, setNameError] = useState('');
    const [numMembersError, setNumMembersError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');


    const onChangeName = (event) => {
        setName(event.target.value);
        if (event.target.value !== "") {
            setNameError("")
        }
    };

    const handleVisibility = (event) => {
        setVisibility(!visibility)
    };

    const onChangeNumMembers = (event) => {
        setNumMembers(event.target.value);
        if (event.target.value !== "") {
            setNumMembersError("")
        }
    };

    const onChangeDescripiton = (event) => {
        setDescription(event.target.value);
        if (event.target.value !== "") {
            setDescriptionError("")
        }
    };

    const onFinish = (event) => {
        

        // jwt 추가 해야할 부분
        // `Bearer ${token}`
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        axios.post("http://localhost:8000/api/team/create/", {
            "name" : name,
            "num_members" : numMembers,
            "description" : description,
            "visibility" : visibility
        },{headers:headers})
        .then(response => {
            const {data} = response
            if (data.result == "error"){
                alert(data.msg);
            }
            else {window.location.reload();}
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        알고킹덤 건설
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="logoForm">
                        <img src="img/algoking2.png" alt="logo" className="group_create_logo" />
                    </Form.Group>


                    <Form>
                        <Form.Group>
                            <Form.Label>킹덤 이름</Form.Label>
                            <Form.Control name="title" type="text" placeholder="킹덤 이름" onChange={onChangeName} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>허용 인원</Form.Label>
                            <Form.Control type="number" placeholder="인원수" onChange={onChangeNumMembers} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>킹덤 설명</Form.Label>
                            <Form.Control type="text" placeholder="최강의 킹덤" onChange={onChangeDescripiton} />
                        </Form.Group>

                        <Form className="group_create_visibility">
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                onChange={handleVisibility}

                                label="공개여부"
                            />
                        </Form>

                    </Form>
                </Modal.Body>
                <Modal.Footer className="group_create_footer">
                    <Button variant="outline-success" type="button" size="lg"
                        onClick={onFinish}
                    >
                        생성
                    </Button>
                </Modal.Footer>
            </Container>
        </Modal>

    );

}

export default GroupCreateModal
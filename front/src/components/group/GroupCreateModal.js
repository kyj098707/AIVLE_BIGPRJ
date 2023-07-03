import { React, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/group.scss'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Domain } from '../Store';

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
        const apiUrl = Domain + 'team/create/'
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        axios.post(apiUrl, {
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
        })
        .catch(error => {
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
            <Container className='modal-container' style={{padding:'0', borderRadius:'15%'}}>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {/* <img src="img/kingdom-logo.png" alt="" style={{backgroundColor:'black', width:'100px', height:'100px'}}/> */}
                        알고킹덤
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div className='modal-body-border'>
                        <Form.Group className="logoForm">
                            {/* <img src="img/modal-flag-img.png" alt="logo" className="group_create_logo" /> */}
                            <img src="img/kingdom-main.png" style={{width:'400px', height:'400px'}} alt="logo" className="group_create_logo" />
                            <h2>킹덤 생성 정보</h2>
                            <p>킹덤을 만드시려면 아래 정보를 입력한 후 [ 킹덤 생성 ] 버튼을 눌러주세요.</p>
                        </Form.Group>
                        


                        <Form className='modal-submit-form'>
                            <Form.Group className='modal-submit-form-group'>
                                <Form.Label className='modal-submit-form-label'>킹덤 이름</Form.Label>
                                <Form.Control name="title" type="text" onChange={onChangeName} 
                                    style={{width:'50%', backgroundColor:'black', color:'white', border:'1.5px solid #394444', boxShadow:'5px 5px 15px #394444'}}/>
                            </Form.Group>
                            {/* <p style={{padding:'0'}}>apsfdlspdflpsdfl</p> */}

                            <Form.Group className='modal-submit-form-group'>
                                <Form.Label className='modal-submit-form-label'>허용 인원</Form.Label>
                                <Form.Control type="number" onChange={onChangeNumMembers} 
                                    style={{width:'50%', backgroundColor:'black', color:'white', border:'1.5px solid #394444', boxShadow:'5px 5px 15px #394444'}}/>
                            </Form.Group>
                            
                            <Form.Group className='modal-submit-form-group'>
                                <Form.Label className='modal-submit-form-label'>킹덤 설명</Form.Label>
                                <Form.Control type="text" onChange={onChangeDescripiton} 
                                    style={{width:'50%', backgroundColor:'black', color:'white', fontFamily:'Pretendard-Regular', border:'1.5px solid #394444', boxShadow:'5px 5px 15px #394444'}}/>
                            </Form.Group>
                            <Form className="group_create_visibility">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    onChange={handleVisibility}
                                    className='modal-submit-form-label'
                                    label="공개여부"
                                    style={{color:'rgb(230, 230, 230)'}}
                                />
                            </Form>

                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer" style={{backgroundColor:'#121A20', padding:'0', justifyContent:'center'}}>
                    <Button variant="dark" type="button" size="lg"
                        onClick={onFinish}
                        style={{color:'#8a7263', width:'25%', border:'1px solid gray', boxShadow:'5px 5px 15px #394444', fontFamily:'Pretendard-Regular'}}
                    >
                        킹덤 생성
                    </Button>
                </Modal.Footer>
            </Container>
        </Modal>

    );

}

export default GroupCreateModal
import LoadingModal from './Loading';
import React, { useState } from 'react';
import { Button, Col, Row, Form, Input, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Domain } from '../Store';
import '../../scss/Register.scss'

// Modal 팝업 관련
import AlertError from '../temp/AlertError';
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// Modal 팝업 관련


export default function Register() {
  const [bjValid, setBjValid] = useState("확인하기");
  const [extraMessage, setExtraMessage] = useState("");
  const [form] = Form.useForm();
  const onFinish = (values) => {
  };

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bojId, setBojId] = useState('없는백준');
  const [bio, setBio] = useState('자기 소개를 등록해주세요');
  const [verifyLoading, setverifyLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeBOJ = (e) => {
    setBojId(e.target.value);
    setBjValid("확인하기");
    setExtraMessage("");
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }
  
  const onChangePass = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!bio) {setBio("자기소개를 등록해주세요")}
    if (!bojId) {setBojId("임시백준")}
    
    const apiUrl = Domain + 'join/'
    axios.post(apiUrl, {
      'email': email,
      'username': username,
      'password': password,
      'bio': bio,
      'boj': bojId,
    })
      .then(response => {
        const {data} = response
        if (data.validation) {
          navigate("/login");
        }
        else {
          openModal();
          setModalMsg(data.message.toString()); // 객체를 문자열로 변경
          setLoading(false)
        } 
      })
      .catch(error => {
        openModal();
        setModalMsg(error.toString()); // 객체를 문자열로 변경
      })
  }

  const verifyBOJ = () => {
    setverifyLoading(true)
    const apiUrl = Domain + 'boj/verify/'
    axios.post(apiUrl, { "boj": bojId })
      .then(response => {
        const { data } = response;
        if (data.result == "complete") {
          setExtraMessage(data.message);
          setBjValid("인증 완료");
        }
        else {
          setExtraMessage(data.message);
        }
        setverifyLoading(false)
      })
      .catch(error => {
      })
  }

  // Modal 팝업 관련
  const [isOpen, setIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('에러입니다.');
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // Modal 팝업 관련

  return (
    <div className='register_wrap'>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
          content: {
            width: "285px",
            height: "300px",
            zIndex: "11",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            boxShadow: "5px 5px 20px rgba($gray, 10%)",
            overflow: "hidden",
            // backgroundColor:'#B0DB7D' Success일 때,
            backgroundColor:'#EF8D9C',
          },
          overlay: {
            zIndex: 100,
          },
        }}
      >
        <AlertError alertMessage={modalMsg} setIsOpen={setIsOpen} />
      </Modal>
      
      <h1>회원가입</h1>
      <Card bordered={true} style={{ border:'1px solid rgb(240, 240, 240)', boxShadow:'3px -1px 15px 8px rgb(248, 248, 248)'}}
      >
        <Form
          form={form}
          layout="vertical"
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="nickname"
            label="아이디"
            rules={[
              {
                required: true,
                message: '아이디를 입력해 주세요.',
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length ==0 || (value.length >= 2 && value.length <= 9)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('2~9자 이내로 입력해 주세요.'));
                },
              }),
            ]}
          >
            <Input value={username} size='large' onChange={onChangeUsername} />
          </Form.Item>

          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해 주세요.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length === 0 || value.length > 7) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('너무 짧습니다. 8자 이상 입력해 주세요.'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password value={password} size='large' onChange={onChangePass} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="비밀번호 확인"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호 확인을 입력해 주세요.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                },
              }),
            ]}
          >
            <Input.Password  size='large'/>
          </Form.Item>

          <Form.Item
            name="email"
            label="이메일"
            rules={[
              {
                type: 'email',
                message: '이메일 형식을 확인해 주세요.',
              },
              {
                required: true,
                message: '이메일을 입력해 주세요.',
              },
            ]}
          >
            <Input value={email} size='large' onChange={onChangeEmail} />
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="nickname2"
                  label="백준 ID"
                  extra={<div className="customFormExtra">{extraMessage}</div>}
                  tooltip="백준 아이디를 등록하셔야 AI를 기반으로 한 추천 서비스를 이용하실 수 있습니다."
                  rules={[
                    {
                      required: true,
                      message: '백준 ID를 입력해 주세요.',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input className='nickname2' size='large' onChange={onChangeBOJ} />
                </Form.Item>
              </Col>
              <Col>
                <Button className='verifyBOJ-btn' size='large' onClick={verifyBOJ} loading={verifyLoading}>{bjValid}</Button>
              </Col>
            </Row>
          </Form.Item>

          <Button type="primary" htmlType="submit" onClick={handleSubmit} loading={loading}
          >회원가입</Button>
          <LoadingModal></LoadingModal>
        </Form>
      </Card>
    </div>
  );
};

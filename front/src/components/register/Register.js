import React, { useState } from 'react';
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, Card } from 'antd';
import { Upload } from 'antd';
import '../../scss/Register.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Modal 팝업 관련
import AlertError from '../temp/AlertError';
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// Modal 팝업 관련

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


export default function Register() {
  const [bjValid, setBjValid] = useState("확인하기");
  const [extraMessage, setExtraMessage] = useState("");
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bojId, setBojId] = useState('없는백준');
  const [bio, setBio] = useState('자기 소개를 등록해주세요');
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeBOJ = (e) => {
    setBojId(e.target.value);
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangeBio = (e) => {
    setBio(e.target.value);
  }
  const onChangePass = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bio) {setBio("자기소개를 등록해주세요")}
    if (!bojId) {setBojId("임시백준")}
    axios.post('http://localhost:8000/api/join/', {
      'email': email,
      'username': username,
      'password': password,
      'bio': bio,
      'boj': bojId,
    })
      .then(response => {
        const {data} = response
        console.log(data)
        if (data.validation) {
          navigate("/login");
        }
        else {
          // alert(data.message)
          openModal();
          setModalMsg(data.message.toString()); // 객체를 문자열로 변경
        } 
      })
      .catch(error => {
        // alert(error)
        openModal();
        setModalMsg(error.toString()); // 객체를 문자열로 변경
      })
  }



  const verifyBOJ = () => {

    axios.post('http://localhost:8000/api/boj/verify/', { "boj": bojId })
      .then(response => {
        const { data } = response;
        if (data.result == "complete") {
          setExtraMessage(data.message);
          setBjValid("인증 완료");
        }
        else {
          setExtraMessage(data.message);
          setBjValid("다시 등록");
        }
        console.log(response)
      })
      .catch(error => {
        console.log(error)
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
      
      <Card title="회원가입" bordered={false} style={{ width: "100%" }}
      >
      
        <Form
          {...formItemLayout}
          form={form}
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
                message: 'Please input your Username!',
                whitespace: true,
              },
            ]}
          >
            <Input value={username} onChange={onChangeUsername} />
          </Form.Item>

          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password value={password} onChange={onChangePass} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="비밀번호 확인"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="email"
            label="이메일"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input value={email} onChange={onChangeEmail} />
          </Form.Item>



          <Form.Item
            name="nickname2"
            label="백준 ID"
            extra={extraMessage}
            tooltip="백준 아이디를 등록하시면 더 많은 서비스를 이용해보실 수 있습니다. 등록된 백준문제인지 확인해보세요!"
            rules={[
              {
                required: true,
                message: 'Please input your 백준 ID!',
                whitespace: true,
              },
            ]}
          >
            <Input style={{ width: "60%" }} onChange={onChangeBOJ} />
            <Button onClick={verifyBOJ}>{bjValid}</Button>
          </Form.Item>

          <Form.Item
            name="intro"
            label="자기소개"
            rules={[
              {
                required: false,
                message: 'Please input Intro',
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} onChange={onChangeBio} />
          </Form.Item>



          <Form.Item {...tailFormItemLayout}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit" onClick={handleSubmit}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};


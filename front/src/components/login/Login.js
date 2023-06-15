import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Card } from 'antd';
import axios from 'axios';
import { useStore } from '../Store';

// import '../../css/login/login.css';
import '../../scss/Login.scss';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isLoginTrue } = useStore();

  const onChangeId = (e) => {
    setId(e.target.value);
  }

  const onChangePass = (e) => {
    setPassword(e.target.value);
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('로그인 함수 호출');
    console.log(id, password);

    await axios.post('http://localhost:8000/api/login/', {
      'username': id,
      'password': password
    })
    .then(response => {
      alert("로그인이 완료되었습니다.");
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("email", response.data.email);
      isLoginTrue()
      navigate("/");
    })
    .catch(error => {
      alert(error);
    })
  }

  return(
    
    <div className='login_wrap'>
      <Card title="로그인" bordered={false} style={{ width: 300 }} className='login_card'>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className="input_login_wrap">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={id} onChange={onChangeId} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePass}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          {/* onClick={handleSubmit} */}
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}> 
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </div>
    </Form>
    </Card>
    </div>
    
  );
}

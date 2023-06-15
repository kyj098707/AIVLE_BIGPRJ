import React, { useState } from 'react';
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select,Card} from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import '../../scss/Register.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [bjValid, setBjValid] = useState("인증요청");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangePass = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(email, username, password)
    // await axios.post('http://localhost:8000/api/join/', {
    //   'email': email,
    //   'username': username,
    //   'password': password
    // })
    // .then(response => {
    //   alert("회원가입이 완료되었습니다.");
    //   navigate("/login");
    // })
    // .catch(error => {
    //   alert(error);
    // })
  }
  
  // 사진 업로드
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className='register_wrap'>
      <Card title="회원가입" bordered={false} style={{ width: "100%" }}>
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
        <Input.Password value={password} onChange={onChangePass}/>
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
        tooltip="백준 아이디를 등록하시면 더 많은 서비스를 이용해보실 수 있습니다. 또한 추후에 <Problem> 카테고리에서 등록이 가능합니다."
        rules={[
          {
            required: false,
            message: 'Please input your 백준 ID!',
            whitespace: true,
          },
        ]}
      >
        <Input style={{width:"60%"}}/>
        <Button>{bjValid}</Button>
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
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      
      <Form.Item label="프로필 이미지">
        <ImgCrop rotationSlider>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </Form.Item>
      

      <Form.Item {...tailFormItemLayout}>
        <Button style={{width:"100%"}} type="primary" htmlType="submit" onClick={handleSubmit}>
          Register
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </div>
  );
};


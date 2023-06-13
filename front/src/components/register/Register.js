import React, { useState } from 'react';
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select} from 'antd';
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
    
    await axios.post('http://localhost:8000/api/join/', {
      'email': email,
      'username': username,
      'password': password
    })
    .then(response => {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    })
    .catch(error => {
      alert(error);
    })
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
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
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
        name="password"
        label="Password"
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
        label="Confirm Password"
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
        name="nickname"
        label="Username"
        tooltip="What do you want others to call you?"
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
        name="nickname2"
        label="백준 ID"
        // tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
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
        label="Intro"
        rules={[
          {
            required: true,
            message: 'Please input Intro',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      
      <Form.Item label="Profile">
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
    </div>
  );
};






// // import '../../css/register/register.css'
// import '../../scss/Register.scss';
// import axios from 'axios';


// // 사진 업로드 
// import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';

// export default function Register() {

//   const [id, setId] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // error 처리
//   const [idError, setIdError] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');

//   // --- 사진 업로드 시작 --- 
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//   ]);
//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };
//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };
//   // --- 사진 업로드 끝 --- 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('회원가입 함수 호출');
//     console.log(id, username, password);

    

//     {await axios.post('http://localhost:8000/api/join/', {
//       'email': id,
//       'username': username,
//       'password': password
//     })
//     .then(response => {
//       console.log(response.data);
//       alert("로그인이 완료되었습니다.")
//     })
//     .catch(error => {
//       console.log(error);
//     })}
    
//   };

//   const onChangeid = (event) => {
//     setId(event.target.value);
//     if(event.target.value !== "") {
//       setIdError("")
//     }
//   };

//   const onChangeUsername = (event) => {
//     setUsername(event.target.value);
//     if(event.target.value !== "") {
//       setUsernameError("")
//     }
//   };

//   const onChangePassword = (event) => {
//     setPassword(event.target.value);
//     if(event.target.value !== "") {
//       setPasswordError("")
//     }
//   };

//   const onChangeConfirmPassword = (event) => {
//     setConfirmPassword(event.target.value);
//     if(event.target.value !== "") {
//       setConfirmPasswordError("")
//     }
//   }

//   const validInputs = () => {
//     let isValid = true;
//     if (!id) {
//         setIdError("아이디를 입력해주세요")
//         isValid=false;
//     }
//     if (!username) {
//         setUsernameError("이름을 입력해주세요")
//         isValid=false;
//     }
//     if (!password) {
//         setPasswordError("비밀번호를 입력해주세요")
//         isValid=false;
//     }
//     if (!confirmPassword) {
//         setConfirmPasswordError("비밀번호를 입력해주세요")
//         isValid=false;
//     }
//     if (password !== confirmPassword) {
//         setConfirmPasswordError("비밀번호가 맞지 않습니다")
//         isValid=false;
//     }
//     return isValid
//   };

  
//   return (
//     <div className="register">
//       <div className="register__content">
//         {/* <div className="register__img">
//           <img src="https://image.freepik.com/free-vector/code-typing-concept-illustration_114360-3581.jpg" alt="user register" />
//           <img src={Logo} alt="user register" />
//         </div> */}
//         <div className="register__forms">
//           {/* register form */}
//           <form onSubmit={handleSubmit} className="register__register" id="register-in"> {/* action="" */}
//             <h1 className="register__title">회원가입</h1>
//             <div className="register__box">
//               <i className='bx bx-user register__icon'></i>
//               <input type="text" placeholder="Email" value={id} onChange={onChangeid} className="register__input" />
//             </div>
//             <div className='register_error'>{idError}</div> {/* Email error */}

//             <div className="register__box">
//               <i className='bx bx-lock register__icon'></i>
//               <input type="text" placeholder="Username" value={username} onChange={onChangeUsername} className="register__input" />
//             </div>
//             <div className='register_error'>{usernameError}</div> {/* Paswword error */}

//             <div className="register__box">
//               <i className='bx bx-lock register__icon'></i>
//               <input type="password" placeholder="Password" value={password} onChange={onChangePassword} className="register__input" />
//             </div>
//             <div className='register_error'>{passwordError}</div> {/* Paswword error */}

//             <div className="register__box">
//               <i className='bx bx-lock register__icon'></i>
//               <input type="password" placeholder="Password" value={confirmPassword} onChange={onChangeConfirmPassword} className="register__input" />
//             </div>
//             <div className='register_error'>{confirmPasswordError}</div> {/* Paswword error */}

//             {/* 프로필 사진 업로드 */}
//             <div className="register__box">
//               <ImgCrop rotationSlider>
//                 <Upload
//                   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                   listType="picture-card"
//                   fileList={fileList}
//                   onChange={onChange}
//                   onPreview={onPreview}
//                 >
//                   {fileList.length < 5 && '+ Upload'}
//                 </Upload>
//               </ImgCrop>
//             </div>

//             <a href="#" className="register__forgot">Forgot Password? </a> {/* tbd : nav.link 또는 router로 바꿔 */}
//             <button onSubmit={handleSubmit} className='register__button'>Sign In</button> {/* tbd : nav.link 또는 router로 바꿔 */}
//             <div>
//               <span className="register__account register__account--account">Don't Have an Account?</span> {' '}
//               <span className="register__signin register__signin--signup" id="sign-up">Sign Up</span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
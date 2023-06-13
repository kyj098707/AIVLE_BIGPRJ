import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../css/login/login.css';
import axios from 'axios';
import '../../scss/Login.scss';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e) => {
    setId(e.target.value);
  }

  const onChangePass = (e) => {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const navigate = useNavigate();

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
      navigate("/");
    })
    .catch(error => {
      alert(error);
    })
  }

<<<<<<< HEAD
  return(
    <div className='login_wrap'>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
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
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
=======
    //   } else {
    //       console.log('로그인 실패', response.data);
    //   }
    // } catch (e) {
    //     console.log('로그인 실패', e)
    // };
// 임시저장내용
    if(validInputs()) {
      await axios.post('http://localhost:8000/api/login/', {
        'username': id,
        'password': password
      })
      .then(response => {
        console.log(response.data);

        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("email", response.data.email);

        navigate("/")
      })
      .catch(error => {
        alert("아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.")
        console.log(error);
      })
    }

    
  };

  const onChangeid = (event) => {
    setId(event.target.value);
    // console.log('변경되고있다.')
    if(event.target.value !== "") {
      setIdError("")
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    // console.log('비번도 되고있다.')
    
    if(event.target.value !== "") {
      setPasswordError("")
    }
  };

  const validInputs = () => {
    let isValid = true;
    if (!id) {
        setIdError("아이디를 입력해주세요")
        isValid=false;
    }
    if (!password) {
        setPasswordError("비밀번호를 입력해주세요")
        isValid=false;
    }
    return isValid
  };

  return (
    // <div className='login_all'>
    //   <div className="login_div">
    //     <h2>ALGOKING</h2>
    //     <h4>로그인</h4>
    //   </div>

    //   <form onSubmit={handleSubmit}>
    //     <div className="login_ui">
    //       <h5>아이디</h5>
    //       <input
    //         type="text"
    //         value={id}
    //         onChange={onChangeid}
    //         placeholder="input email"
    //       />
    //       <div className="login_error">{idError}</div>
    //     </div>

    //     <div className="login_ui">
    //       <h5>비밀번호</h5>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={onChangePassword}
    //         placeholder="input password"
    //       />
    //       <div className="login_error">{passwordError}</div>
    //     </div>

    //     <div className="login_ui">
    //       <button type='submit'>로그인</button>
    //     </div>
    //   </form>
    // </div>

    
    <div className="login">
      <div className="login__content">
        {/* <div className="login__img">
          <img src="https://image.freepik.com/free-vector/code-typing-concept-illustration_114360-3581.jpg" alt="user login" />
          <img src={Logo} alt="user login" />
        </div> */}
        <div className="login__forms">
          {/* login form */}
          <form onSubmit={handleSubmit} className="login__register" id="login-in"> {/* action="" */}
            <h1 className="login__title">Sign In</h1>
            <div className="login__box">
              <i className='bx bx-user login__icon'></i>
              <input type="text" placeholder="Username" value={id} onChange={onChangeid} className="login__input" />
            </div>
            <div className='login_error'>{idError}</div> {/* Email error */}

            <div className="login__box">
              <i className='bx bx-lock login__icon'></i>
              <input type="password" placeholder="Password" value={password} onChange={onChangePassword} className="login__input" />
            </div>
            <div className='login_error'>{passwordError}</div> {/* Paswword error */}

            <a href="#" className="login__forgot">Forgot Password? </a> {/* tbd : nav.link 또는 router로 바꿔 */}
            <button onSubmit={handleSubmit} className='login__button'>Sign In</button> {/* tbd : nav.link 또는 router로 바꿔 */}
            <div>
              <span className="login__account login__account--account">Don't Have an Account?</span> {' '}
              <span className="login__signin login__signin--signup" id="sign-up">Sign Up</span>
            </div>
          </form>
          {/* create account form
          <form action="" className="login__create none" id="login-up">
            <h1 className="login__title">Create Account</h1>
            <div className="login__box">
              <i className='bx bx-user login__icon'></i>
              <input type="text" placeholder="Username" className="login__input" />
            </div>
            <div className="login__box">
              <i className='bx bx-at login__icon'></i>
              <input type="email" placeholder="Email" className="login__input" />
            </div>
            <div className="login__box">
              <i className='bx bx-lock login__icon'></i>
              <input type="password" placeholder="Password" className="login__input" />
            </div>
            <a href="#" className="login__button">Sign Up</a> 
            <div>
              <span className="login__account login__account--account">Already have an Account?</span>
              <span className="login__signup login__signup--signup" id="sign-in">Sign In</span>
            </div>

            소셜 로그인 필요하면 손봐
            <div className="login__social">
              <a href="#" className="login__social--icon"><i className='bx bxl-facebook'></i></a>
              <a href="#" className="login__social--icon"><i className='bx bxl-twitter'></i></a>
              <a href="#" className="login__social--icon"><i className='bx bxl-google'></i></a>
              <a href="#" className="login__social--icon"><i className='bx bxl-github'></i></a>
            </div>
          </form> */}
        </div>
      </div>
>>>>>>> 6de5af9e5b6cb4c2deeb2de56ea55b09ab95b02a
    </div>
  );
}

// export default function Login() {
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');

//   const [idError, setIdError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('로그인 함수 호출')
    
//     if(validInputs()) {
//       await axios.post('http://localhost:8000/api/login/', {
//         'username': id,
//         'password': password
//       })
//       .then(response => {
//         console.log(response.data);
//         alert("로그인이 완료되었습니다.");

//         localStorage.setItem("access", response.data.access);
//         localStorage.setItem("refresh", response.data.refresh);
//       })
//       .catch(error => {
//         console.log(error);
//       })
//     }

    
//   };

//   const onChangeid = (event) => {
//     setId(event.target.value);
//     // console.log('변경되고있다.')
//     if(event.target.value !== "") {
//       setIdError("")
//     }
//   };

//   const onChangePassword = (event) => {
//     setPassword(event.target.value);
//     // console.log('비번도 되고있다.')
    
//     if(event.target.value !== "") {
//       setPasswordError("")
//     }
//   };

//   const validInputs = () => {
//     let isValid = true;
//     if (!id) {
//         setIdError("아이디를 입력해주세요")
//         isValid=false;
//     }
//     if (!password) {
//         setPasswordError("비밀번호를 입력해주세요")
//         isValid=false;
//     }
//     return isValid
//   };

//   return (
//     <div className="login">
//       <div className="login__content">
//         {/* <div className="login__img">
//           <img src="https://image.freepik.com/free-vector/code-typing-concept-illustration_114360-3581.jpg" alt="user login" />
//           <img src={Logo} alt="user login" />
//         </div> */}
//         <div className="login__forms">
//           {/* login form */}
//           <form onSubmit={handleSubmit} className="login__register" id="login-in"> {/* action="" */}
//             <h1 className="login__title">Sign In</h1>
//             <div className="login__box">
//               <i className='bx bx-user login__icon'></i>
//               <input type="text" placeholder="Username" value={id} onChange={onChangeid} className="login__input" />
//             </div>
//             <div className='login_error'>{idError}</div> {/* Email error */}

//             <div className="login__box">
//               <i className='bx bx-lock login__icon'></i>
//               <input type="password" placeholder="Password" value={password} onChange={onChangePassword} className="login__input" />
//             </div>
//             <div className='login_error'>{passwordError}</div> {/* Paswword error */}

//             <a href="#" className="login__forgot">Forgot Password? </a> {/* tbd : nav.link 또는 router로 바꿔 */}
//             <button onSubmit={handleSubmit} className='login__button'>Sign In</button> {/* tbd : nav.link 또는 router로 바꿔 */}
//             <div>
//               <span className="login__account login__account--account">Don't Have an Account?</span> {' '}
//               <span className="login__signin login__signin--signup" id="sign-up">Sign Up</span>
//             </div>
//           </form>
//           {/* create account form
//           <form action="" className="login__create none" id="login-up">
//             <h1 className="login__title">Create Account</h1>
//             <div className="login__box">
//               <i className='bx bx-user login__icon'></i>
//               <input type="text" placeholder="Username" className="login__input" />
//             </div>
//             <div className="login__box">
//               <i className='bx bx-at login__icon'></i>
//               <input type="email" placeholder="Email" className="login__input" />
//             </div>
//             <div className="login__box">
//               <i className='bx bx-lock login__icon'></i>
//               <input type="password" placeholder="Password" className="login__input" />
//             </div>
//             <a href="#" className="login__button">Sign Up</a> 
//             <div>
//               <span className="login__account login__account--account">Already have an Account?</span>
//               <span className="login__signup login__signup--signup" id="sign-in">Sign In</span>
//             </div>

//             소셜 로그인 필요하면 손봐
//             <div className="login__social">
//               <a href="#" className="login__social--icon"><i className='bx bxl-facebook'></i></a>
//               <a href="#" className="login__social--icon"><i className='bx bxl-twitter'></i></a>
//               <a href="#" className="login__social--icon"><i className='bx bxl-google'></i></a>
//               <a href="#" className="login__social--icon"><i className='bx bxl-github'></i></a>
//             </div>
//           </form> */}
//         </div>
//       </div>
//     </div>
//   );
// }


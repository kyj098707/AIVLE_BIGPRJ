import React, { useState } from 'react';
// import '../../css/login/login.css';
import axios from 'axios';
import '../../scss/Login.scss';
// import {Logo} from './temp.png';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('로그인 함수 호출')
    
    // if(validInputs()){
    //   await axios.post('http://localhost:8000/api/login/', {
    //     'usename': id,
    //     'password': password,    
    // })
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.log(response);
    // })

    // try {
    //   const response = await axios.post('http://localhost:8000/api/login/', {
    //       'username': id,
    //       'password': password,
    //   });
    //   if (response.status === 200) {
    //       console.log('로그인 성공', response.data);
    //       alert("로그인이 완료되었습니다.");

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
        alert("로그인이 완료되었습니다.");

        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
      })
      .catch(error => {
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
    </div>
  );
}
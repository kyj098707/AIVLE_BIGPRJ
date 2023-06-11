import React, { useState } from 'react';
// import '../../css/register/register.css'
import '../../scss/Register.scss';
import axios from 'axios';


// 사진 업로드 
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

export default function Register() {

  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // error 처리
  const [idError, setIdError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // --- 사진 업로드 시작 --- 
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
  // --- 사진 업로드 끝 --- 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('회원가입 함수 호출');
    console.log(id, username, password);

    

    {await axios.post('http://localhost:8000/api/join/', {
      'email': id,
      'username': username,
      'password': password
    })
    .then(response => {
      console.log(response.data);
      alert("로그인이 완료되었습니다.")
    })
    .catch(error => {
      console.log(error);
    })}
    
  };

  const onChangeid = (event) => {
    setId(event.target.value);
    if(event.target.value !== "") {
      setIdError("")
    }
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    if(event.target.value !== "") {
      setUsernameError("")
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    if(event.target.value !== "") {
      setPasswordError("")
    }
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    if(event.target.value !== "") {
      setConfirmPasswordError("")
    }
  }

  const validInputs = () => {
    let isValid = true;
    if (!id) {
        setIdError("아이디를 입력해주세요")
        isValid=false;
    }
    if (!username) {
        setUsernameError("이름을 입력해주세요")
        isValid=false;
    }
    if (!password) {
        setPasswordError("비밀번호를 입력해주세요")
        isValid=false;
    }
    if (!confirmPassword) {
        setConfirmPasswordError("비밀번호를 입력해주세요")
        isValid=false;
    }
    if (password !== confirmPassword) {
        setConfirmPasswordError("비밀번호가 맞지 않습니다")
        isValid=false;
    }
    return isValid
  };

  return (
    // <div className='register_all'>
    //   <div className="register_div">
    //     <h2>ALGOKING</h2>
    //     <h4>회원가입</h4>
    //   </div>

    //   <form onSubmit={handleSubmit}> {/* onSubmit={handleSubmit} */}
    //     <div className="register_ui">
    //       <h5 className='register_title'>아이디</h5>
    //       <input
    //         type="text"
    //         value={id}
    //         onChange={onChangeid}
    //         placeholder="input email"
    //       />
    //       <div className="register_error">{idError}</div>
    //     </div>

    //     <div className="register_ui">
    //       <h5>이름</h5>
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={onChangeUsername}
    //         placeholder="input name"
    //       />
    //       <div className="register_error">{usernameError}</div>
    //     </div>
          
    //     <div className="register_ui">
    //       <h5>비밀번호</h5>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={onChangePassword}
    //         placeholder="input password"
    //       />
    //       <div className="register_error">{passwordError}</div>
    //     </div>

    //     <div className="register_ui">
    //       <h5>비밀번호 확인</h5>
    //       <input
    //         type="password"
    //         value={confirmPassword}
    //         onChange={onChangeConfirmPassword}
    //         placeholder="input confirm-password"
    //       />
    //       <div className="register_error">{confirmPasswordError}</div>
    //     </div>
    //     <div className="register_ui">
    //       <button type='submit'>확인</button>
    //     </div>
    //   </form>
    // </div>
    <div className="register">
      <div className="register__content">
        {/* <div className="register__img">
          <img src="https://image.freepik.com/free-vector/code-typing-concept-illustration_114360-3581.jpg" alt="user register" />
          <img src={Logo} alt="user register" />
        </div> */}
        <div className="register__forms">
          {/* register form */}
          <form onSubmit={handleSubmit} className="register__register" id="register-in"> {/* action="" */}
            <h1 className="register__title">회원가입</h1>
            <div className="register__box">
              <i className='bx bx-user register__icon'></i>
              <input type="text" placeholder="Email" value={id} onChange={onChangeid} className="register__input" />
            </div>
            <div className='register_error'>{idError}</div> {/* Email error */}

            <div className="register__box">
              <i className='bx bx-lock register__icon'></i>
              <input type="text" placeholder="Username" value={username} onChange={onChangeUsername} className="register__input" />
            </div>
            <div className='register_error'>{usernameError}</div> {/* Paswword error */}

            <div className="register__box">
              <i className='bx bx-lock register__icon'></i>
              <input type="password" placeholder="Password" value={password} onChange={onChangePassword} className="register__input" />
            </div>
            <div className='register_error'>{passwordError}</div> {/* Paswword error */}

            <div className="register__box">
              <i className='bx bx-lock register__icon'></i>
              <input type="password" placeholder="Password" value={confirmPassword} onChange={onChangeConfirmPassword} className="register__input" />
            </div>
            <div className='register_error'>{confirmPasswordError}</div> {/* Paswword error */}

            {/* 프로필 사진 업로드 */}
            <div className="register__box">
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
            </div>

            <a href="#" className="register__forgot">Forgot Password? </a> {/* tbd : nav.link 또는 router로 바꿔 */}
            <button onSubmit={handleSubmit} className='register__button'>Sign In</button> {/* tbd : nav.link 또는 router로 바꿔 */}
            <div>
              <span className="register__account register__account--account">Don't Have an Account?</span> {' '}
              <span className="register__signin register__signin--signup" id="sign-up">Sign Up</span>
            </div>
          </form>


          {/* create account form
          <form action="" className="register__create none" id="register-up">
            <h1 className="register__title">Create Account</h1>
            <div className="register__box">
              <i className='bx bx-at register__icon'></i>
              <input type="email" placeholder="Email" className="register__input" />
            </div>
            <div className="register__box">
              <i className='bx bx-lock register__icon'></i>
              <input type="password" placeholder="Password" className="register__input" />
            </div>
            <a href="#" className="register__button">Sign Up</a> 
            <div>
              <span className="register__account register__account--account">Already have an Account?</span>
              <span className="register__signup register__signup--signup" id="sign-in">Sign In</span>
            </div>

            소셜 로그인 필요하면 손봐
            <div className="register__social">
              <a href="#" className="register__social--icon"><i className='bx bxl-facebook'></i></a>
              <a href="#" className="register__social--icon"><i className='bx bxl-twitter'></i></a>
              <a href="#" className="register__social--icon"><i className='bx bxl-google'></i></a>
              <a href="#" className="register__social--icon"><i className='bx bxl-github'></i></a>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
}
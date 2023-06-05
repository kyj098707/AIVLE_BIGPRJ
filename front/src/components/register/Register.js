import React, { useState } from 'react';
import '../../css/register/register.css'
import axios from 'axios';

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('회원가입 함수 호출')

    if(validInputs()){
      try {
        const response = await axios.post('/api/register', {
            'id': id,
            'username': username,
            'password': password,
        });
        if (response.status === 200) {
            console.log('회원가입 성공', response.data);
            alert("회원가입이 완료되었습니다.");

        } else {
            console.log('회원가입 실패', response.data);
        }
      } catch (e) {
          console.log('회원가입 실패', e)
      };
    }
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
    <div className='register_all'>
      <div className="register_div">
        <h2>ALGOKING</h2>
        <h4>회원가입</h4>
      </div>

      {/* 아이디, 이름, 패스워드, 패스워드 확인 */}
      <form onSubmit={handleSubmit}> {/* onSubmit={handleSubmit} */}
        <div className="register_ui">
          <h5>아이디</h5>
          <input
            type="text"
            value={id}
            onChange={onChangeid}
            placeholder="input email"
          />
          <div className="register_error">{idError}</div>
        </div>

        <div className="register_ui">
          <h5>이름</h5>
          <input
            type="text"
            value={username}
            onChange={onChangeUsername}
            placeholder="input name"
          />
          <div className="register_error">{usernameError}</div>
        </div>
          
        <div className="register_ui">
          <h5>비밀번호</h5>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="input password"
          />
          <div className="register_error">{passwordError}</div>
        </div>

        <div className="register_ui">
          <h5>비밀번호 확인</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="input confirm-password"
          />
          <div className="register_error">{confirmPasswordError}</div>
        </div>
        <div className="register_ui">
          <button type='submit'>확인</button>
        </div>
      </form>
    </div>
  );
}
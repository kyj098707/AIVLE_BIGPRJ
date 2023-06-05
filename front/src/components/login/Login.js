import React, { useState } from 'react'
import '../../css/login/login.css'
import axios from 'axios'

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // error 처리
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('로그인 함수 호출')

    if(validInputs()){
      try {
        const response = await axios.post('/api/login', {
            'id': id,
            'password': password,
        });
        if (response.status === 200) {
            console.log('로그인 성공', response.data);
            alert("로그인이 완료되었습니다.");

        } else {
            console.log('로그인 실패', response.data);
        }
      } catch (e) {
          console.log('로그인 실패', e)
      };
    }
  };

  const onChangeid = (event) => {
    setId(event.target.value);
    if(event.target.value !== "") {
      setIdError("")
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
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
    <div className='login_all'>
      <div className="login_div">
        <h2>ALGOKING</h2>
        <h4>로그인</h4>
      </div>

      {/* 아이디, 이름, 패스워드, 패스워드 확인 */}
      <form onSubmit={handleSubmit}> {/* onSubmit={handleSubmit} */}
        <div className="login_ui">
          <h5>아이디</h5>
          <input
            type="text"
            value={id}
            onChange={onChangeid}
            placeholder="input email"
          />
          <div className="login_error">{idError}</div>
        </div>

        <div className="login_ui">
          <h5>비밀번호</h5>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="input password"
          />
          <div className="login_error">{passwordError}</div>
        </div>

        <div className="login_ui">
          <button type='submit'>로그인</button>
        </div>
      </form>
    </div>
  );
}
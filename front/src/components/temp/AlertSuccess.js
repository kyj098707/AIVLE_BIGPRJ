import React from 'react';
import '../../scss/Alert.scss'

export default function AlertSuccess({alertMessage, setIsOpen}) {
  const handleClick = () => {
    setIsOpen(false);
  };
  return(
    <div className="alert-container">
      <div className="alert-success">
        <div className="top-dot"></div>
        <div className="top-dot two"></div>
        <div className="top-face-happy">
          <div className="top-face-eye"></div>
          <div className="top-face-eye right"></div>
          <div className="top-face-mouth happy"></div>
        </div>
        <div className="top-face-shadow scale"></div>
        <div className="bottom-message">
          <h1 className="bottom-message-alert">Success!</h1>
          <p>로그인에 성공~??? 문구 작성</p>
          <p>{alertMessage}</p>
        </div>
        <button onClick={handleClick} className="bottom-btn">
          <h1 className="bottom-btn-green">
            CONTINUE
          </h1>
        </button>
      </div>

      {/* <div className="alert-error">
        <div className="top-dot"></div>
        <div className="top-dot two"></div>
        <div className="top-face-sad">
          <div className="top-face-eye"></div>
          <div className="top-face-eye right"></div>
          <div className="top-face-mouth sad"></div>
        </div>
        <div className="top-face-shadow move"></div>
        <div className="bottom-message">
          <h1 className="bottom-message-alert">error!</h1>
          <p>로그인에 실패~??? 문구 작성</p>
        </div>
        <button className="bottom-btn">
          <h1 className="bottom-btn-red">try again</h1>
        </button>
      </div> */}
    </div>
  );
}
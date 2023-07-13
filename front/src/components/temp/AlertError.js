import React from 'react';
import '../../scss/Alert.scss'

export default function AlertError({alertMessage, setIsOpen}) {
  const handleClick = () => {
    setIsOpen(false);
  };
  return(
    <div className="alert-container">
      <div className="alert-error">
        <div className="top-dot"></div>
        <div className="top-dot two"></div>
        <div className="top-face-sad">
          <div className="top-face-eye"></div>
          <div className="top-face-eye right"></div>
          <div className="top-face-mouth sad"></div>
        </div>
        <div className="top-face-shadow move"></div>
        <div className="bottom-message">
          <h1 className="bottom-message-alert" style={{marginTop:'15px'}}>{alertMessage}</h1>
        </div>
        <button onClick={handleClick} className="bottom-btn" >
          <h1 className="bottom-btn-red">CANCEL</h1>
        </button>
      </div>
    </div>
  );
}
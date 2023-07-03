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
        <h1 className="bottom-message-alert" style={{marginTop:'15px'}}>{alertMessage}</h1>
        </div>
        <button onClick={handleClick} className="bottom-btn" >
          <h1 className="bottom-btn-green">CANCEL</h1>
        </button>
      </div>
    </div>
  );
}
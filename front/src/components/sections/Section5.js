import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/sections/Section5.css';

function Section5(props) {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
    
    
  const handleButtonClick = () => {
    navigate('./home');
  };

  return (
    
    <div className={`section5 ${animate ? 'animate' : ''} ${props.hide ? 'hide-header' : ''}`}>
      <img src="/img/brain.gif" alt="Gif" className="background-image22" />
      <div className="background-image22"></div>
      <div className="content22">
        <h1>Algo KING</h1>
        <h2>알고킹은 언제나</h2>
        <h2>당신을 기다립니다!</h2>
        <button onClick={handleButtonClick}><p>지금 시작해 보세요!</p></button>
      </div>
    </div>
  );
}


export default Section5;

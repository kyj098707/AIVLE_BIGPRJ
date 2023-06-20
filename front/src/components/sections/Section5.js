import React, { useEffect, useState } from 'react';
import '../../css/sections/Section5.css' 


function Section5() {
  const [animate, setAnimate] = useState(false);

  const handleScroll = () => {
    const section = document.querySelector('.section5');
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop <= windowHeight - 100) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`section5 ${animate ? 'animate' : ''}`}>
      <img src="/img/brain.gif" alt="Gif" className="background-image2" />
      <div className="content2">
        <h1>Algo KING</h1>
        <h2>알고킹은 언제나<br/>당신을 기다립니다!</h2>
        <p>지금 시작해 보세요!</p>
      </div>
    </div>
  );
}

export default Section5;

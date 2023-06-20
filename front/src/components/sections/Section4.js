import React, { useEffect, useState } from 'react';
import '../../css/sections/Section4.css';

function Section4() {
  const [animate, setAnimate] = useState(false);

  const handleScroll = () => {
    const section = document.querySelector('.section4');
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
    <div className={`section4 ${animate ? 'animate' : ''}`}>
      <div className="card-container">
        <div className={`card ${animate ? 'animate' : ''}`}>
          <h3>AI가 추천해 주는 <br/>점수상승에 효과적인 문제</h3>
          <p>최신 학습 이론과 AI 기술을 활용하여,<br/> 당신의 학습 상황과 필요에 맞게 학습 방법을 제공합니다.</p>
        </div>
        <div className={`card ${animate ? 'animate' : ''}`}>
          <h3>라이벌 기능으로 실력 향상</h3>
          <p>더 열나게 하겠슴다</p>
        </div>
        <div className={`card ${animate ? 'animate' : ''}`}>
          <h3>게시판 기능으로 모르는 문제 해결</h3>
          <p>더더 열나게 하겠슴다</p>
        </div>
      </div>
    </div>
  );
}

export default Section4;

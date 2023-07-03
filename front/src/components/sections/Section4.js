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
      <div className="card-containers">
        <div className={`card ${animate ? 'animate' : ''}`}>
          <h3>AI기반 문제 추천</h3>
          <p>최신 학습 이론과 AI 기술을 활용하여,<br/> 당신의 학습 상황과 필요에 맞게 학습 방법을 제공합니다.</p>
        </div>
        <div className={`card ${animate ? 'animate' : ''}`}>
          <h3>라이벌 기능으로 실력 향상</h3>
          <p>AI로 매칭된 경쟁적인 환경에서 서로의 코드와 접근 방식을 비교하고 배워 개발 역량의 성장에 도움이 됩니다.</p>
        </div>
        <div className={`card ${animate ? 'animate' : ''}`}>
          <h3>그룹을 통한 스터디 그룹 생성</h3>
          <p>그룹 기능을 활용하여 도움과 피드백을 받으며 문제를 해결하는 과정에서 실력과 자신감이 크게 성장 할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default Section4;

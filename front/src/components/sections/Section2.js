import React, { useEffect, useState } from 'react';
import '../../css/sections/Section2.css' 


function Section2() {
  const [animate, setAnimate] = useState(false);

  const handleScroll = () => {
    const section = document.querySelector('.section2');
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
    <div className={`section2 ${animate ? 'animate' : ''}`}>
      <img src= "/img/connection.jpg" alt="Jpg" className="background-image" />
      <div className="content">
        <h1>알고킹을 하게 된다면<br/>주변에 추천하기<br/>망설이지 않을 것입니다.</h1>
        <p>제작자의 당당함</p>
      </div>
    </div>
  );
}

export default Section2;

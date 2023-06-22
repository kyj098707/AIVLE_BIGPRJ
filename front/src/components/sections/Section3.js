import React, { useEffect, useState } from 'react';
import '../../css/sections/Section3.css';

function Section3() {
  const [animate, setAnimate] = useState(false);

  const handleScroll = () => {
    const section = document.querySelector('.section3');
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
    <div className={`section3 ${animate ? 'animate' : ''}`}>
      <img src="/img/clap.gif" alt="Gif" className="right-alignedd" />
      <img src="/img/clap.gif" alt="Gif" className="left-alignedd" />
      <div className="content2">
      <h1>어떻게 단기간에 실력<br />향상이 가능했을까요?</h1>
      <br />
      <p>차이점은 효율화된 공부법에 있습니다.<br /></p>
    </div>
    </div>
  );
}

export default Section3;

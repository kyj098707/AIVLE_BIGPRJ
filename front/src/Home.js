import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from '@material-ui/core/Card';
import Choice from './Choice';
import { Helmet } from 'react-helmet';

function Home() {
  const [cardVisibility, setCardVisibility] = useState([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY || document.documentElement.scrollTop;

      const scrollPositions = [600, 1200, 1800];

      const updatedCardVisibility = cardVisibility.map((isVisible, index) => {
        if (!isVisible && currentScrollPos > scrollPositions[index]) {
          return true;
        }
        return isVisible;
      });

      setCardVisibility(updatedCardVisibility);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cardVisibility]);

  return (
    <div className="home">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Helmet>
      <div className="home-container">
        <img className="home_image" src="img/algoking2.png" alt="" />

        <div className="card-column">
          <Card
            variant="outlined"
            className={`choice animate__animated ${cardVisibility[0] ? 'animate__fadeInLeft' : ''}`}
          >
            <Choice
              id="2323"
              title="물어보기 쌉가능"
              answer="게시판 활성화."
              image="img/small-talk.png"
            />
          </Card>
          <Card
            variant="outlined"
            className={`choice animate__animated ${cardVisibility[1] ? 'animate__fadeInRight' : ''}`}
            style={{ height: '500px' }}
          >
            <a href="/login" id="2322">
              <img className="choice-image-left" src="img/diagram.png" alt="" />
            </a>
            <div className="choice-content-right">
              <h3 className="choice-title">실력 향상</h3>
              <p className="choice-answer">라이벌로 내 실력향상.</p>
            </div>
          </Card>
          <Card
            variant="outlined"
            className={`choice animate__animated ${cardVisibility[2] ? 'animate__fadeInLeft' : ''}`}
          >
            <Choice
              id="2321"
              title="추천"
              answer="유사 알고리즘 추천함"
              image="img/advise.png"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;


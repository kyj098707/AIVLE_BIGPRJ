import React, { useState } from 'react';
// import '../../css/rival/rival.css'
import '../../scss/Rival.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



import {TiChevronLeftOutline, TiChevronRightOutline} from 'https://cdn.skypack.dev/react-icons/ti';

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({title, content}) => (
  <div className='rival-rec-section-card'>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const Carousel = ({children}) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);
  
  return (
    <div className='carousel'>
      {active > 0 && <button className='rival-rec-section-nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}>
          {child}
        </div>
      ))}
      {active < count - 1 && <button className='rival-rec-section-nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
    </div>
  );
};




export default function Rival() {
  const rivals = [
    {
      nicname: 'whdvlf',
      img: '🐶dd',
      
    },
    {
      nicname: 'dkfmal',
      img: '🦈dd',
    },
    {
      nicname: 'dPqls',
      img: '🐬dd',
    }
  ]

  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (inputValue.length === 0) {
      setIsActive(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsActive(false);
    setInputValue("");
    setTimeout(() => {
      setIsProcessing(false);
      if (inputValue.length > 0) {
        setIsActive(true);
      }
    }, 1000);
  };
  return(
    <div className="rival-container">
      <div className="rival-vs-section">
        <div className="side-1">
          <h2 className='side-name'>dbswhd</h2>
          <div className="rival-image">🐊</div>
        </div>

        <div className="rival-versus">
          <span>vs.</span>
        </div>

        <div className="side-2">
          <h2 className="side-name">alstn</h2>
          <div className="rival-image">🐳</div>
        </div>
      </div>

      <div className='rival-rec-section'>
        <Carousel>
        {[...new Array(CARDS)].map((_, i) => (
          <Card title={'Card ' + (i + 1)} content='Content'/>
        ))}
      </Carousel>
      </div>

      <div className="rival-search-section">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={`finder ${isActive ? "active" : ""}`}>
            <div className="finder__outer">
              <div className="finder__inner">
                <div className="finder__icon"></div>
                <input
                  className="finder__input"
                  type="text"
                  name="q"
                  value={inputValue}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 
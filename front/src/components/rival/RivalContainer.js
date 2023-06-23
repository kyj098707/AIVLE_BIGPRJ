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
    {/* <h2>{title}</h2> */}
    <img className='rival-rec-section-card-profile-image' src="img/temp.jpg" alt="" />
    
    <div className="rival-rec-section-card-profile-info">
      <h2>nicname</h2>
    </div>

    <div class="grid-child-posts">
      <p><b style={{color:"lightgreen"}}>156</b> Solved</p>
      <p><b style={{color:"lightgreen"}}>1056</b> Rank</p>
    </div>

    <div className="rival-rec-section-card-profile-logos">
      {/* <img className='rival-rec-section-card-logo' src="https://d2gd6pc034wcta.cloudfront.net/tier/14.svg" alt="" />
      <img className='rival-rec-section-card-logo' src="https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-1/291938471_442144307921595_3062001629498506286_n.png?stp=dst-png_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=c6021c&_nc_ohc=mvvqguD93tUAX9Ueq3h&_nc_ht=scontent-gmp1-1.xx&oh=00_AfD-G8PrDTywOmQhaS--uMJazqgjuz_JWEjpaBTTVCLszg&oe=6499863F" alt="" />
      <img className='rival-rec-section-card-logo' src="https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-1/305272197_443733567775099_7971917755761425362_n.png?stp=dst-png_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=c6021c&_nc_ohc=-XlbujLcaE0AX9alqqI&_nc_ht=scontent-gmp1-1.xx&oh=00_AfBzQgL01C3sLj7OTpYQe4tQAUy2CW627UrXNSfhXLtbag&oe=649865FC" alt="" /> */}
      <ul class="social-icons">
        <li><a href="#"><i class="fa fa-instagram"></i></a></li>
        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
        <li><a href="#"><i class="fa fa-codepen"></i></a></li>
      </ul>
    </div>

    <div className="rival-rec-section-card-btn-container">
      <button className='btn draw-border'>Follow</button>
      <button className='btn draw-border'>tbd...</button>
    </div>
  </div>
); 
// style={{width:"150px", height:"150px"}}

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
      img: '🦈',
    },
    {
      nicname: 'dPqls',
      img: '🐬',
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
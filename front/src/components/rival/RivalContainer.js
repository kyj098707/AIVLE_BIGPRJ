import React, { useState } from 'react';
import RivalProblemRec from './RivalProblemRec';
// import RivalVersus from './RivalVersus';
// import '../../css/rival/rival.css'
import '../../scss/Rival.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




import {TiChevronLeftOutline, TiChevronRightOutline} from 'https://cdn.skypack.dev/react-icons/ti';

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({props}) => {
  const [follow, setFollow] = useState('팔로우');
  const [followFlag, setFollowFlag] = useState(true);
  return(
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
        <ul className="social-icons">
          <li><a href="#"><i className="fa fa-instagram"></i></a></li>
          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
          <li><a href="#"><i className="fa fa-codepen"></i></a></li>
        </ul>
      </div>

      <div className="rival-rec-section-card-btn-container">
        <button className='btn draw-border' onClick={()=> {
          setFollowFlag(!followFlag);
          followFlag==true ? setFollow('팔로잉 ✔') : setFollow('팔로우');
        }}>{follow}</button>
        <button className='btn draw-border'>tbd...</button>
      </div>
    </div>
  ); 
}

const SearchCard = (props) => {
  const [follow, setFollow] = useState('팔로우');
  const [followFlag, setFollowFlag] = useState(true);

  return (
    <div className='rival-rec-section-card'>
      {/* <h2>{props.title}</h2> */}
      <img className='rival-rec-section-card-profile-image' src="img/temp.jpg" alt="" />
      
      <div className="rival-rec-section-card-profile-info">
        <h2>{props.inputValue}</h2>
      </div>

      <div class="grid-child-posts">
        <p><b style={{color:"lightgreen"}}>156</b> Solved</p>
        <p><b style={{color:"lightgreen"}}>1056</b> Rank</p>
      </div>

      <div className="rival-rec-section-card-profile-logos">
        {/* <img className='rival-rec-section-card-logo' src="https://d2gd6pc034wcta.cloudfront.net/tier/14.svg" alt="" />
        <img className='rival-rec-section-card-logo' src="https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-1/291938471_442144307921595_3062001629498506286_n.png?stp=dst-png_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=c6021c&_nc_ohc=mvvqguD93tUAX9Ueq3h&_nc_ht=scontent-gmp1-1.xx&oh=00_AfD-G8PrDTywOmQhaS--uMJazqgjuz_JWEjpaBTTVCLszg&oe=6499863F" alt="" />
        <img className='rival-rec-section-card-logo' src="https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-1/305272197_443733567775099_7971917755761425362_n.png?stp=dst-png_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=c6021c&_nc_ohc=-XlbujLcaE0AX9alqqI&_nc_ht=scontent-gmp1-1.xx&oh=00_AfBzQgL01C3sLj7OTpYQe4tQAUy2CW627UrXNSfhXLtbag&oe=649865FC" alt="" /> */}
        <ul className="social-icons">
          <li><a href="#"><i className="fa fa-instagram"></i></a></li>
          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
          <li><a href="#"><i className="fa fa-codepen"></i></a></li>
        </ul>
      </div>

      <div className="rival-rec-section-card-btn-container">
        <button className='btn draw-border' onClick={() => {
          setFollowFlag(!followFlag);
          followFlag === true ? setFollow('팔로잉 ✔') : setFollow('팔로우');
        }}>{follow}</button>
        <button className='btn draw-border'>tbd...</button>
      </div>
    </div>
  ); 
};

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

const SearchCarousel = ({children}) => {
  const count = React.Children.count(children);
  
  return (
    <div className='SearchCarousel'>
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{height:"500px", marginBottom:"600px"}}>
          {child}
        </div>
      ))}
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
  const [showCarousel1, setShowCarousel1] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (inputValue.length === 0) {
      setIsActive(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Enter 키 입력하면 SearchCarousel 보이도록
      setShowCarousel1(true);
    }else if (e.key === "Escape") {
      // ESC 키 입력하면 SearchCarousel 보이도록
      setShowCarousel1(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsActive(false);
    setInputValue("");
    console.log('입력중인가?')
    setTimeout(() => {
      setIsProcessing(false);
      if (inputValue.length > 0) {
        setIsActive(true);
      }
    }, 1000);
  };

  const problem = [
    {
      title: '물병',
      num: 1052,
      tier: 'Silver I',
      img: 'https://static.solved.ac/tier_small/10.svg',
      subNum: 33333,
      solved: 3242,
      avgTry: 2.58,
      ansRatio: '38.83%',
      tag: ['비트마스킹', '그리디 알고리즘', '수학'],
    },
    {
      title: '트리',
      num: 1068,
      tier: 'Gold V',
      img: 'https://static.solved.ac/tier_small/1.svg',
      subNum: 33333,
      solved: 10045,
      avgTry: 3.54,
      ansRatio: '28.23%',
      tag: ['깊이 우선 탐색', '그래프 이론', '그래프 탐색', '트리'],
    },
    {
      title: 'Chessboard in FEN',
      num: 1694,
      tier: 'Gold V',
      img: 'https://static.solved.ac/tier_small/1.svg',
      subNum: 33333,
      solved: 21,
      avgTry: 2.71,
      ansRatio: '36.84%',
      tag: ['구현'],
    },
    {
      title: 'Random Number Generator',
      num: 1160,
      tier: 'Platinum V',
      img: 'https://static.solved.ac/tier_small/16.svg',
      subNum: 33333,
      solved: 117,
      avgTry: 3.72,
      ansRatio: '26.89%',
      tag: ['분할 정복을 이용한 거듭제곱', '수학'],
    },
    {
      title: 'Non-boring sequences',
      num: 3408,
      tier: 'Diamond IV',
      img: 'https://static.solved.ac/tier_small/22.svg',
      subNum: 33333,
      solved: 204,
      avgTry: 3.19,
      ansRatio: '31.33%',
      tag: ['자료 구조', '분할 정복'],
    }
  ]
  return(
    <div className="rival-container">
      <div className="rival-banner-section">
        <h3>Compete</h3>
      </div>

      <div className="rival-vs-section">
        <div className="rival-vs-section-title">
          <h3>라이벌 확인</h3>
          <p>xx님이<br /><br />팔로우하신<br /><br />라이벌들을 확인해보세요.</p>
        </div>

        <div className="rival-sides">
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
      </div>

      <div className="rival-vs-section">
        <RivalProblemRec></RivalProblemRec>
        {/* <div className="rival-vs-section-title">
          <h3>문제 추천</h3>
          <p>xx 님의 라이벌들이<br /><br />해결한 문제들입니다.<br /><br />도전해보세요!</p>
        </div> */}
        
      </div>

      <div className='rival-rec-section'>
        <h3>라이벌 추천</h3>
        <p>xx님의 라이벌을 추천드립니다.</p>
        <br/>
        <Carousel>
          {[...new Array(CARDS)].map((_, i) => (
            <Card title={'Card ' + (i + 1)} content='Content'/>
          ))}
        </Carousel>
      </div>

      <div className="rival-search-section">
        <h3>라이벌 검색</h3>
        <p>원하는 유저?를 찾아 라이벌로 등록해 보세요!</p>
        <br/>
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
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>
        </form>
        {
          showCarousel1 && <SearchCarousel>
            {[...new Array(1)].map((_, i) => (
              <SearchCard title={'Card ' + (i + 1)} inputValue={inputValue} content='Content'/>
            ))}
            </SearchCarousel>
        }
      </div>
    </div>
  );
} 
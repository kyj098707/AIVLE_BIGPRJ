import React, { useState, useEffect } from 'react';
import RivalProblemRec from './RivalProblemRec';
// import RivalVersus from './RivalVersus';
// import '../../css/rival/rival.css'
import '../../scss/Rival.scss'

import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HiOutlineInformationCircle } from "react-icons/hi";
import axios from 'axios';
import { Col, Row } from 'antd';

const CARDS = 10;
const MAX_VISIBILITY = 3;



const Card = ({ title }) => {
  const [follow, setFollow] = useState('팔로우');
  const [followFlag, setFollowFlag] = useState(true);

  const moveBJ = () => {
    window.open('https://www.acmicpc.net/user/koosaga', '_blank')
  }
  // 아이디 넘겨주면 아래 함수를 사용해서 프로필로 이동하면 됩니다.
  // const moveSAC = (solvedacID) => {
  //   window.open(`https://solved.ac/profile/${solvedacID}`, '_blank')
  // }
  // 임시 코드
  const moveSAC = () => {
    window.open('https://solved.ac/profile/koosaga', '_blank')
  }
  return (
    <div className='rival-rec-section-card'>
      <img className='rival-rec-section-card-profile-image' src="img/temp.jpg" alt="" />
      <div className="rival-rec-section-card-profile-info">
        <h2>{title}</h2>
      </div>

      <div class="grid-child-posts">
        <p><b style={{ color: "lightgreen" }}>156</b> Solved</p>
        <p><b style={{ color: "lightgreen" }}>1056</b> Rank</p>
      </div>

      <div className="rival-rec-section-card-profile-logos">
        <ul className="social-icons">
          {/* <li><a href="#"><i className="fa fa-instagram"></i></a></li>
          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
          <li><a href="#"><i className="fa fa-codepen"></i></a></li> */}
          <li><img src="img/bj-logo.png" alt="백준로고" onClick={moveBJ} /></li>
          <li><img src="img/sa-logo-2.png" alt="백준로고" onClick={moveSAC} /></li>
        </ul>
      </div>

      <div className="rival-rec-section-card-btn-container">
        <button className='btn draw-border' onClick={() => {
          setFollowFlag(!followFlag);
          followFlag == true ? setFollow('팔로잉 ✔') : setFollow('팔로우');
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
      <img className='rival-rec-section-card-profile-image' src="img/temp.jpg" alt="" />

      <div className="rival-rec-section-card-profile-info">
        <h2>{props.inputValue}</h2>
      </div>

      <div class="grid-child-posts">
        <p><b style={{ color: "lightgreen" }}>156</b> Solved</p>
        <p><b style={{ color: "lightgreen" }}>1056</b> Rank</p>
      </div>

      <div className="rival-rec-section-card-profile-logos">
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

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <div className='carousel'>
      {/* {active > 0 && <button className='rival-rec-section-nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline /></button>}
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
      {active < count - 1 && <button className='rival-rec-section-nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline /></button>} */}
    </div>
  );
};

const SearchCarousel = ({ children }) => {
  const count = React.Children.count(children);

  return (
    <div className='SearchCarousel'>
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{ height: "500px", marginBottom: "600px" }}>
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
  const [recRivalList, setRecRivalList] = useState([])
  const [rivalList, setRivalList] = useState([])
  const [follow, setFollow] = useState('팔로우');
  const [followFlag, setFollowFlag] = useState(true);
  const [section, setSection] = useState(1);
  const [serName, setSerName] = useState('');
  const [serSolved, setSerSolved] = useState('');
  const [serRank, setSerRank] = useState('');
  const [serTier, setSerTier] = useState('');
  const [serStreak, setSerStreak] = useState('');
  const [serRating, setSerRating] = useState('');

  const [vsName, setVsName] = useState('');
  const [vsSolved, setVsSolved] = useState(0);
  const [vsRank, setVsRank] = useState(0);
  const [vsTier, setVsTier] = useState('');
  const [vsStreak, setVsStreak] = useState(0);
  const [vsRating, setVsRating] = useState(0);

  const [myName, setMyName] = useState('');
  const [mySolved, setMySolved] = useState(0);
  const [myRank, setMyRank] = useState(0);
  const [myTier, setMyTier] = useState('');
  const [myStreak, setMyStreak] = useState(0);
  const [myRating, setMyRating] = useState(0);


  const userFind = () => {
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }
    setShowCarousel1(true)
    axios
      .get('http://localhost:8000/api/users/search/', {
        params: {
          username: inputValue
        }, headers: headers
      })
      .then((response) => {
        const { data } = response;
        console.log(data)
        if (data.result == "error") {
          alert(data.msg)
        }
        else {
          setSerName(data.name)
          setSerTier(data.tier)
          setSerSolved(data.solved_count)
          setSerRank(data.ranking)
          serRating(data.rating)
          serStreak(data.streak)
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const handleRival = (name, tier, solved_count, streak, rating, ranking) => {
    setFollowFlag(!followFlag);
    followFlag == true ? setFollow('팔로잉 ✔') : setFollow('팔로우');
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios
      .post('http://localhost:8000/api/boj/rival/', {
        name: name,
        tier: tier,
        solved_count: solved_count,
        streak: streak,
        rating: rating,
        ranking: ranking
      }, { headers: headers })
      .then((response) => {
        const { data } = response;
        setRivalList(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  useEffect(() => {
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios
      .get('http://localhost:8000/api/boj/rival/rec/', { headers: headers })
      .then((response) => {
        const { data } = response;
        setRecRivalList(data)
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('http://localhost:8000/api/boj/rival/list/', { headers: headers })
      .then((response) => {
        const { data } = response;
        setRivalList(data)
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('http://localhost:8000/api/boj/myinfo/', { headers: headers })
      .then((response) => {
        const { data } = response;
        console.log(data)
        setMyName(data.name)
        setMyRank(data.ranking)
        setMyRating(data.rating)
        setMySolved(data.solved_count)
        setMyStreak(data.streak)
        setMyTier(data.tier)
      })
      .catch((error) => {
        console.log(error);
      });


  }, []);
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
    } else if (e.key === "Escape") {
      // ESC 키 입력하면 SearchCarousel 보이도록
      setShowCarousel1(false);
    }
  }
  const changeSection = (i) => {
    console.log(rivalList)
    setVsName(rivalList[i].name)
    setVsRank(rivalList[i].ranking)
    setVsRating(rivalList[i].rating)
    setVsSolved(rivalList[i].solved_count)
    setVsStreak(rivalList[i].streak)
    setVsTier(rivalList[i].tier)
  }
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

  // search-bar로 이동
  const scrollToSection = () => {
    const rivalSection = document.querySelector('.rival-search-section');
    if (rivalSection) {
      window.scrollTo({
        top: rivalSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="rival-container">
      <div className="rival-banner-section">
        <h3>Compete</h3>
      </div>

      <div className="rival-choice-section">
        {
          rivalList && rivalList.map((rival, index) => {
            return (
              <img src="img/rival_profile.png" onClick={() => changeSection(index)} alt="profile-image" />
              // <img src={`/img/rank_${number}.gif`} alt="" />
            )
          })
        }
        <img src="/img/rival_add.png" alt="add-profile-image" style={{ width: "65px", height: "65px", display: 'flex', justifyContent: 'center' }} onClick={scrollToSection} />
      </div>


      <div className="rival-sides-info">
        {/* 기존 코드 : 스와이퍼 */}
        {/* <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={1000} // 전환 속도
            className='rival-layout-banner-swiper'
        >
          {
            ['max-string', '푼 문제수'].map((x, idx) => {
              return (
                <SwiperSlide className='rival-layout-banner'>
                  <div className="rival-layout-banner-title">
                    <h2 style={{ fontSize: '28px' }}>
                      {x}
                    </h2>
                    <p>
                      tbd..
                    </p>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper> */}
        <h2 style={{ color: 'white', margin: '5%' }}>GAME RESULT</h2>
        <div className="info-name-section">
          <div className='info-you' style={{ width: `${100}%` }}>
            <h3>YOU</h3>
            <p>WIN!</p>
          </div>
          <div className="info-vs">
            <h3>VS</h3>
          </div>
          <div className="info-rival">
            <p>LOSE!</p>
            <h3>{vsName}</h3>
          </div>
        </div>

        <div className="info-detail-section">
          <div className="info-detail-notice">

            <HiOutlineInformationCircle size={21} color='white'/>
            <span>라이벌 정보는 00시에 갱신됩니다.</span>


          </div>

          <div className="info-detail-content">
            <Row className="info-detail-00">
              <Col span={8} className='detail-content-flex-end'>{mySolved}</Col>
              <Col span={8} className='detail-title'>푼문제수</Col>
              <Col span={8} className='detail-content-flex-start'>{vsSolved}</Col>
            </Row>
            <hr />
            <Row className="info-detail-00">
              <Col span={8} className='detail-content-flex-end'>{myStreak}</Col>
              <Col span={8} className='detail-title'>최대잔디수</Col>
              <Col span={8} className='detail-content-flex-start'>{vsStreak}</Col>
            </Row>
            <hr />
            <Row className="info-detail-00">
              <Col span={8} className='detail-content-flex-end'>{myRating}</Col>
              <Col span={8} className='detail-title'>레이팅</Col>
              <Col span={8} className='detail-content-flex-start'>{vsRating}</Col>
            </Row>
            <hr />
            <Row className="info-detail-00">
              <Col span={8} className='detail-content-flex-end'>{myRank}</Col>
              <Col span={8} className='detail-title'>랭킹</Col>
              <Col span={8} className='detail-content-flex-start'>{vsRank}</Col>
            </Row>

            <p style={{ color: 'white' }}>....</p>
          </div>
        </div>
      </div>

      <div className="rival-vs-section">
        <RivalProblemRec></RivalProblemRec>
      </div>

      <div className='rival-rec-section'>
        <h3>라이벌 추천</h3>
        <p>dbs2님의 라이벌을 추천드립니다.</p>
        <br />
        <Carousel>
          {recRivalList.map(rec => {
            return (
              <div className='rival-rec-section-card'>
                <img className='rival-rec-section-card-profile-image' src="img/temp.jpg" alt="" />
                <div className="rival-rec-section-card-profile-info">
                  <h2>{rec.name}</h2>
                </div>

                <div class="grid-child-posts">
                  <p><b style={{ color: "lightgreen" }}>{rec.solved_count}</b> Solved</p>
                  <p><b style={{ color: "lightgreen" }}>{rec.rating}</b> Rating</p>
                </div>

                <div className="rival-rec-section-card-profile-logos">
                  <ul className="social-icons">
                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="#"><i className="fa fa-codepen"></i></a></li>
                  </ul>
                </div>

                <div className="rival-rec-section-card-btn-container">
                  <button className='btn draw-border' onClick={() =>
                    handleRival(rec.name, rec.tier, rec.solved_count, rec.streak, rec.rating, rec.ranking)
                  }>{follow}</button>
                  <button className='btn draw-border'>tbd...</button>
                </div>
              </div>
            );
          })


          }
        </Carousel>
      </div>

      <div className="rival-search-section" >
        <h3>유저 검색</h3>
        <p>원하는 알고킹 유저를 찾아 라이벌로 등록해 보세요!</p>
        <br />
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={`finder ${isActive ? "active" : ""}`}>
            <div className="finder__outer">
              <div className="finder__inner">
                <div className="finder__icon" onClick={() => userFind()}></div>
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
        {
          showCarousel1 &&
          <div className='search-rival-rec-section-card'>
            <img className='rival-rec-section-card-profile-image' src="img/temp.jpg" alt="" />

            <div className="rival-rec-section-card-profile-info">
              <h2>{serName}</h2>
            </div>

            <div class="grid-child-posts">
              <p><b style={{ color: "lightgreen" }}>{serSolved}</b> Solved</p>
              <p><b style={{ color: "lightgreen" }}>{serRank}</b> Rank</p>
            </div>

            <div className="rival-rec-section-card-profile-logos">
              <ul className="social-icons">
                <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                <li><a href="#"><i className="fa fa-codepen"></i></a></li>
              </ul>
            </div>

            <div className="rival-rec-section-card-btn-container">
              <button className='btn draw-border' onClick={() => {
                handleRival(serName, serTier, serSolved, Number(serStreak), Number(serRating), serRank)
              }}>{follow}</button>
              <button className='btn draw-border'>tbd...</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
} 
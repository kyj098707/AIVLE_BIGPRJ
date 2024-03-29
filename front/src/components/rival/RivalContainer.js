import React, { useState, useEffect } from 'react';
import RivalProblemRec from './RivalProblemRec';
import '../../scss/Rival.scss'
import { Domain } from '../Store';
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { HiUserPlus } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import { Col, Row } from 'antd';

// 모달 팝업 관련
import AlertError from '../temp/AlertError';
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// 모달 팝업 관련

const CARDS = 10;
const MAX_VISIBILITY = 3;

const moveBJ = (name) => {
  window.open(`https://www.acmicpc.net/user/${name}`, '_blank')
}

const moveSAC = (name) => {
  window.open(`https://solved.ac/profile/${name}`, '_blank')
}

const Carousel = ({ children }) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);

  return (
    <div className='carousel'>
      {active > 0 && <button className='rival-rec-section-nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline /></button>}
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
      {active < count - 1 && <button className='rival-rec-section-nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline /></button>}
    </div>
  )
}

export default function Rival() {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showCarousel1, setShowCarousel1] = useState(false);
  const [recRivalList, setRecRivalList] = useState([])
  const [rivalList, setRivalList] = useState([])
  const [follow, setFollow] = useState(Array(20).fill('팔로우'));
  const [followFlag, setFollowFlag] = useState(Array(20).fill(true));
  const [searchFollow, setSearchFollow] = useState('팔로우');
  const [searchFollowFlag, setSearchFollowFlag] = useState(true);
  const [section, setSection] = useState(1);
  const [serName, setSerName] = useState('');
  const [serTierColor, setSerTierColor] = useState('');
  const [serSolved, setSerSolved] = useState('');
  const [serRank, setSerRank] = useState('');
  const [serTier, setSerTier] = useState('');
  const [serStreak, setSerStreak] = useState('');
  const [serRating, setSerRating] = useState('');

  const [vsName, setVsName] = useState('-');
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

  // myRank > vsRank이면 내가 Lose
  // 30(랭크 차이가 50000등 이상) 60(랭크 차이가 50000등 이하) 90(랭크 차이가 10000등 이하)
  // 120, 175, 230
  const progressRatio = myRank === vsRank ? 100 : (myRank > vsRank ? (myRank-vsRank < 10000 ? 90 : (myRank-vsRank < 50000 ? 60 : 30)) : (myRank-vsRank > -10000 ? 120 : (myRank-vsRank > -50000 ? 175 : 230)));

  const userFind = () => {
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }
    setShowCarousel1(true)
    axios
      .get(Domain + 'users/search/', {
        params: {
          username: inputValue
        }, headers: headers
      })
      .then((response) => {
        const { data } = response;
        if (data.result == "error") {
          openModal();
          setModalMsg(data.msg);
        }
        else {
          setSerName(data.name)
          setSerTierColor(findTierColor(data.tier))
          setSerTier(data.tier)
          setSerSolved(data.solved_count)
          setSerRank(data.ranking)
          serRating(data.rating)
          serStreak(data.streak)
        }
      })
      .catch((error) => {
      });
  }

  const handleRival = (name, tier, solved_count, streak, rating, ranking, idx) => {
    const updateFollowFlag = [...followFlag];
    updateFollowFlag[idx] = !updateFollowFlag[idx];
    setFollowFlag(updateFollowFlag);

    const updateFollow = [...follow];
    followFlag[idx] == true ? (updateFollow[idx] = '팔로잉 ✔') : (updateFollow[idx] = '팔로우');
    setFollow(updateFollow);

    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios
      .post(Domain + 'boj/rival/', {
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
      });
    }

  const findTierColor = (tier) => {
    if (1 <= tier && tier <= 5) return 'bronze'
    else if (6 <= tier && tier <= 10) return 'silver'
    else if (11 <= tier && tier <= 15) return 'gold'
    else if (16 <= tier && tier <= 20) return 'platinum'
    else if (21 <= tier && tier <= 25) return 'diamond'
    else if (26 <= tier && tier <= 30) return 'ruby'
    else if (tier === 31) return 'master'
  }

  const handleSearchRival = (name, tier, solved_count, streak, rating, ranking) => {
    // setSearchFollowFlag(!searchFollowFsetSearchFollowlag);
    setSearchFollowFlag(!searchFollowFlag);
    searchFollowFlag == true ? setSearchFollow('팔로잉 ✔') : setSearchFollow('팔로우')
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios
      .post(Domain + 'boj/rival/', {
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
      });

  }

  useEffect(() => {
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios
      .get(Domain + 'boj/rival/rec/', { headers: headers })
      .then((response) => {
        const { data } = response;
        setRecRivalList(data)
      })
      .catch((error) => {
      });
    axios
      .get(Domain + 'boj/rival/list/', { headers: headers })
      .then((response) => {
        const { data } = response;
        setRivalList(data)
      })
      .catch((error) => {
      });
    axios
      .get(Domain + 'boj/myinfo/', { headers: headers })
      .then((response) => {
        const { data } = response;
        setMyName(data.name)
        setMyRank(data.ranking)
        setMyRating(data.rating)
        setMySolved(data.solved_count)
        setMyStreak(data.streak)
        setMyTier(data.tier)
        setVsRank(data.ranking)
      })
      .catch((error) => {
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

  const changeSection = (i) => {
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

  // Modal 팝업 관련
  const [isOpen, setIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('에러입니다.');
  const openModal = () => {
      setIsOpen(true);
  };
  const closeModal = () => {
      setIsOpen(false);
  };
  // Modal 팝업 관련

  return (
    <div className="rival-container">
      <div className='temp'>
        <div className="rival-banner-section">
          <h3>Compete</h3>
        </div>

        <div className="rival-sides-info">
          <div className="rival-choice-section">
            {
              rivalList && rivalList.map((rival, index) => {
                console.log(rivalList)
                return (
                  <div className='rivalProfile'>
                  <FaRegUserCircle 
                    className="icon-bold"
                    size={60}
                    onClick={() => changeSection(index)}
                  />
                  <span>{rival.name}</span>
                  </div>
                )
              })
            }
            <HiUserPlus  size={60} onClick={scrollToSection} />
          </div>

          <div className="info-name-section">
            <div className='info-you' style={{ width: `${progressRatio}%` }}>
              <h3>YOU</h3>
              <hr />
              {myRank === vsRank ? <p>DRAW!</p> : (myRank < vsRank ? <p>WIN!</p> : <p>LOSE!</p>)}
            </div>
            <div className="info-vs">
              <h3>VS</h3>
            </div>
            <div className="info-rival">
              {myRank === vsRank ? <p>DRAW!</p> : (myRank < vsRank ? <p>LOSE!</p> : <p>WIN!</p>)}
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
      </div>

      <div className="rival-vs-section">
        <RivalProblemRec></RivalProblemRec>
      </div>

      <div className='rival-rec-section'>
        <h3>라이벌 추천</h3>
        <p>{myName}님의 라이벌을 추천드립니다.</p>
        <Carousel>
          {
            recRivalList.map((rec, idx) => {
              return (
                <div className='rival-rec-section-card'>
                  <h2 className={`${findTierColor(rec.tier)}`}>{rec.name}</h2>

                  <div class="grid-child-posts">
                    <p><b style={{ color: "lightgreen" }}>{rec.solved_count}</b> Solved</p>
                    <p><b style={{ color: "lightgreen" }}>{rec.rating}</b> Rating</p>
                  </div>

                  <div className="rival-rec-section-card-profile-logos">
                    <ul className="social-icons">
                      <li><img src="img/bj-logo.png" alt="백준로고" onClick={()=>{moveBJ(rec.name)}} /></li>
                      <li><img src="img/sa-logo-2.png" alt="백준로고" onClick={()=>{moveSAC(rec.name)}} /></li>
                    </ul>
                  </div>

                  <div className="rival-rec-section-card-btn-container">
                    <button className='btn draw-border' onClick={() =>
                      handleRival(rec.name, rec.tier, rec.solved_count, rec.streak, rec.rating, rec.ranking, idx)
                    }>{follow[idx]}</button>
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
          showCarousel1 && (
            <div className='search-rival-rec-section-card'>
              <div className="rival-rec-section-card-profile-info">
                <h2 className={`${serTierColor}`}>{serName}</h2>
              </div>

              <div class="grid-child-posts">
                <p><b style={{ color: "lightgreen" }}>{serSolved}</b> Solved</p>
                <p><b style={{ color: "lightgreen" }}>{serRank}</b> Rank</p>
              </div>

              <div className="rival-rec-section-card-profile-logos">
                <ul className="social-icons">
                  {/* tbd.. 서치 눌렀을 때, 해당 이름의 프로필로 이동 */}
                  <li><img src="img/bj-logo.png" alt="백준로고" onClick={()=>{moveBJ(serName)}} /></li>
                  <li><img src="img/sa-logo-2.png" alt="솔브닥로고" onClick={()=>{moveSAC(serName)}} /></li>
                </ul>
              </div>

              <div className="rival-rec-section-card-btn-container">
                <button className='btn draw-border' onClick={() => {
                  handleSearchRival(serName, serTier, serSolved, Number(serStreak), Number(serRating), serRank)
                }}>{searchFollow}</button>
              </div>
            </div>
          )
        }
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
        content: {
            width: "285px",
            height: "300px",
            zIndex: "11",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            boxShadow: "5px 5px 20px rgba($gray, 10%)",
            overflow: "hidden",
            // backgroundColor:'#B0DB7D' Success일 때,
            backgroundColor:'#EF8D9C',
        },
        overlay: {
            // 모달창 띄우기위함
            zIndex: 100,
        },
        }}
      >
        <AlertError alertMessage={modalMsg} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
}
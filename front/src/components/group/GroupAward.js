import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { UserOutlined, CrownOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar, Card, Table, Menu, Input, Button, Modal, Badge,Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import GroupAwardBanner from './GroupAwardRank';

export default function GroupAward() {
  const { id } = useParams();
  const [workbookAwardList, setWorkbookAwardList] = useState([])
  const [grassAward, setGrassAward] = useState([])
  const [ratingAward, setRatingAward] = useState([])
  const [solvedAward, setSolvedAward] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const awardApiUrl = `http://localhost:8000/api/team/${id}/award/`
    const achievementApiUrl = `http://localhost:8000/api/team/${id}/achievement/`
    axios.get(awardApiUrl, { headers: headers })
      .then(response => {
        const { data } = response
        const { streak, solved, rating } = data
        setGrassAward(streak)
        setRatingAward(rating)
        setSolvedAward(solved)
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(achievementApiUrl, { headers: headers })
      .then(response => {
        const { data } = response
        setWorkbookAwardList(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="award-container">
      <div className='groupDetailTitle'>
          <span>Award</span>
      </div>

      <div>
        <GroupAwardBanner></GroupAwardBanner>
      </div>
      {/* 배너 */}
      <Divider> 분야별 </Divider>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        // navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        className='award-swiper'
        style={{padding:'2%'}}
      >
        <SwiperSlide className='award-slide'>
          <div className="award-rank">
            <article className="leaderboard">
              <div className='leaderboard-header'>
                <img src="/img/trophy-48.png" className='leaderboard__icon' alt="트로피" />
                <h1 className="leaderboard__title"><span className="leaderboard__title--top">끈기왕</span><span className="leaderboard__title--bottom">추가내용</span></h1>
              </div>

              <main className="leaderboard__profiles">
                {
                  grassAward.map((grass, index) => {

                    const { user, boj } = grass;
                    const rankNumber = index + 1;
                    const rankImage = `/img/rank_${rankNumber}.gif`;
                    return (
                      <article className="leaderboard__profile">
                      <img src={rankImage} alt="rank-image" className="leaderboard__picture" />
                        <span className="leaderboard__name">{user.username}</span>
                        <span className="leaderboard__value">{boj.streak}</span>
                      </article>
                    )
                  })
                }
              </main>
            </article>
          </div>
          {/* 기존코드
          <Card className='award-card'>
            <h3>끈기왕 🪴</h3>
            <div className='award-card-container'>
              {
                grassAward.map((grass, index) => {

                  const { user, boj } = grass
                  return (
                    <div>{index + 1}. {user.username}({boj.streak}) </div>
                  )
                })
              }
            </div>
          </Card> */}
        </SwiperSlide>
        <SwiperSlide className='award-slide'>
          <div className="award-rank">
            <article className="leaderboard">
              <div className='leaderboard-header'>
                <img src="/img/trophy-48.png" className='leaderboard__icon' alt="트로피" />
                <h1 className="leaderboard__title"><span className="leaderboard__title--top">점수왕</span><span className="leaderboard__title--bottom">추가내용</span></h1>
              </div>

              <main className="leaderboard__profiles">
                {
                  ratingAward.map((rating, index) => {

                    const { user, boj } = rating;
                    const rankNumber = index + 1;
                    const rankImage = `/img/rank_${rankNumber}.gif`;
                    return (
                      <article className="leaderboard__profile">
                      <img src={rankImage} alt="rank-image" className="leaderboard__picture" />
                        <span className="leaderboard__name">{user.username}</span>
                        <span className="leaderboard__value">{boj.rating}</span>
                      </article>
                    )
                  })
                }
              </main>
            </article>
          </div>
          {/* 기존코드
          <Card className='award-card'>
            <h3> 점수왕 🔢</h3>
            <div className='award-card-container'>
              {
                ratingAward.map((rating, index) => {

                  const { user, boj } = rating
                  return (
                    <div>{index + 1}. {user.username}({boj.rating}) </div>
                  )
                })
              }
            </div>
          </Card> */}
        </SwiperSlide>
        <div>
          <SwiperSlide className='award-slide'>
            <div className="award-rank">
              <article className="leaderboard">
                <div className='leaderboard-header'>
                  <img src="/img/trophy-48.png" className='leaderboard__icon' alt="트로피" />
                  <h1 className="leaderboard__title"><span className="leaderboard__title--top" style={{letterSpacing:'2px'}}>문제풀이왕</span><span className="leaderboard__title--bottom">추가내용</span></h1>
                </div>

                <main className="leaderboard__profiles">
                  {
                    solvedAward.map((solved, index) => {

                      const { user, boj } = solved;
                      const rankNumber = index + 1;
                      const rankImage = `/img/rank_${rankNumber}.gif`;
                      return (
                        <article className="leaderboard__profile">
                        <img src={rankImage} alt="rank-image" className="leaderboard__picture" />
                          <span className="leaderboard__name">{user.username}</span>
                          <span className="leaderboard__value">{boj.solved_count}</span>
                        </article>
                      )
                    })
                  }
                </main>
              </article>
            </div>
            {/* 기존코드
            <Card className='award-card'>
              <h3> 문제풀이왕 📝</h3>
              <div className='award-card-container'>
                {
                  solvedAward.map((solved, index) => {

                    const { user, boj } = solved
                    return (
                      <div>{index + 1}. {user.username}({boj.solved_count}) </div>
                    )
                  })
                }
              </div>
            </Card> */}
          </SwiperSlide>
        </div>
      </Swiper>
      <Divider> 문제집 달성도 </Divider>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        autoplay={{ delay: 1000, disableOnInteraction: false }} // 자동 전환을 사용하고 사용자 상호작용 시 중지하지 않도록 설정
        speed={1000} // 전환 속도
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        className='award-swiper'
        style={{padding:'2%', marginBottom:'2%'}}
      >
        {
          workbookAwardList && workbookAwardList.map(wba => {
            console.log(wba[0])
            return (
              <SwiperSlide className='award-slide'>
                <div className="award-rank">
                  <article className="leaderboard">
                    <div className='leaderboard-header'>
                      <img src="/img/test-img.png" className='leaderboard__icon' alt="시험이미지" style={{width:'130px', left:'80px'}} />
                      <h1 className="leaderboard__title"><span className="leaderboard__title--top">{wba[0].workbook.title}</span><span className="leaderboard__title--bottom">추가내용</span></h1>
                    </div>

                    <main className="leaderboard__profiles">
                      {
                        wba.map((data, index) => {
                          const rankNumber = index + 1;
                          const rankImage = `/img/rank_${rankNumber}.gif`;
                          return (
                            <article className="leaderboard__profile">
                            <img src={rankImage} alt="rank-image" className="leaderboard__picture" />
                              <span className="leaderboard__name">{data.user.username}</span>
                              <span className="leaderboard__value">{data.achievement}</span>
                            </article>
                          )
                        })
                      }
                    </main>
                  </article>
                </div>
              
                {/* 기존코드
                <Card className='award-card'>
                  <h3> {wba[0].workbook.title} 📝 </h3>
                  <div className='award-card-container'>
                    {
                      wba.map((data, index) => {
                        return (
                          <div>{index + 1}. {data.user.username}({data.achievement}%) </div>
                        )
                      })
                    }
                  </div>
                </Card> */}
              </SwiperSlide>
            )
          })
        }






      </Swiper>
    </div>
  );
}
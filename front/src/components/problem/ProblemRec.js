import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Switch } from 'antd';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { HiOutlineArrowNarrowRight, HiStar, HiOutlineHashtag } from "react-icons/hi";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import axios from 'axios';

export default function ProblemRec() {
  const [username, setUsername] = useState("")
  const [problemList, setProblemList] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }

    axios.get("http://localhost:8000/api/problems/rec/", { headers: headers })
      .then(response => {
        const { data } = response
        setUsername(data.user)
        setProblemList(data.rec)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  return (
    <div className="problem-layout-01">
      <div className='problem-rec-layout'>
        <div className='problem-rec-left'>
          <h3>추천 문제</h3><br />
          <span>{username} 님의</span><br />
          <span>풀이 이력을 바탕으로</span><br />
          <span>AI가 추천하는 문제에</span><br />
          <span>도전해 보세요!</span><br />
          <button className='rec-more-btn'>추천 문제 더 보기 +</button>
        </div>

        <div className='problem-rec-right'>
          <div className='rival-star-info'>
            <div className='star-icon'>
              <HiStar /></div>
            <span>: 라이벌이 푼 문제</span>
          </div>
          <Swiper
            className='problem-rec-swiper'
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={0}
            navigation
          >
            {


              problemList && problemList.map(pr => {

                const { problem } = pr;
                return (
                  <SwiperSlide className='problem-rec-swiperslide'>
                    <div className='problem-item' onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.number}`, '_blank')}>
                      <div className='card-top'>
                        <div className='problem-item-icons'>
                          <div className='problem-item-star'><HiStar /></div>
                          <Tooltip title={
                            <Typography sx={{ color: 'white' }}>
                              <span># 자료구조</span><br />
                              <span># BFS</span><br />
                            </Typography>
                          }
                            arrow
                            placement='top-end'
                          >
                            <div className='problem-item-tag'
                              id='problem-tag'
                            ><HiOutlineHashtag /></div>
                          </Tooltip>
                        </div>
                        <div className='problem-item-title'>{problem.title}</div>
                        <div className='problem-item-num font-PreR'>{problem.number}</div>
                      </div>

                      <div className='card-bottom font-PreR'>
                        <div className='problem-item-tier'>
                          <img src={`https://static.solved.ac/tier_small/${problem.level}.svg`} alt="bronze5"></img>
                          <span>{problem.tier}</span>
                        </div>
                        <div>
                          <div className='problem-item-info'>
                            <div>
                              <span>제출자 수 :</span>
                              <span>푼 사람 :</span>
                              <span>평균 시도 :</span>
                              <span>정답률 :</span>
                            </div>
                            <div>
                              <span>999</span>
                              <span>{problem.userCount}</span>
                              <span>{problem.avgTreis}</span>
                              <span>33.3%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );

              })

            }
            <SwiperSlide className='swiperslide-btn'>
              <div className='gomore'>
                <span><HiOutlineArrowNarrowRight size={30} fontWeight={100} /></span>
                <span style={{ marginTop: '10px' }}>전체 보기</span>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
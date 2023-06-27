import React from 'react';
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

export default function RivalVersus() {
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
    <div className="rival-layout-01">
      <div className='rival-rec-layout'>
        <div className='rival-rec-left'>
            <h3>추천 문제</h3><br/>
            <span>dbswhd 님의</span><br/>
            <span>라이벌들이</span><br/>
            <span>해결한 문제들입니다.</span><br/>
            <span>도전해 보세요!</span><br/>
            <button className='rec-more-btn'>추천 문제 더 보기 +</button>
        </div>

        <div className='rival-rec-right'>
          <Swiper
              className='rival-rec-swiper'
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={0}
              navigation
          >
          {
            problem.map((problem,idx) => {
              return(
                <SwiperSlide className='rival-rec-swiperslide'>

                  
                  <div className='rival-item' onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.num}`, '_blank')}>
                    <div className='card-top'>
                      <div className='rival-item-icons'>
                        {/* <div className='rival-item-star'><HiStar /></div> */}
                        <Tooltip title={
                                  <Typography sx={{ color: 'white' }}>
                                    {problem.tag.map((tag,tagIdx)=>{ 
                                      return( <><span># {tag}</span><br/></> )
                                    })}
                                  </Typography>
                                 }
                                 arrow
                                 placement='top-end'
                        >
                          <div className='rival-item-tag'
                              id='rival-tag'
                          ><HiOutlineHashtag /></div>
                        </Tooltip>
                      </div>
                      <div className='rival-item-title'>{problem.title}</div>
                      <div className='rival-item-num font-PreR'>{problem.num}</div>
                    </div>
                    
                    <div className='card-bottom font-PreR'>
                      <div className='rival-item-tier'>
                        <img src={problem.img} alt="bronze5"></img>
                        <span>{problem.tier}</span>
                      </div>
                      <div>
                        <div className='rival-item-info'>
                          <div>
                            <span>제출자 수 :</span>
                            <span>푼 사람 :</span>
                            <span>평균 시도 :</span>
                            <span>정답률 :</span>
                          </div>
                          <div>
                            <span>{problem.subNum.toLocaleString()}</span>
                            <span>{problem.solved.toLocaleString()}</span>
                            <span>{problem.avgTry}</span>
                            <span>{problem.ansRatio}</span>
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
                <span><HiOutlineArrowNarrowRight size={30} fontWeight={100}/></span>
                <span style={{marginTop:'10px'}}>전체 보기</span>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
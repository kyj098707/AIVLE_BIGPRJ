import React from 'react';
import '../../css/problem/problem.css'

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Card } from 'antd';

export default function Problem() {
  return(
    <div className="problem-container" style={{width:'100%'}}>
      <div className="problem-layout-banner">
        <div className="problem-layout-banner-title">
          <h2>
            우리 모두가 만들어가는<br/>
            알고리즘 문제해결 학습의 이정표<br/>
            (이거 솔브닥 배너내용입니다.)
          </h2>
          <p>
            알고킹은 Baekjoon Online Judge 문제들에 태그와 난이도를 붙이는 커뮤니티 프로젝트입니다.<br/>
            현재 19,980개 문제에 난이도 정보를 제공하고 있습니다.
          </p>
        </div>
      </div>

      <div className="problem-layout-01">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{width:"100%", height:"300px"}}
        >z
          {
            [1,2,3,4,5].map(function() {
              return(
                <SwiperSlide className='problem-layout-01-swiperslide'>
                  <Card className='problem-layout-01-swiperslide-card'>
                    <p>Card content1243</p>
                    <p>Card content123</p>
                  </Card>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
      </div>
    </div>
  );
}
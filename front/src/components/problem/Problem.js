import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, Switch, Rate } from 'antd';

import ProblemRec from './ProblemRec';
import CollectionOfProblem from './CollectionOfProblem';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../scss/problem.scss'

export default function Problem() {
  
  return(
    <div className="problem-container">
      {/* 배너 */}
      <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // spaceBetween={50}
          slidesPerView={1}
          // navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 전환을 사용하고 사용자 상호작용 시 중지하지 않도록 설정
          speed={1000} // 전환 속도
          // pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className='problem-layout-banner-swiper'
      >
        {
          [1,2,3].map((x,idx)=>{
            return(
              <SwiperSlide className='problem-layout-banner'>
                <div className="problem-layout-banner-title font-PreR">
                  <h5>{x}번 배너입니다.</h5>
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
              </SwiperSlide>
            )
          })
        }
      </Swiper>

      {/* 문제 추천 */}
      <ProblemRec />
      
      {/* 문제집(workbook) 추천 */}
      <CollectionOfProblem />


      {/* 문제집(workbook) 추천 */}
      <div className="problem-layout-03">
        <div className="problem-layout-03-title">
          <h3>추천 문제집</h3><br/>
          <p>프로그래밍 언어 사용에 쉽게 익숙해질 수 있는 문제부터 고급? 수준의 문제들까지 포함된 문제집들입니다.</p>
        </div>

        {
          [1,2,3,4,5].map(function(a) {
            return(
              <div className="problem-layout-03-card-row">
                <Card className='problem-layout-03-card'>
                  <h3>문제집</h3>
                  <Rate disabled defaultValue={a} className='problem-layout-03-card-difficulty' />
                  <p>Card content1</p>
                  <p>Card content1</p>
                  <p>Card content1</p>
                </Card>
      
                <Card className='problem-layout-03-card'>
                  <h3>문제집</h3>
                  <Rate disabled defaultValue={a} className='problem-layout-03-card-difficulty' />
                  <p>Card content1</p>
                  <p>Card content1</p>
                  <p>Card content1</p>
                </Card>
      
                <Card className='problem-layout-03-card'>
                  <h3>문제집</h3>
                  <Rate disabled defaultValue={a} className='problem-layout-03-card-difficulty' />
                  <p>Card content1</p>
                  <p>Card content1</p>
                  <p>Card content1</p>
                </Card>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
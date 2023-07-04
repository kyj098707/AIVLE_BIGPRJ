import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProblemRec from './ProblemRec';
import CollectionOfProblem from './CollectionOfProblem';
import ProblemHint from './ProblemHint';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../scss/problem.scss'

export default function Problem() {
  
  return(
    <div className="problem-container">
      <ProblemHint />
      {/* 배너 */}
      <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 전환을 사용하고 사용자 상호작용 시 중지하지 않도록 설정
          speed={1000} // 전환 속도
          scrollbar={{ draggable: true }}
          className='problem-layout-banner-swiper'
      >
        <SwiperSlide className='problem-layout-banner'>
          <div className="problem-layout-banner-title">
            <h2 className=' font-PreR' style={{fontSize: '28px' , fontWeight:700}}>
              Collaborative filtering<br/><br/>
            </h2>
            <p className=' font-PreR'>
              Algoking은 Baekjoon 문제들에 태그와 난이도를 부여하여
              <br/><br/>
              다양한 유저들이 참여하는 학습 공간입니다.
              <br/><br/>
              본인의 실력에 맞는 문제를 연습하고, 지금까지의 성취를 확인해 보세요!!
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* 문제 추천 */}
      <ProblemRec />
      
      {/* 문제집(workbook) 추천 */}
      <CollectionOfProblem />
      
    </div>
  );
}
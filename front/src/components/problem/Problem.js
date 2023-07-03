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
            <h2 className=' font-PreR' style={{fontSize: '28px'}}>
              Algoking과 함께<br/><br/>
              코딩 테스트 합격 여정을 떠나보세요!!<br/><br/>
            </h2>
            <p className=' font-PreR'>
              Algoking은 Baekjoon 문제들에 태그와 난이도를 부여하여<br/><br/>다양한 유저들이 참여하는 학습 공간입니다.<br/><br/>
              본인의 실력에 맞는 문제를 연습하고, 지금까지의 성취를 확인해 보세요!!
            </p>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide className='problem-layout-banner'>
          <div className="problem-layout-banner-title">
            <h5 className=' font-PreR'>2번 배너입니다.</h5>
            <h2 className=' font-PreR' style={{fontSize: '28px'}}>
              우리 모두가 만들어가는<br/>
              알고리즘 문제해결 학습의 이정표<br/>
              (이거 솔브닥 배너내용입니다.)
            </h2>
            <p className=' font-PreR'>
              알고킹은 Baekjoon Online Judge 문제들에 태그와 난이도를 붙이는 커뮤니티 프로젝트입니다.<br/>
              현재 19,980개 문제에 난이도 정보를 제공하고 있습니다.
            </p>
          </div>
        </SwiperSlide> */}
      </Swiper>

      {/* 문제 추천 */}
      <ProblemRec />
      
      {/* 문제집(workbook) 추천 */}
      <CollectionOfProblem />
      
    </div>
  );
}
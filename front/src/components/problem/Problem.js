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
              다른 유저가 푼 문제를 기반으로 추천을 해줍니다.
              <br/><br/>
              당신과 비슷한 실력의 유저들이 해결한 문제를 추천받아 
              <br/><br/>
              아직 시도하지 않은 문제들에 도전해보세요
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='problem-layout-banner'>
          <div className="problem-layout-banner-title">
            <h2 className=' font-PreR' style={{fontSize: '28px' , fontWeight:700}}>
              Problem Recommendation<br/><br/>
            </h2>
            <p className=' font-PreR'>
              매일 데이터를 갱신하여 
              <br/><br/>
              Multi-VAE, Multi-DAE, RECVAE 세 모델 학습하여
              <br/><br/>
              최적의 모델로 사용자에게 맞는 문제를 추천해드립니다.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='problem-layout-banner'>
          <div className="problem-layout-banner-title">
            <h2 className=' font-PreR' style={{fontSize: '28px' , fontWeight:700}}>
              Why AutoEncoder? <br/><br/>
            </h2>
            <p className=' font-PreR'>
              현재 백준에서 즉각적인 시퀀셜 데이터를 가지고 올 수 없습니다.
              <br/><br/>
              AE류의 모델은 시퀀셜 데이터가 아닌 상황에도 SOTA급 성능을 자랑합니다.
              <br/><br/>
              최적화된 오토인코더들을 만나보세요.
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
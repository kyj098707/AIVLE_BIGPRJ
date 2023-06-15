import React, {useRef, useState} from 'react';
import "../../css/rival/rival.css"

import { Card, Space, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// swiper 6.8.4
// import {Swiper, SwiperSlide} from 'swiper/react';
// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import SwiperCore, { Navigation } from "swiper";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

export default function Rival() {

  // my_info
  const { Meta } = Card;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <CustomPrevArrow />, // 사용자 정의 - prev arrow 컴포넌트
    // nextArrow: <CustomNextArrow />, // 사용자 정의 - next arrow 컴포넌트
  };

  function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, backgroundColor: 'black' }}
        onClick={onClick}
      >
        Previous
      </div>
    );
  }
  
  function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, backgroundColor: 'black' }}
        onClick={onClick}
      >
        Next
      </div>
    );
  }



  return (
    <div className='rival_container'>
      {/* 내 정보 출력 */}
      <div className="my_info">
      <h5><strong>현재 dbswhd 님의 데이터입니다.</strong></h5>
      <p>여기에 뭐가 들어가야 할지...?? (등급 ? , 푼 문제 등등 바쁘면 빼는 것도?)</p>
      <p>라이벌 데이터도 넣을지 고민</p>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </div>

      {/* 라이벌 추천 : Swiper 넣을 예정 */}
      <div className="rival_recommendation">
        <h5><strong>dbswhd님의 라이벌로 추천합니다.</strong></h5>
        <br/>
        <div className='rival_swiper'>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card
              title="강선후"
              style={{height:'300px'}}
              // extra={<a href="#">More</a>}
            >
              <p className='rival_content'>
                백준 ID<br/>
                잔디<br/>
                티어<br/>
                푼문제<br/>
              </p>
              <button class="custom-btn btn-12"><span>ㅋㅋㅋ</span><span>라이벌로 등록</span></button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="강민수"
              style={{height:'300px'}}
              // extra={<a href="#">More</a>}
            >
              <p className='rival_content'>
                백준 ID<br/>
                잔디<br/>
                티어<br/>
                푼문제<br/>
              </p>
              <button class="custom-btn btn-12"><span>ㅋㅋㅋ</span><span>라이벌로 등록</span></button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="김윤종"
              style={{height:'300px'}}
              // extra={<a href="#">More</a>}
            >
              <p className='rival_content'>
                백준 ID<br/>
                잔디<br/>
                티어<br/>
                푼문제<br/>
              </p>
              <button class="custom-btn btn-12"><span>ㅋㅋㅋ</span><span>라이벌로 등록</span></button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="김아르미"
              style={{height:'300px'}}
              // extra={<a href="#">More</a>}
            >
              <p className='rival_content'>
                백준 ID<br/>
                잔디<br/>
                티어<br/>
                푼문제<br/>
              </p>
              <button class="custom-btn btn-12"><span>ㅋㅋㅋ</span><span>라이벌로 등록</span></button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="서종필"
              style={{height:'300px'}}
              // extra={<a href="#">More</a>}
              
            >
              <p className='rival_content'>
                백준 ID<br/>
                잔디<br/>
                티어<br/>
                푼문제<br/>
              </p>
              <button class="custom-btn btn-12"><span>ㅋㅋㅋ</span><span>라이벌로 등록</span></button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="이예빈"
              style={{height:'300px'}}
              // extra={<a href="#">More</a>}
              
            >
              <p className='rival_content'>
                백준 ID<br/>
                잔디<br/>
                티어<br/>
                푼문제<br/>
              </p>
              <button class="custom-btn btn-12"><span>ㅋㅋㅋ</span><span>라이벌로 등록</span></button>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
      </div>
      
      <div className="rival_sol">
        <h5><strong>라이벌이 푼 문제 중, dbswhd님이 풀지 못한 문제들입니다.</strong></h5>
        <br/>
        <div className='rival_swiper'>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card
              title="좌표 정렬하기1"
              // extra={<a href="#">More</a>}
              style={{
                height:'300px'
              }}
            >
              <p className='problem_try'>
                평균시도<br/>
              </p>
              <button class="custom-btn btn-12"><span>풀 수 있어!</span><span>11651</span></button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="좌표 정렬하기2"
              // extra={<a href="#">More</a>}
              style={{
                height:'300px'
              }}
            >
              <p className='problem_try'>
                평균시도<br/>
              </p>
              <button class="custom-btn btn-12"><span>풀 수 있어!</span><span>11651</span></button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="좌표 정렬하기3"
              // extra={<a href="#">More</a>}
              style={{
                height:'300px'
              }}
            >
              <p className='problem_try'>
                평균시도<br/>
              </p>
              <button class="custom-btn btn-12"><span>풀 수 있어!</span><span>11651</span></button>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>

        {/* <div style={{ maxWidth: '600px' }}>
        <Slider {...settings}>
          <div>
            <Space direction="horizontal" size={16}>
              <Card
                title="좌표 정렬하기1"
                // extra={<a href="#">More</a>}
                style={{
                  width: 200,
                }}
              >
                <button class="custom-btn btn-12"><span>풀 수 있어!</span><span>11651</span></button>
              </Card>
            </Space>
          </div>

          <div>
            <Space direction="horizontal" size={16}>
              <Card
                title="좌표 정렬하기2"
                // extra={<a href="#">More</a>}
                style={{
                  width: 200,
                }}
              >
                <button class="custom-btn btn-12"><span>풀 수 있어!</span><span>11652</span></button>
              </Card>
            </Space>
          </div>

          <div>
            <Space direction="horizontal" size={16}>
              <Card
                title="좌표 정렬하기3"
                // extra={<a href="#">More</a>}
                style={{
                  width: 200,
                }}
              >
                <button class="custom-btn btn-12"><span>풀 수 있어!</span><span>11653</span></button>
              </Card>
            </Space>
          </div>
        </Slider>
      </div> */}
      </div>

      <div className="problem_recommendation">
        <h5><strong>나의 실력을 기반으로 문제를 추천해 드릴까요??</strong></h5>
        <p style={{fontSize:"10px", color:"gray"}}>
          라이벌 기반으로 추천된 문제에서 만족스러운 문제를 찾지 못하셨나요??<br/>
          그러면 나의 Solution을 바탕으로 추천된 문제를 참고해보세요.
          <Link to="/problem"><Button className='problem_more' icon={<SearchOutlined />}/></Link></p>
      </div>
      
    </div>
    
  );
} 
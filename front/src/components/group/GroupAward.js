import '../../scss/group.scss'
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { UserOutlined, CrownOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar, Card, Table, Menu, Input, Button, Modal, Badge,Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

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
      >
        <SwiperSlide className='award-slide'>
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
          </Card>
        </SwiperSlide>
        <SwiperSlide className='award-slide'>
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
          </Card>
        </SwiperSlide>
        <div>
          <SwiperSlide className='award-slide'>
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
            </Card>
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
        scrollbar={{ draggable: true }}
        className='award-swiper'
      >
        {

          workbookAwardList && workbookAwardList.map(wba => {
            console.log(wba[0])
            return (
              <SwiperSlide className='award-slide'>
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
                </Card>
              </SwiperSlide>
            )
          })
        }






      </Swiper>
    </div>
  );
}
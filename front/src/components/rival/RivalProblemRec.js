import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Switch } from 'antd';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { HiOutlineArrowNarrowRight, HiStar, HiOutlineInformationCircle, HiOutlineHashtag } from "react-icons/hi";
import axios from 'axios';
import { Domain } from '../Store';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function RivalProblemRec() {
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [problemList, setProblemList] = useState([]);
  const [moreProblemList, setMoreProblemList] = useState([]);
  const handleMoreButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const apiUrlRec = Domain + 'problems/unsolved/'
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios
      .get(apiUrlRec, { headers: headers })
      .then((response) => {
        const { data } = response;
        setUsername(data.user);
        setProblemList(data.unsolved);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });

    const apiUrlRecMore = Domain + 'problems/unsolved/more/'
    axios.get(apiUrlRecMore, { headers: headers })
      .then((response) => {
        const { data } = response

        let temp = []
        data.rec.map(item => {
          const { number, title, tier } = item.problem
          let tmp = {
            "number": number,
            "title": title,
            "tier": tier,
            "mainTier": tier.split(' ')[0],
            "subTier": tier.split(' ')[1],
          }
          temp.push(tmp)
        })
        setMoreProblemList(temp)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  const columns = [
    {
      title: '문제 번호',
      dataIndex: 'number',
      key: 'number',
      align: "center",
      width: "135px",
    },
    {
      title: '문제 이름',
      dataIndex: 'title',
      key: 'title',
      align: "center",
    },
    {
      title: '티어',
      dataIndex: 'tier',
      key: 'tier',
      align: "center",
      width: "175px",
      sorter: (a, b) => {
        const order = ['UnRating', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
        const tierComparison = order.indexOf(a.mainTier) - order.indexOf(b.mainTier);
        if (tierComparison === 0) {
          const subOrder = ['I', 'II', 'III', 'IV', 'V'];
          return subOrder.indexOf(a.subTier) - subOrder.indexOf(b.subTier);
        }
        return tierComparison;
      },
    },
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
      align: "center",
      width: "210px",
    },
  ];
  const handleRowClick = (row) => {
    window.open(`https://www.acmicpc.net/problem/${row.number}`, '_blank')
  }

  return (
    <div className="rival-layout-01">
      <div className='rival-rec-layout'>
        <div className='rival-rec-left'>
          <h3>라이벌문제</h3><br />
          <span>{username} 님의</span><br />
          <span>라이벌들이</span><br />
          <span>해결한 문제들입니다.</span><br />
          <span>도전해 보세요!</span><br />
          <button className='rec-more-btn' onClick={handleMoreButtonClick}>추천 문제 더 보기 +</button>
        </div>

        <div className='rival-rec-right'>
          <div className='prInfo'>
            <div className='info-icon'>
              <HiOutlineInformationCircle size={21} />
            </div>
            <span>추천 문제는 00시에 갱신됩니다.</span>
          </div>
          <Swiper
            className='rival-rec-swiper'
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={0}
            navigation
          >
            {
              problemList && problemList.map((pr, idx) => {
                const { problem } = pr;
                return (
                  <SwiperSlide className='rival-rec-swiperslide'>

                    <div className='rival-item' onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.number}`, '_blank')}>
                      <div className='card-top'>
                        <div className='rival-item-icons'>
                          <Tooltip title={
                            <Typography sx={{ color: 'white' }}>
                              {problem.type_list.map(type => {
                                return (
                                  <span># {type}</span>
                                )
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
                        <div className='rival-item-num font-PreR'>Go!</div>
                      </div>

                      <div className='card-bottom font-PreR'>
                        <div className='rival-item-tier'>
                          <img src={`https://static.solved.ac/tier_small/${problem.level}.svg`} alt="bronze5"></img>
                          <span>{problem.tier}</span>
                        </div>
                            <div className='rival-item-info1'>
                                <span>문제 번호 :</span>
                                <span>푼 사람 :</span>
                                <span>평균 시도 :</span>
                                <span>대표 유형 :</span>
                            </div>
                            <div className='rival-item-info2'>
                                <span>{problem.number}</span>
                                <span>{problem.userCount}</span>
                                <span>{problem.avgTries.toFixed(2)}</span>
                                <span>{problem.first_type}</span>
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
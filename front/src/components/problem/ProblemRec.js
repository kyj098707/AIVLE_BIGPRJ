import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Modal, Button, Table } from 'antd';
import { ThreeCircles } from  'react-loader-spinner'
import { HiOutlineInformationCircle, HiOutlineHashtag } from "react-icons/hi";
import { Domain } from '../Store';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import axios from 'axios';

export default function ProblemRec() {
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
    const apiUrlRec = Domain + 'problems/rec/'
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios
      .get(apiUrlRec, { headers: headers })
      .then((response) => {
        const { data } = response;
        setUsername(data.user);
        setProblemList(data.rec);
        setLoading(false)
      })
      .catch((error) => {
      });

    const apiUrlRecMore = Domain + 'problems/rec/more/'
    axios.get(apiUrlRecMore, { headers: headers })
      .then((response) => {
        const {data} = response

        let temp = []
        data.rec.map(item => {
          const { number, title, tier, type_list } = item.problem
          let tmp = {
            "number": number,
            "title": title,
            "tier": tier,
            "mainTier": tier.split(' ')[0], 
            "subTier": tier.split(' ')[1], 
            "type": type_list[0], 
          }
          temp.push(tmp)
        })
        setMoreProblemList(temp)
      })
      .catch((error) => {
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
    <div className="problem-layout-01">
      <div className="problem-rec-layout">
        <div className="problem-rec-left">
          <h3>추천 문제</h3>
          <br />
          <span>{username} 님의</span>
          <br />
          <span>풀이 이력을 바탕으로</span>
          <br />
          <span>AI가 추천하는 문제에</span>
          <br />
          <span>도전해 보세요!</span>
          <br />
          <button className="rec-more-btn" onClick={handleMoreButtonClick}>
            추천 문제 더 보기 +
          </button>
        </div>

        {
          loading ?
          (
            <div className='loading'>
              <ThreeCircles
                height="100"
                width="100"
                color="#75D779"
                visible={true}
                ariaLabel="three-circles-rotating"
              />
              <span>Generated by AI..</span>
            </div>
          ) : 
          (
            <>
            <div className='problem-rec-right'>
              <div className='prInfo'>
                <div className='info-icon'>
                  <HiOutlineInformationCircle size={21}/>
                </div>
                <span>추천 문제는 00시에 갱신됩니다.</span>
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
                    const { problem } = pr

                    return (
                      <SwiperSlide className='problem-rec-swiperslide'>
                        <div className='problem-item' onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.number}`, '_blank')}>
                          <div className='card-top'>
                            <div className='problem-item-tooltip'>
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
                                <div className='problem-item-tag'
                                ><HiOutlineHashtag /></div>
                              </Tooltip>
                            </div>
                            <div className='problem-item-title'>{problem.title}</div>
                            <div className='problem-item-num font-PreR'>Go !</div>
                          </div>

                          <div className='card-bottom font-PreR'>
                            <div className='problem-item-tier'>
                              <img src={`https://static.solved.ac/tier_small/${problem.level}.svg`} alt="bronze5"></img>
                              <span>{problem.tier}</span>
                            </div>
                              <div className='problem-item-info1'>
                                <span>문제 번호 :</span>
                                <span>푼 사람 :</span>
                                <span>평균 시도 :</span>
                                <span>대표 유형 :</span>
                              </div>
                              <div className='problem-item-info2'>
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
              </Swiper>
            </div>
            </>
          )
        }
      </div>

      <Modal 
        className='prModal'
        title={<span className='prmTitle'>추천 문제</span>}
        visible={isModalOpen}
        centered={true}
        onCancel={handleModalCancel}
        width={1050}
        footer={[
          <Button key="back" onClick={handleModalCancel}
          >닫기</Button>
        ]}
      >
        <Table 
          dataSource={moreProblemList}
          columns={columns}
          rowClassName={()=>'prItemRow'}
          onRow={(row, idx)=>({
            onClick: ()=> handleRowClick(row)
          })}
        />
      </Modal>
    </div>
  );
}

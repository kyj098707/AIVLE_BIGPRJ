import React, { useState } from 'react';
import { Modal, Button, Table } from 'antd';

export default function Problem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempItem, setTempItem] = useState();

  const handleModalOpen = (key) => {
    setTempItem(tempItems[key])
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

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
    },
    {
      title: '유형',
      dataIndex: 'type',
      key: 'type',
      align: "center",
      width: "210px",
    },
  ];

  const tempItems = [
    [
      {
        "number": 10808,
        "title": '알파벳 개수',
        "tier": 'Bronze 4'
      },
      {
        "number": 2577,
        "title": '숫자의 개수',
        "tier": 'Bronze 2'
      },
      {
        "number": 1475,
        "title": '방 번호',
        "tier": 'Silver 5'
      }
    ],
    [
      {
        "number": 1406,
        "title": '에디터',
        "tier": 'Silver 2'
      },
      {
        "number": 5397,
        "title": '키로거',
        "tier": 'Silver 2'
      },
      {
        "number": 1158,
        "title": '요세푸스 문제',
        "tier": 'Silver 4'
      }
    ],
    [
      {
        "number": 6198,
        "title": '옥상 정원 꾸미기',
        "tier": 'Gold 5'
      },
      {
        "number": 17298,
        "title": '오큰수',
        "tier": 'Gold 4'
      },
      {
        "number": 6549,
        "title": '히스토그램에서 가장 큰 직사각형',
        "tier": 'Platinum 5'
      }
    ],
  ];


  const handleRowClick = (row) => {
    window.open(`https://www.acmicpc.net/problem/${row.number}`, '_blank')
  }

  return (
    <div className="problem-layout-02">
      <div className="problem-layout-02-container">
        <div className="problem-layout-02-title">
          <div>
            <h3>추천 문제집</h3>
            <br />
            <span>알고킹이 추천하는 문제집을 풀어 보면서 문제 해결 능력을 향상시켜 보세요!</span>
            <br />
            <span>프로그래밍 언어 사용에 쉽게 익숙해질 수 있는 문제부터 고급? 수준의 문제들까지 포함된 문제집들입니다.</span>
          </div>
        </div>

        <div className="card-line1">
          {[0, 1, 2].map((x, idx) => {
            return (
              <div className="col-card-item"
                   key={x}
                   onClick={()=>handleModalOpen(x)}
              >
                <div className="col-card-top">
                  <img src={`img/col_${x}.jpg`} alt={`col_${x}`} />
                </div>
                <div className="col-card-bottom">
                  <div className="col-card-title">
                    <span>기초 문제집 {x}</span>
                  </div>
                  <div className="col-card-content">
                    <span className="gold">Gold 5</span>
                    <span className="col-card-space">~</span>
                    <span className="platinum">Platinum 5</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card-line1">
          {[3, 4, 5].map((x, idx) => {
            return (
              <div className="col-card-item"
                   key={x}
                   onClick={()=>handleModalOpen(x)}
              >
                <div className="col-card-top">
                  <img src={`img/col_${x}.jpg`} alt={`col_${x}`} />
                </div>
                <div className="col-card-bottom">
                  <div className="col-card-title">
                    <span>기초 문제집 {x}</span>
                  </div>
                  <div className="col-card-content">
                    <span className="gold">Gold 5</span>
                    <span className="col-card-space">~</span>
                    <span className="platinum">Platinum 5</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        className='cpModal'
        title={<span className='prmTitle'>문제집</span>}
        visible={isModalOpen}
        centered={true}
        onCancel={handleModalCancel}
        width={1050}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            닫기
          </Button>
        ]}
      >
        <Table
          dataSource={tempItem}
          columns={columns}
          rowClassName={()=>'cpItemRow'}
          onRow={(row, idx)=>({
            onClick: ()=> handleRowClick(row)
          })}
        />
      </Modal>
    </div>
  );
}

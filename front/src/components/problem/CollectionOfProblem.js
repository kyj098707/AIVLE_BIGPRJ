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
        "number": 10871,
        "title": 'X보다 작은 수',
        "tier": 'Bronze 5',
        "type": "기초"
      },
      {
        "number": 1000,
        "title": 'A+B',
        "tier": 'Bronze 5',
        "type": "기초"
      },
      {
        "number": 2557,
        "title": 'Hello World',
        "tier": 'Bronze 5',
        "type": "기초"
      },
      {
        "number": 10171,
        "title": '고양이',
        "tier": 'Bronze 5',
        "type": "기초"
      },
      {
        "number": 10869,
        "title": '사칙연산',
        "tier": 'Bronze 5',
        "type": "기초"
      },
      {
        "number": 9498,
        "title": '시험 성적',
        "tier": 'Bronze 5',
        "type": "기초"
      },
      {
        "number": 2752,
        "title": '세수정렬',
        "tier": 'Bronze 4',
        "type": "기초"
      },
      {
        "number": 2753,
        "title": '윤년',
        "tier": 'Bronze 5',
        "type": "기초"
      }
      
    ],
    [
      {
        "number": 10808,
        "title": '알파벳 개수',
        "tier": 'Bronze 4',
        "type": "배열"
      },
      {
        "number": 2577,
        "title": '숫자의 개수',
        "tier": 'Bronze 2',
        "type": "배열"
      },
      {
        "number": 1475,
        "title": '방 번호',
        "tier": 'Silver 5',
        "type": "배열"
      },
      {
        "number": 3273,
        "title": '두 수의 합',
        "tier": 'Silver 3',
        "type": "배열"
      },
      {
        "number": 10807,
        "title": '개수 세기',
        "tier": 'Bronze 5',
        "type": "배열"
      },
      {
        "number": 13300,
        "title": '방 배정',
        "tier": 'Bronze 2',
        "type": "배열"
      },
      {
        "number": 11328,
        "title": 'Strfry',
        "tier": 'Bronze 2',
        "type": "배열"
      },
      {
        "number": 1919,
        "title": '애너그램 만들기	',
        "tier": 'Bronze 2',
        "type": "배열"
      },
    ],
    [
      {
        "number": 10828,
        "title": '스택',
        "tier": 'Silver 4',
        "type": "스택"
      },
      {
        "number": 10773,
        "title": '제로',
        "tier": 'Silver 4',
        "type": "스택"
      },
      {
        "number": 1874,
        "title": '스택 수열',
        "tier": 'Silver 2',
        "type": "스택"
      },
      {
        "number": 2493,
        "title": '탑',
        "tier": 'Gold 5',
        "type": "스택"
      },
      {
        "number": 6198,
        "title": '옥상 정원 꾸미기',
        "tier": 'Gold 5',
        "type": "스택"
      },
      {
        "number": 17298,
        "title": '오큰수',
        "tier": 'Gold 4',
        "type": "스택"
      },
      {
        "number": 3015,
        "title": '오아시스 재결합',
        "tier": 'Platinum 5',
        "type": "스택"
      },
      {
        "number": 6549,
        "title": '히스토그램에서 가장 큰 직사각형',
        "tier": 'Platinum 5',
        "type": "스택"
      },
    ],
    [
      {
        "number": 10845,
        "title": '큐',
        "tier": 'Silver 4',
        "type": "큐"
      },
      {
        "number": 18258,
        "title": '큐2',
        "tier": 'Silver 4',
        "type": "큐"
      },
      {
        "number": 2164,
        "title": '카드2',
        "tier": 'Silver 4',
        "type": "큐"
      },
      {
        "number": 10866,
        "title": '덱',
        "tier": 'Silver 4',
        "type": "덱"
      },
      {
        "number": 1021,
        "title": '회전하는 큐	',
        "tier": 'Silver 3',
        "type": "덱"
      },
      {
        "number": 5430,
        "title": 'AC',
        "tier": 'Gold 5',
        "type": "덱"
      },
    ],
    [
      {
        "number": 1926,
        "title": '그림',
        "tier": 'Silver 1',
        "type": "BFS"
      },
      {
        "number": 2178,
        "title": '미로 탐색',
        "tier": 'Silver 1',
        "type": "BFS"
      },
      {
        "number": 7576,
        "title": '토마토',
        "tier": 'Gold 5',
        "type": "BFS"
      },
      {
        "number": 4179,
        "title": '불!',
        "tier": 'Gold 4',
        "type": "BFS"
      },
      {
        "number": 1697,
        "title": '숨바꼭질',
        "tier": 'Silver 1',
        "type": "BFS"
      },
      {
        "number": 1012,
        "title": '유기농 배추',
        "tier": 'Silver 2',
        "type": "BFS"
      },
      {
        "number": 10026,
        "title": '적록색약',
        "tier": 'Gold 5',
        "type": "BFS"
      },
      {
        "number": 7569,
        "title": '토마토',
        "tier": 'Gold 5',
        "type": "BFS"
      },
    ],
    [
      {
        "number": 15649,
        "title": 'N과 M (1)',
        "tier": 'Silver 3',
        "type": "백트레킹"
      },
      {
        "number": 9663,
        "title": 'N-Queen',
        "tier": 'Gold 4',
        "type": "백트레킹"
      },
      {
        "number": 1182,
        "title": '부분수열의 합',
        "tier": 'Silver 2',
        "type": "백트레킹"
      },
      {
        "number": 15650,
        "title": 'N과 M (2)',
        "tier": 'Silver 3',
        "type": "백트레킹"
      },
      {
        "number": 15651,
        "title": 'N과 M (3)',
        "tier": 'Silver 3',
        "type": "백트레킹"
      },
      {
        "number": 15652,
        "title": 'N과 M (4)',
        "tier": 'Silver 3',
        "type": "백트레킹"
      },
      {
        "number": 15654,
        "title": 'N과 M (5)',
        "tier": 'Silver 3',
        "type": "백트레킹"
      },
      {
        "number": 15655,
        "title": 'N과 M (6)',
        "tier": 'Silver 3',
        "type": "백트레킹"
      },

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
        {/* 문제집1 */}
          <div className="col-card-item"
            key={0}
            onClick={() => handleModalOpen(0)}
          >
            <div className="col-card-top">
              <img src={`img/col_${0}.jpg`} alt={`col_${0}`} />
            </div>
            <div className="col-card-bottom">
              <div className="col-card-title">
                <span>입문자용 문제집</span>
              </div>
              <div className="col-card-content">
                <span className="bronze">Bronze 5</span>
                <span className="col-card-space">~</span>
                <span className="bronze">Bronze 4</span>
              </div>
            </div>
          </div>
        {/* 문제집1 */}
        <div className="col-card-item"
            key={1}
            onClick={() => handleModalOpen(1)}
          >
            <div className="col-card-top">
              <img src={`img/col_${1}.jpg`} alt={`col_${1}`} />
            </div>
            <div className="col-card-bottom">
              <div className="col-card-title">
                <span>기초 배열 문제집</span>
              </div>
              <div className="col-card-content">
                <span className="bronze">Bronze 5</span>
                <span className="col-card-space">~</span>
                <span className="silver">Silver 3</span>
              </div>
            </div>
          </div>
        {/* 문제집1 */}
        <div className="col-card-item"
            key={2}
            onClick={() => handleModalOpen(2)}
          >
            <div className="col-card-top">
              <img src={`img/col_${2}.jpg`} alt={`col_${2}`} />
            </div>
            <div className="col-card-bottom">
              <div className="col-card-title">
                <span>스택 문제집</span>
              </div>
              <div className="col-card-content">
                <span className="silver">Silver 4</span>
                <span className="col-card-space">~</span>
                <span className="platinum">Platinum 5</span>
              </div>
            </div>
          </div>
      </div>
      <div className="card-line1">
        {/* 문제집1 */}
          <div className="col-card-item"
            key={3}
            onClick={() => handleModalOpen(3)}
          >
            <div className="col-card-top">
              <img src={`img/col_${3}.jpg`} alt={`col_${3}`} />
            </div>
            <div className="col-card-bottom">
              <div className="col-card-title">
                <span>큐와 덱 문제집</span>
              </div>
              <div className="col-card-content">
                <span className="silver">Silver 4</span>
                <span className="col-card-space">~</span>
                <span className="gold">Gold 5</span>
              </div>
            </div>
          </div>
        {/* 문제집1 */}
        <div className="col-card-item"
            key={1}
            onClick={() => handleModalOpen(4)}
          >
            <div className="col-card-top">
              <img src={`img/col_${4}.jpg`} alt={`col_${4}`} />
            </div>
            <div className="col-card-bottom">
              <div className="col-card-title">
                <span>BFS 문제집</span>
              </div>
              <div className="col-card-content">
                <span className="silver">Silver 1</span>
                <span className="col-card-space">~</span>
                <span className="gold">Gold 4</span>
              </div>
            </div>
          </div>
        {/* 문제집1 */}
        <div className="col-card-item"
            key={5}
            onClick={() => handleModalOpen(5)}
          >
            <div className="col-card-top">
              <img src={`img/col_${5}.jpg`} alt={`col_${5}`} />
            </div>
            <div className="col-card-bottom">
              <div className="col-card-title">
                <span>백트래킹 문제집</span>
              </div>
              <div className="col-card-content">
                <span className="silver">Silver 3</span>
                <span className="col-card-space">~</span>
                <span className="gold">Gold 4</span>
              </div>
            </div>
          </div>
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
          rowClassName={() => 'cpItemRow'}
          onRow={(row, idx) => ({
            onClick: () => handleRowClick(row)
          })}
        />
      </Modal>
    </div>
  );
}

import React from 'react';
import { Card, Switch, Rate } from 'antd';

export default function Problem() {

  return(
    <div className="problem-layout-02">
      <div className='problem-layout-02-container'>
        <div className="problem-layout-02-title">
          <div>
            <h3>추천 문제집</h3><br/>
            <span>알고킹이 추천하는 문제집을 풀어 보면서 문제 해결 능력을 향상시켜 보세요!</span><br/>
            <span>프로그래밍 언어 사용에 쉽게 익숙해질 수 있는 문제부터 고급? 수준의 문제들까지 포함된 문제집들입니다.</span>
          </div>
          <button className='col-more-btn'>더 보기 +</button>
        </div>

        
        <div className='card-line1'>
        {
          [1,2,3].map((x,idx) => {
            return(
              <div className='col-card-item'>
                <div className='col-card-top'>
                  <img src={`img/col_${x}.jpg`} />
                </div>
                <div className='col-card-bottom'>
                  <div className='col-card-title'>
                    <span>기초 문제집 {x}</span>
                  </div>
                  <div className='col-card-content'>
                    <span className='gold'>Gold 5</span>
                    <span className='col-card-space'>~</span>
                    <span className='platinum'>Platinum 5</span>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>

        <div className='card-line1'>
        {
          [4,5,6].map((x,idx) => {
            return(
              <div className='col-card-item'>
                <div className='col-card-top'>
                  <img src={`img/col_${x}.jpg`} />
                </div>
                <div className='col-card-bottom'>
                  <div className='col-card-title'>
                    <span>기초 문제집 {x}</span>
                  </div>
                  <div className='col-card-content'>
                    <span className='gold'>Gold 5</span>
                    <span className='col-card-space'>~</span>
                    <span className='platinum'>Platinum 5</span>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>

      </div>


    </div>
  );
}
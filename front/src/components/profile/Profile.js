import React, { useState } from 'react';
import '../../scss/Profile.scss'

export default function Profile() {
  return(
    <div className="profile_wrap">
      {/* 사진??, 등급, 이름 */}
      <div className="greenContainer">
        <div className="profile_div">
          <div className="grade">루비</div>
          <div className="name">갓윤종</div>
        </div>
      </div>

      {/*  */}
      <div className="summaryContainer">
        <div className="item">
          <div className="number">354</div>
          <div>제출횟수</div>
        </div>

        <div className="item">
          <div className="number">354</div>
          <div>푼 문제</div>
        </div>

        <div className="item">
          <div className="number">354</div>
          <div>즐겨찾기</div>
        </div>
      </div>

      {/* 뭘 넣을까... 뺄까? */}
      <div className="shippingStatusContainer">
        <div className="title">
          주문/배송조회
        </div>
        <div className="status">
          <div className="item">
            <div>
              <div className="green number">6</div>
              <div className="text">장바구니</div>
            </div>
            <div class="icon"> > </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="listContainer">
        <p>dd</p>
      </div>    
      {/*  */}
      <div className="listContainer">
        <p>dd</p>
      </div>
      {/*  */}
      <div className="infoContainer">
        <p>dd</p>
      </div>
    </div>
  );
}
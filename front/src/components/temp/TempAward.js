import React from 'react';
import '../../scss/temp.scss'

export default function TempAward () {
  return (
    <div className="award-container">
      <div className="award-banner">
        <div className="hall-of-fame">
          <h1 className="title">HALL OF FAME</h1> 
        </div>
      </div>

      <div className="award-rank">
      <article className="leaderboard">
      <div className='leaderboard-header'>
        <img src="/img/trophy-48.png" className='leaderboard__icon' alt="ssss" />
        <h1 className="leaderboard__title"><span className="leaderboard__title--top">끈기왕?</span><span className="leaderboard__title--bottom">추가내용</span></h1>
      </div>

      <main className="leaderboard__profiles">
        <article className="leaderboard__profile">
          <span className="leaderboard__name">aaaaaaaaaa</span>
          <span className="leaderboard__value">35<span>개</span></span>
        </article>

        <article className="leaderboard__profile">
          {/* <img src="https://randomuser.me/api/portraits/men/97.jpg" alt="Dustin Moskovitz" className="leaderboard__picture" /> */}
          <span className="leaderboard__name">aaaaaaaaaa</span>
          <span className="leaderboard__value">9<span>개</span></span>
        </article>

        <article className="leaderboard__profile">
          {/* <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Sheryl Sandberg" className="leaderboard__picture" /> */}
          <span className="leaderboard__name">aaaaaaaaaa</span>
          <span className="leaderboard__value">1<span>개</span></span>
        </article>

        <article className="leaderboard__profile">
          {/* <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Sheryl Sandberg" className="leaderboard__picture" /> */}
          <span className="leaderboard__name">aaaaaaaaaa</span>
          <span className="leaderboard__value">1<span>개</span></span>
        </article>

        <article className="leaderboard__profile">
          {/* <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Sheryl Sandberg" className="leaderboard__picture" /> */}
          <span className="leaderboard__name">aaaaaaaaaa</span>
          <span className="leaderboard__value">1<span>개</span></span>
        </article>
{/* 저장 */}
        

        {/* Add more profile articles here */}
      </main>
    </article>
      </div>
    </div>
  )
}
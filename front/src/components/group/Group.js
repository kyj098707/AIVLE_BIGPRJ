import '../../scss/group.scss'
import React, { useState } from 'react'
import GroupInvite from './GroupInvite'
import GroupRanking from './GroupRanking'
import MyKingdom from './MyKingdom'
import KingdomList from './KingdomList'

export default function Group() {
  const [activeLink, setActiveLink] = useState("/myKingdom");

  const handleClick = (e) => {
    setActiveLink("/"+e)
  }

  return (
    <>
      {/* 배너 */}
      <div className='group_div'>
        <img src="img/white_algoking1.png" alt="logo" className="logo2" />
        <div className='group_disciription'>
          <h3>
            알고킹덤에서 다같이 준비하고,
            <br />코딩테스트를 합격해보세요
          </h3>
          <h5>킹덤을 만들어, 다같이 설정한 문제집을 풀고 진행 상황을 체크할 수 있어요
            <br /> 킹덤들끼리 문제를 풀어 상위권 랭킹에도 도전해보세요!
          </h5>
          {/* <Button className='create_kingdom' onClick={() => setCreateGroupModalOn(true)}>알고킹덤 건설</Button> */}
        </div>
      </div>

      {/* Container */}
      <div className='group_contents_all'>

        {/* remote controller */}
        <div className='remote'>
          <GroupRanking />
          <GroupInvite />
        </div>

        {/* main content */}
        <div className='group_contents'>
          <h5 className="group_header">
            <div style={{width:'130px'}}
                 onClick={ ()=>handleClick("myKingdom") }
                 className={activeLink === '/myKingdom' ? 'active': ''}
            >나의 킹덤</div>
            <div style={{width:'140px'}}
                 onClick={ ()=>handleClick("kingdomList") }
                 className={activeLink === '/kingdomList' ? 'active': ''}
            >킹덤리스트</div>
          </h5>

          
          {
            {
              "/myKingdom": <MyKingdom />,
              "/kingdomList": <KingdomList />
            }[activeLink]
          }
        </div>

      </div>
    </>
  );
}
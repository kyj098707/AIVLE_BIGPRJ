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
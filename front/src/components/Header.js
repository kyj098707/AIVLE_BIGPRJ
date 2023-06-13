import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Header() {
  const [menuState, setMenuState] = useState(false);
  const [sideMenuState, setSideMenuState] = useState(false);
  return (
    // <header>
    //   <div className="inner">
    //     <img src="img/algoking1.png" alt="logo" className="logo" />
    //     <h1 className="title">ALGOKING</h1>
    //     <ul className="gnb">
    //       <Link to="#">Menu1</Link>
    //       <Link to="#">Menu2</Link>
    //       <Link to="/profile">프로필</Link>
    //       <Link to="/about">About</Link> {"|"}
    //     </ul>
    //     <div className="sign_all">
    //       <Link to="/login" className='sign_in'>Sign in</Link>
    //       <Link to="/register"  className='sign_up'>Sign Up</Link>
    //     </div>
    //   </div>
    // </header>

    <>
      <nav>
        <Link to="/">
          <img src="img/algoking1.png" alt="logo" className="logo" width={80} height={80}/>
        </Link>

        <div>
          <ul id='navbar' className={sideMenuState == true ? "#navbar active" : "#navbar"}>
            {/* <li><a href="" className='active'>Home</a></li> */}
            <li><Link to="/group">Group</Link></li>
            <li><Link to="/problem">Problem</Link></li>
            <li><Link to="/rival">Compete</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/register">Sign up</Link></li>
            

            {/* <li><a href="">Group</a></li>
            <li><a href="">Problem</a></li>
            <li><a href="">Test</a></li>
            <li><a href="">About</a></li>
            <li><a href="/login">Sign in</a></li>
            <li><a href="/register">Sign up</a></li> */}
          </ul>
        </div>

        <div id='mobile'>
          {/* <i className='fas fa-bars'></i>
          <i className='fas fa-times'></i> */}
          <i onClick={()=>{setMenuState(!menuState); setSideMenuState(!sideMenuState);}} id='bar' className={menuState == true ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </>








  );
}

export default Header;
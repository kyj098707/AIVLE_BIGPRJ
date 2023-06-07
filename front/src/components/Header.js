import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="inner">
        <img src="img/algoking1.png" alt="logo" className="logo" />
        <h1 className="title">ALGOKING</h1>
        <ul className="gnb">
          <Link to="#">Menu1</Link>
          <Link to="#">Menu2</Link>
          <Link to="/profile">프로필</Link>
          <Link to="/about">About</Link> {"|"}
        </ul>
        <div className="sign_all">
          <Link to="/login" className='sign_in'>Sign in</Link>
          <Link to="/register"  className='sign_up'>Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
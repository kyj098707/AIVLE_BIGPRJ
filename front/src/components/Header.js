import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from "./algoking2.png"

function Header() {
  const [activeLink, setActaiveLink] = useState();
  const [menuState, setMenuState] = useState(false);
  const [sideMenuState, setSideMenuState] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const handleClick = (link) => {
    setActaiveLink(link);
  }

  let authLinks;
  if (token) {
    authLinks = (
      <div className="user flex">
        <span>안녕하세요 {localStorage.getItem("email")}님</span>
        <ul id='navbar'>
          <li><Link onClick={()=>{localStorage.clear()
                                  navigate("/about")}}
              >Logout</Link></li>
        </ul>
      </div>
    );
  } else {
    authLinks = (
      <div className="user flex">
        <ul id='navbar'>
          <li id='login'><Link to="/login">Sign in</Link></li>
          <li><Link to="/register">Sign up</Link></li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <nav>
        <div className="header flex">
          <img src="img/logo_hard.png" 
              alt="logo" 
              className="logo" 
              width={125} height={40}
              onClick={() => {handleClick("/"); navigate("/")}}
          />
          <ul id='navbar' className={sideMenuState == true ? "#navbar active" : "#navbar"}>
            <li><Link to="/group" 
                      onClick={()=>{handleClick("/group")}}
                      className={activeLink === '/group' ? 'active': ''}>Group</Link></li>
            <li><Link to="/problem" 
                      onClick={()=>{handleClick("/problem")}}
                      className={activeLink === '/problem' ? 'active': ''}>Problem</Link></li>
            <li><Link to="/rival" 
                      onClick={()=>{handleClick("/rival")}}
                      className={activeLink === '/rival' ? 'active': ''}>Compete</Link></li>
            <li><Link to="/board" 
                      onClick={()=>{handleClick("/board")}}
                      className={activeLink === '/board' ? 'active': ''}>Community</Link></li>
            <li><Link to="/about" 
                      onClick={()=>{handleClick("/about")}}
                      className={activeLink === '/about' ? 'active': ''}>About</Link></li>
          </ul>
        </div>

        {authLinks}

        <div id='mobile'>
          <i onClick={()=>{setMenuState(!menuState); setSideMenuState(!sideMenuState);}} id='bar' className={menuState == true ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </>
  );
}

export default Header;
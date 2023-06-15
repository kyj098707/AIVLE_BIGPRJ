import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from './Store';

import headerLogo from "./algoking2.png"

function Header(props) {
  const [activeLink, setActaiveLink] = useState();
  const [menuState, setMenuState] = useState(false);
  const [sideMenuState, setSideMenuState] = useState(false);
  const [username, setUsername] = useState("");
  const { isLogin, isLoginFalse } = useStore();
  const navigate = useNavigate();

  const handleClick = (link) => {
    setActaiveLink(link);
  }

  useEffect(() => {
    setUsername(localStorage.getItem("email"))
  }, [isLogin]);

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

        {
          isLogin ? (
            <div className="user flex">
              <span>안녕하세요 {username}님</span>
              <ul id='navbar'>
                <li><Link onClick={()=>{localStorage.clear()
                                        handleClick("/logout")
                                        navigate("/about")
                                        isLoginFalse()}}
                    >Logout</Link></li>
              </ul>
            </div>
          ) : (
            <div className="user flex">
              <ul id='navbar'>
                <li id='login'><Link to="/login"
                                     onClick={()=>{handleClick("/login")}}
                                     className={activeLink === '/login' ? 'active': ''}
                               >Sign in</Link></li>
                <li><Link to="/register"
                          onClick={()=>{handleClick("/register")}}
                          className={activeLink === '/register' ? 'active': ''}
                    >Sign up</Link></li>
              </ul>
            </div>
          )
        }

        <div id='mobile'>
          <i onClick={()=>{setMenuState(!menuState); setSideMenuState(!sideMenuState);}} id='bar' className={menuState == true ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </>
  );
}

export default Header;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore, Domain, refresh } from './Store';
import axios from "axios";

import headerLogo from "./algoking2.png"


export default function Header(props) {
  const [activeLink, setActiveLink] = useState();
  const [menuState, setMenuState] = useState(false);
  const [sideMenuState, setSideMenuState] = useState(false);
  const [username, setUsername] = useState("");
  const { isLogin, isLoginFalse } = useStore((state) => ({
    isLogin: state.isLogin,
    isLoginFalse: state.isLoginFalse,
  }));
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (link) => {
    setActiveLink(link);
  }

  useEffect(() => {
    const token = localStorage.getItem('access');


    const headers = { 'Authorization': `Bearer ${token}` }
    const verifyUrl = Domain + 'verify/'
    axios
      .get(verifyUrl, { headers: headers })
      .then((response) => {
        const { data } = response;
        setUsername(data.username)
      })
      .catch((error) => {
        isLoginFalse()
        const refreshToken = localStorage.getItem('refresh');
        const result = refresh(refreshToken)
        if (result == "Invalid refresh token"){
          navigate('/login')
        }
      });
    setActiveLink('/' + location.pathname.split('/')[1]);
  }, [location.pathname]);


  return (
    <>
      <nav>
        {
          isLogin ? (
            <>
              <div className="header flex">
                <img src="img/kingking.png"
                  alt="logo"
                  className="logo"
                  width={125} height={40}
                  onClick={() => { handleClick("/"); navigate("/") }}
                />
                <ul id='navbar' className={sideMenuState == true ? "#navbar active" : "#navbar"}>
                  <li><Link to="/group"
                    onClick={() => { handleClick("/group") }}
                    className={activeLink === '/group' ? 'active' : ''}>Group</Link></li>
                  <li><Link to="/problem"
                    onClick={() => { handleClick("/problem") }}
                    className={activeLink === '/problem' ? 'active' : ''}>Problem</Link></li>
                  <li><Link to="/rival"
                    onClick={() => { handleClick("/rival") }}
                    className={activeLink === '/rival' ? 'active' : ''}>Compete</Link></li>
                  <li><Link to="/board"
                    onClick={() => { handleClick("/board") }}
                    className={activeLink === '/board' ? 'active' : ''}>Community</Link></li>
                  <li><Link to="/about"
                    onClick={() => { handleClick("/about") }}
                    className={activeLink === '/about' ? 'active' : ''}>About</Link></li>
                </ul>
              </div>
              <div className="user flex">
                <span>안녕하세요<span className="username">{username}</span>님</span>
                <ul id='navbar'>
                  <li><Link to="/"
                    onClick={() => {
                      localStorage.clear()
                      handleClick("/logout")
                      isLoginFalse()
                    }}
                  >Logout</Link></li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="header flex">
                <img src="img/kingking.png"
                  alt="logo"
                  className="logo"
                  width={125} height={40}
                  onClick={() => { handleClick("/"); navigate("/") }}
                />
              </div>
              <div className="user flex">
                <ul id='navbar' className={sideMenuState == true ? "#navbar active" : "#navbar"}>
                  <li><Link to="/about"
                    onClick={() => { handleClick("/about") }}
                    className={activeLink === '/about' ? 'active' : ''}
                  >About</Link></li>
                  <li id='login'><Link to="/login"
                    onClick={() => { handleClick("/login") }}
                    className={activeLink === '/login' ? 'active' : ''}
                  >Sign in</Link></li>
                  <li><Link to="/agreement"
                    onClick={() => { handleClick("/agreement") }}
                    className={activeLink === '/agreement' ? 'active' : ''}
                  >Sign up</Link></li>
                </ul>
              </div>
            </>
          )
        }

        <div id='mobile'>
          <i onClick={() => { setMenuState(!menuState); setSideMenuState(!sideMenuState); }} id='bar' className={menuState == true ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </>
  );
}
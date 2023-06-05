import React from "react";

function Footer() {
  return (
    <footer>
      <ul className="inner">
        <li className="info">
          <h1 className="logo">ALGOKING</h1>
        </li>
        <li className="nav">
          <h4>KT AIVLE SCHOOL 3rd 11-41</h4>
          <h4>KdS</h4>
        </li>

        <div className="sns">
          <a href="#">
            <i class="fa-brands fa-connectdevelop"></i>
          </a>
          <a href="#">
            <i class="fa-solid fa-b"></i>
          </a>
          <a href="#">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>

        <li className="copy">&copy; ㅇㅇㅇ 2023. All rights reserved.</li>
        <ul className="help">
          <li>채용</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>도움말</li>
        </ul>
      </ul>
    </footer>
  );
}

export default Footer;

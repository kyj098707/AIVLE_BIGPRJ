import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="main_footer">

      <div className="inner">
        <div className="info">
          <img src="/img/newalgoking.png" alt="ALGOKING" className="logo3" />
          <div className="nav">
            <ul className="help">
              <li2><Link to="/use" style={{ color: "#888888" }}>이용약관</Link></li2>
              <li2><Link to="/privacy" style={{ color: "#888888" }}>개인정보처리방침</Link></li2>
              <li2><Link to="/about" style={{ color: "#888888" }}>도움말</Link></li2>
            </ul>
            <h4>(주)알고킹 경기도 성남시 분당구 불정로 90 (정자동)</h4>
            <h4>Aivle 3기 여러분 지금까지 고생 많으셨습니다.</h4>
            <h4>&copy; ALGOKING 2023. All rights reserved.</h4>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

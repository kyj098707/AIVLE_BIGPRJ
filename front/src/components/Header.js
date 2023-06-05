import React from "react";

function Header() {
  return (
    <header>
      <div className="inner">
        <img src="img/algoking1.png" alt="logo" className="logo" />
        <h1 className="title">ALGOKING</h1>
        <ul className="gnb">
          <a>Menu1</a>
          <a>Menu2</a>
          <a>Menu3</a>
          <a>Menu4</a>
        </ul>
        <div className="join">Login</div>
      </div>
    </header>
  );
}

export default Header;

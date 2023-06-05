import React from "react";
import "./App.css";
import "./scss/Header.scss";
import "./scss/Contents.scss";
import "./scss/Footer.scss";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="main-content">
        <Contents />
      </div>
      <Footer />
    </div>
  );
}

// 인프런 장고 강의
// import { Button } from "antd";

// function App() {
//   return (
//     <div>
//       <Button type="primary" onClick={() => console.log("hello!")}>
//         Hello, Antd!
//       </Button>
//     </div>
//   );
// }

export default App;

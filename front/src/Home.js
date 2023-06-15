import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "@material-ui/core/Card";
import Choice from "./Choice";
import { Helmet } from "react-helmet";

function Home() {
  const [cardVisibility, setCardVisibility] = useState([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        window.scrollY || document.documentElement.scrollTop;

      const scrollPositions = [500, 1000, 1500];

      const updatedCardVisibility = cardVisibility.map((isVisible, index) => {
        if (!isVisible && currentScrollPos > scrollPositions[index]) {
          return true;
        }
        return isVisible;
      });

      setCardVisibility(updatedCardVisibility);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cardVisibility]);

  return (
    <div className="home">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Helmet>
      <div className="home-container">
        <img className="home_image" src="img/algoking2 yellow.png" alt="" />

        <div className="card-column">
          <Card
            variant="outlined"
            className={`choice animate__animated ${
              cardVisibility[0] ? "animate__fadeInLeft" : ""
            }`}
            style={{
              height: "400px",
              borderTopColor: "#ECFFDC",
              borderBottomColor: "#ECFFDC",
              borderLeftColor: "#ECFFDC",
              borderRightColor: "#ECFFDC",
            }}
          >
            <div className="choice-content-left">
              <h3 className="choice-title" style={{ textAlign: "center" }}>
                물어보기 쌉가능
              </h3>
              <p className="choice-answer" style={{ textAlign: "center" }}>
                게시판 활성화
              </p>
            </div>
            <a href="/board" id="2323">
              <img
                className="choice-image-right"
                src="img/q&a green.png"
                alt=""
                style={{
                  width: "300px",
                  height: "300px",
                  marginRight: "20px",
                  marginLeft: "600px",
                }}
              ></img>
            </a>
          </Card>
          <Card
            variant="outlined"
            className={`choice animate__animated ${
              cardVisibility[1] ? "animate__fadeInRight" : ""
            }`}
            style={{
              height: "400px",
              borderTopColor: "#ECFFDC",
              borderBottomColor: "#ECFFDC",
              borderLeftColor: "#ECFFDC",
              borderRightColor: "#ECFFDC",
            }}
          >
            <a href="/rival" id="2322">
              <img
                className="choice-image-left2"
                src="img/development green.png"
                alt=""
                style={{
                  width: "300px",
                  height: "300px",
                  marginRight: "600px",
                  marginLeft: "10px",
                }}
              />
            </a>
            <div className="choice-content-right">
              <h3 className="choice-title" style={{ textAlign: "center" }}>
                실력 향상
              </h3>
              <p className="choice-answer" style={{ textAlign: "center" }}>
                라이벌로 내 실력 향상.
              </p>
            </div>
          </Card>
          <Card
            variant="outlined"
            className={`choice animate__animated ${
              cardVisibility[2] ? "animate__fadeInLeft" : ""
            }`}
            style={{
              height: "400px",
              borderTopColor: "#ECFFDC",
              borderBottomColor: "#ECFFDC",
              borderLeftColor: "#ECFFDC",
              borderRightColor: "#ECFFDC",
            }}
          >
            <div className="choice-content-left">
              <h3 className="choice-title" style={{ textAlign: "center" }}>
                추천
              </h3>
              <p className="choice-answer" style={{ textAlign: "center" }}>
                유사 알고리즘 추천
              </p>
            </div>
            <img
              className="choice_image"
              src="img/like green.png"
              alt=""
              style={{
                width: "300px",
                height: "300px",
                marginLeft: "600px",
                marginRight: "20px",
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../scss/About.scss";

export default function About() {
  return (
    <div className="about-container" style={{ width: "100%" }}>
      <div className="about-layout-02">
        <div className="about-layout-02-title">
          <img src="/img/giphy.gif" alt="Gif" className="right2-aligned" />
          <h1>
            알고킹은 당신의 실력을
            <br />
            가장 잘 향상시킬 수 있는
            <br />
            방법을 제안합니다.
          </h1>
          <br />
          <p>
            알고킹은 당신에 대해 학습하여
            <br />
            11만개의 학습 데이터를 바탕으로
            <br />
            최적의 학습 경로를 제공합니다.
            <br />
          </p>
        </div>
      </div>

     

      <div className="about-layout-04">
        <div className="about-layout-04-title">
          <h1>알고리즘 한방 가이드</h1>
          <br />
          <p>
            알고리즘 입문에서부터 코딩 테스트 합격까지 <br />
            끊임 없는 문제 추천, 라이벌 추천을 통해 <br />
            코딩 테스트 합격에 필요한 모든 것을 하나의 웹으로 제공합니다. <br />

            {/* 강의, 문제해결, 어휘, 복습, 점수 예측 및 <br />
            취약점 분석 보고서, 연습 테스트 등 <br />
            필요한 모든 것을 하나의 앱으로 제공합니다. <br /> */}
          </p>
        </div>
        <div className="about-layout-04-card">
          <Container style={{ padding: "0", margin: "0" }}>
            <Row>
              <Col sm>
                <h3>AI 기반 문제 추천</h3>
                <p>
                  RECVAE 모델을 통한 문제 추천으로 <br />
                  나외 비슷한 사용자가 풀어 본 <br />
                  나에게 알맞는 문제를 추천받아보세요. <br />
                </p>
              </Col>
              <Col sm>
                <h3>AI 기반 라이벌 추천</h3>
                <p>
                  KNN 모델을 통해 라이벌을 추천으로 <br />
                  나와 푼 문제와 클래스가 비슷한 유저를 추천받고 <br />
                  같이 경쟁해보세요. <br />
                </p>
              </Col>
              <Col sm>
                <h3>지속적인 모델 개선</h3>
                <p>
                  Airflow를 통해 매일 데이터를 학습하여 <br />
                  지속적으로 모델을 개선하고 <br />
                  새로운 문제, 유저 정보를 제공합니다. <br />
                </p>
              </Col>
            </Row>

            <Row style={{ marginTop: "5%" }}>
              <Col sm>
                <h3> 알고킹덤 건설 </h3>
                <p>
                  스터디 그룹을 생성하고, <br />
                  공동의 목표 문제집을 정하고, <br />
                  다같이 코딩 테스트를 통과해보세요. <br />
                </p>
              </Col>
              <Col sm>
                <h3> 체계적인 문제풀이 </h3>
                <p>
                  AI기반 추천 문제와 유형별 추천문제를 제공합니다. <br />
                  끊임없이 문제를 풀고 유형을 정복하여, <br />
                  코딩테스트까지 달려보세요. <br />
                </p>
              </Col>
              <Col sm>
                <h3> 무엇이든 물어보세요 </h3>
                <p>
                  CHATGPT 프롬프트 엔지니어링을 통해 <br />
                  모르는 문제 번호만 입력해도 솔루션이 제공됩니다.  <br />
                  또한 유저들끼리 알고리즘에 대한 이야기를 나눠보세요.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="about-layout-05">
        <div className="about-layout-05-title">
          <h1>언제 어디서든 알고킹으로<br/>코딩 테스트를 준비하세요.</h1>

          <p>
            무엇부터 해야 할지 모르겠다면
            <br />
            알고킹부터 접속해보세요.
          </p>
        </div>

        
      </div>

      {/* 멤버 소개 start */}
      <div className="about-layout-06">
        <h2>We are Monster!</h2>
        <h3>부산 경남 11반 41조 <br/>코딩 괴물들만 모은 41조</h3>
      </div>
      <div class="wrapper-member">
        <ul class="team">
          <li class="team-item">
            <div class="profile profile_1">
              <img src="img/ho.png" alt="팀원이미지" />

              {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
              <div class="profile-contents">
                <h2>
                  강선후 <span>AI</span>{" "}
                </h2>
                <p>코딩은 세상에서 제일 즐거워(진짜임)</p>
              </div>
            </div>
          </li>
          <li class="team-item">
            <div class="profile profile_2">
              <img src="img/min.png" alt="팀원이미지" />
ㅈ
              {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
              <div class="profile-contents">
                <h2>
                  강민수 <span>FE</span>{" "}
                </h2>
                <p>나는 코딩괴물, 너네들은 나 못이겨(요)</p>
              </div>
            </div>
          </li>
          <li class="team-item">
            <div class="profile profile_3">
              <img src="img/bell.png" alt="팀원이미지" />

              {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
              <div class="profile-contents">
                <h2>
                  김윤종 <span>FS</span>{" "}
                </h2>
                <p>코딩이 세상에서 제일 쉬웠어요.(아마도)</p>
              </div>
            </div>
          </li>
          <li class="team-item">
            {/* <!-- 카드형 디자인 member 1 --> */}
            <div class="profile profile_4">
              <img src="img/rm.png" alt="팀원이미지" />

              {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
              <div class="profile-contents">
                <h2>
                  김아르미 <span>AI</span>{" "}
                </h2>
                <p>웃을 때 홍은채 김아르미입니다.(확실)</p>
              </div>
            </div>
          </li>
          <li class="team-item">
            {/* <!-- 카드형 디자인 member 1 --> */}
            <div class="profile profile_5">
              <img src="img/feel.png" alt="팀원이미지" />

              {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
              <div class="profile-contents">
                <h2 >
                  서종필 <span>FE</span>{" "}
                </h2>
                <p>css깎는 노인입니다.(젊기도함)</p>
              </div>
            </div>
          </li>
          <li class="team-item">
            {/* <!-- 카드형 디자인 member 1 --> */}
            <div class="profile profile_6">
              <img src="img/vin.png" alt="팀원이미지" />

              {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
              <div class="profile-contents">
                <h2>
                  이예빈 <span>FE</span>{" "}
                </h2>
                <p>안녕하쌉싸리.잘 부탁드립니다<br/>제가 제일 좋아하는 것은 금 한 돈입니다.(진짜임)</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

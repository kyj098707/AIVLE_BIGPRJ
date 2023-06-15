import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../css/about/about.css' 

export default function About() {
    return (
        <div className="div-body" style={{width:"100%"}}>
            <div className="about-layout-02">
                <div className="about-layout-02-title">
                    <h1>알고킹은 당신의 실력을<br/>가장 잘 향상시킬 수 있는<br/>방법을 제안합니다.</h1>
                    <br/>
                    <p>
                        알고킹은 당신에 대해 학습하여<br/>
                        11만개의 학습 데이터를 바탕으로<br/>
                        최적의 학습 경로를 제공합니다.<br/>
                    </p>
                </div>
                
                <div className="about-layout-02-card">
                    <Container style={{padding:"0", margin:"0"}}>
                        <Row>
                            <Col sm style={{marginRight:"5%"}}>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h4>점수가 같더라도</h4>
                                <h4>이유는 다릅니다.</h4>
                                <p>산타는 사용자가 어떤 문제를 왜 틀렸는지 95%의 정확도로 측정합니다.현재 지식 수준을 가장 잘 평가할 수 있는 12개의 문제들로 실력을 진단하고,실시간 학습 데이터를 분석해 최적의 학습 경로를 탐색합니다.</p>
                            </Col>
                            <Col sm style={{marginRight:"5%"}}>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h4>취약점만 공략한다고</h4>
                                <h4>점수가 오르진 않습니다.</h4>
                                <p>점수를 올리는 방법은 다양합니다. 취약점 보완 뿐만 아니라,실수하는 부분을 연습하는 것, 강점을 최대화하는 것도 방법입니다. 산타가 제안하는 가장 효과적인 방법으로 빠르게 목표 점수를 달성하세요.</p>
                            </Col>
                            <Col sm style={{marginRight:"5%"}}>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h4>언제 어디서든</h4>
                                <h4>점수를 향상 시키세요.</h4>
                                <p>산타는 단 하나의 ID로 모바일, 태블릿, PC 등 모든 장치에서 접속할 수 있어 끊김없는 학습이 가능합니다. 무작정 문제집이나 강의를 정복하는 대신, 목표점수를 달성하는 데 꼭 필요한 문제와 강의에 집중해 보세요.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <div className="about-layout-04">
                <div className="about-layout-04-title">
                    <h1>알고리즘 한방 가이드</h1>
                    <br/>
                    <p>
                        강의, 문제해결, 어휘, 복습, 점수 예측 및 <br/>
                        취약점 분석 보고서, 연습 테스트 등 <br/>
                        필요한 모든 것을 하나의 앱으로 제공합니다. <br/>
                    </p>
                </div>
                <div className="about-layout-04-card">
                    <Container style={{padding:"0", margin:"0"}}>
                        <Row>
                            <Col sm>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h3>AI 진단 테스트</h3>
                                <p>AI가 선별란 12개 문항으로 <br/>토익 예상 점수를 측정하세요.</p>
                            </Col>
                            <Col sm>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h3>개인 맞춤형 코스</h3>
                                <p>AI가 제안하는 최적의 학습 <br/>경로로 스마트하게 공부하세요.</p>
                            </Col>
                            <Col sm>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h3>종합 분석</h3>
                                <p>실시간 학습 데이터 분석을 통해 <br/>현재 실력을 정확히 알아보세요.</p>
                            </Col>
                        </Row>

                        <Row style={{marginTop:"5%"}}>
                            <Col sm>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h3>AI 진단 테스트</h3>
                                <p>AI가 선별란 12개 문항으로 <br/>토익 예상 점수를 측정하세요.</p>
                            </Col>
                            <Col sm>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h3>개인 맞춤형 코스</h3>
                                <p>AI가 제안하는 최적의 학습 <br/>경로로 스마트하게 공부하세요.</p>
                            </Col>
                            <Col sm>
                                <img src="https://uploads-ssl.webflow.com/646ac796e1c3936a52…76ac72c70e75a0d_Home-ToeicPoints_Icon_1%402x.webp" alt="아이콘" />
                                <h3>종합 분석</h3>
                                <p>실시간 학습 데이터 분석을 통해 <br/>현재 실력을 정확히 알아보세요.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <div className="about-layout-05">
                <div className="about-layout-05-title">
                    <h1>언제 어디서든 알고킹으로</h1>
                    <h1>코딩 테스트를 준비하세요.</h1>
                    <p>단 하나의 ID로 모바일, 태블릿, PC에<br/>액세스할 수 있어 끊김 없는 학습이 가능합니다.</p> 
                </div>

                <div className="about-layout-05-card">
                    <div className="div-card" >
                        <Card style={{width: '15rem', height: "100%"}}>
                            <Card.Body className='card-body'> 
                                <Card.Img variant="top" src="https://aivle.kt.co.kr/tpl/011/img/icon/ic_selfmotivation.png" style={{
                                    width:"75px",
                                    marginBottom:"10%"
                                }}/>
                                <Card.Title style={{fontSize:'25px', marginBottom:"10%"}}><strong style={{color: '#01DFD7'}}># S</strong>elf-motivation</Card.Title>
                                <div className='card-content'>
                                    <Card.Text style={{fontSize:"20px", color:"gray"}}>자기주도적으로 <br/>학습하고 도전</Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="div-card">
                        <Card style={{width: '15rem', height: "100%"}}>
                            <Card.Body className='card-body'> 
                                <Card.Img variant="top" src="https://aivle.kt.co.kr/tpl/011/img/icon/ic_practcal.png" style={{
                                    width:"75px",
                                    marginBottom:"10%"
                                }}/>
                                <Card.Title style={{fontSize:'25px', marginBottom:"10%"}}><strong style={{color: '#01DFD7'}}># P</strong>ractical</Card.Title>
                                <div className='card-content'>
                                    <Card.Text style={{fontSize:"20px", color:"gray"}}>실무중심의 실행력</Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="div-card" >
                        <Card style={{ width: '15rem', height: '100%' }}>
                            <Card.Body className='card-body'>
                                <Card.Img variant="top" src="https://aivle.kt.co.kr/tpl/011/img/icon/ic_excellence.png" style={{
                                    width:"75px",
                                    marginBottom:"10%"
                                }}/>
                                <Card.Title style={{fontSize:'25px', marginBottom:"10%"}}><strong style={{color: '#01DFD7'}}># E</strong>xcellence</Card.Title>
                                <div className='card-content'>
                                    <Card.Text style={{fontSize:'20px', color:'gray'}}>실력과 프로정신</Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="div-card" >
                        <Card style={{ width: '15rem', height: '100%' }}>
                            <Card.Body className='card-body'>
                                <Card.Img variant="top" src="https://aivle.kt.co.kr/tpl/011/img/icon/ic_collaboration.png" style={{
                                    width:"75px",
                                    marginBottom:"10%"
                                }}/>
                                <Card.Title style={{fontSize:'25px', marginBottom:"10%"}}><strong style={{color: '#01DFD7'}}># C</strong>ollaboration</Card.Title>
                                <div className='card-content'>
                                    <Card.Text style={{fontSize:'20px', color:'gray'}}>소통ㆍ협업을 통해 <br/>배우며 성장</Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>

            {/* 멤버 소개 start */}
            <div class="wrapper-member">
                <ul class='team'>
                    <li class='team-item'>
                        <div class="profile profile_1">
                            <img src="img/temp.jpg" alt="팀원이미지" />
                            
                            {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
                            <div class="profile-contents">
                                <h2>강선후 <span>AI</span> </h2>
                                <p>안녕하세요.
                                    여기는 소개글을 작성하는 곳입니다.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class='team-item'>
                        <div class="profile profile_2">
                            <img src="img/temp.jpg" alt="팀원이미지" />
                            
                            {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
                            <div class="profile-contents">
                                <h2>강민수 <span>FE</span> </h2>
                                <p>안녕하세요.
                                    여기는 소개글을 작성하는 곳입니다.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class='team-item'>
                        <div class="profile profile_3">
                            <img src="img/temp.jpg" alt="팀원이미지" />
                            
                            {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
                            <div class="profile-contents">
                                <h2>김윤종 <span>FS</span> </h2>
                                <p>안녕하세요.
                                    여기는 소개글을 작성하는 곳입니다.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class='team-item'>
                        {/* <!-- 카드형 디자인 member 1 --> */}
                        <div class="profile profile_4">
                            <img src="img/temp.jpg" alt="팀원이미지" />
                            
                            {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
                            <div class="profile-contents">
                                <h2>김아르미 <span>AI</span> </h2>
                                <p>안녕하세요.
                                    여기는 소개글을 작성하는 곳입니다.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class='team-item'>
                        {/* <!-- 카드형 디자인 member 1 --> */}
                        <div class="profile profile_5">
                            <img src="img/temp.jpg" alt="팀원이미지" />
                            
                            {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
                            <div class="profile-contents">
                                <h2>서종필 <span>FE</span> </h2>
                                <p>안녕하세요.
                                    여기는 소개글을 작성하는 곳입니다.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class='team-item'>
                        {/* <!-- 카드형 디자인 member 1 --> */}
                        <div class="profile profile_6">
                            <img src="img/temp.jpg" alt="팀원이미지" />
                            
                            {/* <!-- 마우스 오버했을 때, 상세 정보값 나타내기 --> */}
                            <div class="profile-contents">
                                <h2>이예빈 <span>FE</span> </h2>
                                <p>안녕하세요.
                                    여기는 소개글을 작성하는 곳입니다.
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

import React from 'react';
import '../../css/about/about.css' 
import Card from 'react-bootstrap/Card';

export default function About() {
    return (
        <div className="div-body">
            <br />
            <div className="wrapper">
                <div>
                    <h2>Our values</h2>
                    <h5>알고킹은 ~~ 라는 의미입니다.
                        혹은, 서비스명에 대한 설명 또는 지향점? 이런 내용이 들어갔으면 합니다. <br/>
                        뤼이드(Riiid)라는 이름은 ‘제거하다’, ‘자유롭게 하다’라는 뜻의 ‘rid’에서 탄생했습니다.<br/>
                        기존의 교육 시스템에서 비능률(Inefficiency), 불일치(Inconsistency), 불평등(Inequality)이라는 
                        <br/>세 개의 “I”를 제거하자는 의미입니다.
                    </h5>
                </div>
            </div>

            <div className='wrapper-card' style={{height:"500px"}}>
                <div className="div-card">
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

                
                <div className="div-card">
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
                <div className="div-card">
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


            {/* member section start */}
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

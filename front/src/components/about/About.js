import React from 'react';
// import '../../css/about/about.css' about때문에 다른 css가 틀어지는 것 같다.
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function About() {
    return (
        <div className="div-body">
            <br />
            <div className="wrapper">
                <h2>Our values</h2>
                <h5>알고킹은 ~~ 라는 의미입니다.
                    혹은, 서비스명에 대한 설명 또는 지향점? 이런 내용이 들어갔으면 합니다.
                </h5>
            </div>

            <div className='wrapper-card'>
                <div className="div-card">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title><strong style={{color: '#01DFD7'}}># S</strong>elf-motivation</Card.Title>
                            <Card.Text style={{fontSize:10}}>
                            자기주도적으로
                            </Card.Text>
                            <Card.Text style={{fontSize:10}}>
                            학습하고 도전
                            </Card.Text>
                            <Button variant="primary">자세히</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="div-card">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title><strong style={{color: '#01DFD7'}}># P</strong>ractical</Card.Title>
                            <Card.Text style={{fontSize:10}}>실무중심의 실행력</Card.Text>
                            <Button variant="primary">자세히</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="div-card">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title><strong style={{color: '#01DFD7'}}># E</strong>xcellence</Card.Title>
                            <Card.Text style={{fontSize:10}}>실력과 프로정신</Card.Text>
                            <Button variant="primary">자세히</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="div-card">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title><strong style={{color: '#01DFD7'}}># C</strong>ollaboration</Card.Title>
                            <Card.Text style={{fontSize:10}}>소통ㆍ협업을 통해</Card.Text>
                            <Card.Text style={{fontSize:10}}>배우며 성장 </Card.Text>
                            <Button variant="primary">자세히</Button>
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

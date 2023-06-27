import {React,useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Checkbox,Card, Button } from 'antd';
import '../../scss/Register.scss'

export default function Register() {
    const [firAgr,setFirAgr] = useState(false)
    const [secAgr,setSecAgr] = useState(false)
    const navigate = useNavigate();
    const onChangeFirst = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setFirAgr(e.target.checked);
      };
    const onChangeSecond = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setSecAgr(e.target.checked);
      };
    const clickAgreement = () => {
        if(firAgr && secAgr) {
            navigate("/register");
        }
        else {
            alert("모든 약관에 동의하셔야 회원가입이 진행됩니다.")
        }
      }
      return (
    <div className="agreement-wrap">
        <h1> 이용약관 및  개인정보 처리방침</h1>
        <Checkbox onChange={onChangeFirst}>[필수] 알고킹 이용약관</Checkbox>
        <Card className="agreement-card" >
        여러분을 환영합니다.<br />
        알고킹 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 알고킹 서비스의 이용과 관련하여 알고킹 서비스와 이를 이용하는 알고킹 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 알고킹 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.<br />
        알고킹 서비스를 이용하시거나 알고킹 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
        다양한 알고킹 서비스를 즐겨보세요.<br />
        알고킹은 www.algoking.com을 비롯한 알고킹 도메인의 웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공, 상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다.<br />
        여러분은 PC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 알고킹 서비스를 자유롭게 이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스 상의 안내, 공지사항, 알고킹 웹고객센터(이하 ‘고객센터’) 도움말 등에서 쉽게 확인하실 수 있습니다.<br />
        <br />
        알고킹은 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만, '청소년보호법' 등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한 등급을 기준으로 이용자를 구분하여 제공하는 서비스의 내용, 이용 시간, 이용 횟수 등을 다르게 하는 등 일부 이용을 제한하는 경우가 있습니다. 자세한 내용은 역시 각 서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인하실 수 있습니다.<br />
        <br />
        </Card>
        <Checkbox onChange={onChangeSecond}>[필수] 개인정보의 수집 및 이용 </Checkbox>
        <Card className="agreement-card" >
        ALGOKING(이하 '사이트'라 함)이 취급하는 모든 개인정보는 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하여 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
        <br/>
        1. 수집하는 개인정보
        <br/>
        회원가입 시점에 사이트가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
        <br/>
            •	회원 가입 시 필수항목으로 아이디, 비밀번호, 이름을, 선택항목으로 본인확인 이메일주소를 수집합니다. 실명 인증된 아이디로 가입 시, 암호화된 동일인 식별정보(CI), 중복가입 확인정보(DI), 내외국인 정보를 함께 수집합니다. 만14세 미만 아동의 경우, 법정대리인 정보(법정대리인의 이름, 생년월일, 성별, 중복가입확인정보(DI), 휴대전화번호)를 추가로 수집합니다.
        <br/>
        2. 개인정보의 수집 및 이용목적
        <br/>
        사이트는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
        <br/>
        1) 회원 관리
        <br/>
        회원제 서비스 이용에 따른 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입 및 가입횟수 제한, 분쟁 조정을 위한 기록 보존, 불만처리 등 민원처리, 고지사항 전달
        <br/>
        2) 신규 서비스 개발 및 마케팅 및 광고에 활용
        <br/>
        신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공, 서비스 유효성 확인, 이벤트 및 광고성 정보 제공 및 참여기회제공, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계
        <br/>
        3. 개인정보의 보유 및 이용기간
        <br/>
        사이트는 법령에 따른 개인정보 보유ㆍ이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유ㆍ이용기간 내에서 개인정보를 처리, 보유합니다.
        <br/>
        개인정보 처리 및 보유 기간은 다음과 같습니다.
        <br/>
            •	홈페이지 회원 가입 및 관리 : 홈페이지 탈퇴 시까지
            <br/>
        다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
        <br/>
            •	관계 법령 위반에 따른 수사ㆍ조사 등이 진행 중인 경우에는 해당 수사ㆍ조사 종료 시까지
            <br/>
        사이트는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
        <br/>
        파기절차
        <br/>
            •	이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다.
            <br/>
            •	별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.
            <br/>
        파기방법
        <br/>
            •	전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
            <br/>
            •	종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
            <br/>
        5. 개인정보 제공 및 공유
        <br/>
        사이트는 이용자들의 개인정보를 "2. 개인정보의 수집 및 이용목적"에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
        <br/>
        1) 이용자들이 사전에 동의한 경우
        <br/>
        개인정보 제공 이전에 개인정보 제공자, 개인정보 제공 목적, 제공하는 개인정보의 항목 및 보유기간을 별도로 알리고 동의절차를 거치며, 이에 이용자가 동의하지 않을 경우에는 제 3자에게 이용자의 개인정보를 제공하지 않습니다.
        <br/>
        2) 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
        <br/>
        6. 개인정보취급 위탁
        <br/>
        사이트는 개인정보 취급 업무를 외부 전문업체에 위탁하여 운영하고 있지 않습니다.<br/>
        <br/>
        7. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항<br/>
        사이트는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 수시로 저장하고 불러오는 '쿠키(cookie)'를 운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터 하드디스크에 저장됩니다. 사이트는 다음과 같은 목적을 위해 쿠키를 사용합니다.<br/>
        쿠키의 사용 목적<br/>
        회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 방문 회수 파악 등을 통한 개인 맞춤 서비스 제공<br/>
        이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.<br/>
        쿠키 설정 거부 방법<br/>
        쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.<br/>
        설정방법 예(인터넷 익스플로어의 경우) : 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보<br/>
        단, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.<br/>
        8. 개인정보의 기술적, 관리적 보호 대책<br/>
        사이트는 이용자의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안정성 확보를 위하여 다음과 같은 기술적, 관리적 대책을 강구하고 있습니다.<br/>
        1) 개인정보 암호화<br/>
        이용자의 개인정보는 비밀번호에 의해 보호되며, 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 통해 보호 하고 있습니다.<br/>
        2) 해킹 등에 대비한 기술적 대책<br/>
        사이트는 해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 침입 차단장치 이용 및 침입탐지시스템을 설치하여 24시간 감시하고 있습니다.<br/>
        3) 개인정보처리시스템 접근 제한<br/>
        사이트는 개인정보를 처리할 수 있도록 체계적으로 구성한 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소 등에 관한 기준을 수립하고 비밀번호의 생성 방법, 변경 주기 등을 규정 운영하며 기타 개인정보에 대한 접근통제를 위해 필요한 조치를 다하고 있습니다.<br/>
        4) 개인 아이디와 비밀번호 관리<br/>
        이용자가 사용하는 아이디와 비밀번호는 원칙적으로 이용자만이 사용하도록 되어 있습니다. 사이트는 이용자의 개인적인 부주의로 ID, 비밀번호, 이메일 등 개인정보가 유출되어 발생한 문제와 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다.비밀번호에 대한 보안 의식을 가지고 비밀번호를 자주 변경하며 공용PC에서의 로그인시 개인정보가 유출되지 않도록 각별한 주의를 기울여 주시기 바랍니다.<br/>
        <br/>
        9. 개인정보에 관한 민원서비스<br/>
        사이트는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보관리책임자를 지정하고 있습니다.<br/>
        이용자는 사이트의 서비스를 이용하시 q며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자에게 신고하실 수 있습니다. 사이트느 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.<br/>
        개인정보 관리책임자<br/>
            •	성명: 김윤종<br/>
            •	메일: a036129@aivle.kt.co.kr<br/>
        기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br/>
            •	개인정보침해신고센터 (www.118.or.kr / 118)<br/>
            •	정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)<br/>
            •	대검찰청 첨단범죄수사과 (www.spo.go.kr / 02-3480-2000)<br/>
            •	경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)<br/>
        10. 부칙<br/>
        법령 및 정책 또는 보안기술의 변경에 따라 내용의 추가. 삭제 및 수정이 있을 시에는 변경사항의 시행일의 최소 7일 전부터 사이트의 뉴스를 통하여 고지할 것 입니다. 다만, 회원의 권리 또는 의무에 중요한 내용의 변경은 최소 30일전에 고지하겠습니다.<br/>
            •	공고일자 : 2023년 7월 일<br/>
            •	시행일자 : 2023년 7월 일<br/>
        </Card>
        
        <Button onClick={clickAgreement}> 다음 </Button>
    </div>
    );
}
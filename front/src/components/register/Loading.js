import React, { useState } from 'react';
import '../../scss/Register.scss'
// Modal 팝업 관련
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// Modal 팝업 관련

export default function LoadingModal() {
  // Modal 팝업 관련
  const [isOpen, setIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('에러입니다.');
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // Modal 팝업 관련
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={openModal}>클릭</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
          content: {
            width: "660px",
            height: "350px",
            zIndex: "11",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            boxShadow: "5px 5px 20px rgba($gray, 10%)",
            overflow: "hidden",
            // backgroundColor:'#B0DB7D' Success일 때,
            backgroundColor:'black',
            color:'white',
            // text-shadow: 4px 2px 2px white;
            // ,
          },
          overlay: {
            zIndex: 100,
          },
        }}
      >
        <div className="loading-container">
          <div className="loading-text">
            <span className="loading-text-words" style={{fontFamily:'Tenada'}}>L</span>
            <span className="loading-text-words" style={{fontFamily:'Tenada'}}>O</span>
            <span className="loading-text-words" style={{fontFamily:'Tenada'}}>A</span>
            <span className="loading-text-words" style={{fontFamily:'Tenada'}}>D</span>
            <span className="loading-text-words" style={{fontFamily:'Tenada'}}>I</span>
            <span className="loading-text-words" style={{fontFamily:'Tenada'}}>N</span>
            <span className="loading-text-words" style={{fontFamily:'Tenada'}}>G</span>
          </div>
          <p style={{color:'white', marginTop:'240px', textAlign:'center', fontFamily:'Pretendard-regular', textShadow: '2px 1px 2px yellow', fontSize:'20px'}}>알고계셨나요?</p>
          <p style={{color:'white', textAlign:'center', fontFamily:'Pretendard-regular'}}>코딩 테스트를 합격하기 위해 준비하는 기간은 2달 이하입니다.</p>
        </div>
      </Modal>
  </>
  );
}
import React, { useEffect, useState } from 'react';
import '../../scss/Register.scss'
import AlertError from './AlertError';
// Modal 팝업 관련
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// Modal 팝업 관련

export default function AlertModal(loadingModalVisible) {
  // Modal 팝업 관련
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (loadingModalVisible) openModal()
    console.log("use loadingModalVisible", loadingModalVisible)
  }, [loadingModalVisible]);

  // Modal 팝업 관련
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
          content: {
            width: "285px",
            height: "300px",
            zIndex: "11",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            boxShadow: "5px 5px 20px rgba($gray, 10%)",
            overflow: "hidden",
            // backgroundColor:'#B0DB7D' Success일 때,
            backgroundColor:'#EF8D9C',
          },
          overlay: {
            zIndex: 500,
          },
        }}
      >
        <AlertError alertMessage={'temp입니다.'} setIsOpen={setIsOpen} />
      </Modal>
  </>
  );
}
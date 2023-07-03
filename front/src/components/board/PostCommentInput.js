import React, { useState } from "react";
import axios from "axios";
import { Domain } from '../Store';
import "../../scss/PostCommentInput.scss";

// Modal 팝업 관련
import AlertError from '../temp/AlertError';
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// Modal 팝업 관련

export default function PostCommentInput(props) {
  const [commentText,setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === '') {
      openModal();
      setModalMsg('내용을 입력하세요.');
      return;
    }

    const apiUrl_CommentCreate = Domain + `boards/${props.id}/comments/create/`;
    const apiUrl_PostId = Domain + `boards/${props.id}`;
    
    const token = localStorage.getItem("access")
    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    axios.post(apiUrl_CommentCreate, { "content" : commentText },{headers:headers})
          .then(response => {
              axios.get(apiUrl_PostId, { headers: headers })
                    .then(response => {
                        const { data } = response
                        props.onAddComment(data.comment, 1)
                        setCommentText('')
                    })
                    .catch(error => {
                    })
          })
  }

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

  return (
    <div className="post-detail-input-comment">
      <form className="flex" onSubmit={ handleSubmit }>
        <textarea placeholder="댓글을 작성해 주세요."
                  value={commentText}
                  onChange={(e) => {setCommentText(e.target.value)}}
                  rows={5}
        ></textarea>
        <div>
          <button type="submit">등록</button>
        </div>
      </form>

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
            zIndex: 100,
          },
        }}
      >
        <AlertError alertMessage={modalMsg} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
}

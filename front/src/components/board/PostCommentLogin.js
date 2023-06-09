import "../../scss/PostCommentLogin.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCommentLogin() {
  const navi = useNavigate();

  return (
    <div className="post-detail-comment-login flex">
      <h6>로그인 후 댓글을 작성해 주세요.</h6>
      <button
        className="goLogin"
        onClick={() => {
          navi("/login");
        }}
      >
        로그인
      </button>
    </div>
  );
}

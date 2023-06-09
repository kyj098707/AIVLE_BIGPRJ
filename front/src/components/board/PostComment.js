import "../../scss/PostComment.scss";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostComment() {
  const navi = useNavigate();
  const { postNum } = useParams();

  let reload = "/post/" + postNum;

  return (
    <div className="post-detail-input-comment flex">
      <textarea placeholder="댓글을 작성해 주세요." rows={5}></textarea>
      <div>
        <button
          onClick={() => {
            navi(reload);
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
}

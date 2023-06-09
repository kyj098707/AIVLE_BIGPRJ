import "../../scss/PostDeleteCheck.scss";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDeleteCheck() {
  const { postNum } = useParams();
  const navigater = useNavigate();

  return (
    <div className="deletecheck flex">
      <h4>삭제하시겠습니까?</h4>
      <div className="buttons flex">
        <div>
          <button className="delete-button">삭제</button>
        </div>
        <div>
          <button
            className="cancel-button"
            onClick={() => {
              navigater(-1);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

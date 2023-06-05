import React, { useState } from "react";

function Contents() {
  let [title, set_title] = useState([
    "게시글 제목 1",
    "게시글 제목 2",
    "게시글 제목 3",
  ]);

  let [like, set_like] = useState(0);

  return (
    <div className="contents">
      <div
        className="list"
        onClick={() => {
          set_like(like + 1);
        }}
      >
        <h4>
          {title[0]}
          <span>👍</span>
          {like}
        </h4>
        <button
          onClick={() => {
            let copy = [...title];
            copy[0] = "게시글 제목 4";
            set_title(copy);
          }}
        >
          버튼
        </button>
        <p>2월 2일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>2월 3일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>2월 13일 발행</p>
      </div>
    </div>
  );
}

export default Contents;

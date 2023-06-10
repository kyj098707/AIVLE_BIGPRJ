import "../../scss/Board.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Board() {
  const navigater = useNavigate();

  const naviWrite = () => {
    navigater("/board/post/write");
  };

  let [title, set_title] = useState([
    "게시글 제목 1",
    "게시글 제목 2",
    "게시글 제목 3",
    "게시글 제목 4",
    "게시글 제목 5",
    "게시글 제목 6",
    "게시글 제목 7",
    "게시글 제목 8",
    "게시글 제목 9",
    "게시글 제목 10",
    "게시글 제목 11",
    "게시글 제목 12",
    "게시글 제목 13",
  ]);

  let [like, set_like] = useState(0);

  function repeat(title) {
    let arr = [];

    for (let i = 1; i <= title.length; i++) {
      let temp = "/board/post/" + i;
      arr.push(
        <tr>
          <td>{i}</td>
          <td>
            <Link to={temp}>{title[i - 1]}</Link>
          </td>
          <td className="userName">abc</td>
        </tr>
      );
    }

    return arr;
  }

  return (
    <div className="contents">
      <table className="">
        <thead>
          <tr className="aa">
            <th>
              <div>상태</div>
            </th>
            <th>
              <div>제목</div>
            </th>
            <th>
              <div>유저</div>
            </th>
          </tr>
        </thead>
        <tbody>{repeat(title)}</tbody>
      </table>

      <div>
        <button onClick={naviWrite}>작성하기</button>
      </div>
    </div>
  );
}
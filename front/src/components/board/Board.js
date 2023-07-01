import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { Domain } from '../Store';
import Paging from "./Paging";
import "../../scss/Board.scss";

export default function Board() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [currentPostPage] = useState(useLocation().state?.currentPage);

  useEffect(() => {
    const apiUrl = Domain + 'boards/list/'
    const token = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(apiUrl, { headers: headers })
      .then((response) => {
        const { data } = response;
        setPostList(data);
        if (currentPostPage) setCurrentPage(currentPostPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);

  useEffect(() => {
    setCount(postList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(postList.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postList, postPerPage]);

  const setPage = (error) => {
    setCurrentPage(error);
  };

  return (
    <div className="contents">
      <div className="board-title">
        <span>질문 / 답변</span>
      </div>
      <div className="write-btn">
        <button
          onClick={() => {
            navigate("/board/post/write");
          }}
        >
          <span>작성하기</span>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <div>문제 No.</div>
            </th>
            <th>
              <div>제목</div>
            </th>
            <th>
              <div>작성자</div>
            </th>
            <th>
              <div>등록일</div>
            </th>
            <th>
              <div>조회</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPosts && postList.length > 0 && (
            currentPosts.map((post, idx) => {
              const { id, title, writer, created_at, watching } = post
              const postNum = postList.length - (currentPage-1)*10 - idx;
              const date = moment.utc(created_at).utcOffset('+09:00').format('YY. MM. DD')

              let url = "/board/post/" + id;
              return (
                <tr>
                  <td>{postNum}</td>
                  <td
                    onClick={() => {
                      navigate(url, {
                        state: {
                          value: id,
                          currentPage: currentPage,
                        },
                      });
                    }}
                  >
                    {title}
                  </td>
                  <td>{writer.username}</td>
                  <td>{date}</td>
                  <td>{watching}</td>
                </tr>
              );
            })
          ) 
          // : (
          //   <div> Loading...</div>
          // )
          }
        </tbody>
      </table>

      <div>
        <Paging page={currentPage} count={count} setPage={setPage} />
      </div>
    </div>
  );
}

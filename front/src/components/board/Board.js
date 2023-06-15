import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Paging from "./Paging";
import "../../scss/Board.scss";

const apiUrl = "http://localhost:8000/api/boards/list/"

export default function Board() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    axios.get(apiUrl, { headers: headers })
        .then(response => {
            const { data } = response
            setPostList(data)
        })
        .catch(error => {
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
        <tbody>
          
          {currentPosts && postList.length > 0 ? (
            currentPosts.map((post, idx) => {
              const { id, title, writer } = post
              const postNum = postList.length - (currentPage-1)*10 - idx;

              let url = "/board/post";
              return (
                  <tr>
                    <td>{postNum}</td>
                    <td onClick={()=>{
                        navigate(url, {state: {value: id}});
                      }}>
                      {title}
                    </td>
                    <td className="userName">{writer.username}</td>
                  </tr>
              )
          })) : (
              <div> No posts.</div>
          )}


          {/* {postList.map((post,index) => {
              const { id, title, content, writer, num_like, num_comment } = post
              const postNum = postList.length - index;

              let url = "/board/post";
              return (
                  <tr>
                    <td>{postNum}</td>
                    <td onClick={()=>{
                        navigate(url, {state: {value: id}});
                      }}>
                      {title}
                    </td>
                    <td className="userName">{writer.username}</td>
                  </tr>
              )
          })} */}
        </tbody>
      </table>

      <div>
        <button onClick={()=>{navigate("/board/post/write");}}>작성하기</button>
        <Paging page={currentPage} count={count} setPage={setPage} />
      </div>
    </div>
  );
}
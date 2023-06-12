import "../../scss/Board.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = "http://localhost:8000/api/boards/list/"

export default function Board() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  
  useEffect(() => {
      // const token = localStorage.getItem("access")
      const headers = {
          'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NTUxMDg5LCJpYXQiOjE2ODY1MzMwODksImp0aSI6Ijk4NjBhMDQ1YzM4MjQ3YTliOWExMDkyNDAwMWIwZGQ3IiwidXNlcl9pZCI6M30.J38b1MoOnxxqX4Iae6UUakJqJ0uVXKLAvRMZKKOadF0`
      }
      axios.get(apiUrl, { headers: headers })
          .then(response => {
              const { data } = response
              setPostList(data)
              console.log(data);
          })
          .catch(error => {
              console.log(error);
          });
  }, []);

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
          {postList.map((post,index) => {
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
          })}
        </tbody>
      </table>

      <div>
        <button onClick={()=>{navigate("/board/post/write");}}>작성하기</button>
      </div>
    </div>
  );
}
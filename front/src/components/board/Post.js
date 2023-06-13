import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import { TfiCommentAlt } from "react-icons/tfi";
import { FaEye, FaRegUser, FaQuestion } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

import PostCommentLogin from "./PostCommentLogin";
import PostCommentInput from "./PostCommentInput";
import PostComments from "./PostComments";
import "../../scss/Post.scss";

export default function Post() {
  const id = useLocation().state.value;
  const navigate = useNavigate();
  
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [created_at, setCreated_at] = useState();
  const apiUrl = "http://localhost:8000/api/boards/" + id;

  useEffect(() => {
    const token = localStorage.getItem("access")

    const headers = {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NjM0NzE2LCJpYXQiOjE2ODY2MTY3MTYsImp0aSI6IjM1OTcxNjFkOWNlNjQzMmFiZDI2YTM1MTIxZjJkOGYyIiwidXNlcl9pZCI6M30.MnYC7BOm3-78VzxWb_1a6NN-yLA91_4F0dt1W_2uvWE`
    }
    axios.get(apiUrl, { headers: headers })
        .then(response => {
            const { data } = response
            setPost(data)
            setComments(data.comment)
            setCreated_at(moment.utc(data.created_at).utcOffset('+09:00').format('YY. MM. DD. HH:mm'))

            console.log("Post.js API 호출")
        })
        .catch(error => {
            console.log(error)
        }
    );
  }, []);

  const handleComment = (newComment) => {
    setComments([...newComment])
  };



  return (
    <div className="outer flex">
      <h3>Q&A 게시판</h3>
      <div>
        <button className="goList" onClick={()=>{navigate(-1);}}>
          목록으로
        </button>
        <button className="goList" onClick={()=>{navigate("/board/post/delete", {state: {value:id}});}}>
          삭제
        </button>
      </div>

      <div className="post-detail">
        <div className="post-detail-card">
          <div className="card-1st">
            <div>
              <h4>
                {post ? ( <h4>{post.title}</h4> ) : ( <p>Loading...</p> )}
              </h4>
              <div>
                <div className="q-info flex">
                  <span>질문한 문제 : </span>
                  <div> 알파벳 삼각 장난감</div>
                </div>
                <div className="flex">
                  <div>
                    <FaRegUser size="42" />
                  </div>
                  <div>
                    <span>{post ? ( post.writer.username ) : ( <p>Loading...</p> )}</span>
                    <span>{post ? ( created_at ) : ( <p>Loading...</p> )}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-2nd">
            <div>
              <div>
                {post ? ( parse(post.content) ) : ( <p>Loading...</p> )}
              </div>
            </div>
          </div>

          <div className="ditto">
            <button className="Fa-Question">
              <div><FaQuestion size="35"/></div>
            </button>
          </div>

          <div className="card-3rd">
            <div className="card-3rd-detail flex">
              <div className="card-3rd-detail-box">
                <div>
                  <FaEye size="20" />
                </div>
                <span>조회수 13</span>
              </div>
              <div className="card-3rd-detail-box">
                <div>
                  <TfiCommentAlt size="16" />
                </div>
                <span>댓글 {post ? ( post.num_comment ) : ( 0 )}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="post-detail-comment-info flex">
            <h4>댓글</h4>
            <span>{post ? ( post.num_comment ) : ( 0 )}개</span>
          </div>
        </div>

        {/* <PostCommentLogin /> */}
        <PostCommentInput id={id} onAddComment={handleComment} />

        <PostComments id={id} comments={comments} onDeleteComment={handleComment} />
        
      </div>

      <div>
        <button className="goList" onClick={()=>{navigate(-1);}}>
          목록으로
        </button>
      </div>
    </div>
  );
}
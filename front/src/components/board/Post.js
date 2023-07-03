import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import { useStore } from '../Store';
import { FaRegUser, FaEye, FaCommentDots, FaQuestion } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

import PostCommentLogin from "./PostCommentLogin";
import PostCommentInput from "./PostCommentInput";
import PostComments from "./PostComments";
import { Domain } from '../Store';
import "../../scss/Post.scss";

export default function Post() {
  const id = useLocation().state.value;
  const currentPage = useLocation().state.currentPage;
  const navigate = useNavigate();
  
  const [watching,setWatching] = useState();
  const [post, setPost] = useState();
  const [problemTitle, setProblemTitle] = useState('');
  const [comments, setComments] = useState();
  const [created_at, setCreated_at] = useState();
  const [num_like, setNum_like] = useState();
  const [num_comment, setNum_comment] = useState();
  const [showModiBtn, setShowModiBtn] = useState(false);

  useEffect(() => {
    const apiUrl = Domain + `boards/${id}`;
    const token = localStorage.getItem("access")
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    axios.get(apiUrl, { headers: headers })
        .then(response => {
            const { data } = response
            setPost(data)
            setProblemTitle(data.problem.title)
            setWatching(data.watching)
            setComments(data.comment)
            setNum_like(data.num_like)
            setNum_comment(data.num_comment)
            setCreated_at(moment.utc(data.created_at).utcOffset('+09:00').format('YY. MM. DD. HH:mm'))
            
            data.writer.pk == data.pk ? setShowModiBtn(true) : setShowModiBtn(false)
        })
        .catch(error => {
        })
  }, []);

  const handleComment = (newComment, num) => {
    setComments([...newComment])
    setNum_comment(num_comment + num)
  };

  const likeClick = () => {
    const apiUrl = Domain + `boards/${id}/like/`;
    const token = localStorage.getItem("access")
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    axios.post(apiUrl,{},{ headers: headers })
    .then(response => {
      const {data} = response;
      setNum_like(data.num_like);
  })
  .catch(error => {
  });
  }

  return (
    <div className="outer flex">
      <h3  className="font-GSM">Q&A 게시판</h3>
      <div className="post-btns flex">
        <div>
          <button className="goList" 
                  onClick={()=>{navigate("/board/", {state: {currentPage:currentPage}})}}
          >목록으로</button>
        </div>
        <div>
          {
            showModiBtn && (
              <>
                <button className="goList pvt-btn"
                        onClick={()=>{ navigate(`/board/edit/${id}`,
                                                  {state: {
                                                    isModi: true, 
                                                    postTitle: post.title, 
                                                    postContent: post.content}}); }}
                >수정</button>
                <button className="goList pvt-btn"
                        onClick={()=>{ navigate("/board/post/delete", {state: {value: id}}); }}
                >삭제</button>
              </>
            )
          }
        </div>
      </div>

      <div className="post-detail">
        <div className="post-detail-card">
          <div className="card-1st">
            <div>
              <h4 className="font-GSM">
                {post ? ( post.title ) : ( <p>Loading...</p> )}
              </h4>
              <div>
                <div className="q-prob-info flex">
                  <span>질문한 문제 : </span>
                  <div> { problemTitle } </div>
                </div>
                <div className="q-user-info flex">
                  <div className="Fa-User">
                    <FaRegUser size="42" />
                  </div>
                  <div>
                    <span>{post ? ( post.writer.username ) : ( <p>Loading...</p> )}</span>
                    <span>{post ? ( created_at ) : ( <p>Loading...</p> )}</span>
                  </div>
                  <div>
                    <div className="flex">
                      <span><FaEye size={20}/> { watching }</span>
                      <span><FaCommentDots size={19}/> { num_comment }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-2nd">
            <div>
              {post ? ( parse(post.content) ) : ( <p>Loading...</p> )}
            </div>
          </div>

          <div className="ditto flex">
            <button className="Fa-Question" onClick={likeClick}>
              <div><FaQuestion size="31"/></div>
              <span>{num_like}</span>
            </button>
            <span>저도 궁금해요!</span>
          </div>
        </div>

        <div className="post-detail-comment-info">
          <div className="flex">
            <span className="font-GSM">댓글</span>
            <span>{ num_comment }개</span>
          </div>
          <PostCommentInput id={id} onAddComment={handleComment} />
        </div>
        <PostComments id={id} comments={comments} onDeleteComment={handleComment} />
      </div>

      <div>
        <button className="goList bottom-goList" 
                onClick={()=>{navigate("/board/", {state: {currentPage:currentPage}})}}
        >목록으로</button>
      </div>
    </div>
  );
}
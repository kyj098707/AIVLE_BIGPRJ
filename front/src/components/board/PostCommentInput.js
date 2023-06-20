import React, { useState } from "react";
import axios from "axios";

import "../../scss/PostCommentInput.scss";

export default function PostCommentInput(props) {
  const [commentText,setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === '') {
      alert("내용을 입력하세요.")
      return;
    }

    const apiUrl_CommentCreate = "http://localhost:8000/api/boards/" + props.id + "/comments/create/";
    const apiUrl_PostId = "http://localhost:8000/api/boards/" + props.id;
    
    const token = localStorage.getItem("access")
    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    axios.post(apiUrl_CommentCreate, { "content" : commentText },{headers:headers})
          .then(response => {
              axios.get(apiUrl_PostId, { headers: headers })
                    .then(response => {
                        const { data } = response
                        props.onAddComment(data.comment, 1)
                        setCommentText('')
                    })
                    .catch(error => {
                        console.log(error)
                    })
          })
  }

  return (
    <div className="post-detail-input-comment">
      <form className="flex" onSubmit={ handleSubmit }>
        <textarea placeholder="댓글을 작성해 주세요."
                  value={commentText}
                  onChange={(e) => {setCommentText(e.target.value)}}
                  rows={5}
        ></textarea>
        <div>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}

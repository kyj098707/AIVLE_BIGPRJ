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
    const headers = {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NjM0NzE2LCJpYXQiOjE2ODY2MTY3MTYsImp0aSI6IjM1OTcxNjFkOWNlNjQzMmFiZDI2YTM1MTIxZjJkOGYyIiwidXNlcl9pZCI6M30.MnYC7BOm3-78VzxWb_1a6NN-yLA91_4F0dt1W_2uvWE`
    }

    axios.post(apiUrl_CommentCreate, { "content" : commentText },{headers:headers})
          .then(response => {
              axios.get(apiUrl_PostId, { headers: headers })
                    .then(response => {
                        const { data } = response
                        props.onAddComment(data.comment)
                        setCommentText('')
                        
                        console.log("PostcommentsInput.js PostId API 호출")
                    })
                    .catch(error => {
                        console.log(error)
                    })
          })
  }

  return (
    <div className="post-detail-input-comment">
      <form onSubmit={ handleSubmit } className="flex">
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

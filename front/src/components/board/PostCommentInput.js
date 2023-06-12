import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../scss/PostCommentInput.scss";

export default function PostCommentInput(props) {
  const [text,setText] = useState("");

  function onChange(e) {
    setText(e.target.value);
  }
  
  const createComment = () => {
    const apiUrl = "http://localhost:8000/api/boards/" + props.id + "/comments/create/";
    const headers = {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NTQ3MDA0LCJpYXQiOjE2ODY1MjkwMDQsImp0aSI6ImMzZTMxN2JjYWU3NzRlMWFhZjQxZmI4OGNmODZlNDYwIiwidXNlcl9pZCI6M30.l7bHVmZjCQQO29AFz4M-0Hav8pv29GZcslSZkuyCBD4`
    }

    axios.post(apiUrl, {
        "content" : text,
    },{headers:headers})

    // navigate("/board/post", {state: {value: id}});
    // window.location.reload();
  }

  return (
    <div className="post-detail-input-comment flex">
      <textarea placeholder="댓글을 작성해 주세요." onChange={onChange} rows={5}></textarea>
      <div>
        <button onClick={ createComment }>등록</button>
      </div>
    </div>
  );
}

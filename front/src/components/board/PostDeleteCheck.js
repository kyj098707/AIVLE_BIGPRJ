import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../scss/PostDeleteCheck.scss";

export default function PostDeleteCheck() {
  const postNum = useLocation().state.value;
  const navigate = useNavigate();

  const postDelete = () => {
    const apiUrl = "http://localhost:8000/api/boards/" + postNum + "/delete/"

    // const token = localStorage.getItem("access")
    const headers = {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NjM0NzE2LCJpYXQiOjE2ODY2MTY3MTYsImp0aSI6IjM1OTcxNjFkOWNlNjQzMmFiZDI2YTM1MTIxZjJkOGYyIiwidXNlcl9pZCI6M30.MnYC7BOm3-78VzxWb_1a6NN-yLA91_4F0dt1W_2uvWE`
    }

    axios.delete(apiUrl, { headers: headers, data: {'id': postNum} })
         .catch(error => {
            console.log(error);
         });

    navigate("/board");
  }

  return (
    <div className="deletecheck flex">
      <h4>삭제하시겠습니까?</h4>
      <div className="buttons flex">
        <div>
          <button className="delete-button" onClick={ postDelete }>삭제</button>
        </div>
        <div>
          <button className="cancel-button" onClick={() => { navigate(-1); }}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

import "../../scss/PostComments.scss";

export default function PostComments(props) {

  const commenttDelete = (commentId) => {
    const apiUrl = "http://localhost:8000/api/boards/" + props.id + "/comments/" + commentId;

    const token = localStorage.getItem("access")
    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    axios.delete(apiUrl, { headers: headers })
         .then(response => {
            const { data } = response
            props.onDeleteComment(data)
         })
         .catch(error => {
            console.log(error);
         });
  }

  return (
    <div className="post-detail-comments">

        {props.comments?.map((comment,index) => {
            const { content, user } = comment
            const created_at = moment.utc(comment.created_at).utcOffset('+09:00').format('YY. MM. DD. HH:mm')
            const lines = content.split('\n')
            
            return (
                <div>
                    <div className="comment-info flex">
                        <div>
                            <FaRegUser />
                            <span style={{marginLeft:"7px"}}>{ user.username }</span>
                            <span style={{margin:"0 7px 0 7px"}}>|</span>
                            <span>{ created_at }</span>
                        </div>
                        <div className="">
                            <div>
                                <span className="comment-delete"
                                      onClick={ ()=>{ commenttDelete(comment.id) } }
                                >삭제</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            lines.map((line, index) => {
                                return(
                                    <>
                                    {line}<br />
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })}
    </div>
  );
}
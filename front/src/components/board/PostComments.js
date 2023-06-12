import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import moment from "moment";

// import "../../scss/PostCommentInput.scss";

export default function PostComments({post}) {

  return (
    <div className="post-detail-comments">

        {post?.comment.map((comment,index) => {
            const { content, user } = comment
            const created_at = moment.utc(comment.created_at).utcOffset('+09:00').format('YY. MM. DD. HH:mm')
            
            return (
                <div>
                    <div className="flex">
                        <div>
                            <FaRegUser />
                            <span style={{marginLeft:"7px"}}>{ user }</span>
                            <span style={{margin:"0 7px 0 7px"}}>|</span>
                            <span>{ created_at }</span>
                        </div>
                        <div className="flex">
                            <div>
                                <span>추천</span>
                                <span>0</span>
                            </div>
                            <div>
                                <AiFillLike />
                            </div>
                        </div>
                    </div>
                    <div>
                        { content }
                    </div>
                </div>
                
            )
        })}

    </div>
  );
}
import "../../scss/Post.scss";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaEye, FaRegUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import PostComment from "./PostComment";
import PostCommentLogin from "./PostCommentLogin";

export default function Post() {
  const { postNum } = useParams();
  const navigater = useNavigate();

  const naviList = () => {
    navigater("/board");
  };
  const naviDeleteCheck = () => {
    navigater("/board/post/delete");
  };

  return (
    <div className="outer flex">
      <h3>Q&A 게시판</h3>
      <div>
        <button className="goList" onClick={naviList}>
          목록으로
        </button>
        <button className="goList" onClick={naviDeleteCheck}>
          삭제
        </button>
      </div>

      <div className="post-detail">
        <div className="post-detail-card">
          <div className="card-1st">
            <div>
              <h4>출력이 한줄인가요 두줄인가요?</h4>
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
                    <span>덩둥이</span>
                    <span>23. 05. 26. 오후 11:10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-2nd">
            <div>
              <div>
                <p>지문에는 출력이 두줄이라고 하는데</p>
                <p>예시에는 한줄만 나와요</p>
              </div>
            </div>
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
                <span>댓글 1</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="post-detail-comment-info flex">
            <h4>댓글</h4>
            <span>1개</span>
          </div>
        </div>

        <PostCommentLogin />
        {/* <PostComment /> */}

        <div className="post-detail-comments">
          <div className="flex">
            <div>
              <FaRegUser />
              <span>Louie</span>
              <span>|</span>
              <span>23. 05. 30. 오전 10:27</span>
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
            <div>
              <p>안녕하세요, 루이입니다!</p>
              <p>
                가능한 최댓값만 출력하는 것이 맞습니다. 지문의 출력 부분을
                수정했으니 확인 부탁드려요!
              </p>
              <p>
                더 궁금하신 점 있으시면 댓글로 추가 질문 부탁드립니다.
                감사합니다 :D
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button className="goList" onClick={naviList}>
          목록으로
        </button>
      </div>
    </div>
  );
}

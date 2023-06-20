import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate, useLocation } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import axios from "axios";

import "../../scss/PostWrite.scss";

export default function PostWrite() {
  const isModi= useLocation().state?.isModi
  console.log(isModi)
  const [title, setTitle] = useState(useLocation().state?.postTitle)
  const [content, setContent] = useState(useLocation().state?.postContent)

  const navigate = useNavigate()
  const editorRef = useRef()
  const textarea = useRef()
  const toolbar = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "indent", "outdent"],
    ["link"],
    ["code", "codeblock"],
  ]

  const handleRegisterButton = () => {
    let content = editorRef.current?.getInstance().getHTML();

    async function fn() {
      const apiUrl = "http://localhost:8000/api/boards/create/"
      const token = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const result = await axios.post(
        apiUrl,
        {
          "title": title,
          "content": content,
        },
        { "headers": headers }
      )
      .catch(error => {
         console.log(error);
      });
    }
    fn();

    navigate("/board");
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  }

  const initialValue = content || " ";

  return (
    <div className="post-write">
      <div className="aa">
        <div className="post-category flex">
          <div className="category focus">질문</div>
          <div className="category">임시</div>
          <div className="category">임시</div>
          <div className="category">임시</div>
        </div>
        <textarea
          placeholder="제목을 입력해 주세요."
          name="title"
          value={title}
          rows={1}
          wrap="virtual"
          ref={textarea}
          onChange={onChangeTitle}
        />
        <textarea placeholder="문제 번호/제목" rows={1} wrap="virtual" />
        <Editor
          ref={editorRef}
          initialValue={initialValue}
          initialEditType="wysiwyg"
          previewStyle="vertical"
          hideModeSwitch={true}
          height="400px"
          usageStatistics={false}
          toolbarItems={toolbar}
          useCommandShortcut={false}
          placeholder=""
          previewHighlight={false}
          language="ko-KR"
        />
      </div>
      <div className="buttons flex">
        <div className="space-between flex">
          <button
            className="cancel-button"
            onClick={() => { navigate(-1); }}
          >취소
          </button>
          <button className="submit-button" onClick={handleRegisterButton}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

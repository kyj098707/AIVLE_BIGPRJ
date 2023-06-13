import "../../scss/PostWrite.scss";
import React, { useState, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostWrite() {
  const navi = useNavigate();
  const editorRef = useRef();
  const textarea = useRef();
  const toolbar = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "indent", "outdent"],
    ["link"],
    ["code", "codeblock"],
  ];

  const [name, setName] = useState("");

  const handleRegisterButton = () => {
    let content = editorRef.current?.getInstance().getHTML();

    async function fn() {
      const token = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NjM0NzE2LCJpYXQiOjE2ODY2MTY3MTYsImp0aSI6IjM1OTcxNjFkOWNlNjQzMmFiZDI2YTM1MTIxZjJkOGYyIiwidXNlcl9pZCI6M30.MnYC7BOm3-78VzxWb_1a6NN-yLA91_4F0dt1W_2uvWE`,
      };
      const result = await axios.post(
        "http://localhost:8000/api/boards/create/",
        {
          "title": name,
          "content": content,
        },
        { "headers": headers }
      );
      console.log(result);
    }
    fn();

    navi("/board");
  };

  const onChangeName = (event) => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

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
          rows={1}
          wrap="virtual"
          ref={textarea}
          onChange={onChangeName}
        />
        <textarea placeholder="문제 번호/제목" rows={1} wrap="virtual" />
        <Editor
          placeholder="내용을 작성해 주세요."
          previewStyle="vertical"
          initialValue=" "
          height="400px"
          initialEditType="wysiwyg"
          toolbarItems={toolbar}
          previewHighlight={false}
          ref={editorRef}
          hideModeSwitch={true}
          useCommandShortcut={false}
          usageStatistics={false}
          language="ko-KR"
        />
      </div>
      <div className="buttons flex">
        <div className="space-between flex">
          <button
            className="cancel-button"
            onClick={() => {
              navi(-1);
            }}
          >
            취소
          </button>
          <button className="submit-button" onClick={handleRegisterButton}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

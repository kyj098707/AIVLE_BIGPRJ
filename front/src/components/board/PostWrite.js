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

  const [title, setTitle] = useState("");

  const handleRegisterButton = () => {
    let content = editorRef.current?.getInstance().getHTML();
    console.log(content)

    async function fn() {
      const token = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      
      console.log(token, headers)
      const result = await axios.post(
        "http://localhost:8000/api/boards/create/",
        {
          "title": title,
          "content": content,
        },
        { "headers": headers }
      )
      .catch(error => {
         console.log(error);
      });
      console.log(result);
    }
    fn();

    navi("/board");
  };

  const onChangeName = (e) => {
    setTitle(e.target.value)
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
          placeholder=""
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

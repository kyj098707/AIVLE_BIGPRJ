import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate, useLocation } from "react-router-dom";
import { AutoComplete, Tag } from 'antd';
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import axios from "axios";

import "../../scss/PostWrite.scss";
// const { Option } = AutoComplete;

export default function PostWrite() {
  const isModi= useLocation().state?.isModi
  const [qPostNum, setQPostNum] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [modiTitle] = useState(useLocation().state?.postTitle)
  const [modiContent] = useState(useLocation().state?.postContent)
  const initialValueTitle = modiTitle || title;
  const initialValueContent = modiContent || " ";

  const navigate = useNavigate()
  const autoComplete = useRef()
  const textarea = useRef()
  const editorRef = useRef()
  const toolbar = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "indent", "outdent"],
    ["link"],
    ["code", "codeblock"],
  ]

  const handleRegisterButton = () => {
    if(!selectedValue.trim()){
      alert("문제를 입력해 주세요.")
      return
    }
    if(!title.trim()){
      alert("제목을 입력해 주세요.")
      return
    }
    if(!content.trim()){
      alert("내용을 입력해 주세요.")
      return
    }

    console.log(selectedValue)

    async function fn() {
      const apiUrl = "http://localhost:8000/api/boards/create/"
      const token = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let content = editorRef.current?.getInstance().getHTML();

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

  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSearch = (value) => {
    const filteredOptions = problemList.filter((item) =>
      item.includes(value)
    );
    setOptions(filteredOptions);
  };
  
  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const handleClear = () => {
    setSelectedValue('');
  };

  const problemList = [
    '1000. 가나다',
    '1001. 가나다',
    '1002. 가나다',
    '1003. 가나다',
    '1004. 가나다',
    '1005. 가나다',
    '1100. 가나다',
    '1101. 가나다',
    '1102. 가나다',
    '1103. 가나다',
    '1104. 가나다',
    '1105. 가나다',
  ];

  return (
    <div className="post-write">
      <div className="post-write-container">
        <div className="post-category flex">
          <div className="category focus">질문 작성하기</div>
        </div>
        <div>
          <div className="write-line">
            <span>문제 No.</span>
            <AutoComplete
              // className={selectedValue !== '' ? 'disabled-autocomplete' : ''}
              // disabled={selectedValue !== ''}
              // allowClear={true}
              options={options.map((item) => ({ value: item }))}
              onSearch={handleSearch}
              onSelect={handleSelect}
              placeholder="문제 번호를 입력해 주세요."
            />
          </div>
          <div className="write-line inner-border">
            <span>제목</span>
            <textarea
              className="question-title"
              placeholder="제목을 입력해 주세요."
              name="title"
              value={initialValueTitle}
              rows={1}
              ref={textarea}
              onChange={onChangeTitle}
            />
          </div>
          <div className="write-line">
            <span>내용</span>
            <Editor
              ref={editorRef}
              initialValue={initialValueContent}
              onChange={(value) => setContent(value)}
              initialEditType="wysiwyg"
              previewStyle="vertical"
              hideModeSwitch={true}
              height="420px"
              usageStatistics={false}
              toolbarItems={toolbar}
              useCommandShortcut={false}
              placeholder=""
              previewHighlight={false}
              language="ko-KR"
            />
          </div>
        </div>
      </div>

      <div className="buttons flex">
        <div className="space-between flex">
          <button className="submit-button" onClick={handleRegisterButton}>
            등록
          </button>
          <button
            className="cancel-button"
            onClick={() => { navigate(-1); }}
          >취소
          </button>
        </div>
      </div>

    </div>
  );
}

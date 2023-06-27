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
  const isModi = useLocation().state?.isModi
  const [qPostNum, setQPostNum] = useState(false)
  const [title, setTitle] = useState('')
  const [problemId, setProblemId] = useState('')
  const [content, setContent] = useState('')
  const [problemList, setProblemList] = useState([])
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

  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    
    axios.get(`http://localhost:8000/api/problems/list/`, { headers: headers })
        .then(response => {
            const { data } = response
            setProblemList(data)
        })
        .catch(error => {
            console.log(error);
        });
  }, []);
  
  const onProblemIdChange = (event) => {
    setProblemId(event.target.value);
  };

  const handleRegisterButton = () => {

    console.log(selectedValue)


    const apiUrl = "http://localhost:8000/api/boards/create/"
    const token = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let content = editorRef.current?.getInstance().getHTML();

    axios.post(
      apiUrl,
      {
        "title": title,
        "content": content,
        "problem_id": problemId,
      },
      { "headers": headers }
    )
      .then(response => {
        const {data} = response
        if (data.result == "error"){
          alert(data.msg)
        } 
        else {
              navigate("/board");
        }
      })
      .catch(error => {
        console.log(error);
      });



  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  }

  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const prList = [

  ];

  return (
    <div className="post-write">
      <div className="post-write-container">
        <div className="post-category flex">
          <div className="category focus">질문 작성하기</div>
        </div>
        <div>
          <div className="write-line" onChange={onProblemIdChange}>
            <span>문제 No.</span>
            <textarea placeholder="문제 번호/제목" rows={1} wrap="virtual" />
            {/* <AutoComplete
              // className={selectedValue !== '' ? 'disabled-autocomplete' : ''}
              // disabled={selectedValue !== ''}
              // allowClear={true}
              options={options.map((item) => ({ value: item }))}
              onSearch={handleSearch}
              onSelect={handleSelect}
              placeholder="문제 번호를 입력해 주세요."
            /> */}
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

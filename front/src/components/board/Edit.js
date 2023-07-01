import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import axios from "axios";

import { Domain } from '../Store';
import "../../scss/PostWrite.scss";
// const { Option } = AutoComplete;

// 모달 팝업 관련
import AlertError from '../temp/AlertError';
import Modal from 'react-modal'
Modal.setAppElement('#root'); // 모달을 렌더링할 DOM 요소를 설정
// 모달 팝업 관련

export default function Edit() {
    const {postId} = useParams()
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
        const apiUrl = Domain + 'problems/list/'
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        
        axios.get(apiUrl, { headers: headers })
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

    const handleEditButton = () => {

        console.log(selectedValue)


        const apiUrl = Domain + `boards/${postId}/update/`
        const token = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        let content = editorRef.current?.getInstance().getHTML();

        axios.put(
            apiUrl,
            {
                "title": title,
                "content": content,
                "problem_id": problemId,
            },
            { "headers": headers }
        )
            .then(response => {
                const { data } = response
                if (data.result == "error") {
                    openModal();
                    setModalMsg(data.msg);
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

    // Modal 팝업 관련
    const [isOpen, setIsOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState('에러입니다.');
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    // Modal 팝업 관련

    return (
        <div className="post-write">
            <div className="post-write-container">
                <div className="post-category flex">
                    <div className="category focus">질문 수정하기</div>
                </div>
                <div>
                    <div className="write-line" onChange={onProblemIdChange}>
                        <span>문제 No.</span>
                        <textarea placeholder="문제 번호/제목" rows={1} wrap="virtual" />
                    </div>
                    <div className="write-line inner-border">
                        <span>제목</span>
                        <textarea
                            className="question-title"
                            placeholder={initialValueTitle}
                            name="title"
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
                    <button className="submit-button" onClick={handleEditButton}>
                        수정
                    </button>
                    <button
                        className="cancel-button"
                        onClick={() => { navigate(-1); }}
                    >취소
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={{
                content: {
                    width: "285px",
                    height: "300px",
                    zIndex: "11",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "20px",
                    boxShadow: "5px 5px 20px rgba($gray, 10%)",
                    overflow: "hidden",
                    // backgroundColor:'#B0DB7D' Success일 때,
                    backgroundColor:'#EF8D9C',
                },
                overlay: {
                    zIndex: 100,
                },
                }}
            >
                <AlertError alertMessage={modalMsg} setIsOpen={setIsOpen} />
            </Modal>
        </div>
    );
}

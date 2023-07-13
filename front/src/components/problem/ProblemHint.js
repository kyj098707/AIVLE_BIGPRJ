import { React, useState } from "react";
import { FloatButton, Modal, Card, Input, Button } from 'antd';
import axios from "axios";
import { Domain } from '../Store';
import '../../scss/problem.scss';

export default function ProblemHint() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemId, setProblemId] = useState('');
  const [firstHint, setFirstHint] = useState('');
  const [secondHint, setSecondHint] = useState('');
  const [thirdHint, setThirdHint] = useState('');
  const [showFirstHint, setShowFirstHint] = useState(false);
  const [showSecondHint, setShowSecondHint] = useState(false);
  const [showThirdHint, setShowThirdHint] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const onHintProblemChange = (event) => {
    setProblemId(event.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hintClick = (e) => {
    const apiUrl = Domain + `problems/hint/`
    const token = localStorage.getItem("access");
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    axios.post(apiUrl, { "problem_id": problemId }, { headers: headers })
      .then(response => {
        const { data } = response;
        setFirstHint(data.hint1);
        setSecondHint(data.hint2);
        setThirdHint(data.hint3);
        setIsButtonClicked(true);
      })
      .catch(error => {
      });
  };

  const showHintContent = (hintNumber) => {
    if (hintNumber === 1) {
      setShowFirstHint(true);
      setShowSecondHint(false);
      setShowThirdHint(false);
    } else if (hintNumber === 2) {
      setShowFirstHint(false);
      setShowSecondHint(true);
      setShowThirdHint(false);
    } else if (hintNumber === 3) {
      setShowFirstHint(false);
      setShowSecondHint(false);
      setShowThirdHint(true);
    }
  };

  return (
    <div>
      <Modal
        title={<div className="custom-modal-title">무엇이든지 물어보세요</div>}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
        wrapClassName="custom-modal-wrapper"
        cancelButtonProps={{ style: { backgroundColor: 'white', color: 'green' } }}
        okButtonProps={{ style: { backgroundColor: 'green', color: 'white' } }}
      >
        <Card>
          <div className="hint-title">
            <img src="img/q&a green.png" alt="logo" className="hint_logo" />
            <h4>Algo KING이 도와드릴게요<br/>다소 시간이 걸릴 수 있습니다. <br/>기다려 주세요.</h4>
            <div className='hintInput' onChange={onHintProblemChange}>
              <Input size="small" placeholder="추가할 문제(백준 번호)" />
            </div>
            <div>
              <Button onClick={hintClick} className="custom-button">추가</Button>
              {isButtonClicked && (
                <div className="hint_box">
                  <Button onClick={() => showHintContent(1)} className="custom-button">First Hint</Button>
                  <Button onClick={() => showHintContent(2)} className="custom-button">Second Hint</Button>
                  <Button onClick={() => showHintContent(3)} className="custom-button">Third Hint</Button>
                </div>
              )}
            </div>
            {showFirstHint && <div>{firstHint}</div>}
            {showSecondHint && <div>{secondHint}</div>}
            {showThirdHint && <div>{thirdHint}</div>}
          </div>
        </Card>
      </Modal>
      <FloatButton onClick={showModal} icon={<img src="img/chat-icon.png" alt="icon" />} className="float-button" />
    </div>
  );
}

import { React, useState } from "react";
import { FloatButton,Modal,Card,Input,Button} from 'antd';
import axios from "axios";

import '../../css/problem/problem.css'

export default function ProblemHint() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [problemId, setProblemId] = useState('');
    const [firstHint, setFirstHint] = useState('');
    const [secondHint, setSecondHint] = useState('');
    const [thirdHint, setThirdHint] = useState('');
    
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
        const token = localStorage.getItem("access")
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        axios.post(`http://localhost:8000/api/problems/hint/`, {"problem_id":problemId}, { headers: headers })
            .then(response => {
                console.log(response);
                const { data } = response;
                setFirstHint(data.hint1);
                setSecondHint(data.hint2);
                setThirdHint(data.hint3);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <div>
            <Modal title="무물보" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Card>
                    <div className="hint-title">
                        <img src="img/tmp_algo.jpeg" alt="logo" className="hint_logo" />
                        <h4>모르는 문제를 말해 보거라 푸하하하</h4>
                        <div className='hintInput' onChange={onHintProblemChange}>
                            <Input size="small" placeholder="추가할 문제(백준 번호)" />
                        </div>
                        <Button onClick={hintClick}> 추가 </Button>
                        <div>{firstHint}</div>
                        <div>{secondHint}</div>
                        <div>{thirdHint}</div>
                    </div>
                </Card>
            </Modal>
            <FloatButton onClick={showModal} icon={<img src="img/chat-icon.png" alt="icon"/>} />
        </div>
    );
}
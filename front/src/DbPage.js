import { Button } from 'antd';
import React from 'react';
import axios from 'axios';

function DbPage() {
    const pr = async (e) => {
        e.preventDefault();
        console.log("눌러졌음 기다려줘");
        await axios.get('http://localhost:8000/api/db/problems/')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                alert(error);
            })
    }
    const usr = async (e) => {
        e.preventDefault();
        console.log("눌러졌음 기다려줘");
        await axios.get('http://localhost:8000/api/db/users/')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                alert(error);
            })
    }
    return (
        <div>
            <Button onClick={pr}> 문제 불러오기</Button>
            <Button onClick={usr}> 유저 불러오기</Button>
        </div>
        
    );
}

export default DbPage;

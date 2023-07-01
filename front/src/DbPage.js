import { Button } from 'antd';
import React from 'react';
import axios from 'axios';
import { Domain } from './components/Store';

function DbPage() {
    const pr = async (e) => {
        e.preventDefault();
        const apiUrl = Domain + 'db/problems/'
        console.log("눌러졌음 기다려줘");
        await axios.get(apiUrl)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                alert(error);
            })
    }
    const usr = async (e) => {
        e.preventDefault();
        const apiUrl = Domain + 'db/users/'
        console.log("눌러졌음 기다려줘");
        await axios.get(apiUrl)
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

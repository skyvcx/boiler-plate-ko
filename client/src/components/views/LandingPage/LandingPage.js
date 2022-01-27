import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/hello') //서버단으로 엔드포인트를지정하여 넘기는부분
        .then(response => console.log(response.data))
        //프론트에서 넘어온 값을 response에 담고 콘솔로 내용물을 찍어봄
    },[]) 
    
const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response =>{
        
        if(response.data.success) {
                navigate("/loginPage")
            } else {
                alert('로그아웃 실패')
            }
        })
    
}

    return ( 
        <div style={{
            display: 'flex',justifyContent:'center',alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>
        <br/>
        <button onClick={onClickHandler} >
            로그아웃
        </button>

        </div>
        
        
        )
}

export default LandingPage;

import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello') //서버단으로 엔드포인트를지정하여 넘기는부분
        .then(response => console.log(response.data))
        //프론트에서 넘어온 값을 response에 담고 콘솔로 내용물을 찍어봄
    },[]) 
    
    return ( 
        <div>
            LandingPage
        </div>)
}

export default LandingPage;

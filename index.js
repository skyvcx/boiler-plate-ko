const express = require('express')
// package.json에 설치한 express 모듈을 js로 불러들임 
const app = express()
// 새로운 express() app 을 만듬
const port = 3000
//localhost:3000 포트 사용

const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://skyvcx:qwer1234@boilerplate.g1mgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
    console.log(err);
    });


app.get('/',(req,res) => res.send('Hello World!'))
// 루트 디렉토리에 들어올경우 res.send로 HelloWorld! 를 출력하도록함


app.listen(port,()=>console.log(`Example app listening on port ${port}!`))
// app이 포트번호를 읽게되면 콘솔로그를 찍는다.



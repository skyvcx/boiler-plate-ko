const express = require('express')
// package.json에 설치한 express 모듈을 js로 불러들임 
const app = express()
// 새로운 express() app 을 만듬
const port = 3000
//localhost:3000 포트 사용
const bodyParser = require('body-parser');
// package.json에 설치한 body-parser 모듈을 js로 불러들임 
const {User} = require("./models/User");
// models/User.js를 불러옴

// 데이터를 분석하여가져올수있게 bodyParser설정을해줌

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://skyvcx:qwer1234@boilerplate.g1mgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
    console.log(err);
    });


app.get('/',(req,res) => res.send('Hello World!'))
// 루트 디렉토리에 들어올경우 res.send로 HelloWorld! 를 출력하도록함

app.post('/register',(req,res)=>{

    //회원가입 할때 필요한 정보들을 클라이언트 에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    // req.body 안에는 json 형식으로 {id:"hello", password:"123"} = body-parser가 해당기능을 담당한다

    // 몽고DB에서 오는 메서드
    user.save((err,userInfo) =>{
        if(err) return res.json({ success:false,err}) //만약 err가 있으면 json형식으로 성공하지 못했다는 이력과 err메시지를 같이 전송함
        return res.status(200).json({
            success:true
        })//return end
    }) //user.save end
})// app.post end


app.listen(port,()=>console.log(`Example app listening on port ${port}!`))
// app이 포트번호를 읽게되면 콘솔로그를 찍는다.



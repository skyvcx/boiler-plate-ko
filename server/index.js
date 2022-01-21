const express = require('express')
// package.json에 설치한 express 모듈을 js로 불러들임 
const app = express()
// 새로운 express() app 을 만듬
const port = 3000
//localhost:3000 포트 사용
const bodyParser = require('body-parser');
// package.json에 설치한 body-parser 모듈을 js로 불러들임
const cookieParser = require('cookie-parser');
// package.json에 설치한 cookie-parser 모듈을 js로 불러들임 

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
// models/User.js를 불러옴
const config = require('./config/key');



// 데이터를 분석하여가져올수있게 bodyParser설정을해줌
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose 
    .connect(config.mongoURI)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });


app.get('/', (req, res) => res.send('Hello World!~~'))
// 루트 디렉토리에 들어올경우 res.send로 HelloWorld! 를 출력하도록함

//유저정보를 저장하는 코드(회원가입)
app.post('/api/users/register', (req, res) => {

    //회원가입 할때 필요한 정보들을 클라이언트 에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    // req.body 안에는 json 형식으로 {id:"hello", password:"123"} = body-parser가 해당기능을 담당한다



    // 몽고DB에서 오는 메서드
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err }) //만약 err가 있으면 json형식으로 성공하지 못했다는 이력과 err메시지를 같이 전송함
        return res.status(200).json({
            success: true
        })//return end
    }) //user.save end
})// app.post end

// 유저정보를 저장하는 코드 종료

//유저 로그인 코드(로그인)
app.post('/api/users/login', (req, res) => {

    //요청된 이메일을 데이터베이스에서 검색
    User.findOne({ email: req.body.email }, (err, user) => { // User플렉션 안에 요청된이메일값이 

        if (!user) {  //한명도 없을경우
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            }) //해당데이터를 리턴

        }

        //요청된 이메일이 데이터베이스에 있으면 비밀번호가 일치하는지 검사
        user.comparePassword(req.body.password, (err, isMatch) => {

            if (!isMatch) // 요청값과 데이터베이스에 존재하는값이 일치하지 않을경우
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })


            //비밀번호까지 일치할경우 토큰을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 생성한 토큰을 저장한다 (쿠키에 저장)
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            }) //토큰 종료
        })
    }) //검색 종료
})// 유저로그인코드 종료


app.get('/api/users/auth', auth, (req, res) => {// 엔드포인트에서 auth는 콜백 (req,res)전에 동작

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})


app.get('/api/users/logout', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" }, (err, user) => {

            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// app이 포트번호를 읽게되면 콘솔로그를 찍는다.



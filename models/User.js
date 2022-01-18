const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength:50

    },
    email:{
        type:String,
        trim:true, // sky vcx@naver.com 를 skyvcx@naver.com 로 변경해줌
        unique:1
    },
    password:{
        type: String,
        minlenght:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{ // 유저에게 권한을 부여하는 코드넘버
        type:Number,
        default:0
    },
    image:String,
    token:{ // 유효성검사를위한 토큰
        type:String
    },
    tokenExp:{ // 토큰에 유효기간

    }
    
})

const user = mongoose.model('user',userSchema)
// 스프링 컨트롤로에서 모델에 변수넣는느낌 ?  model('변수명',변수에 들어갈내용)

module.exports= {user}



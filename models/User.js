const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   
const saltRounds = 10;

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


userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){ //userSchema 모델안에 password 만 변경되었을경우만 암호화를 한다.
         // 1.비밀번호를 암호화 한다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            //순수 password를 비크립트로 변환하고
            if(err) return next(err) //에러 발생시 에러를 반환 해주고
            user.password = hash // 성공하였을경우 hash에 담긴 비밀번호로 변경되어 next() 함수를 동작시킴
            next()
        })
    })

    }




})
    // 유저정보를 저장하기전에 실행하게 만드는 코드

const User = mongoose.model('User',userSchema)
// 스프링 컨트롤로에서 모델에 변수넣는느낌 ?  model('변수명',변수에 들어갈내용)

module.exports= {User}
// 다른 파일에서 사용하기위한 exports 명칭


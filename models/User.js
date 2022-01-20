const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
    //this는 userShema 가 mongoose.Schema 클래스로 생성되었고, Schema는 타입스크립트 클래스로 만들어졌으며, 타입스크립트에서 this는 해당 클래스를 동적으로 참조하는데 사용되기 때문입니다.

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

    } else{ // 비밀번호를 바꾸는게 아니라 다른 것을 변경할경우 
        next()
    }
})
    // 유저정보를 저장하기전에 실행하게 만드는 코드

//비밀번호 일치판단 코드
userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword qwer1234  암호화된 비밀번호  비교코드 작성
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){

        if(err) return cb(err);
        cb(null, isMatch)

    })
}


userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용하여 토큰 생성
    var user = this;
    
    var token = jwt.sign(user._id.toHexString(),'secretToken')
    //user._id + 'secretToken' = token
    // 'secretToken' -> user._id

    user.token = token
    //유저토큰에 토큰을 넣어줌
    user.save(function(err,user){
        if(err) return cb(err) //만약 에러가발생하면 에러를 반환해주고
        cb(null,user)// 에러가없으면 user 에담아 보냄
    
    })
}

const User = mongoose.model('User',userSchema)
// 스프링 컨트롤러에서 모델에 변수넣는느낌 ?  model('변수명',변수에 들어갈내용)

module.exports= {User}
// 다른 파일에서 사용하기위한 exports 명칭

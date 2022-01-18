if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod');
} else{
    module.exports=require('./dev');
}

// 환경변수 == process.env.NODE_ENV 값의  따라 
// production 이면 배포된 상태
// devlopment 면 local
import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import {registerUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";


function RegisterPage(props) {
    const dispatch =useDispatch();
    const navigate = useNavigate();

    const [Email, setEamil] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) =>{
        setEamil(event.currentTarget.value)
    }
    
    const onNameHandler = (event) =>{
        setName(event.currentTarget.value)
    }


    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }
    
    const onConfirmPassworddHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); //page 새로고침 방지

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {

            email: Email,
            password:Password,
            name:Name
        }

        dispatch(registerUser(body))
            .then(response =>{
                if(response.payload.success){
                    navigate("/login")
                
                
                } else{
                    alert("Failed to sign up")
                }
            })



    }
    return (
        <div style={{
            display: 'flex',justifyContent:'center',alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
        
            <form style={{display:'flex',flexDirection:'column' }}
                onSubmit={onSubmitHandler}
            >

                <label>Email</label>
                <input type= "email" value={Email} onChange={onEmailHandler} />
            
                <label>Name</label>
                <input type= "text" value={Name} onChange={onNameHandler} />
                
                <label>Password</label>
                <input type= "password" value={Password} onChange={onPasswordHandler} />
            
                <label>ConfirmPassword</label>
                <input type= "password" value={ConfirmPassword} onChange={onConfirmPassworddHandler}/>
            <br/>

            <button type="submit">
                회원 가입
            </button>

            </form>
        </div>)
        
}

export default RegisterPage;

import { Axios } from 'axios';
import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import {loginUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";



function LoginPage(props) {
    const dispatch =useDispatch();
    const navigate = useNavigate();

    const [Email, setEamil] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) =>{
    
        setEamil(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); //page 새로고침 방지

        let body = {
            email: Email,
            password:Password
        }

        dispatch(loginUser(body))
            .then(response =>{
                if (response.payload.loginSuccess) {

                    navigate("/LandingPage")
                  
                    } else {
                
                    alert("error")
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
            
                <label>password</label>
                <input type= "password" value={Password} onChange={onPasswordHandler}/>
            <br/>

            <button type="submit">
                Login
            </button>

            </form>
        </div>)
}

export default LoginPage
import React from "react";
import '../LoginForm/LoginSignUp.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import email_icon from '../images/email.png'
import password_icon from '../images/password.png'

function Login(){

const[action,setAction]=useState("Login");
const[email,setEmail] = useState()
const[password,setPassword]=useState()
const navigate = useNavigate()
const [errors, setErrors] = useState({})



const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('',{email, password})
    .then(result=>{console.log(result).navigate('/home')}).catch(err=>console.log(err))

}

    return(
        <div className="container">
                <div className="header">
                    <div className="name"><h2>Welcome To Expense Tracker!</h2></div>
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
        <form onSubmit={handleSubmit}>
                

        <div className="inputs">
             
      <div className="input">
      <img src={email_icon} alt=""/>
        <input
          type="email"
          name="email"
          placeholder='example@gmail.com'
          autoComplete='off'
          onChange={(e)=>setEmail(e.target.value)}   
          />
      </div>
      <div className="input">
      <img src={password_icon} alt=""/>
        <input
          type="password"
          name="password"
          placeholder='******'
          onChange={(e)=>setPassword(e.target.value)}   
          />
      </div>
      <div className="forgot-password">Forgot password? <span>Click here</span></div>
      
      <div className="submit-container">
        <Link to='/register' type="submit" className="submit" > SignUp</Link>
        
        <button type='submit' className="submit">Login</button>
      </div>
      </div> 
             
    </form> 
    </div>
    )

}

export default Login
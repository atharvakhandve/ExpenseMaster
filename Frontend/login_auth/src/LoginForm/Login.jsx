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
  const[username,setUsername] = useState()
  const[password,setPassword]=useState()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})



  const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post('http://localhost:3000/api/users/register',{email, password, username})
      .then(result=>{console.log(result)}).catch(err=>console.log(err))

  }

  return(
      <div className="container">
          <div class="navbar">
            <div className="">
              <a href="">About Us</a>
              <a href="">Log In</a>
            </div>    
          </div>
          <div class="container">
              <div class="div1">
                  <img src="../../Downloads/Screenshot_2024-11-07_213624-removebg.png" alt=""/>
              </div>
              <div class="div2">
                  <div class="login">
                      <h2>Signup</h2>
                      <form onSubmit={handleSubmit}>
                          <input class="field" type="text" name="username" placeholder="Enter your username here" onChange={(e) =>setUsername(e.target.value)}/>
                          <input class="field" type="email" name="email" placeholder="Enter your email here" onChange={(e) =>setEmail(e.target.value)}/>
                          <input class="field" type="password" name="password" placeholder="Enter your password here" onChange={(e) =>setPassword(e.target.value)}/>
                          <input class="field" type="password" placeholder="Confirm password"/>
                          <input class="button" type="submit" value="Signup"/>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login
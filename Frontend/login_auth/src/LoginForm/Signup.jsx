import React from "react";
import '../LoginForm/LoginSignUp.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import logo from '../images/logo.png'
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
      .then(result=>{
        if(result.data["email"]){
          const user = result.data.id;
          axios.get('http://localhost:3000/api/users/profile', {
            params: {
              user
            }
          })
            .then(result=>{console.log(result)}).catch(e=>console.log(e));
        }
      }).catch(err=>console.log(err))

  }

  return(
      <div>
          <div className="navbar">
              <div className="nav-links">
                <a href="">About Us</a>
                <a href="">Log In</a>
              </div>
          </div>
          <div className="container">
              <div className="div1">
                  <img src={logo} alt=""/>
              </div>
              <div className="div2">
                  <div className="login">
                      <h2>Signup</h2>
                      <form onSubmit={handleSubmit}>
                          <input className="field" type="text" name="username" placeholder="Enter your username here" onChange={(e) =>setUsername(e.target.value)}/>
                          <input className="field" type="email" name="email" placeholder="Enter your email here" onChange={(e) =>setEmail(e.target.value)}/>
                          <input className="field" type="password" name="password" placeholder="Enter your password here" onChange={(e) =>setPassword(e.target.value)}/>
                          <input className="field" type="password" placeholder="Confirm password"/>
                          <input className="button" type="submit" value="Signup"/>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login
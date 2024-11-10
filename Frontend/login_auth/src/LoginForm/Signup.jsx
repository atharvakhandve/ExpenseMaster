import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignup.css";
import user_icon from "../images/user.png";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    //console.log(e.target);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Validate the form
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    if (validateForm()) {
      // Submit the form if valid
      axios
        .post("http://localhost:3000/api/users/register", { username, email, password })
        .then((result) => {
          console.log(result);
          navigate("/Login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="name">
          <h2>Welcome To Expense Tracker!</h2>
        </div>
        <div className="text">Register</div>
        <div className="underline"></div>
      </div>

      <form method="post" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              value={formData.username}
              onChange={(e) => {
                setName(e.target.value);
                handleChange(e);
              }}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              autoComplete="off"
              value={formData.email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange(e);
              }}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleChange(e);
              }}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="******"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="forgot-password">
            Already A User? <Link to="/Login">Click here</Link>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit">
              Sign Up
            </button>
            <Link to="/Login" className="submit">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;

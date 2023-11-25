import './Login.css';
import React, { useState, useEffect } from 'react';
//Apply css according to your design theme or css that has been given to you in week 2 lab 2
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);
  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: name,
        email:email,
        password: password,
      }),
    });
    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('name', json.username.name);
      sessionStorage.setItem('phone', json.username.phone);
      sessionStorage.setItem('email', email);
      navigate('/');
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  const resetForm = () => {
    setPassword("");
    setEmail("");
  }

    return(    
    <div className="LoginPane">
      <form onSubmit={login}>
      <div className="LoginText">Login</div>
      <div className="AreYouANewMemberSignUpHere">
        <span className="areyouanewmember">Are you a new member? <a href="/Sign_Up">Sign Up Here</a></span>
      </div>
      
      <div className="form_area">
        <label className="label" for="email">Email (name@example.com)</label>
        <input type="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}" name="email" id="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="helpId"/>
      </div>
      <div className="form_area">
        <label className="label" for="password">Password</label>
        <div className="password_input"> 
        <input autocomplete="none" type="password" name="password" id="password" required className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="helpId"/><i className="far fa-eye" id="togglePassword"></i>
        </div>
      </div>
      <div className="button_area">
        <button type="reset" className="reset_btn" onClick={resetForm}>Reset</button>
        <button type="submit" className="submit_btn">Submit</button>
      </div>
      </form>
      <div className="ForgotPassword">Forgot Password?</div>
  </div>
    );
}

export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  // Create state to track if the container is active
  const [isActive, setIsActive] = useState(false);

  //States for register and login 
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  //Data from frontend to backend for registration
  async function registerUer(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    setname("")
    setemail("")
    setpassword("")
    setIsActive(false);

    const data = await response.json();
    console.log(data.name);

  }

  async function loginUser(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:1337/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    })
    setemail("")
    setpassword("")

    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/home');
    } else {
      alert(`Login failed: ${data.message}`)
    }


  }

  // Handler functions for the buttons
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div style={{
      marginInline: "1.5rem",
      padding: "2rem",
      backgroundImage: "url('https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} className='bg-resume-analyzer App w-full h-screen flex justify-center items-center '>
      {/* Use className instead of class in React, and conditionally add active class */}
      <div className={`container ${isActive ? 'active' : ''}`}>
        <div className="form-box login">
          <form action="#">
            <h1>Login</h1>
            <div className="input-box">
              <input value={email} onChange={(e) => setemail(e.target.value)} type="text" placeholder="Email" required />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" required />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button onClick={loginUser} type="submit" className="btn">Login</button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className='bx bxl-google'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-github'></i></a>
              <a href="#"><i className='bx bxl-linkedin'></i></a>
            </div>
          </form>
        </div>

        <div className="form-box register">
          <form action="#" onSubmit={registerUer}>
            <h1>Registration</h1>
            <div className="input-box">
              <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder="Username" required />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email" required />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" required />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <button onClick={registerUer} type="submit" className="btn">Register</button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className='bx bxl-google'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-github'></i></a>
              <a href="#"><i className='bx bxl-linkedin'></i></a>
            </div>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            {/* Attach onClick handler */}
            <button className="btn register-btn" onClick={handleRegisterClick}>Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            {/* Attach onClick handler */}
            <button className="btn login-btn" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
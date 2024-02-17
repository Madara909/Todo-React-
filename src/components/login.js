// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebase';

const Login = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
  
  const navigate=useNavigate();

  

  const handleLogin = () => {
    // Add login logic here
    if (email==='' || password==='') {
        alert("Fill all fields");
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then(async(res) => {
        console.log(res);
        setIsAuthenticated(true);
        navigate("/home");
    })
    .catch((err) => console.log("Error-", err));
    console.log('Login clicked');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br></br>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br></br>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from '../firebase';

const Signup = ({setIsAuthenticated}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleSignup = () => {
    // Add signup logic here
    if (name==='' || email==='' || password==='') {
        alert("Fill all fields");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(res) => {
        const user = res.user;
        await updateProfile(user, {displayName: name,});
        console.log(res);
        setIsAuthenticated(true);
        navigate("/home");
    })
    .catch((err) => console.log("Error-", err));
    console.log('Signup clicked');
    
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form>
        <label>Name:     </label>
        <input type="email" value={name} onChange={(e) => setName(e.target.value)} />
        <br></br>
        <label>Email:    </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br></br>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br></br>
        <button type="button" onClick={handleSignup}>Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

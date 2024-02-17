import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Login from "./login";
import Signup from "./Signup";
import ToDolist from "./ToDolist";
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}/>} />
        
        <Route path="/home" element={<ToDolist isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
      </Routes>
     </Router>
      
    </div>
  );
}

export default App;

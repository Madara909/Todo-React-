// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './styles.css'; // Import your CSS file

const Home = () => {
  return (
    <div className="container">
      <h2>Welcome to the Home Page</h2>
      <p>
        Go to <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>.
      </p>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming some styles are in App.css

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Find Your Future Path</h1>
        <p>Take our assessments to discover career opportunities tailored just for you.</p>
        <Link to="/assessments" className="cta-button">Get Started</Link>
      </header>
    </div>
  );
};

export default Home;
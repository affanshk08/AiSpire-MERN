import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page container">
      <div className="about-header"><h1>We believe a fulfilling career is a fundamental part of a happy life.</h1></div>
      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>The world of work is more complex than ever. Our mission is to bring clarity and confidence to this journey by leveraging technology and expert insights to provide personalized career guidance.</p>
          <p>We are a dedicated partner in your professional development, here to help you make your next move, the right move.</p>
        </div>
        <div className="about-image">{/* Add <img src={...} /> here */}</div>
      </div>
    </div>
  );
};

export default About;
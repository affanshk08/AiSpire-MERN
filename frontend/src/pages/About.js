import React from 'react';
import './About.css';
import aboutImage from '../img/career_counseling.jpg'; // Make sure to place the image in this path

const About = () => {
  return (
    <div className="about-container container">
      <div className="about-content">
        <div className="about-text">
          <h2>About AiSpire</h2>
          <p>
            Welcome to AiSpire, your personalized guide to a bright and successful future. We understand that choosing a career path is one of the most critical decisions in life. With countless options and evolving industries, it's easy to feel overwhelmed. That's where we come in.
          </p>
          <p>
            Our mission is to empower students and professionals by providing them with the tools, resources, and expert guidance needed to make informed career choices. We combine cutting-edge technology with the expertise of seasoned career counselors to offer a comprehensive platform that caters to your unique aspirations and skills.
          </p>
           <p>
            Whether you are a high school student exploring your options, a college graduate entering the workforce, or a professional considering a career change, AiSpire is here to support you at every step of your journey.
          </p>
        </div>
        <div className="about-image-container">
          <img src={aboutImage} alt="Career Counseling Session" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default About;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Fortwo-interior-dash1.jpg';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-2xl) 0'
  };

  return (
    <section className={`home-hero ${isVisible ? 'animate-fadeInUp' : ''}`} style={heroStyle}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Modular Fleet & Logistics Management System
          </h1>
          <p className="hero-subtitle">
            Transform your logistics operations with our comprehensive enterprise platform. 
            Real-time tracking, intelligent routing, and seamless fleet management in one powerful solution.
          </p>
        </div>
        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary btn-large">
            Get Started
          </Link>
          <Link to="/about" className="btn btn-secondary btn-large">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

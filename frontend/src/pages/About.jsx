import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Fleet Management",
      description: "Track and maintain vehicles, schedule maintenance, and monitor usage with real-time insights.",
      icon: "🚚"
    },
    {
      title: "Logistics Planning", 
      description: "Optimize routes, manage deliveries, and coordinate shipments with intelligent algorithms.",
      icon: "📊"
    },
    {
      title: "Driver Management",
      description: "Manage driver profiles, licenses, and performance metrics in one centralized platform.",
      icon: "👥"
    },
    {
      title: "Reporting & Analytics",
      description: "Generate detailed reports and gain actionable insights into fleet operations.",
      icon: "📈"
    }
  ];

  return (
    <section className={`about-section ${isVisible ? 'animate-fadeInUp' : ''}`}>
      <div className="container">
        <div className="about-header">
          <h1>About FleetFlow</h1>
          <p className="about-subtitle">
            Enterprise-grade logistics management platform designed to transform how businesses manage their fleet operations
          </p>
        </div>

        <div className="about-content">
          <div className="about-mission">
            <h2>Our Mission</h2>
            <p>
              FleetFlow aims to provide a comprehensive, modular platform for managing fleets and logistics efficiently. 
              We empower businesses to streamline operations, reduce costs, and improve service delivery through 
              cutting-edge technology and intelligent automation.
            </p>
          </div>

          <div className="about-target">
            <h2>Who We Serve</h2>
            <div className="target-grid">
              {[
                "Fleet managers",
                "Logistics coordinators", 
                "Transport companies",
                "Warehouse operators"
              ].map((user, index) => (
                <div key={index} className="target-item">
                  <span className="target-icon">🎯</span>
                  <span>{user}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="features-section">
            <h2>Core Modules</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-cta">
            <h2>Ready to Transform Your Logistics?</h2>
            <p>Join thousands of companies already using FleetFlow to optimize their operations.</p>
            <div className="cta-actions">
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

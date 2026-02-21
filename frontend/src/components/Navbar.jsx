import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FleetFlow
        </Link>
        
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={isActive('/') ? 'active-link' : ''}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active-link' : ''}
          >
            About
          </Link>
          <Link 
            to="/login" 
            className={isActive('/login') ? 'active-link' : ''}
          >
            Login
          </Link>
        </div>

        <div className="navbar-menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

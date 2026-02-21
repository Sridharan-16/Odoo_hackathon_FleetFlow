import React, { useState, useEffect, useRef } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import backgroundImage from '../assets/Fortwo-interior-dash1.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardFocused, setCardFocused] = useState(false);
  const loginCardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardFocused(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardElement = loginCardRef.current;
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login successful! Token: ' + data.token);
        // Store token and redirect logic here
      } else {
        setErrors({ general: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: 'Error connecting to server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const pageStyle = {
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
    <div className={`login-page ${cardFocused ? 'card-focused' : ''}`} style={pageStyle}>
      <div className="hero-content">
        <div className="container">
          <div 
            ref={loginCardRef}
            className={`login-card ${cardFocused ? 'animate-slideInUp' : ''}`}
            onFocus={() => setCardFocused(true)}
          >
            <div className="login-header">
              <h2>Welcome to FleetFlow</h2>
              <p>Sign in to access your logistics dashboard</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {errors.general && (
                <div className="error-banner">
                  {errors.general}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) {
                      setErrors(prev => ({ ...prev, username: '' }));
                    }
                  }}
                  className={errors.username ? 'error' : ''}
                  aria-describedby="username-error"
                  aria-invalid={!!errors.username}
                  placeholder="Enter your username"
                  required
                />
                {errors.username && (
                  <p id="username-error" className="error-message">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: '' }));
                      }
                    }}
                    className={errors.password ? 'error' : ''}
                    aria-describedby="password-error"
                    aria-invalid={!!errors.password}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="error-message">
                    {errors.password}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Demo credentials: <strong>admin / admin123</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

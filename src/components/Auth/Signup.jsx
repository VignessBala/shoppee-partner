import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name cannot be empty';
    }

    if (!email.trim()) {
      newErrors.email = 'Email cannot be empty';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password cannot be empty';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleSignup = () => {
    if (!validateInputs()) return;

    const existingUser = JSON.parse(localStorage.getItem('user'));

    if (existingUser?.email === email) {
      alert('Email already exists. Please use a different email.');
      return;
    }

    setLoading(true); // Start the loader
    setTimeout(() => {
      const newUser = { name, email, password };
      localStorage.setItem('user', JSON.stringify(newUser));
      alert('Signup successful!');
      setLoading(false); // Stop the loader
      navigate('/');
    }, 2000); // Delay for 2 seconds
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Signup</h1>
        {loading ? ( // Show loader when loading is true
          <div className="loader"></div>
        ) : (
          <>
            <div className="signup-input-group">
              <input
                type="text"
                className="signup-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <small className="error-text">{errors.name}</small>}

              <input
                type="email"
                className="signup-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className="error-text">{errors.email}</small>}

              <input
                type="password"
                className="signup-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <small className="error-text">{errors.password}</small>}
            </div>
            <div className="signup-buttons">
              <button className="signup-button" onClick={handleSignup}>
                Signup
              </button>
              <button className="login-button" onClick={() => navigate('/')}>
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('Please fill in both email and password.');
      return;
    }

    setLoading(true); // Start the loader
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log("storedUser", storedUser);

      if (storedUser?.email === email && storedUser?.password === password) {
        setUser(storedUser);
        navigate('/shopping-lists');
      } else {
        alert('Invalid credentials');
      }

      setLoading(false); // Stop the loader after login logic
    }, 2000); // Delay for 2 seconds
  };

  return (
    <div className="login-container">
      <h2 className="app-title">Shoppee Partner</h2>
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        {loading ? ( // Show loader when loading is true
          <div className="loader"></div>
        ) : (
          <>
            <div className="login-input-group">
              <input
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-buttons">
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
              <button
                className="register-button"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

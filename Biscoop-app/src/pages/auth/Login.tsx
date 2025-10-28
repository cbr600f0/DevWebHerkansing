import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
      navigate('/profile');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              className="form-input"
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
        
        <div className="auth-footer">
          <span className="auth-text">Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="link-button"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
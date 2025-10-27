import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      // In a real app, you'd make an API call here
      navigate('/login');
    }
  };

  const fields = [
    { 
      label: 'Full Name', 
      type: 'text', 
      value: name, 
      onChange: setName, 
      placeholder: 'Enter your name' 
    },
    { 
      label: 'Email', 
      type: 'email', 
      value: email, 
      onChange: setEmail, 
      placeholder: 'Enter your email' 
    },
    { 
      label: 'Password', 
      type: 'password', 
      value: password, 
      onChange: setPassword, 
      placeholder: 'Create a password' 
    }
  ];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          {fields.map((field, i) => (
            <div key={i} className="form-group">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="form-input"
                required
              />
            </div>
          ))}
          
          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>
        
        <div className="auth-footer">
          <span className="auth-text">Already have an account? </span>
          <button 
            onClick={() => navigate('/login')} 
            className="link-button"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
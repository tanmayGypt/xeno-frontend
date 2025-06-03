import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Xeno CRM</h1>
        <p className="hero-subtitle">
          Manage your customer relationships with ease and efficiency
        </p>
        <button
          className="btn btn-primary"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login; 
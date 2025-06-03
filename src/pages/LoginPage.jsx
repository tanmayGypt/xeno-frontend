import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleGoogleLogin = () => {
        // Redirect to backend Google OAuth endpoint with the correct callback URL
        const callbackUrl = `${window.location.origin}/auth/google/callback`;
        window.location.href = `http://localhost:5000/api/auth/google?callback=${encodeURIComponent(callbackUrl)}`;
    };

    // Check for OAuth success in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        login(token);
        navigate('/');
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'signup'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            // Update auth context and redirect
            await login();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleTermsClick = () => {
        // TODO: Implement terms page navigation
        console.log('Terms clicked');
    };

    const handlePrivacyClick = () => {
        // TODO: Implement privacy page navigation
        console.log('Privacy clicked');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-content">
                    <div className="login-header">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your Xeno CRM account</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="login-divider">
                        <span className="login-divider-text">or</span>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                        className="login-button google-button"
                    >
                        <FcGoogle className="login-button-icon" />
                        <span>Continue with Google</span>
                    </button>

                    <div className="login-switch">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="login-switch-button"
                            type="button"
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>

                    <div className="login-footer">
                        <p className="login-footer-text">
                            By continuing, you agree to our{' '}
                            <button
                                onClick={handleTermsClick}
                                className="login-footer-link"
                                type="button"
                            >
                                Terms of Service
                            </button>{' '}
                            and{' '}
                            <button
                                onClick={handlePrivacyClick}
                                className="login-footer-link"
                                type="button"
                            >
                                Privacy Policy
                            </button>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
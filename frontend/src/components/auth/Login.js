import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { email, password } = formData;
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await authService.login({ email, password });
      // Save the user object to localStorage upon successful login
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
      navigate('/careers');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.error('Login failed', err);
    }
  };

  return (
    <div className="auth-page">
      <h2>Welcome Back</h2>
      <p>Enter your credentials to access your account.</p>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
      <div className="auth-switch">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
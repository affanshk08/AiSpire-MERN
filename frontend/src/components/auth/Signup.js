import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });
  const [error, setError] = useState(null); // Add state for error messages
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      const user = await authService.register({ name, email, password });
      dispatch({ type: 'LOGIN', payload: user });
      navigate('/careers');
    } catch (err) {
      // Set the error message from the server's response
      setError(err.response.data.message || 'Something went wrong');
      console.error('Signup failed', err);
    }
  };

  return (
    <div className="auth-page">
      <h2>Create Your Account</h2>
      <p>Join us to start your journey towards a fulfilling career.</p>

      {/* Conditionally display the error message */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
        </div>
        <button type="submit" className="btn-submit">Create Account</button>
      </form>
      <div className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
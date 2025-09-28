import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const authLinks = (
    <div className="nav-auth">
      <Link to="/profile" className="nav-button login-button">Profile</Link>
      <button onClick={onLogout} className="nav-button signup-button">Logout</button>
    </div>
  );

  const guestLinks = (
    <div className="nav-auth">
      <Link to="/login" className="nav-button login-button">Login</Link>
      <Link to="/signup" className="nav-button signup-button">Sign Up Free</Link>
    </div>
  );

  return (
    <header className="header">
      <nav className="navbar container">
        <Link to="/" className="nav-logo">AiSpire</Link>
        <ul className="nav-menu">
          <li><NavLink to="/careers">Careers</NavLink></li>
          <li><NavLink to="/assessments">Assessments</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    </header>
  );
};

export default Navbar;
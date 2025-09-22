import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
    setMenuOpen(false);
    navigate('/login');
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const authLinks = (
    <div className="nav-auth">
      {user && user.role === 'admin' && (
        <Link to="/admin" className="nav-button admin-button" onClick={handleLinkClick}>Admin</Link>
      )}
      <Link to="/profile" className="nav-button login-button" onClick={handleLinkClick}>Profile</Link>
      <button onClick={onLogout} className="nav-button signup-button">Logout</button>
    </div>
  );

  const guestLinks = (
    <div className="nav-auth">
      <Link to="/login" className="nav-button login-button" onClick={handleLinkClick}>Login</Link>
      <Link to="/signup" className="nav-button signup-button">Sign Up</Link>
    </div>
  );

  return (
    <header className="header">
      <nav className="navbar container">
        <Link to="/" className="nav-logo" onClick={handleLinkClick}>AiSpire</Link>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li><NavLink to="/careers" onClick={handleLinkClick}>Careers</NavLink></li>
            <li><NavLink to="/assessments" onClick={handleLinkClick}>Assessments</NavLink></li>
            <li><NavLink to="/appointments" onClick={handleLinkClick}>Appointments</NavLink></li>
            <li><NavLink to="/colleges" onClick={handleLinkClick}>Colleges</NavLink></li>
            <li><NavLink to="/about" onClick={handleLinkClick}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink></li>
          </ul>
          <div className="nav-auth-mobile">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
        <div className="nav-auth-desktop">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
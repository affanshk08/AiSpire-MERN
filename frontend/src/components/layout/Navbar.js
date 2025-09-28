import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          Aispire
        </Link>
        <ul className="nav-menu">
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="/assessments">Assessments</Link></li>
          {user && <li><Link to="/appointment">Book Appointment</Link></li>}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-auth">
          {user ? (
            <>
              {/* ADMIN BUTTON */}
              {user.isAdmin && (
                <Link to="/admin/dashboard" className="btn btn-profile">Admin</Link>
              )}
              <Link to="/profile" className="btn btn-profile">Profile</Link>
              <button onClick={handleLogout} className="btn btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
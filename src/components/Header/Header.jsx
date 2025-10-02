import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container container">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <img src={logo} alt="Project Logo" className="logo-image" />
            <span className="logo-text">Project Name</span>
          </Link>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/my-courses" className="nav-link">My Courses</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            {isAuthenticated && user.role === 'Teacher' && (
              <Link to="/create-course" className="nav-link">Create Course</Link>
            )}
            <Link to="/promotions" className="nav-link">Promotions</Link>
            <Link to="/support" className="nav-link">Support</Link>
          </nav>
        </div>
        
        <div className="header-auth">
          {isAuthenticated ? (
            <div className="user-profile">
               {/* --- THIS IS THE MISSING PART --- */}
               <div className="token-balance">💰 {user.tokenBalance} Tokens</div>
               <span className="notification-icon">🔔</span>
               <img src={`https://i.pravatar.cc/40?u=${user._id}`} alt="user profile" className="profile-avatar" />
               <button onClick={handleLogout} className="btn btn-secondary">Log Out</button>
            </div>
          ) : (
            <div className="logged-out-buttons">
              <Link to="/login" className="btn btn-secondary">Log In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const activeStyle = {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    padding: '0.5rem 1.2rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600'
  };

  const inactiveStyle = {
    color: '#e0e0e0',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1.2rem',
    borderRadius: '12px',
    transition: 'all 0.3s ease'
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" style={{ 
          color: 'white', 
          fontSize: '1.8rem', 
          fontWeight: 'bold', 
          textDecoration: 'none'
        }}>
          🏠 PropSpace
        </Link>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={isActive('/') ? activeStyle : inactiveStyle}>
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" style={isActive('/dashboard') ? activeStyle : inactiveStyle}>
                My Listings
              </Link>
              <Link to="/create-property" style={isActive('/create-property') ? activeStyle : inactiveStyle}>
                + Add Property
              </Link>
              <Link to="/profile" style={isActive('/profile') ? activeStyle : inactiveStyle}>
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                  marginLeft: '0.5rem'
                }}
              >
                👋 Logout ({user?.username})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={isActive('/login') ? activeStyle : inactiveStyle}>
                Login
              </Link>
              <Link to="/register" style={isActive('/register') ? activeStyle : inactiveStyle}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
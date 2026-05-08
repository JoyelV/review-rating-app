import React, { useState } from 'react';
import { Search, Star, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './Modals/LoginModal';
import { SignupModal } from './Modals/SignupModal';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ search, onSearchChange }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div className="logo-icon">
          <Star size={24} fill="#FFFFFF" color="#FFFFFF" strokeWidth={0} />
        </div>
        <span className="logo-text">Review&Rate</span>
      </div>

      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Search..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="search-icon" size={22} />
      </div>

      <div className="navbar-actions">
        {isAuthenticated ? (
          <div className="user-profile">
            <span className="user-name">{user?.name}</span>
            <div className="profile-circle">
              <User size={20} color="#D100F3" />
            </div>
            <button className="btn-logout" onClick={logout} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <>
            <button className="btn-text" onClick={() => setShowSignup(true)}>SignUp</button>
            <button className="btn-text" onClick={() => setShowLogin(true)}>Login</button>
          </>
        )}
      </div>

      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupModal 
          onClose={() => setShowSignup(false)} 
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </nav>
  );
};
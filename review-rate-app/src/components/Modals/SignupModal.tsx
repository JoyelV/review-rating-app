import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { authService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Modal.css';

interface Props {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const SignupModal: React.FC<Props> = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.signup({ name, email, password });
      login(data);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        <h2>Sign Up</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <input 
                type="text" 
                placeholder="John Doe" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <User size={18} />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <input 
                type="email" 
                placeholder="email@example.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail size={18} />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <input 
                type="password" 
                placeholder="********" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock size={18} />
            </div>
          </div>

          <button type="submit" className="btn-submit center-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="modal-footer">
            Already have an account? <span onClick={onSwitchToLogin}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

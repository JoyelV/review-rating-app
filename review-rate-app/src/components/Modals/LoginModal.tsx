import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { authService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Modal.css';

interface Props {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export const LoginModal: React.FC<Props> = ({ onClose, onSwitchToSignup }) => {
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
      const data = await authService.login({ email, password });
      login(data);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        <h2>Login</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="modal-footer">
            Don't have an account? <span onClick={onSwitchToSignup}>SignUp</span>
          </p>
        </form>
      </div>
    </div>
  );
};

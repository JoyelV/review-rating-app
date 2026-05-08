import React, { useState } from 'react';
import { X, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { companyService } from '../../services/api';
import './Modal.css';

interface Props {
  onClose: () => void;
}

export const AddCompanyModal: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    location: '',
    foundedDate: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await companyService.createCompany(formData);
      onClose();
    } catch (error) {
      console.error('Failed to create company:', error);
      alert('Failed to save company. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        <h2>Add Company</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company name</label>
            <input 
              type="text" 
              placeholder="Enter..." 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Company Logo URL</label>
            <div className="input-with-icon">
              <input 
                type="text" 
                placeholder="https://..." 
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              />
              <ImageIcon size={18} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  placeholder="Select Location" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <MapPin size={18} />
              </div>
            </div>

            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                required
                placeholder="Enter City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Founded on</label>
            <div className="input-with-icon">
              <input 
                type="date" 
                required
                value={formData.foundedDate}
                onChange={(e) => setFormData({ ...formData, foundedDate: e.target.value })}
              />
              <Calendar size={18} />
            </div>
          </div>



          <button type="submit" className="btn-submit center-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};
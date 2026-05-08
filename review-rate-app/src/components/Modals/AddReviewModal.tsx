import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { reviewService } from '../../services/api';
import './Modal.css';

interface Props {
  onClose: () => void;
  companyId: string;
}

export const AddReviewModal: React.FC<Props> = ({ onClose, companyId }) => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    authorName: '',
    subject: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    try {
      setLoading(true);
      await reviewService.createReview({
        ...formData,
        rating,
        companyId
      });
      onClose();
    } catch (error) {
      console.error('Failed to create review:', error);
      alert('Failed to save review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        <h2>Add Review</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter" 
              required
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              placeholder="Enter" 
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Enter your Review</label>
            <textarea 
              placeholder="Description" 
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            ></textarea>
          </div>

          <div className="rating-input-group">
            <label className="rating-label">Rating</label>
            <div className="rating-stars-container">
              <div className="interactive-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={43}
                    fill={star <= rating ? "#ECB800" : "#D9D9D9"}
                    color={star <= rating ? "#ECB800" : "#D9D9D9"}
                    strokeWidth={0}
                    onClick={() => setRating(star)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
              <span className="rating-status">Satisfied</span>
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
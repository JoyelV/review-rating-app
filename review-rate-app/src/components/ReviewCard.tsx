import React from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../types';
import './ReviewCard.css';

interface Props {
  review: Review;
}

export const ReviewCard: React.FC<Props> = ({ review }) => {
  // Helper to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={18}
        fill={index < rating ? "#ECB800" : "#D9D9D9"}
        color={index < rating ? "#ECB800" : "#D9D9D9"}
        strokeWidth={0}
        className="star-icon"
      />
    ));
  };

  return (
    <div className="review-card">
      <div className="review-avatar">
        {/* Using a placeholder if no avatar URL is provided */}
        <img src={review.avatarUrl || "https://via.placeholder.com/50"} alt={review.authorName} />
      </div>

      <div className="review-content">
        <div className="review-header">
          <div className="review-author-info">
            <h4>{review.authorName}</h4>
            <p className="review-subject">{review.subject}</p>
            <span className="review-date">{review.date}, {review.time}</span>
          </div>
          <div className="review-rating-stars">
            {renderStars(review.rating)}
          </div>
        </div>
        <p className="review-text">{review.content}</p>

      </div>
    </div>
  );
};
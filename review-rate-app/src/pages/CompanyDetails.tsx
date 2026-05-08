import React, { useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { companyService, reviewService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ReviewCard } from '../components/ReviewCard';
import { AddReviewModal } from '../components/Modals/AddReviewModal';
import type { Company, Review } from '../types';
import './CompanyDetails.css';

export const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [companyData, reviewsData] = await Promise.all([
        companyService.getCompanyById(id),
        reviewService.getReviewsByCompany(id),
      ]);
      setCompany(companyData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <div className="page-container"><p>Loading details...</p></div>;
  if (!company) return <div className="page-container"><p>Company not found.</p></div>;

  return (
    <div className="page-container">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="halfGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="#ECB800" />
            <stop offset="50%" stopColor="#D9D9D9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="details-card">

        {/* Top Header Section */}
        <div className="company-header-section">
          <div className="company-logo-large">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} />
            ) : (
              <span>{company.name.charAt(0)}</span>
            )}
          </div>

          <div className="company-main-info">
            <div className="title-row">
              <h2>{company.name}</h2>
              <span className="founded-text">Founded on {new Date(company.foundedDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</span>

            </div>

            <p className="company-address">
              <MapPin size={16} /> {company.location}
            </p>

            <div className="company-stats-row">
              <span className="rating-score">{company.rating}</span>
              <div className="stars-container">
                <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
                <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
                <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
                <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
                <Star size={18} fill="url(#halfGradient)" color="#D9D9D9" strokeWidth={0} />
              </div>
              <span className="review-count">{company.reviewCount} Reviews</span>
            </div>
          </div>

          <button className="add-review-btn" onClick={() => {
            if (isAuthenticated) {
              setIsReviewModalOpen(true);
            } else {
              alert('Please login to add a review');
            }
          }}>
            + Add Review
          </button>
        </div>

        <hr className="divider" />

        {/* Reviews List Section */}
        <div className="reviews-list-section">
          <p className="results-text">Result Found: {reviews.length}</p>

          <div className="reviews-wrapper">
            {reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </div>

      </div>

      {isReviewModalOpen && (
        <AddReviewModal 
          onClose={() => {
            setIsReviewModalOpen(false);
            fetchData(); // Re-fetch to get new rating and reviews
          }} 
          companyId={company._id}
        />
      )}
    </div>
  );
};
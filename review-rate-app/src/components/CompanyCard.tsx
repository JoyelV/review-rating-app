import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Company } from '../types';
import './CompanyCard.css';

interface Props {
  company: Company;
}

export const CompanyCard: React.FC<Props> = ({ company }) => {
  const navigate = useNavigate();

  return (
    <div className="company-card">
      <div className="company-logo">
        {company.logoUrl ? (
          <img src={company.logoUrl} alt={company.name} />
        ) : (
          <div className="logo-placeholder">
            {/* Grab first letter of company name for placeholder */}
            {company.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="company-info">
        <h3>{company.name}</h3>
        <p className="address">
          <MapPin size={14} /> {company.location}
        </p>

        <div className="stats-row">
          <span className="rating">{company.rating}</span>
          <div className="stars">
            <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
            <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
            <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
            <Star size={18} fill="#ECB800" color="#ECB800" strokeWidth={0} />
            <Star size={18} fill="url(#halfGradient)" color="#D9D9D9" strokeWidth={0} />
          </div>
          <span className="reviews-count">{company.reviewCount} Reviews</span>
        </div>
      </div>

      <div className="company-actions">
        <span className="founded-date">Reg. Date {new Date(company.foundedDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</span>

        {/* Navigation happens here! */}
        <button
          className="btn-dark"
          onClick={() => navigate(`/company/${company._id}`)}
        >
          Detail Review
        </button>
      </div>
    </div>
  );
};
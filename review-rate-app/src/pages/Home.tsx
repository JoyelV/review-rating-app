import React, { useState } from 'react';
import { CompanyCard } from '../components/CompanyCard';
import { AddCompanyModal } from '../components/Modals/AddCompanyModal';
import type { Company } from '../types';
import { MapPin, ChevronDown } from 'lucide-react';
import './Home.css';
import { companyService } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface HomeProps {

  search: string;
}

export const Home: React.FC<HomeProps> = ({ search }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Name');
  const [city, setCity] = useState('');
  const { isAuthenticated } = useAuth();


  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getCompanies(sortBy, search, city);
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCompanies();
  }, [sortBy, search, city]);

  return (
    <div className="home-container">
      <div className="filter-bar">
        <div className="location-filter">
          <label>Select City</label>
          <div className="input-with-icon">
            <input 
              type="text" 
              placeholder="Enter City..." 
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <MapPin size={18} color="#6B21A8" />
          </div>
        </div>

        <button className="filter-btn" onClick={fetchCompanies}>Find Company</button>
        <button className="filter-btn-add" onClick={() => {
          if (isAuthenticated) {
            setIsAddModalOpen(true);
          } else {
            alert('Please login to add a company');
          }
        }}>
          + Add Company
        </button>


        <div className="sort-filter">
          <label>Sort:</label>
          <div className="custom-select-wrapper">
            <div className={`custom-select-dropdown ${isSortOpen ? 'open' : 'closed'}`}>
              <div className="select-trigger" onClick={() => setIsSortOpen(!isSortOpen)}>
                <span>{sortBy}</span>
                <ChevronDown size={24} color="#000000" />
              </div>
              <div className="divider-line"></div>
              <div className="select-options">
                {['Name', 'Average', 'Rating', 'Location'].map((option) => (
                  <div
                    key={option}
                    className={`select-option ${sortBy === option ? 'active-option' : 'inactive-option'}`}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="results-container">
        <p className="results-count">Result Found: {companies.length}</p>
        <div className="company-list">
          {loading ? (
            <p>Loading companies...</p>
          ) : companies.length === 0 ? (
            <p>No companies found. Add one to get started!</p>
          ) : (
            companies.map(company => (
              <CompanyCard key={company._id} company={company} />
            ))
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddCompanyModal 
          onClose={() => {
            setIsAddModalOpen(false);
            fetchCompanies();
          }} 
        />
      )}
    </div>
  );
};
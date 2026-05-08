import axios from 'axios';
import type { Company, Review } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});


// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  signup: async (userData: any) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  }
};

export const companyService = {
  getCompanies: async (sort?: string, search?: string, city?: string): Promise<Company[]> => {
    const response = await api.get<Company[]>('/companies', {
      params: { 
        sort: sort?.toLowerCase(),
        search,
        city
      },
    });
    return response.data;
  },
  getCompanyById: async (id: string): Promise<Company> => {
    const response = await api.get<Company>(`/companies/${id}`);
    return response.data;
  },
  createCompany: async (companyData: Partial<Company>): Promise<Company> => {
    const response = await api.post<Company>('/companies', companyData);
    return response.data;
  },
};

export const reviewService = {
  getReviewsByCompany: async (companyId: string): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews/company/${companyId}`);
    return response.data;
  },
  createReview: async (reviewData: Partial<Review>): Promise<Review> => {
    const response = await api.post<Review>('/reviews', reviewData);
    return response.data;
  },
};

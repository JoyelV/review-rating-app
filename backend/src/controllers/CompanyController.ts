import type { Request, Response } from 'express';
import { CompanyRepository } from '../repositories/CompanyRepository.js';

const companyRepository = new CompanyRepository();

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const { sort, search, city } = req.query;
    const companies = await companyRepository.findAll(
      sort as string,
      search as string,
      city as string
    );
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const company = await companyRepository.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error('Error fetching company by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, location, city, foundedDate } = req.body;
    
    // Basic Validation
    if (!name || !location || !city || !foundedDate) {
      return res.status(400).json({ message: 'Please provide all required fields (name, location, city, foundedDate)' });
    }

    // Parse foundedDate
    let parsedDate: Date;
    if (foundedDate.includes('/')) {
      // Handle DD/MM/YYYY
      const [day, month, year] = foundedDate.split('/').map(Number);
      parsedDate = new Date(year, month - 1, day);
    } else {
      // Handle YYYY-MM-DD (standard for <input type="date">)
      parsedDate = new Date(foundedDate);
    }


    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format. Please use DD/MM/YYYY' });
    }

    // Safety: Ensure rating and reviewCount are not set manually
    const companyData = {
      ...req.body,
      foundedDate: parsedDate,
      rating: 0,
      reviewCount: 0
    };


    const newCompany = await companyRepository.create(companyData);
    res.status(201).json(newCompany);
  } catch (error: any) {
    console.error('Error creating company:', error);
    res.status(400).json({ message: error.message || 'Failed to create company' });
  }
};


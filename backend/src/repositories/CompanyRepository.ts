import Company from '../models/Company.js';
import type { ICompany } from '../models/Company.js';
import mongoose from 'mongoose';

export class CompanyRepository {
  async findAll(sortBy?: string, search?: string, city?: string): Promise<ICompany[]> {
    let query: any = {};
    
    // Improved Search: If search is provided, look in name, city, or location
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Specific city filter
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    let sortQuery: any = { createdAt: -1 }; // Default sort: Newest first
    
    if (sortBy) {
      if (sortBy === 'name') sortQuery = { name: 1 };
      else if (sortBy === 'average' || sortBy === 'rating') sortQuery = { rating: -1 };
      else if (sortBy === 'location') sortQuery = { location: 1 };
      else if (sortBy === 'reviews' || sortBy === 'count') sortQuery = { reviewCount: -1 };
    }
    
    return Company.find(query).sort(sortQuery);
  }

  async findById(id: string): Promise<ICompany | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return Company.findById(id);
  }

  async create(companyData: Partial<ICompany>): Promise<ICompany> {
    const company = new Company(companyData);
    return company.save();
  }

  async updateRatingAndCount(id: string, newRating: number, newReviewCount: number): Promise<ICompany | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Company.findByIdAndUpdate(
      id,
      { rating: newRating, reviewCount: newReviewCount },
      { new: true }
    );
  }
}


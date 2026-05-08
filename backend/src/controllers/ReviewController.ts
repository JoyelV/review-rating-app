import type { Request, Response } from 'express';
import { ReviewRepository } from '../repositories/ReviewRepository.js';
import { CompanyRepository } from '../repositories/CompanyRepository.js';
import Review from '../models/Review.js';
import mongoose from 'mongoose';


const reviewRepository = new ReviewRepository();
const companyRepository = new CompanyRepository();

export const getReviewsByCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }
    const reviews = await reviewRepository.findByCompanyId(companyId);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { companyId, rating, authorName, subject, content } = req.body;
    
    // Validation
    if (!companyId || rating === undefined || !authorName || !subject || !content) {
      return res.status(400).json({ message: 'Missing required review fields' });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Invalid company ID format' });
    }

    // Verify Company Exists
    const company = await companyRepository.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Target company not found' });
    }
    
    // Create the review
    const newReview = await reviewRepository.create({
      companyId: new mongoose.Types.ObjectId(companyId) as any,
      authorName,
      subject,
      content,
      rating: numRating,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    });

    // Update Company Average Rating & Count using Aggregation (more performant)
    const stats = await Review.aggregate([
      { $match: { companyId: new mongoose.Types.ObjectId(companyId) } },
      {
        $group: {
          _id: '$companyId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    if (stats.length > 0) {
      const { averageRating, reviewCount } = stats[0];
      await companyRepository.updateRatingAndCount(
        companyId, 
        Number(averageRating.toFixed(1)), 
        reviewCount
      );
    }

    res.status(201).json(newReview);
  } catch (error: any) {
    console.error('Error creating review:', error);
    res.status(400).json({ message: error.message || 'Failed to create review' });
  }
};



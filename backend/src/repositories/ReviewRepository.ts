import Review from '../models/Review.js';
import type { IReview } from '../models/Review.js';

export class ReviewRepository {
  async findByCompanyId(companyId: string): Promise<IReview[]> {
    return Review.find({ companyId }).sort({ createdAt: -1 });
  }

  async create(reviewData: Partial<IReview>): Promise<IReview> {
    const review = new Review(reviewData);
    return review.save();
  }
}

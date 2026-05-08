import { Router } from 'express';
import { getReviewsByCompany, createReview } from '../controllers/ReviewController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .post(authenticate, createReview);

router.route('/company/:companyId')
  .get(getReviewsByCompany);

export default router;

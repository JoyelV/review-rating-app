import { Router } from 'express';
import { getCompanies, getCompanyById, createCompany } from '../controllers/CompanyController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .get(getCompanies)
  .post(authenticate, createCompany);

router.route('/:id')
  .get(getCompanyById);

export default router;

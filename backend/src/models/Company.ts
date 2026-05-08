import mongoose, { Schema } from 'mongoose';
import type { Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  logoUrl?: string;
  location: string;
  city: string;
  foundedDate: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, default: '' },
  location: { type: String, required: true },
  city: { type: String, required: true },
  foundedDate: { type: Date, required: true }, // Changed to Date
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Indexes for performance
CompanySchema.index({ name: 'text', city: 'text', location: 'text' });
CompanySchema.index({ rating: -1 });
CompanySchema.index({ createdAt: -1 });

export default mongoose.model<ICompany>('Company', CompanySchema);


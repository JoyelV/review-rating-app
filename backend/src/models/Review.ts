import mongoose, { Schema } from 'mongoose';
import type { Document } from 'mongoose';

export interface IReview extends Document {
  companyId: mongoose.Types.ObjectId;
  authorName: string;
  subject: string;
  content: string;
  rating: number;
  date: string;
  time: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  authorName: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', ReviewSchema);

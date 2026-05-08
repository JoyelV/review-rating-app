export interface Review {
  _id: string;
  companyId: string;
  authorName: string;
  subject: string;
  date: string;
  time: string;
  rating: number;
  content: string;
  avatarUrl?: string;
}

export interface Company {
  _id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  foundedDate: string;
  logoUrl?: string;
  reviews?: Review[];
}
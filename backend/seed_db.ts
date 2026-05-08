import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './src/models/Company.js';
import Review from './src/models/Review.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    // Clear existing
    await Company.deleteMany({});
    await Review.deleteMany({});

    const companies = [
      {
        name: 'TechFlow Systems',
        logoUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
        location: 'Business Park, Sector 62',
        city: 'Noida',
        foundedDate: new Date(2015, 4, 12),
        rating: 4.5,
        reviewCount: 2
      },
      {
        name: 'GreenLeaf Solutions',
        logoUrl: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?w=100&h=100&fit=crop',
        location: 'MG Road, Above Central Mall',
        city: 'Bangalore',
        foundedDate: new Date(2018, 10, 20),
        rating: 4.0,
        reviewCount: 1
      },
      {
        name: 'Rapid Logistics',
        logoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop',
        location: 'Port Area, Dock 7',
        city: 'Mumbai',
        foundedDate: new Date(2010, 1, 5),
        rating: 3.8,
        reviewCount: 1
      },
      {
        name: 'CloudScale Inc',
        logoUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop',
        location: 'IT Hub, Building B',
        city: 'Hyderabad',
        foundedDate: new Date(2020, 5, 1),
        rating: 5.0,
        reviewCount: 1
      }
    ];

    const createdCompanies = await Company.insertMany(companies);

    const reviews = [
      {
        companyId: createdCompanies[0]._id,
        authorName: 'Amit Sharma',
        subject: 'Great work culture',
        content: 'I have been working here for 2 years and the culture is amazing.',
        rating: 5,
        date: '10-05-2026',
        time: '10:30'
      },
      {
        companyId: createdCompanies[0]._id,
        authorName: 'Sneha Gupta',
        subject: 'Good benefits',
        content: 'Salary is competitive and work life balance is decent.',
        rating: 4,
        date: '11-05-2026',
        time: '14:20'
      },
      {
        companyId: createdCompanies[1]._id,
        authorName: 'Rahul Verma',
        subject: 'Sustainable practices',
        content: 'Love their focus on environment.',
        rating: 4,
        date: '12-05-2026',
        time: '09:15'
      },
      {
        companyId: createdCompanies[2]._id,
        authorName: 'Priya Singh',
        subject: 'Fast paced',
        content: 'Lots of learning but can be stressful.',
        rating: 4,
        date: '13-05-2026',
        time: '16:45'
      },
      {
        companyId: createdCompanies[3]._id,
        authorName: 'Vikram Das',
        subject: 'Modern tech stack',
        content: 'Cutting edge technologies used here.',
        rating: 5,
        date: '14-05-2026',
        time: '11:00'
      }
    ];

    await Review.insertMany(reviews);

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

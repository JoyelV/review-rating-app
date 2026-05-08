# EmergX - Review & Rate Platform

A high-performance company review and rating platform built with the MERN stack (MongoDB, Express, React, Node.js) and optimized for scalability and security.

## 🚀 Features
- **Real-time Search & Filter**: Scalable full-text search across company names, locations, and cities using MongoDB text indexes.
- **JWT Authentication**: Secure user signup and login with password hashing (Bcrypt) and JWT-protected actions.
- **Optimized Data Aggregation**: Real-time rating and review count calculations powered by MongoDB Aggregation Pipelines.
- **Premium UI/UX**:
  - Reactive search and city filtering.
  - Native date pickers and intuitive form layouts.
  - Responsive design with modern aesthetics.
- **Security First**:
  - Helmet.js for secure HTTP headers.
  - Express-rate-limit for DDoS protection.
  - Input validation and global error handling.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Lucide Icons, Axios.
- **Backend**: Node.js, Express, Mongoose (MongoDB), JWT, Bcryptjs.
- **Database**: MongoDB Atlas.

## 📦 Installation

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. `npm run dev`

### Frontend
1. `cd review-rate-app`
2. `npm install`
3. `npm run dev`

## 🚀 Deployment
- **Backend**: Recommended for [Render](https://render.com/).
- **Frontend**: Recommended for [Vercel](https://vercel.com/).

## 📄 License
ISC

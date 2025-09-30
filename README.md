# Manomangal Lawns - Wedding & Event Booking Website

A comprehensive wedding and event lawn booking website built with React, Express.js, and PostgreSQL. Features include online booking, admin dashboard, menu selection, and automated notifications.

## 🌟 Features

### Frontend Features
- **Modern React UI** with Tailwind CSS and Framer Motion animations
- **Responsive Design** that works on all devices
- **Hero Section** with booking search form
- **Gallery** with lightbox and category filters
- **Booking System** with date picker and price estimation
- **Menu Selection** with cart functionality
- **Contact Form** with Google Maps integration
- **User Authentication** (Login/Signup)
- **Admin Dashboard** for managing bookings

### Backend Features
- **Express.js API** with JWT authentication
- **PostgreSQL Database** with proper relationships
- **Role-based Access Control** (Admin/User)
- **Email Notifications** for bookings and inquiries
- **WhatsApp Integration** for instant notifications
- **File Upload** support for images
- **Data Validation** with comprehensive error handling

## 🚀 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form with Zod validation
- React Router DOM for navigation
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- PostgreSQL with Prisma ORM
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Nodemailer for email notifications
- CORS for cross-origin requests

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd manomangal-lawns
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your API URL
VITE_API_URL=http://localhost:5000/api
```

### 3. Backend Setup
```bash
# Create backend directory
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install backend dependencies
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install pg prisma @prisma/client
npm install nodemailer multer express-validator express-rate-limit
npm install -D nodemon

# Initialize Prisma
npx prisma init
```

### 4. Database Setup

Create a PostgreSQL database and update your `.env` file in the backend directory:

```env
# Backend .env file
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/manomangal_lawns"
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Business Information
BUSINESS_NAME=Manomangal Lawns
BUSINESS_EMAIL=jayeshrcpit2003@gmail.com
BUSINESS_PHONE=9359525834
BUSINESS_WHATSAPP=9359525834
OWNER_NAME=Jayesh Patil
```

### 5. Database Schema

Create `backend/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  bookings Booking[]

  @@map("users")
}

model Booking {
  id              String      @id @default(cuid())
  name            String
  email           String
  phone           String
  date            DateTime
  timeSlot        String
  eventType       String
  guests          Int
  estimatedPrice  Float
  specialRequests String?
  status          BookingStatus @default(PENDING)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  userId String?
  user   User?   @relation(fields: [userId], references: [id])

  @@map("bookings")
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  subject   String
  message   String
  createdAt DateTime @default(now())

  @@map("contacts")
}

enum Role {
  USER
  ADMIN
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
}
```

### 6. Run Database Migrations
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### 7. Create Backend Server

Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 8. Start the Application

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from root directory)
npm run dev
```

## 📱 Features Overview

### User Features
- **Browse Gallery**: View beautiful event photos with category filters
- **Check Availability**: Search for available dates and time slots
- **Book Events**: Complete booking form with price estimation
- **Menu Selection**: Choose from various food categories and items
- **Contact**: Send inquiries through contact form
- **User Account**: Register and login to manage bookings

### Admin Features
- **Dashboard**: Overview of bookings, revenue, and statistics
- **Booking Management**: Approve, reject, or cancel bookings
- **Contact Management**: View and respond to customer inquiries
- **Analytics**: Track revenue and booking trends
- **User Management**: View registered users

### Automated Features
- **Email Notifications**: Automatic emails for bookings and inquiries
- **WhatsApp Notifications**: Instant WhatsApp messages to owner
- **Price Calculation**: Dynamic pricing based on time slot and guest count
- **Availability Check**: Real-time availability checking

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Mobile Responsive**: Optimized for all screen sizes
- **Fast Loading**: Optimized images and efficient code
- **Accessibility**: WCAG compliant with proper contrast and navigation
- **SEO Friendly**: Proper meta tags and semantic HTML

## 📧 Email & WhatsApp Integration

The system automatically sends notifications for:
- New booking requests
- Booking confirmations
- Contact form submissions
- Status updates

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Secure cross-origin requests
- **Helmet.js**: Security headers

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
npm run build
# Deploy the dist folder
```

### Backend Deployment (Heroku/Railway)
```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Set environment variables in your hosting platform
# Deploy your backend code
```

## 📞 Contact Information

**Manomangal Lawns**
- **Address**: Shingave Shivar, Shirpur, Maharashtra 425405
- **Phone**: 9359525834
- **Email**: jayeshrcpit2003@gmail.com
- **Owner**: Jayesh Patil

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All the open-source contributors

---

**Made with ❤️ for Manomangal Lawns**
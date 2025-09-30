# Backend Structure for Manomangal Lawns (MongoDB + Express)

## 📁 Project Structure
```
backend/
├── server.js
├── package.json
├── .env
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Booking.js
│   ├── MenuItem.js
│   └── ContactMessage.js
├── routes/
│   ├── auth.js
│   ├── bookings.js
│   ├── menu.js
│   └── contact.js
├── middleware/
│   ├── auth.js
│   └── validation.js
└── utils/
    ├── email.js
    └── whatsapp.js
```

## 🚀 Quick Setup

### 1. Initialize Backend
```bash
mkdir backend && cd backend
npm init -y
```

### 2. Install Dependencies
```bash
npm install express mongoose cors helmet morgan bcryptjs jsonwebtoken dotenv nodemailer axios
npm install -D nodemon
```

### 3. Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/manomangal_lawns
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/manomangal_lawns
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=jayeshrcpit2003@gmail.com
EMAIL_PASS=your_app_password
WHATSAPP_API_URL=https://api.whatsapp.com/send
OWNER_PHONE=9359525834
OWNER_EMAIL=jayeshrcpit2003@gmail.com
```

### 4. Package.json Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 📊 MongoDB Collections Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: "Jayesh Patil",
  email: "jayeshrcpit2003@gmail.com",
  phone: "9359525834",
  password: "hashed_password",
  role: "admin", // or "user"
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // reference to users
  eventDate: ISODate("2024-06-15"),
  timeSlot: "evening", // morning, afternoon, evening, full-day
  eventType: "Wedding",
  guestCount: 250,
  totalPrice: 75000,
  customerName: "John Doe",
  customerPhone: "9876543210",
  customerEmail: "john@example.com",
  specialRequests: "Vegetarian menu only",
  status: "confirmed", // pending, confirmed, cancelled
  menuItems: [
    {
      itemId: ObjectId,
      name: "Paneer Butter Masala",
      quantity: 2,
      price: 300
    }
  ],
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Menu Items Collection
```javascript
{
  _id: ObjectId,
  name: "Paneer Butter Masala",
  category: "main-course",
  price: 300,
  description: "Rich and creamy paneer curry",
  imageUrl: "https://example.com/paneer.jpg",
  isAvailable: true,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Contact Messages Collection
```javascript
{
  _id: ObjectId,
  name: "Customer Name",
  email: "customer@example.com",
  phone: "9876543210",
  subject: "Inquiry about wedding booking",
  message: "I would like to book for my wedding...",
  status: "unread", // unread, read, replied
  createdAt: ISODate,
  updatedAt: ISODate
}
```

## 🔧 Core Files

### server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/contact', require('./routes/contact'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### config/database.js
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### models/User.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### models/Booking.js
```javascript
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true,
    enum: ['morning', 'afternoon', 'evening', 'full-day']
  },
  eventType: {
    type: String,
    required: true
  },
  guestCount: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  specialRequests: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  menuItems: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
    },
    name: String,
    quantity: Number,
    price: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
```

### routes/auth.js
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, phone, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
```

## 🚀 Running the Backend

1. **Start MongoDB** (if running locally):
```bash
mongod
```

2. **Run the backend**:
```bash
cd backend
npm run dev
```

3. **Test the API**:
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 📧 Email & WhatsApp Integration

The backend will automatically send booking confirmations to:
- **Owner Email**: jayeshrcpit2003@gmail.com
- **Owner WhatsApp**: 9359525834
- **Customer Email**: Confirmation and receipt

## 🔐 Security Features

- JWT Authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- CORS protection
- Helmet security headers

This MongoDB-based backend provides a robust, scalable solution for the Manomangal Lawns booking system!
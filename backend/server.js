const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
//const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.set('query parser', 'extended');

// Security Middlewares
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Sanitize data
//app.use(mongoSanitize());

// Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://unwind-cabins-mocha.vercel.app",
    ],
    credentials: true,
  })
);

// Route files
const auth = require('./routes/authRoutes');
const cabins = require('./routes/cabinRoutes');
const bookings = require('./routes/bookingRoutes');
const misc = require('./routes/miscRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const blogRoutes = require('./routes/blogRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/cabins', cabins);
app.use('/api/bookings', bookings);
app.use('/api', misc);
app.use('/api/upload', uploadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

// Basic route (can be removed or kept for health check)
app.get('/api/health', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * Nissan Jammu API Server
 * 
 * Production-ready Express server with:
 * - SQLite/MongoDB database abstraction
 * - JWT authentication
 * - Comprehensive security measures
 * - Scalable architecture
 * 
 * @author Nissan Jammu Development Team
 * @version 2.0.0
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// Database
const db = require('./database');

// Middleware
const { 
  xssProtection, 
  sqlInjectionProtection, 
  securityHeaders, 
  requestId 
} = require('./middleware/security.middleware');

// Routes
const authRoutes = require('./routes/auth.routes');

// Initialize Express app
const app = express();

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Request ID for tracking
app.use(requestId);

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
}));
app.use(securityHeaders);

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://nissanjammu.com',
  'https://www.nissanjammu.com',
  // Netlify deployments (update with your actual Netlify URL)
  process.env.FRONTEND_URL,
  /\.netlify\.app$/,  // Allow all Netlify preview deployments
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      callback(null, true);
      return;
    }
    
    // Check against allowed origins (strings and regex)
    const isAllowed = allowedOrigins.some(allowed => {
      if (!allowed) return false;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Request-ID', 'X-Offline-Sync', 'X-Original-Timestamp'],
}));

// Middleware to handle offline-synced requests
app.use((req, res, next) => {
  if (req.headers['x-offline-sync'] === 'true') {
    req.isOfflineSync = true;
    req.originalTimestamp = parseInt(req.headers['x-original-timestamp'] || '0', 10);
    console.log(`[Offline Sync] Processing request from ${new Date(req.originalTimestamp).toISOString()}`);
  }
  next();
});

// Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Compression
app.use(compression());

// XSS & SQL Injection Protection
app.use(xssProtection);
app.use(sqlInjectionProtection);

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ============================================
// ROUTES
// ============================================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Nissan Jammu API is running',
    database: db.getType(),
    timestamp: new Date().toISOString(),
    requestId: req.requestId,
  });
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Cars API
app.get('/api/cars', async (req, res) => {
  try {
    const { category, isBestSeller, isNewLaunch, limit = 50, skip = 0 } = req.query;
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (isBestSeller === 'true') query.isBestSeller = true;
    if (isNewLaunch === 'true') query.isNewLaunch = true;
    
    const cars = await db.find('cars', query, {
      limit: parseInt(limit),
      skip: parseInt(skip),
      sort: { createdAt: -1 },
    });
    
    const count = await db.count('cars', query);
    
    res.json({ 
      success: true, 
      data: cars, 
      count,
      pagination: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        total: count,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/cars/featured', async (req, res) => {
  try {
    const bestSellers = await db.find('cars', { isBestSeller: true, isActive: true }, { limit: 5 });
    const newLaunches = await db.find('cars', { isNewLaunch: true, isActive: true }, { limit: 5 });
    res.json({ success: true, data: { bestSellers, newLaunches } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/cars/:slug', async (req, res) => {
  try {
    const car = await db.findOne('cars', { slug: req.params.slug, isActive: true });
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    res.json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Inquiries API
app.post('/api/inquiries', async (req, res) => {
  try {
    const { type, name, email, phone, car, message } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email and phone are required' });
    }
    
    const inquiry = await db.create('inquiries', {
      type: type || 'general',
      name, email, phone, car, message,
      status: 'new',
    });
    
    console.log('📩 New inquiry received:', inquiry.id);
    
    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you soon.',
      data: { id: inquiry.id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/inquiries/test-drive', async (req, res) => {
  try {
    const { name, email, phone, car, preferredDate, preferredTime } = req.body;
    
    const inquiry = await db.create('inquiries', {
      type: 'test-drive',
      name, email, phone, car, preferredDate, preferredTime,
      status: 'new',
    });
    
    console.log('🚗 Test drive booked:', inquiry.id);
    
    res.status(201).json({
      success: true,
      message: 'Test drive booked! We will confirm shortly.',
      data: { id: inquiry.id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/inquiries/price-quote', async (req, res) => {
  try {
    const { name, email, phone, car, variant } = req.body;
    
    const inquiry = await db.create('inquiries', {
      type: 'price-quote',
      name, email, phone, car, variant,
      status: 'new',
    });
    
    console.log('💰 Price quote requested:', inquiry.id);
    
    res.status(201).json({
      success: true,
      message: 'Quote request received! Our team will send you the best offer.',
      data: { id: inquiry.id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contact API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    await db.create('inquiries', {
      type: 'contact',
      name, email, phone, subject, message,
      status: 'new',
    });
    
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will respond within 24 hours.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/contact/info', (req, res) => {
  res.json({
    success: true,
    data: {
      dealerName: "Nissan Channi Himmat - Jammu",
      tagline: "Authorized Nissan Dealer",
      address: {
        line1: "Ground Floor, Signature Tower",
        line2: "269, National Highway, Sector-C, Sainik Colony",
        city: "Jammu",
        state: "Jammu & Kashmir",
        pincode: "180011"
      },
      phone: ["+91 78895 59631"],
      email: ["nitubhardwaj@gmail.com"],
      timing: { 
        weekdays: "9:30 AM - 7:00 PM", 
        saturday: "9:30 AM - 7:00 PM",
        sunday: "10:00 AM - 6:00 PM" 
      },
      mapCoordinates: { lat: 32.7266, lng: 74.8570 },
    }
  });
});

// Testimonials API
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await db.find('testimonials', { isActive: true });
    res.json({ success: true, data: testimonials, count: testimonials.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Services API
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: "1", name: "Periodic Service", slug: "periodic-service", description: "Regular maintenance", isPopular: true },
      { id: "2", name: "Genuine Parts", slug: "genuine-parts", description: "100% authentic parts", isPopular: true },
      { id: "3", name: "Insurance", slug: "insurance", description: "Comprehensive coverage", isPopular: true },
      { id: "4", name: "Finance", slug: "finance", description: "Easy EMI options", isPopular: true },
    ]
  });
});

// Accessories API
app.get('/api/accessories', async (req, res) => {
  try {
    const { category, search, sort, limit = 50 } = req.query;
    let query = { inStock: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    let options = { limit: parseInt(limit) };
    
    if (sort === 'price-low') options.sort = { price: 1 };
    else if (sort === 'price-high') options.sort = { price: -1 };
    else if (sort === 'rating') options.sort = { rating: -1 };
    
    const accessories = await db.find('accessories', query, options);
    res.json({ success: true, data: accessories, count: accessories.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found`,
    requestId: req.requestId,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;
  
  res.status(err.status || 500).json({ 
    success: false, 
    message,
    requestId: req.requestId,
  });
});

// ============================================
// SERVER STARTUP
// ============================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await db.connect();
    
    // Seed initial data if empty
    await seedInitialData();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`
  ╔═══════════════════════════════════════════════════╗
  ║        🚗 NISSAN JAMMU API SERVER               ║
  ║           Channi Himmat - Authorized Dealer       ║
  ╠═══════════════════════════════════════════════════╣
  ║  Status:     ✅ Running                           ║
  ║  Port:       ${PORT}                                 ║
  ║  Database:   ${db.getType().toUpperCase().padEnd(10)}                       ║
  ║  Mode:       ${(process.env.NODE_ENV || 'development').padEnd(15)}              ║
  ║  Health:     http://localhost:${PORT}/health         ║
  ║  API:        http://localhost:${PORT}/api            ║
  ╚═══════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Seed initial data
const seedInitialData = async () => {
  try {
    const carCount = await db.count('cars');
    
    if (carCount === 0) {
      console.log('📊 Seeding initial data...');
      
      // Seed cars
      const cars = [
        {
          name: "Nissan Magnite",
          slug: "nissan-magnite",
          tagline: "Carismatic by Design",
          category: "suv",
          priceExShowroom: 599000,
          priceOnRoad: 720000,
          priceEmi: 9999,
          imageMain: "https://www.nissan.in/content/dam/Nissan/in/vehicles/magnite/overview/packshot/KURO-PACK-SHOT-D.png.ximg.l_full_m.smart.png",
          isNewLaunch: false,
          isBestSeller: true,
          rating: 4.5,
          reviewCount: 2850,
        },
        {
          name: "Nissan X-Trail",
          slug: "nissan-x-trail",
          tagline: "Premium SUV with e-POWER",
          category: "suv",
          priceExShowroom: 4990000,
          priceOnRoad: 5650000,
          priceEmi: 85000,
          imageMain: "https://www.nissan.in/content/dam/Nissan/in/vehicles/x-trail/overview/X-Trail-Front.png.ximg.l_full_m.smart.png",
          isNewLaunch: true,
          isBestSeller: false,
          rating: 4.8,
          reviewCount: 450,
        },
        {
          name: "Nissan Kicks",
          slug: "nissan-kicks",
          tagline: "Intelligent Mobility",
          category: "crossover",
          priceExShowroom: 999000,
          priceOnRoad: 1180000,
          priceEmi: 17999,
          imageMain: "https://www.nissan.in/content/dam/Nissan/in/vehicles/kicks/overview/Kicks-packshot.png.ximg.l_full_m.smart.png",
          isNewLaunch: false,
          isBestSeller: false,
          rating: 4.3,
          reviewCount: 1250,
        },
      ];
      
      for (const car of cars) {
        await db.create('cars', car);
      }
      
      // Seed testimonials
      const testimonials = [
        { name: "Rahul Sharma", rating: 5, review: "Excellent service at Nissan Jammu! The team was very helpful.", car: "Nissan Magnite", isActive: true },
        { name: "Priya Gupta", rating: 5, review: "Best dealership in Jammu. Highly recommend!", car: "Nissan X-Trail", isActive: true },
        { name: "Vikram Singh", rating: 5, review: "Great after-sales support. Very satisfied.", car: "Nissan Kicks", isActive: true },
      ];
      
      for (const testimonial of testimonials) {
        await db.create('testimonials', testimonial);
      }
      
      console.log('✅ Initial data seeded');
    }
  } catch (error) {
    console.error('⚠️ Error seeding data:', error);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n📴 Shutting down server...');
  await db.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n📴 Shutting down server...');
  await db.disconnect();
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;

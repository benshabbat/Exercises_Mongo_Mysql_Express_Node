import express from 'express';
import { MongoClient } from 'mongodb';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

// ============================================
// DATABASE CONFIGURATION
// ============================================

// TODO: Configure MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'reviews_db';

// TODO: Configure MySQL connection
const MYSQL_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'rootpass',
  database: process.env.MYSQL_DATABASE || 'reviews_db'
};

let mongoClient;
let mongoDb;
let mysqlConnection;

// ============================================
// DATABASE INITIALIZATION
// ============================================

async function initDatabases() {
  try {
    // TODO: Connect to MongoDB
    // mongoClient = ...
    // mongoDb = ...
    
    // TODO: Create MySQL connection
    // mysqlConnection = ...
    
    // TODO: Create MySQL table if not exists
    
    console.log('✅ Connected to databases');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

// ============================================
// TRANSFORMATION FUNCTIONS
// ============================================

// TODO: Implement transformation functions
function transformText(text, transformType) {
  switch (transformType) {
    case 'UPPERCASE':
      // TODO: Implement UPPERCASE transformation
      return text;
    
    case 'REVERSED':
      // TODO: Implement REVERSED transformation
      return text;
    
    case 'WORD_SHUFFLE': // BONUS
      // TODO: Implement WORD_SHUFFLE transformation
      return text;
    
    case 'ROT13': // BONUS
      // TODO: Implement ROT13 transformation
      return text;
    
    default:
      throw new Error('Unknown transformation type');
  }
}

// TODO: Implement reverse transformation function
function reverseTransformation(transformedText, transformType) {
  // Return { success: true, originalText: "..." } or { success: false, error: "..." }
}

// TODO: Check if transformation is reversible
function isReversible(transformType) {
  // Return true or false
}

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

// TODO: Implement authentication middleware
async function authenticate(req, res, next) {
  // Get username and password from headers/body/query
  // Verify against MongoDB
  // Attach user to req.user if valid
  // Call next() or return 401
}

// ============================================
// ROUTES
// ============================================

// 1) Register User
// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    // TODO: Extract username and password from body
    // TODO: Check if username already exists
    // TODO: Create user in MongoDB with totalReviews = 0
    // TODO: Return 201 with user id and username
    
    res.status(201).json({ message: 'TODO: Implement registration' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2) Submit Review
// POST /api/reviews
app.post('/api/reviews', authenticate, async (req, res) => {
  try {
    // TODO: Extract bookTitle, reviewText, transformType, rating from body
    // TODO: Validate rating (1-5)
    // TODO: Transform the review text
    // TODO: Save review in MySQL (original_text + transformed_text)
    // TODO: Increment totalReviews in MongoDB for the user
    // TODO: Return 201 with review details
    
    res.status(201).json({ message: 'TODO: Implement submit review' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3) Get Original Review
// GET /api/reviews/:id/original
app.get('/api/reviews/:id/original', authenticate, async (req, res) => {
  try {
    // TODO: Extract review ID from params
    // TODO: Fetch review from MySQL by ID
    // TODO: Return original text (always available from storage)
    
    res.status(200).json({ message: 'TODO: Implement get original' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4) Reverse Transformation
// POST /api/reviews/:id/reverse
app.post('/api/reviews/:id/reverse', authenticate, async (req, res) => {
  try {
    // TODO: Extract review ID from params
    // TODO: Fetch review from MySQL
    // TODO: Check if transformation is reversible
    // TODO: If reversible - reverse it and return original
    // TODO: If not reversible - return error with 400
    
    res.status(200).json({ message: 'TODO: Implement reverse transformation' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5) My Profile
// GET /api/users/me
app.get('/api/users/me', authenticate, async (req, res) => {
  try {
    // TODO: Get authenticated user from req.user
    // TODO: Fetch user from MongoDB
    // TODO: Return username, totalReviews, memberSince (createdAt)
    
    res.status(200).json({ message: 'TODO: Implement my profile' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6) My Reviews List - BONUS
// GET /api/reviews/my
app.get('/api/reviews/my', authenticate, async (req, res) => {
  try {
    // TODO: Get authenticated username
    // TODO: Fetch all reviews from MySQL for this username
    // TODO: Return list of reviews
    
    res.status(200).json({ message: 'TODO: Implement my reviews (BONUS)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7) Book Statistics - BONUS
// GET /api/books/:bookTitle/stats
app.get('/api/books/:bookTitle/stats', async (req, res) => {
  try {
    // TODO: Extract bookTitle from params
    // TODO: Query MySQL for count and average rating for this book
    // TODO: Return totalReviews and averageRating
    
    res.status(200).json({ message: 'TODO: Implement book stats (BONUS)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SERVER START
// ============================================

const PORT = process.env.PORT || 3000;

async function startServer() {
  await initDatabases();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGINT', async () => {
  console.log('\n🔴 Shutting down...');
  if (mongoClient) await mongoClient.close();
  if (mysqlConnection) await mysqlConnection.end();
  process.exit(0);
});

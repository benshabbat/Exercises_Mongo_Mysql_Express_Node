import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

// ============================================
// DATABASE CONFIGURATION
// ============================================

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'reviews_db';

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
    // Connect to MongoDB
    mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();
    mongoDb = mongoClient.db(MONGO_DB_NAME);
    
    // Ensure unique index on username
    await mongoDb.collection('users').createIndex({ username: 1 }, { unique: true });
    
    // Create MySQL connection
    mysqlConnection = await mysql.createConnection(MYSQL_CONFIG);
    
    // Create reviews table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        book_title VARCHAR(255) NOT NULL,
        original_text TEXT NOT NULL,
        transformed_text TEXT NOT NULL,
        transform_type VARCHAR(50) NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_book_title (book_title)
      )
    `;
    await mysqlConnection.execute(createTableQuery);
    
    console.log('✅ Connected to MongoDB and MySQL');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

// ============================================
// TRANSFORMATION FUNCTIONS
// ============================================

function transformText(text, transformType) {
  switch (transformType) {
    case 'UPPERCASE':
      return text.toUpperCase();
    
    case 'REVERSED':
      return text.split('').reverse().join('');
    
    case 'WORD_SHUFFLE': // BONUS
      const words = text.split(' ');
      // Fisher-Yates shuffle
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      return words.join(' ');
    
    case 'ROT13': // BONUS
      return text.replace(/[a-zA-Z]/g, (char) => {
        const base = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
      });
    
    default:
      throw new Error('Unknown transformation type');
  }
}

function reverseTransformation(transformedText, transformType) {
  switch (transformType) {
    case 'UPPERCASE':
      // We can't perfectly reverse uppercase (don't know original casing)
      // But algorithmically, we could lowercase it
      return { success: true, originalText: transformedText.toLowerCase() };
    
    case 'REVERSED':
      // Reverse it again
      return { success: true, originalText: transformedText.split('').reverse().join('') };
    
    case 'ROT13': // BONUS - ROT13 applied twice gives original
      const reversed = transformedText.replace(/[a-zA-Z]/g, (char) => {
        const base = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
      });
      return { success: true, originalText: reversed };
    
    case 'WORD_SHUFFLE': // BONUS - not reversible
      return { success: false, error: 'CANNOT_REVERSE_TRANSFORMATION' };
    
    default:
      return { success: false, error: 'UNKNOWN_TRANSFORMATION' };
  }
}

function isReversible(transformType) {
  return ['UPPERCASE', 'REVERSED', 'ROT13'].includes(transformType);
}

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

async function authenticate(req, res, next) {
  try {
    // Extract username and password from Authorization header, body, or query
    let username, password;
    
    // Check Authorization header (Basic Auth)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      [username, password] = credentials.split(':');
    } else {
      // Check body or query
      username = req.body.username || req.query.username;
      password = req.body.password || req.query.password;
    }
    
    if (!username || !password) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Verify user exists in MongoDB
    const user = await mongoDb.collection('users').findOne({ username });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ============================================
// ROUTES
// ============================================

// 1) Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    // Check if user already exists
    const existingUser = await mongoDb.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    
    // Create new user
    const newUser = {
      username,
      password, // Plain text (educational purposes only!)
      totalReviews: 0,
      createdAt: new Date()
    };
    
    const result = await mongoDb.collection('users').insertOne(newUser);
    
    res.status(201).json({
      id: result.insertedId.toString(),
      username
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2) Submit Review
app.post('/api/reviews', authenticate, async (req, res) => {
  try {
    const { bookTitle, reviewText, transformType, rating } = req.body;
    
    if (!bookTitle || !reviewText || !transformType || !rating) {
      return res.status(400).json({ error: 'All fields required: bookTitle, reviewText, transformType, rating' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    // Transform the text
    const transformedText = transformText(reviewText, transformType);
    
    // Save to MySQL
    const [result] = await mysqlConnection.execute(
      'INSERT INTO reviews (username, book_title, original_text, transformed_text, transform_type, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.username, bookTitle, reviewText, transformedText, transformType, rating]
    );
    
    // Increment user's totalReviews in MongoDB
    await mongoDb.collection('users').updateOne(
      { username: req.user.username },
      { $inc: { totalReviews: 1 } }
    );
    
    res.status(201).json({
      id: result.insertId,
      bookTitle,
      transformedText,
      transformType,
      rating
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3) Get Original Review
app.get('/api/reviews/:id/original', authenticate, async (req, res) => {
  try {
    const reviewId = req.params.id;
    
    const [rows] = await mysqlConnection.execute(
      'SELECT * FROM reviews WHERE id = ?',
      [reviewId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    const review = rows[0];
    
    res.status(200).json({
      id: review.id,
      bookTitle: review.book_title,
      originalText: review.original_text,
      transformedText: review.transformed_text,
      transformType: review.transform_type
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4) Reverse Transformation
app.post('/api/reviews/:id/reverse', authenticate, async (req, res) => {
  try {
    const reviewId = req.params.id;
    
    const [rows] = await mysqlConnection.execute(
      'SELECT * FROM reviews WHERE id = ?',
      [reviewId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    const review = rows[0];
    const result = reverseTransformation(review.transformed_text, review.transform_type);
    
    if (!result.success) {
      return res.status(400).json({
        id: review.id,
        transformType: review.transform_type,
        reversible: false,
        error: result.error
      });
    }
    
    res.status(200).json({
      id: review.id,
      originalText: result.originalText,
      transformType: review.transform_type,
      reversible: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5) My Profile
app.get('/api/users/me', authenticate, async (req, res) => {
  try {
    const user = await mongoDb.collection('users').findOne({ username: req.user.username });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      username: user.username,
      totalReviews: user.totalReviews,
      memberSince: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6) My Reviews List - BONUS
app.get('/api/reviews/my', authenticate, async (req, res) => {
  try {
    const [rows] = await mysqlConnection.execute(
      'SELECT id, book_title, transformed_text, transform_type, rating, created_at FROM reviews WHERE username = ? ORDER BY created_at DESC',
      [req.user.username]
    );
    
    res.status(200).json({
      username: req.user.username,
      reviews: rows.map(row => ({
        id: row.id,
        bookTitle: row.book_title,
        transformedText: row.transformed_text,
        transformType: row.transform_type,
        rating: row.rating,
        createdAt: row.created_at
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7) Book Statistics - BONUS
app.get('/api/books/:bookTitle/stats', async (req, res) => {
  try {
    const bookTitle = req.params.bookTitle;
    
    const [rows] = await mysqlConnection.execute(
      'SELECT COUNT(*) as total, AVG(rating) as avgRating FROM reviews WHERE book_title = ?',
      [bookTitle]
    );
    
    const stats = rows[0];
    
    res.status(200).json({
      bookTitle,
      totalReviews: stats.total,
      averageRating: stats.avgRating ? parseFloat(stats.avgRating.toFixed(2)) : 0
    });
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
    console.log(`📚 Book Reviews System API ready`);
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

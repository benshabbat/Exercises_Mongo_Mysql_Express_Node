// =======================================
// קובץ השרת הראשי - server.js
// =======================================
// זהו נקודת הכניסה לאפליקציה
// כאן אנחנו:
// 1. מגדירים את שרת Express
// 2. מתחברים למסד נתונים MongoDB
// 3. מגדירים Middleware
// 4. מחברים את ה-Routes
// 5. מפעילים את השרת

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase, closeConnection } from './src/config/database.js';
import userRoutes from './src/routes/userRoutes.js';

// טוען משתני סביבה מקובץ .env
dotenv.config();

// יוצרים אפליקציית Express
const app = express();
const PORT = process.env.PORT || 3000;

// =======================================
// Middleware - ביניים
// =======================================

// 1. CORS - מאפשר בקשות מדומיינים שונים
app.use(cors());

// 2. Express JSON - מאפשר קריאת JSON מגוף הבקשה
app.use(express.json());

// 3. Express URL Encoded - מאפשר קריאת נתונים מטפסים
app.use(express.urlencoded({ extended: true }));

// 4. Logger פשוט - מדפיס כל בקשה
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// =======================================
// Routes - נתיבים
// =======================================

// נתיב בסיסי לבדיקה שהשרת עובד
app.get('/', (req, res) => {
  res.json({
    message: 'ברוכים הבאים ל-API שלנו! 🚀',
    version: '1.0.0',
    endpoints: {
      users: '/api/users'
    }
  });
});

// כל הנתיבים של משתמשים
app.use('/api/users', userRoutes);

// נתיב לטיפול בדפים לא קיימים (404)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'הנתיב לא נמצא'
  });
});

// =======================================
// Error Handler - טיפול בשגיאות
// =======================================
app.use((err, req, res, next) => {
  console.error('שגיאה:', err);
  res.status(500).json({
    success: false,
    message: 'שגיאת שרת פנימית',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// =======================================
// הפעלת השרת
// =======================================

/**
 * פונקציה להפעלת השרת
 */
const startServer = async () => {
  try {
    // 1. מתחברים למסד הנתונים
    console.log('🔄 מתחבר למסד נתונים...');
    await connectToDatabase();

    // 2. מפעילים את השרת
    app.listen(PORT, () => {
      console.log(`\n🚀 השרת רץ על פורט ${PORT}`);
      console.log(`📍 כתובת: http://localhost:${PORT}`);
      console.log(`📊 API: http://localhost:${PORT}/api/users\n`);
    });
  } catch (error) {
    console.error('❌ שגיאה בהפעלת השרת:', error);
    process.exit(1);
  }
};

// סגירה נאותה של החיבור כאשר התהליך נעצר
process.on('SIGINT', async () => {
  console.log('\n⏹️  סוגר את החיבור למסד הנתונים...');
  await closeConnection();
  process.exit(0);
});

// מפעילים את השרת
startServer();

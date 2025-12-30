// קובץ חיבור למסד נתונים MongoDB
// משתמשים ב-MongoDB Native Driver (ללא Mongoose)

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// טוען משתני סביבה מקובץ .env
dotenv.config();

// שמירת החיבור למסד הנתונים
let db = null;
let client = null;

/**
 * פונקציה להתחברות למסד נתונים MongoDB
 * @returns {Promise<Db>} מחזיר את אובייקט מסד הנתונים
 */
export const connectToDatabase = async () => {
  try {
    // אם כבר מחוברים, מחזירים את החיבור הקיים
    if (db) {
      console.log('✅ כבר מחובר למסד נתונים');
      return db;
    }

    // יוצרים לקוח MongoDB חדש
    client = new MongoClient(process.env.MONGODB_URI);

    // מתחברים לשרת MongoDB
    await client.connect();
    console.log('✅ התחברות למסד נתונים הצליחה!');

    // בוחרים את מסד הנתונים
    db = client.db(process.env.DATABASE_NAME);

    return db;
  } catch (error) {
    console.error('❌ שגיאה בהתחברות למסד נתונים:', error);
    throw error;
  }
};

/**
 * פונקציה לקבלת מסד הנתונים הנוכחי
 * @returns {Db} מחזיר את אובייקט מסד הנתונים
 */
export const getDatabase = () => {
  if (!db) {
    throw new Error('מסד הנתונים לא מחובר. קרא קודם ל-connectToDatabase()');
  }
  return db;
};

/**
 * פונקציה לסגירת החיבור למסד הנתונים
 */
export const closeConnection = async () => {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log('🔒 החיבור למסד הנתונים נסגר');
  }
};

// ========================================
// שיעור 1: חיבור בסיסי ל-MongoDB
// ========================================

// 1. ייבוא הספריות הנדרשות
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// 2. טעינת משתני סביבה מקובץ .env
dotenv.config();

// 3. פונקציה להתחברות למסד נתונים
async function connectToDatabase() {
  // יצירת לקוח MongoDB
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // התחברות לשרת
    console.log('🔄 מתחבר ל-MongoDB...');
    await client.connect();
    console.log('✅ התחברנו בהצלחה!');

    // קבלת מסד הנתונים
    const db = client.db(process.env.DATABASE_NAME);
    console.log(`📊 עובדים עם מסד הנתונים: ${process.env.DATABASE_NAME}`);

    // רשימת כל ה-Collections (אוספים) במסד הנתונים
    const collections = await db.listCollections().toArray();
    console.log('📂 Collections קיימים:', collections.length);

    if (collections.length > 0) {
      console.log('📋 רשימת Collections:');
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }

    // סגירת החיבור
    await client.close();
    console.log('🔒 החיבור נסגר בהצלחה');

  } catch (error) {
    console.error('❌ שגיאה בחיבור:', error.message);
    console.log('💡 טיפ: ודא ש-MongoDB רץ על המחשב שלך');
  }
}

// 4. הרצת הפונקציה
connectToDatabase();

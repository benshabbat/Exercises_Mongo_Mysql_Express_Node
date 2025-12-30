// create.js
// ========================================
// שיעור 2: יצירת מסמכים ב-MongoDB
// ========================================

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function createDocuments() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ מחובר למסד נתונים');

    const db = client.db(process.env.DATABASE_NAME);
    
    // 1️⃣ יצירת collection (אוטומטית כשמוסיפים מסמך ראשון)
    const studentsCollection = db.collection('students');

    // 2️⃣ הוספת מסמך בודד - insertOne
    console.log('\n📝 מוסיף סטודנט אחד...');
    const student1 = {
      name: 'יוסי כהן',
      age: 20,
      grade: 'A',
      courses: ['מתמטיקה', 'פיזיקה'],
      enrolled: new Date()
    };

    const result1 = await studentsCollection.insertOne(student1);
    console.log('✅ נוסף בהצלחה! ID:', result1.insertedId);

    // 3️⃣ הוספת מספר מסמכים - insertMany
    console.log('\n📝 מוסיף כמה סטודנטים...');
    const students = [
      {
        name: 'שרה לוי',
        age: 22,
        grade: 'B',
        courses: ['כימיה', 'ביולוגיה'],
        enrolled: new Date()
      },
      {
        name: 'דוד ישראלי',
        age: 21,
        grade: 'A',
        courses: ['מדעי המחשב', 'מתמטיקה'],
        enrolled: new Date()
      },
      {
        name: 'מירי אברהם',
        age: 19,
        grade: 'C',
        courses: ['אנגלית', 'ספרות'],
        enrolled: new Date()
      }
    ];

    const result2 = await studentsCollection.insertMany(students);
    console.log(`✅ נוספו ${result2.insertedCount} סטודנטים`);
    console.log('IDs:', Object.values(result2.insertedIds));

    // 4️⃣ סטטיסטיקה
    const total = await studentsCollection.countDocuments();
    console.log(`\n📊 סה"כ סטודנטים במסד הנתונים: ${total}`);

    await client.close();
    console.log('\n🔒 החיבור נסגר');

  } catch (error) {
    console.error('❌ שגיאה:', error.message);
  }
}

createDocuments();

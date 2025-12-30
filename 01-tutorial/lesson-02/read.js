// read.js
// ========================================
// שיעור 2: קריאת מסמכים מ-MongoDB
// ========================================

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function readDocuments() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ מחובר למסד נתונים\n');

    const db = client.db(process.env.DATABASE_NAME);
    const studentsCollection = db.collection('students');

    // 1️⃣ קריאת כל המסמכים - find()
    console.log('📚 כל הסטודנטים:');
    console.log('='.repeat(50));
    const allStudents = await studentsCollection.find().toArray();
    allStudents.forEach(student => {
      console.log(`
  שם: ${student.name}
  גיל: ${student.age}
  ציון: ${student.grade}
  קורסים: ${student.courses.join(', ')}
  `);
    });

    // 2️⃣ קריאת מסמך בודד - findOne()
    console.log('\n🔍 חיפוש סטודנט ספציפי (שרה לוי):');
    console.log('='.repeat(50));
    const specificStudent = await studentsCollection.findOne({ 
      name: 'שרה לוי' 
    });
    if (specificStudent) {
      console.log(specificStudent);
    }

    // 3️⃣ חיפוש עם תנאי - גיל גדול מ-20
    console.log('\n🔍 סטודנטים מעל גיל 20:');
    console.log('='.repeat(50));
    const olderStudents = await studentsCollection
      .find({ age: { $gt: 20 } })
      .toArray();
    
    olderStudents.forEach(student => {
      console.log(`  - ${student.name} (${student.age})`);
    });

    // 4️⃣ חיפוש עם תנאי מרובים - ציון A וגיל מעל 19
    console.log('\n🔍 סטודנטים מצטיינים (ציון A) מעל גיל 19:');
    console.log('='.repeat(50));
    const topStudents = await studentsCollection
      .find({ 
        grade: 'A',
        age: { $gt: 19 }
      })
      .toArray();
    
    topStudents.forEach(student => {
      console.log(`  - ${student.name}`);
    });

    // 5️⃣ ספירת מסמכים - countDocuments()
    console.log('\n📊 סטטיסטיקות:');
    console.log('='.repeat(50));
    const totalStudents = await studentsCollection.countDocuments();
    const gradeAStudents = await studentsCollection.countDocuments({ grade: 'A' });
    
    console.log(`  סה"כ סטודנטים: ${totalStudents}`);
    console.log(`  סטודנטים עם ציון A: ${gradeAStudents}`);

    // 6️⃣ מיון - sort()
    console.log('\n📊 סטודנטים ממוינים לפי גיל (מהקטן לגדול):');
    console.log('='.repeat(50));
    const sortedByAge = await studentsCollection
      .find()
      .sort({ age: 1 })  // 1 = ascending (עולה), -1 = descending (יורד)
      .toArray();
    
    sortedByAge.forEach(student => {
      console.log(`  ${student.age} - ${student.name}`);
    });

    // 7️⃣ הגבלת תוצאות - limit()
    console.log('\n📊 2 הסטודנטים הראשונים:');
    console.log('='.repeat(50));
    const firstTwo = await studentsCollection
      .find()
      .limit(2)
      .toArray();
    
    firstTwo.forEach(student => {
      console.log(`  - ${student.name}`);
    });

    await client.close();
    console.log('\n🔒 החיבור נסגר');

  } catch (error) {
    console.error('❌ שגיאה:', error.message);
  }
}

readDocuments();

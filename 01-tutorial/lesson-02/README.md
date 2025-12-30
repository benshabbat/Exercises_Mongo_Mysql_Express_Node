# 📖 שיעור 2: Create & Read - יצירה וקריאה

**משך זמן משוער: 30 דקות**

---

## 🎯 מה נלמד בשיעור זה?

- איך ליצור collection חדש
- איך להוסיף מסמך בודד (insertOne)
- איך להוסיף מספר מסמכים (insertMany)
- איך לקרוא מסמכים (find, findOne)
- איך להשתמש ב-filters בסיסיים

---

## 📚 רקע תיאורטי

### מבנה MongoDB

```
Database (מסד נתונים)
    └── Collection (אוסף - כמו טבלה ב-SQL)
            └── Document (מסמך - כמו שורה ב-SQL)
                    └── Fields (שדות - כמו עמודות ב-SQL)
```

### דוגמה:

```javascript
// Database: schoolDB
// Collection: students
// Document:
{
  _id: ObjectId("..."),      // MongoDB יוצר אוטומטית
  name: "יוסי כהן",
  age: 20,
  grade: "A",
  courses: ["מתמטיקה", "פיזיקה"]
}
```

---

## 💻 יצירת המסמך הראשון שלך!

### צור קובץ `create.js`

```javascript
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

    await client.close();
    console.log('\n🔒 החיבור נסגר');

  } catch (error) {
    console.error('❌ שגיאה:', error.message);
  }
}

createDocuments();
```

---

## 📖 קריאת מסמכים

### צור קובץ `read.js`

```javascript
// read.js
// ========================================
// שיעור 2: קריאת מסמכים מ-MongoDB
// ========================================

import { MongoClient, ObjectId } from 'mongodb';
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
    console.log(specificStudent);

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
```

---

## 🔍 אופרטורים נפוצים לחיפוש

### אופרטורי השוואה:

```javascript
// שווה
{ age: 20 }

// גדול מ
{ age: { $gt: 20 } }

// גדול או שווה
{ age: { $gte: 20 } }

// קטן מ
{ age: { $lt: 20 } }

// קטן או שווה
{ age: { $lte: 20 } }

// לא שווה
{ age: { $ne: 20 } }

// בתוך רשימה
{ grade: { $in: ['A', 'B'] } }

// לא בתוך רשימה
{ grade: { $nin: ['C', 'D'] } }
```

### אופרטורים לוגיים:

```javascript
// AND (כל התנאים חייבים להתקיים)
{ age: { $gt: 20 }, grade: 'A' }

// OR (אחד מהתנאים חייב להתקיים)
{ $or: [{ age: { $gt: 25 } }, { grade: 'A' }] }

// NOT
{ age: { $not: { $lt: 20 } } }
```

---

## 🎯 תרגילים מעשיים

### תרגיל 1: הוסף סטודנטים חדשים

צור 5 סטודנטים חדשים עם:
- שם
- גיל (בין 18-25)
- ציון (A-F)
- רשימת קורסים (לפחות 2)

<details>
<summary>✅ פתרון</summary>

```javascript
const newStudents = [
  {
    name: 'אלי רוזן',
    age: 23,
    grade: 'B',
    courses: ['היסטוריה', 'פסיכולוגיה'],
    enrolled: new Date()
  },
  {
    name: 'רחל כהן',
    age: 18,
    grade: 'A',
    courses: ['מוזיקה', 'אומנות'],
    enrolled: new Date()
  },
  {
    name: 'משה דוד',
    age: 24,
    grade: 'C',
    courses: ['כלכלה', 'ניהול'],
    enrolled: new Date()
  },
  {
    name: 'תמר אבני',
    age: 20,
    grade: 'B',
    courses: ['מדעי החברה', 'אנגלית'],
    enrolled: new Date()
  },
  {
    name: 'יונתן לוי',
    age: 22,
    grade: 'A',
    courses: ['מדעי המחשב', 'פיזיקה', 'מתמטיקה'],
    enrolled: new Date()
  }
];

await studentsCollection.insertMany(newStudents);
console.log('✅ נוספו 5 סטודנטים חדשים');
```
</details>

### תרגיל 2: חיפושים מתקדמים

כתוב queries ל:
1. כל הסטודנטים שלומדים "מתמטיקה"
2. סטודנטים עם ציון A או B
3. סטודנטים בין גיל 20-22

<details>
<summary>✅ פתרון</summary>

```javascript
// 1. סטודנטים שלומדים מתמטיקה
const mathStudents = await studentsCollection
  .find({ courses: 'מתמטיקה' })
  .toArray();

// 2. סטודנטים עם ציון A או B
const goodGrades = await studentsCollection
  .find({ grade: { $in: ['A', 'B'] } })
  .toArray();

// 3. סטודנטים בין גיל 20-22
const ageRange = await studentsCollection
  .find({ 
    age: { $gte: 20, $lte: 22 }
  })
  .toArray();
```
</details>

### תרגיל 3: סטטיסטיקות

צור פונקציה שמציגה:
- סה"כ סטודנטים
- ממוצע גיל
- כמה סטודנטים בכל ציון

<details>
<summary>✅ פתרון</summary>

```javascript
async function showStatistics() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  
  const db = client.db(process.env.DATABASE_NAME);
  const studentsCollection = db.collection('students');

  // סה"כ סטודנטים
  const total = await studentsCollection.countDocuments();
  console.log(`סה"כ סטודנטים: ${total}`);

  // ממוצע גיל
  const allStudents = await studentsCollection.find().toArray();
  const avgAge = allStudents.reduce((sum, s) => sum + s.age, 0) / allStudents.length;
  console.log(`ממוצע גיל: ${avgAge.toFixed(1)}`);

  // סטודנטים לפי ציון
  const grades = ['A', 'B', 'C', 'D', 'F'];
  console.log('\nסטודנטים לפי ציון:');
  for (const grade of grades) {
    const count = await studentsCollection.countDocuments({ grade });
    if (count > 0) {
      console.log(`  ציון ${grade}: ${count}`);
    }
  }

  await client.close();
}
```
</details>

---

## 📊 Projection - בחירת שדות ספציפיים

לפעמים אנחנו לא צריכים את כל השדות. אפשר לבחור רק מה שצריך:

```javascript
// רק שם וגיל (ללא _id)
const students = await studentsCollection
  .find()
  .project({ name: 1, age: 1, _id: 0 })
  .toArray();

// הכל חוץ מקורסים
const students = await studentsCollection
  .find()
  .project({ courses: 0 })
  .toArray();
```

---

## ✅ סיכום

היום למדנו:

- ✅ איך ליצור מסמכים עם `insertOne` ו-`insertMany`
- ✅ איך לקרוא מסמכים עם `find` ו-`findOne`
- ✅ איך להשתמש ב-filters ואופרטורים
- ✅ איך למיין, להגביל ולבחור שדות

---

## 🎓 מושגים חשובים

- **insertOne** - הוספת מסמך בודד
- **insertMany** - הוספת מסמכים מרובים
- **find** - חיפוש מסמכים (מחזיר cursor)
- **findOne** - חיפוש מסמך בודד
- **toArray** - המרת cursor למערך
- **countDocuments** - ספירת מסמכים
- **sort** - מיון תוצאות
- **limit** - הגבלת כמות תוצאות
- **project** - בחירת שדות ספציפיים

---

## 📚 הבא בתור

בשיעור הבא נלמד:
- עדכון מסמכים (Update)
- מחיקת מסמכים (Delete)
- אופרטורי עדכון מתקדמים

**[➡️ עבור לשיעור 3: Update & Delete](../lesson-03/README.md)**

---

**נוצר עם ❤️ למתחילים**

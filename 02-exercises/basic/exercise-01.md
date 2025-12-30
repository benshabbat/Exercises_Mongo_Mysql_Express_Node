# 🟢 תרגיל 1: ספרייה - ניהול ספרים

**רמת קושי:** בסיסי  
**משך זמן משוער:** 20 דקות

---

## 🎯 מטרת התרגיל

ליצור מערכת פשוטה לניהול ספרים בספרייה:
- חיבור למסד נתונים
- הוספת ספרים
- חיפוש ספרים
- ספירת ספרים

---

## 📝 משימות

### משימה 1: חיבור למסד נתונים
צור חיבור ל-MongoDB ויצור collection בשם `books`

### משימה 2: הוסף 5 ספרים
כל ספר צריך לכלול:
- שם הספר (title)
- שם המחבר (author)
- שנת הוצאה (year)
- ז'אנר (genre)
- כמות עותקים זמינים (available)

### משימה 3: מצא את כל הספרים
הצג את כל הספרים בצורה מסודרת

### משימה 4: מצא ספרים לפי תנאי
- כל הספרים מאחרי 2000
- כל הספרים בז'אנר "פנטזיה"
- ספרים עם יותר מ-2 עותקים זמינים

### משימה 5: סטטיסטיקות
הצג:
- סה"כ ספרים
- סה"כ עותקים זמינים
- הספר הכי ישן

---

## 🚀 התחל כאן

```javascript
// exercise-01.js
// TODO: השלם את הקוד

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function libraryManagement() {
  // TODO: צור חיבור למסד נתונים
  
  try {
    // TODO: חבר למסד נתונים
    
    // TODO: קבל את ה-collection books
    
    // משימה 2: הוסף 5 ספרים
    const books = [
      {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J.K. Rowling',
        year: 1997,
        genre: 'Fantasy',
        available: 3
      },
      {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        year: 1954,
        genre: 'Fantasy',
        available: 2
      },
      {
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'Science Fiction',
        available: 5
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        year: 1988,
        genre: 'Philosophy',
        available: 1
      },
      {
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        year: 2008,
        genre: 'Science Fiction',
        available: 4
      }
    ];
    
    // TODO: הוסף את הספרים למסד נתונים
    
    // משימה 3: הצג את כל הספרים
    // TODO: מצא את כל הספרים
    
    // משימה 4: חיפושים לפי תנאי
    // TODO: מצא ספרים מאחרי 2000
    
    // TODO: מצא ספרי פנטזיה
    // Hint: find({ genre: 'Fantasy' })
    
    // TODO: מצא ספרים עם יותר מ-2 עותקים
    
    // משימה 5: סטטיסטיקות
    // TODO: ספור כמה ספרים יש
    
    // TODO: חשב סה"כ עותקים זמינים
    
    // TODO: מצא את הספר הכי ישן
    
  } catch (error) {
    console.error('שגיאה:', error);
  } finally {
    // TODO: סגור את החיבור
  }
}

libraryManagement();
```

---

## 💡 רמזים

<details>
<summary>רמז 1: איך להוסיף מסמכים?</summary>

```javascript
await collection.insertMany([...]);
```
</details>

<details>
<summary>רמז 2: איך למצוא עם תנאי?</summary>

```javascript
await collection.find({ year: { $gt: 2000 } }).toArray();
```
</details>

<details>
<summary>רמז 3: איך למיין?</summary>

```javascript
await collection.find().sort({ year: 1 }).toArray();
```
</details>

---

## ✅ פתרון מלא

<details>
<summary>לחץ לצפייה בפתרון</summary>

```javascript
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function libraryManagement() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ מחובר למסד נתונים\n');
    
    const db = client.db(process.env.DATABASE_NAME);
    const booksCollection = db.collection('books');
    
    // משימה 2: הוסף 5 ספרים
    console.log('📚 מוסיף ספרים...');
    const books = [
      {
        title: 'הארי פוטר ואבן החכמים',
        author: 'ג.ק. רולינג',
        year: 1997,
        genre: 'פנטזיה',
        available: 3
      },
      {
        title: 'שר הטבעות',
        author: 'ג.ר.ר. טולקין',
        year: 1954,
        genre: 'פנטזיה',
        available: 2
      },
      {
        title: '1984',
        author: 'ג\'ורג\' אורוול',
        year: 1949,
        genre: 'מדע בדיוני',
        available: 5
      },
      {
        title: 'הכימאי',
        author: 'פאולו קואלייו',
        year: 1988,
        genre: 'פילוסופיה',
        available: 1
      },
      {
        title: 'מנוי המשחקים',
        author: 'סוזן קולינס',
        year: 2008,
        genre: 'מדע בדיוני',
        available: 4
      }
    ];
    
    await booksCollection.insertMany(books);
    console.log('✅ נוספו 5 ספרים\n');
    
    // משימה 3: הצג את כל הספרים
    console.log('📖 כל הספרים:');
    console.log('='.repeat(60));
    const allBooks = await booksCollection.find().toArray();
    allBooks.forEach(book => {
      console.log(`${book.title} - ${book.author} (${book.year})`);
    });
    
    // משימה 4: חיפושים לפי תנאי
    console.log('\n📚 ספרים מאחרי 2000:');
    const modernBooks = await booksCollection
      .find({ year: { $gt: 2000 } })
      .toArray();
    modernBooks.forEach(book => {
      console.log(`  - ${book.title} (${book.year})`);
    });
    
    console.log('\n🧙 ספרי פנטזיה:');
    const fantasyBooks = await booksCollection
      .find({ genre: 'Fantasy' })
      .toArray();
    fantasyBooks.forEach(book => {
      console.log(`  - ${book.title}`);
    });
    
    console.log('\n📦 ספרים עם יותר מ-2 עותקים:');
    const availableBooks = await booksCollection
      .find({ available: { $gt: 2 } })
      .toArray();
    availableBooks.forEach(book => {
      console.log(`  - ${book.title} (${book.available} עותקים)`);
    });
    
    // משימה 5: סטטיסטיקות
    console.log('\n📊 סטטיסטיקות:');
    console.log('='.repeat(60));
    
    const totalBooks = await booksCollection.countDocuments();
    console.log(`סה"כ ספרים: ${totalBooks}`);
    
    const allBooksData = await booksCollection.find().toArray();
    const totalAvailable = allBooksData.reduce((sum, book) => sum + book.available, 0);
    console.log(`סה"כ עותקים זמינים: ${totalAvailable}`);
    
    const oldestBook = await booksCollection
      .find()
      .sort({ year: 1 })
      .limit(1)
      .toArray();
    console.log(`הספר הכי ישן: ${oldestBook[0].title} (${oldestBook[0].year})`);
    
  } catch (error) {
    console.error('❌ שגיאה:', error.message);
  } finally {
    await client.close();
    console.log('\n🔒 החיבור נסגר');
  }
}

libraryManagement();
```
</details>

---

## 🎯 אתגרים נוספים

אם סיימת, נסה:

1. הוסף שדה `rating` (דירוג) לספרים והצג את הספרים הכי מדורגים
2. צור פונקציה להשאלת ספר (מפחיתה `available` ב-1)
3. צור פונקציה להחזרת ספר (מגדילה `available` ב-1)
4. מצא ספרים שהעותקים שלהם אזלו (`available: 0`)

---

**בהצלחה! 💪**

# 📖 שיעור 1: חיבור למסד נתונים MongoDB

**משך זמן משוער: 20 דקות**

---

## 🎯 מה נלמד בשיעור זה?

- מה זה MongoDB Driver?
- איך להתחבר למסד נתונים
- איך לבדוק שהחיבור עובד
- סגירה נכונה של חיבור

---

## 📚 רקע תיאורטי

### מה זה MongoDB Driver?

**MongoDB Driver** הוא ספרייה שמאפשרת ל-Node.js לדבר עם MongoDB.

אנלוגיה: אם MongoDB הוא רכב, ה-Driver הוא ההגה שמאפשר לך לנהוג בו.

### ההבדל: Native Driver vs Mongoose

```
MongoDB Native Driver          Mongoose
      ↓                           ↓
  פשוט וישיר                מוסיף שכבה נוספת
  עובד ישירות               Schemas + Validation
  מהיר יותר                 יותר features
```

---

## 💻 התקנה

### שלב 1: צור תיקיית פרויקט חדשה

```bash
mkdir my-first-mongodb
cd my-first-mongodb
```

### שלב 2: אתחל פרויקט Node.js

```bash
npm init -y
```

### שלב 3: התקן את MongoDB Driver

```bash
npm install mongodb dotenv
```

**מה התקנו?**
- `mongodb` - ה-Driver עצמו
- `dotenv` - לניהול משתני סביבה (connection string וכו')

---

## 🔧 הגדרות

### צור קובץ `.env`

```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=myFirstDB
```

**הסבר:**
- `MONGODB_URI` - כתובת שרת MongoDB
  - `localhost` = המחשב שלך
  - `27017` = הפורט הדיפולטיבי של MongoDB
- `DATABASE_NAME` - שם מסד הנתונים

---

## 📝 הקוד הראשון שלך!

### צור קובץ `connect.js`

```javascript
// connect.js
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

    // סגירת החיבור
    await client.close();
    console.log('🔒 החיבור נסגר בהצלחה');

  } catch (error) {
    console.error('❌ שגיאה בחיבור:', error);
  }
}

// 4. הרצת הפונקציה
connectToDatabase();
```

---

## 🚀 הרצה

### הוסף את זה ל-`package.json`:

```json
{
  "type": "module",
  "scripts": {
    "start": "node connect.js"
  }
}
```

### הרץ את הקוד:

```bash
npm start
```

### פלט מצופה:

```
🔄 מתחבר ל-MongoDB...
✅ התחברנו בהצלחה!
📊 עובדים עם מסד הנתונים: myFirstDB
📂 Collections קיימים: 0
🔒 החיבור נסגר בהצלחה
```

---

## 🔍 הסבר מפורט על הקוד

### 1. יצירת MongoClient

```javascript
const client = new MongoClient(process.env.MONGODB_URI);
```

- `MongoClient` הוא הכלי שמאפשר לנו להתחבר
- אנחנו נותנים לו את כתובת השרת

### 2. התחברות

```javascript
await client.connect();
```

- `await` = חכה עד שהחיבור יושלם
- זה לוקח זמן כי צריך "לדבר" עם השרת

### 3. קבלת מסד נתונים

```javascript
const db = client.db(process.env.DATABASE_NAME);
```

- `db` = אובייקט שמייצג את מסד הנתונים
- דרכו נוכל לבצע פעולות

### 4. סגירת חיבור

```javascript
await client.close();
```

- חשוב לסגור את החיבור כשסיימנו!
- כמו לסגור ברז - לא רוצים לבזבז משאבים

---

## 🎯 תרגיל מעשי

### שנה את הקוד כך שיציג:

1. את הזמן שלקח לחיבור
2. בדיקה אם יש connection errors
3. הודעת welcome מותאמת אישית

<details>
<summary>💡 רמז</summary>

```javascript
const startTime = Date.now();
// ... קוד החיבור ...
const endTime = Date.now();
console.log(`⏱️ זמן חיבור: ${endTime - startTime}ms`);
```
</details>

<details>
<summary>✅ פתרון מלא</summary>

```javascript
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  const startTime = Date.now();

  try {
    console.log('🔄 מתחבר ל-MongoDB...');
    await client.connect();
    
    const endTime = Date.now();
    console.log('✅ התחברנו בהצלחה!');
    console.log(`⏱️ זמן חיבור: ${endTime - startTime}ms`);

    const db = client.db(process.env.DATABASE_NAME);
    console.log(`📊 ברוכים הבאים למסד הנתונים: ${process.env.DATABASE_NAME}!`);

    // בדיקת server status
    const admin = db.admin();
    const serverStatus = await admin.serverStatus();
    console.log(`🖥️ גרסת MongoDB: ${serverStatus.version}`);

    const collections = await db.listCollections().toArray();
    console.log(`📂 יש לך ${collections.length} collections במסד הנתונים`);

    await client.close();
    console.log('🔒 החיבור נסגר בהצלחה');

  } catch (error) {
    console.error('❌ שגיאה בחיבור:', error.message);
    console.log('💡 טיפ: ודא ש-MongoDB רץ על המחשב שלך');
  }
}

connectToDatabase();
```
</details>

---

## 🐛 פתרון בעיות נפוצות

### שגיאה: "connect ECONNREFUSED"

**בעיה:** MongoDB לא רץ על המחשב

**פתרון:**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### שגיאה: "MongoServerSelectionError"

**בעיה:** כתובת לא נכונה ב-.env

**פתרון:** בדוק את ה-MONGODB_URI

---

## ✅ סיכום

היום למדנו:

- ✅ איך להתקין את MongoDB Driver
- ✅ איך להתחבר למסד נתונים
- ✅ איך לבדוק שהחיבור עובד
- ✅ איך לסגור חיבור נכון

---

## 📚 הבא בתור

בשיעור הבא נלמד איך:
- ליצור collection חדש
- להוסיף מסמך ראשון
- לקרוא מסמכים

**[➡️ עבור לשיעור 2: Create & Read](../lesson-02/README.md)**

---

## 🤔 שאלות לחשיבה

1. למה חשוב לסגור את החיבור למסד הנתונים?
2. מה קורה אם שוכחים `await` לפני `client.connect()`?
3. איזה יתרון יש ל-`dotenv` על hardcoding של connection string?

---

**נוצר עם ❤️ למתחילים**

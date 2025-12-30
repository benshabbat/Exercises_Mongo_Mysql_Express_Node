# 📚 מדריך MongoDB CRUD - ללא Mongoose

טמפלייט פשוט למתחילים לבניית API עם MongoDB Native Driver, Express ו-Node.js

---

## 📋 תוכן עניינים

1. [מה זה הפרויקט?](#מה-זה-הפרויקט)
2. [התקנה](#התקנה)
3. [הגדרות](#הגדרות)
4. [הרצת הפרויקט](#הרצת-הפרויקט)
5. [מבנה הפרויקט](#מבנה-הפרויקט)
6. [הסבר על MongoDB Native Driver](#הסבר-על-mongodb-native-driver)
7. [פעולות CRUD](#פעולות-crud)
8. [בדיקת ה-API](#בדיקת-הapi)

---

## 🎯 מה זה הפרויקט?

זהו טמפלייט פשוט וברור למתחילים שמראה איך לבנות REST API עם:

- **MongoDB Native Driver** (ללא Mongoose) - עבודה ישירה עם MongoDB
- **Express.js** - Framework לבניית שרתים
- **Node.js** - סביבת ריצה ל-JavaScript

הפרויקט כולל את כל פעולות **CRUD**:
- ✅ **C**reate - יצירת משתמש חדש
- ✅ **R**ead - קריאת משתמשים (כולם או ספציפי)
- ✅ **U**pdate - עדכון משתמש קיים
- ✅ **D**elete - מחיקת משתמש

---

## 💻 התקנה

### דרישות מוקדמות

1. **Node.js** - גרסה 16 ומעלה
   - הורד מ: https://nodejs.org/

2. **MongoDB** - אחת מהאפשרויות:
   - **MongoDB מקומי**: הורד מ https://www.mongodb.com/try/download/community
   - **MongoDB Atlas** (ענן חינמי): https://www.mongodb.com/cloud/atlas

### שלבי התקנה

**שלב 1:** העתק את הפרויקט או צור תיקייה חדשה
```bash
git clone <repository-url>
cd mongodb-crud-template
```

**שלב 2:** התקן את כל החבילות
```bash
npm install
```

זה יתקין:
- `express` - Framework לשרת
- `mongodb` - Driver למסד נתונים
- `dotenv` - לניהול משתני סביבה
- `cors` - לאפשר בקשות מדומיינים שונים
- `nodemon` - להפעלה אוטומטית בזמן פיתוח

---

## ⚙️ הגדרות

**שלב 1:** צור קובץ `.env` בתיקייה הראשית
```bash
cp .env.example .env
```

**שלב 2:** ערוך את קובץ `.env`:

### אם אתה משתמש ב-MongoDB מקומי:
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=myDatabase
PORT=3000
```

### אם אתה משתמש ב-MongoDB Atlas (ענן):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=myDatabase
PORT=3000
```

> **💡 טיפ:** שנה את `username`, `password` ו-`cluster` לפרטים שלך מ-Atlas

---

## 🚀 הרצת הפרויקט

### הרצה רגילה:
```bash
npm start
```

### הרצה עם Nodemon (מומלץ לפיתוח):
```bash
npm run dev
```

כשהשרת רץ, תראה:
```
🔄 מתחבר למסד נתונים...
✅ התחברות למסד נתונים הצליחה!

🚀 השרת רץ על פורט 3000
📍 כתובת: http://localhost:3000
📊 API: http://localhost:3000/api/users
```

---

## 📁 מבנה הפרויקט

```
├── server.js                    # נקודת הכניסה - הקובץ הראשי
├── package.json                 # תלויות ו-scripts
├── .env                         # משתני סביבה (לא נשמר ב-Git)
├── .env.example                 # דוגמה למשתני סביבה
└── src/
    ├── config/
    │   └── database.js         # חיבור ל-MongoDB
    ├── controllers/
    │   └── userController.js   # לוגיקה של פעולות CRUD
    └── routes/
        └── userRoutes.js       # הגדרת נתיבים (Routes)
```

### הסבר על כל קובץ:

#### 1️⃣ `server.js`
הקובץ הראשי של האפליקציה:
- יוצר את שרת Express
- מתחבר למסד נתונים
- מגדיר middleware
- מחבר את ה-routes
- מפעיל את השרת

#### 2️⃣ `src/config/database.js`
מנהל את החיבור ל-MongoDB:
- `connectToDatabase()` - מתחבר למסד נתונים
- `getDatabase()` - מחזיר את החיבור הקיים
- `closeConnection()` - סוגר את החיבור

#### 3️⃣ `src/controllers/userController.js`
מכיל את כל הפונקציות לפעולות CRUD:
- `createUser` - יצירת משתמש
- `getAllUsers` - קבלת כל המשתמשים
- `getUserById` - קבלת משתמש ספציפי
- `updateUser` - עדכון משתמש
- `deleteUser` - מחיקת משתמש

#### 4️⃣ `src/routes/userRoutes.js`
מגדיר את הנתיבים (endpoints):
- `POST /api/users` → createUser
- `GET /api/users` → getAllUsers
- `GET /api/users/:id` → getUserById
- `PUT /api/users/:id` → updateUser
- `DELETE /api/users/:id` → deleteUser

---

## 🔍 הסבר על MongoDB Native Driver

### למה ללא Mongoose?

**Mongoose** היא ספרייה שמוסיפה שכבת אבסטרקציה מעל MongoDB. היא מציעה:
- Schemas
- Validation
- Middleware
- יותר פונקציונליות

**MongoDB Native Driver** הוא הדרייבר המקורי של MongoDB:
- ✅ **פשוט יותר למתחילים** - פחות קוד boilerplate
- ✅ **קל יותר להבין** - עובד ישירות עם MongoDB
- ✅ **מהיר יותר** - אין שכבת אבסטרקציה נוספת
- ✅ **גמיש יותר** - אין מגבלות של Schema

### פעולות בסיסיות ב-MongoDB Native Driver

```javascript
// 1. קבלת Collection
const collection = db.collection('users');

// 2. הוספת מסמך
await collection.insertOne({ name: 'יוסי', age: 25 });

// 3. חיפוש כל המסמכים
await collection.find().toArray();

// 4. חיפוש מסמך ספציפי
await collection.findOne({ _id: new ObjectId(id) });

// 5. עדכון מסמך
await collection.updateOne(
  { _id: new ObjectId(id) },
  { $set: { name: 'יוסי החדש' } }
);

// 6. מחיקת מסמך
await collection.deleteOne({ _id: new ObjectId(id) });
```

---

## 🛠️ פעולות CRUD

### 1. CREATE - יצירת משתמש חדש

**Endpoint:** `POST http://localhost:3000/api/users`

**Request Body:**
```json
{
  "name": "יוסי כהן",
  "email": "yossi@example.com",
  "age": 25
}
```

**Response:**
```json
{
  "success": true,
  "message": "משתמש נוצר בהצלחה",
  "data": {
    "_id": "657abc123def456789012345",
    "name": "יוסי כהן",
    "email": "yossi@example.com",
    "age": 25
  }
}
```

**איך זה עובד?**
1. הפונקציה `createUser` מקבלת את הנתונים מ-`req.body`
2. בודקת validation בסיסי (שם ואימייל חובה)
3. מתחברת ל-collection `users`
4. משתמשת ב-`insertOne()` להוספת המסמך
5. מחזירה את ה-ID החדש

---

### 2. READ ALL - קריאת כל המשתמשים

**Endpoint:** `GET http://localhost:3000/api/users`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "657abc123def456789012345",
      "name": "יוסי כהן",
      "email": "yossi@example.com",
      "age": 25,
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "657def456abc789012345678",
      "name": "שרה לוי",
      "email": "sara@example.com",
      "age": 30,
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

**איך זה עובד?**
1. הפונקציה `getAllUsers` מתחברת ל-collection
2. משתמשת ב-`find()` ללא פרמטרים (= כל המסמכים)
3. ממירה את התוצאה למערך עם `toArray()`
4. מחזירה את כל המשתמשים

---

### 3. READ ONE - קריאת משתמש ספציפי

**Endpoint:** `GET http://localhost:3000/api/users/657abc123def456789012345`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "657abc123def456789012345",
    "name": "יוסי כהן",
    "email": "yossi@example.com",
    "age": 25,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**איך זה עובד?**
1. הפונקציה `getUserById` מקבלת את ה-ID מ-URL (params)
2. בודקת שה-ID תקין עם `ObjectId.isValid()`
3. משתמשת ב-`findOne()` למציאת המסמך
4. אם לא נמצא - מחזירה 404
5. אם נמצא - מחזירה את המשתמש

---

### 4. UPDATE - עדכון משתמש

**Endpoint:** `PUT http://localhost:3000/api/users/657abc123def456789012345`

**Request Body:**
```json
{
  "name": "יוסי כהן המעודכן",
  "age": 26
}
```

**Response:**
```json
{
  "success": true,
  "message": "משתמש עודכן בהצלחה",
  "data": {
    "_id": "657abc123def456789012345",
    "name": "יוסי כהן המעודכן",
    "age": 26,
    "updatedAt": "2024-01-16T10:30:00.000Z"
  }
}
```

**איך זה עובד?**
1. הפונקציה `updateUser` מקבלת ID ונתונים לעדכון
2. בונה אובייקט עם השדות שצריך לעדכן
3. משתמשת ב-`updateOne()` עם `$set`
4. `$set` מעדכן רק את השדות שניתנו
5. מחזירה הצלחה או שגיאה

---

### 5. DELETE - מחיקת משתמש

**Endpoint:** `DELETE http://localhost:3000/api/users/657abc123def456789012345`

**Response:**
```json
{
  "success": true,
  "message": "משתמש נמחק בהצלחה"
}
```

**איך זה עובד?**
1. הפונקציה `deleteUser` מקבלת את ה-ID
2. בודקת שה-ID תקין
3. משתמשת ב-`deleteOne()` למחיקת המסמך
4. בודקת אם המחיקה הצליחה
5. מחזירה הודעת הצלחה

---

## 🧪 בדיקת ה-API

### דרכים לבדיקה:

#### 1️⃣ Postman / Insomnia
הכלים הפופולריים לבדיקת API

#### 2️⃣ cURL (טרמינל)

```bash
# CREATE - יצירה
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"יוסי","email":"yossi@test.com","age":25}'

# READ ALL - קריאת כולם
curl http://localhost:3000/api/users

# READ ONE - קריאת אחד
curl http://localhost:3000/api/users/657abc123def456789012345

# UPDATE - עדכון
curl -X PUT http://localhost:3000/api/users/657abc123def456789012345 \
  -H "Content-Type: application/json" \
  -d '{"name":"יוסי מעודכן","age":26}'

# DELETE - מחיקה
curl -X DELETE http://localhost:3000/api/users/657abc123def456789012345
```

#### 3️⃣ VS Code Extension
התקן את ההרחבה "REST Client" ו-Thunder Client

---

## 📚 מושגים חשובים

### ObjectId
- כל מסמך ב-MongoDB מקבל `_id` ייחודי
- הסוג של `_id` הוא `ObjectId`
- כדי לחפש לפי ID צריך: `new ObjectId(id)`

### Collection
- אוסף של מסמכים (כמו טבלה ב-SQL)
- כל אפליקציה יכולה לעבוד עם כמה collections
- בדוגמה שלנו: `users`

### Document
- מסמך בודד ב-collection
- נראה כמו אובייקט JavaScript
- דוגמה: `{ name: "יוסי", age: 25 }`

### Operators
- `$set` - מעדכן שדות
- `$inc` - מגדיל מספר
- `$push` - מוסיף לרשימה
- ועוד הרבה...

---

## 🎓 טיפים למתחילים

### 1. התחל עם MongoDB מקומי
קל יותר ללמוד ולנפות שגיאות

### 2. השתמש ב-MongoDB Compass
כלי גרפי חינמי לצפייה במסד הנתונים
הורד מ: https://www.mongodb.com/products/compass

### 3. קרא את התיעוד
התיעוד הרשמי מצוין:
- MongoDB Driver: https://www.mongodb.com/docs/drivers/node/
- Express: https://expressjs.com/

### 4. נסה לשנות ולהתנסות
- הוסף שדות נוספים
- צור collections חדשים
- נסה queries מורכבים יותר

---

## 🐛 פתרון בעיות נפוצות

### השרת לא מצליח להתחבר ל-MongoDB
```
❌ שגיאה בהתחברות למסד נתונים
```

**פתרון:**
1. בדוק ש-MongoDB רץ: `mongod --version`
2. בדוק את הכתובת בקובץ `.env`
3. אם אתה משתמש ב-Atlas - בדוק username/password

### השרת לא עולה
```
Error: Cannot find module 'express'
```

**פתרון:**
```bash
npm install
```

### שגיאה: "ID לא תקין"
זה קורה כש-ID לא בפורמט הנכון של MongoDB.
ID חייב להיות string של 24 תווים הקסדצימליים.

---

## 📖 משאבים נוספים

- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node.js Documentation](https://nodejs.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🤝 תרומה לפרויקט

אם מצאת בעיה או רוצה להוסיף משהו:
1. פתח issue
2. צור pull request
3. שתף רעיונות

---

## 📝 רישיון

MIT License - השתמש בחופשיות!

---

**נוצר עם ❤️ למתחילים ב-Node.js ו-MongoDB**

**בהצלחה! 🚀**

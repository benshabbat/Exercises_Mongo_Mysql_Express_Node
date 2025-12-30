# תרגילים - MongoDB + Express (ללא Mongoose)

## הקדמה
תרגילים אלו מיועדים למתחילים בעבודה עם MongoDB ו-Express.
המטרה: ללמוד לבנות API מודולרי עם חיבור ישיר ל-MongoDB (ללא Mongoose).

**דרישות מקדימות:**
- Node.js מותקן
- MongoDB מותקן (מקומי או Atlas)
- ידע בסיסי ב-JavaScript/ES6

---

## תרגיל 1: הגדרת הפרויקט והתחברות ל-MongoDB

### מטרה
ליצור את המבנה הבסיסי של הפרויקט ולהתחבר למסד הנתונים.

### שלבים

#### שלב 1.1: אתחול הפרויקט
צור קובץ `package.json` עם התצורה הבאה:

<details>
<summary>💡 רמז</summary>

יש להוסיף `"type": "module"` כדי לעבוד עם ES6 modules
</details>

**מה צריך להתקין?**
- express
- mongodb (הדרייבר הרשמי)
- dotenv (לניהול משתני סביבה)

---

#### שלב 1.2: יצירת קובץ חיבור למסד נתונים
צור תיקייה `src/config/` וקובץ `db.js` שיכיל את החיבור ל-MongoDB.

<details>
<summary>💡 רמז</summary>

השתמש ב-`MongoClient` מהמודול `mongodb`
הפונקציה צריכה:
- להתחבר למסד הנתונים
- להחזיר את אובייקט ה-database
- לטפל בשגיאות
</details>

**דרישות:**
- פונקציה אסינכרונית `connectToDatabase()`
- שימוש ב-connection string מקובץ `.env`
- טיפול בשגיאות עם try-catch
- הדפסת הודעה בעת חיבור מוצלח

---

#### שלב 1.3: יצירת שרת Express בסיסי
צור קובץ `src/server.js` שמריץ שרת Express ומתחבר למסד נתונים.

<details>
<summary>💡 רמז</summary>

השתמש ב:
- `express()`
- `app.listen()`
- `await connectToDatabase()`
</details>

**דרישות:**
- ייבוא express
- יצירת אפליקציה
- הוספת middleware לטיפול ב-JSON
- חיבור למסד נתונים לפני הפעלת השרת
- האזנה לפורט (למשל 3000)

---

### ✅ אימות התרגיל
- השרת רץ ללא שגיאות
- בקונסול מופיעה הודעת חיבור מוצלח
- ניתן לגשת ל-`http://localhost:3000`

---

## תרגיל 2: יצירת Collection וניהול משתמשים (Users)

### מטרה
ללמוד לבצע פעולות CRUD בסיסיות על collection של משתמשים.

### שלבים

#### שלב 2.1: תכנון המבנה
צור תיקייה `src/models/` וקובץ `userModel.js`.

**מבנה המסמך (Document) של משתמש:**
```javascript
{
  name: String,      // שם מלא
  email: String,     // אימייל (ייחודי)
  age: Number,       // גיל
  createdAt: Date    // תאריך יצירה
}
```

---

#### שלב 2.2: יצירת פונקציות Model
ב-`userModel.js` צור את הפונקציות הבאות:

**2.2.1: קבלת כל המשתמשים**

<details>
<summary>💡 רמז</summary>

השתמש ב-`collection.find().toArray()`
</details>

```javascript
export const getAllUsers = async (db) => {
  // הוסף קוד כאן
}
```

---

**2.2.2: קבלת משתמש לפי ID**

<details>
<summary>💡 רמז</summary>

- השתמש ב-`collection.findOne()`
- המר את ה-ID ל-`ObjectId` (יבוא מ-`mongodb`)
</details>

```javascript
export const getUserById = async (db, userId) => {
  // הוסף קוד כאן
}
```

---

**2.2.3: יצירת משתמש חדש**

<details>
<summary>💡 רמז</summary>

- השתמש ב-`collection.insertOne()`
- הוסף `createdAt: new Date()`
- החזר את המשתמש שנוצר
</details>

```javascript
export const createUser = async (db, userData) => {
  // הוסף קוד כאן
}
```

---

**2.2.4: עדכון משתמש**

<details>
<summary>💡 רמז</summary>

השתמש ב-`collection.updateOne()` עם `$set`
</details>

```javascript
export const updateUser = async (db, userId, updateData) => {
  // הוסף קוד כאן
}
```

---

**2.2.5: מחיקת משתמש**

<details>
<summary>💡 רמז</summary>

השתמש ב-`collection.deleteOne()`
</details>

```javascript
export const deleteUser = async (db, userId) => {
  // הוסף קוד כאן
}
```

---

### ✅ אימות התרגיל
- כל הפונקציות מיוצאות כראוי
- הפונקציות async ומחזירות Promises
- יש טיפול בשגיאות

---

## תרגיל 3: יצירת Controllers

### מטרה
להפריד את הלוגיקה העסקית מה-routes.

### שלבים

#### שלב 3.1: יצירת User Controller
צור קובץ `src/controllers/userController.js`.

כל פונקציית controller צריכה:
- לקבל `(req, res)`
- לקרוא ל-model המתאים
- להחזיר response מתאים
- לטפל בשגיאות עם status codes

---

#### שלב 3.2: מימוש הפונקציות

**3.2.1: getUsers** - החזרת כל המשתמשים

<details>
<summary>💡 רמז</summary>

```javascript
try {
  const users = await getAllUsers(req.db);
  res.json(users);
} catch (error) {
  res.status(500).json({ error: error.message });
}
```
</details>

---

**3.2.2: getUser** - החזרת משתמש ספציפי

<details>
<summary>💡 רמז</summary>

- קבל את ה-ID מ-`req.params.id`
- אם המשתמש לא נמצא, החזר 404
</details>

---

**3.2.3: addUser** - יצירת משתמש חדש

<details>
<summary>💡 רמז</summary>

- קבל את הנתונים מ-`req.body`
- בדוק שכל השדות הנדרשים קיימים
- החזר status 201 בהצלחה
</details>

---

**3.2.4: modifyUser** - עדכון משתמש

<details>
<summary>💡 רמז</summary>

- קבל ID מ-params ונתונים מ-body
- בדוק אם העדכון בוצע (modifiedCount)
</details>

---

**3.2.5: removeUser** - מחיקת משתמש

<details>
<summary>💡 רמז</summary>

בדוק את deletedCount להחזרת תגובה מתאימה
</details>

---

### ✅ אימות התרגיל
- כל controller מטפל בשגיאות
- status codes נכונים (200, 201, 404, 500)
- ה-controllers מקבלים את ה-db דרך req

---

## תרגיל 4: יצירת Routes

### מטרה
ליצור routing מודולרי ומסודר.

### שלבים

#### שלב 4.1: יצירת User Routes
צור קובץ `src/routes/userRoutes.js`.

**דרישות:**
- ייבוא Express Router
- הגדרת כל ה-routes
- ייצוא ה-router

<details>
<summary>💡 רמז</summary>

```javascript
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getUsers);
// המשך את שאר ה-routes...

export default router;
```
</details>

**Routes לממש:**
- `GET /` - כל המשתמשים
- `GET /:id` - משתמש ספציפי
- `POST /` - יצירת משתמש
- `PUT /:id` - עדכון משתמש
- `DELETE /:id` - מחיקת משתמש

---

#### שלב 4.2: חיבור ל-Server
עדכן את `server.js` להשתמש ב-routes.

<details>
<summary>💡 רמז</summary>

```javascript
app.use('/api/users', userRoutes);
```
</details>

---

### ✅ אימות התרגיל
בדוק עם Postman/Thunder Client:
- GET http://localhost:3000/api/users
- POST http://localhost:3000/api/users
- GET http://localhost:3000/api/users/:id
- PUT http://localhost:3000/api/users/:id
- DELETE http://localhost:3000/api/users/:id

---

## תרגיל 5: Middleware - העברת Database Connection

### מטרה
ללמוד ליצור middleware שמעביר את חיבור ה-DB לכל request.

### שלבים

#### שלב 5.1: יצירת DB Middleware
צור קובץ `src/middleware/dbMiddleware.js`.

**המטרה:** להעביר את אובייקט ה-database לכל route דרך `req.db`.

<details>
<summary>💡 רמז</summary>

```javascript
export const attachDB = (db) => {
  return (req, res, next) => {
    req.db = db;
    next();
  };
};
```
</details>

---

#### שלב 5.2: שימוש ב-Middleware
עדכן את `server.js` להשתמש ב-middleware.

<details>
<summary>💡 רמז</summary>

```javascript
const db = await connectToDatabase();
app.use(attachDB(db));
```
</details>

---

### ✅ אימות התרגיל
- כל ה-controllers מקבלים גישה ל-`req.db`
- השרת עובד ללא שגיאות

---

## תרגיל 6: Validation Middleware

### מטרה
ליצור middleware לאימות נתונים לפני שהם מגיעים ל-controller.

### שלבים

#### שלב 6.1: יצירת Validation Middleware
צור קובץ `src/middleware/validateUser.js`.

**פונקציה לאימות יצירת משתמש:**

<details>
<summary>💡 רמז</summary>

בדוק:
- name קיים והוא string לא ריק
- email קיים ובפורמט תקין
- age קיים, מספר, וגדול מ-0
</details>

```javascript
export const validateCreateUser = (req, res, next) => {
  // הוסף קוד כאן
  // אם יש שגיאות: res.status(400).json({ error: '...' })
  // אם הכל תקין: next()
}
```

---

#### שלב 6.2: הוספה ל-Routes
עדכן את `userRoutes.js` להשתמש ב-validation.

<details>
<summary>💡 רמז</summary>

```javascript
router.post('/', validateCreateUser, userController.addUser);
```
</details>

---

### ✅ אימות התרגיל
נסה ליצור משתמש עם נתונים לא תקינים ובדוק שמתקבלת שגיאה 400.

---

## תרגיל 7: חיפוש ומיון (Query Parameters)

### מטרה
להוסיף יכולות חיפוש ומיון למשתמשים.

### שלבים

#### שלב 7.1: הרחבת Model
ב-`userModel.js`, הוסף פונקציה `searchUsers`.

**תמיכה ב:**
- חיפוש לפי שם (חלקי)
- סינון לפי גיל מינימלי
- מיון לפי שדה (name, age, createdAt)
- סדר מיון (asc/desc)

<details>
<summary>💡 רמז</summary>

```javascript
export const searchUsers = async (db, options = {}) => {
  const { name, minAge, sortBy = 'createdAt', order = 'desc' } = options;
  
  const query = {};
  if (name) {
    query.name = { $regex: name, $options: 'i' }; // חיפוש לא case-sensitive
  }
  if (minAge) {
    query.age = { $gte: parseInt(minAge) };
  }
  
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
  
  return await db.collection('users')
    .find(query)
    .sort(sort)
    .toArray();
};
```
</details>

---

#### שלב 7.2: עדכון Controller
ב-`userController.js`, עדכן את `getUsers` לתמוך ב-query parameters.

<details>
<summary>💡 רמז</summary>

```javascript
export const getUsers = async (req, res) => {
  try {
    const { name, minAge, sortBy, order } = req.query;
    
    if (name || minAge || sortBy) {
      const users = await searchUsers(req.db, { name, minAge, sortBy, order });
      return res.json(users);
    }
    
    const users = await getAllUsers(req.db);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```
</details>

---

### ✅ אימות התרגיל
נסה queries כמו:
- `GET /api/users?name=john`
- `GET /api/users?minAge=25`
- `GET /api/users?sortBy=name&order=asc`

---

## תרגיל 8: Collection נוסף - Posts

### מטרה
להרחיב את האפליקציה עם collection נוסף ולקשר בין collections.

### שלבים

#### שלב 8.1: תכנון מבנה Post
**מבנה מסמך:**
```javascript
{
  title: String,
  content: String,
  userId: ObjectId,      // קישור למשתמש
  tags: Array<String>,
  createdAt: Date,
  updatedAt: Date
}
```

---

#### שלב 8.2: יצירת Post Model
צור `src/models/postModel.js` עם הפונקציות:
- `getAllPosts(db)`
- `getPostById(db, postId)`
- `getPostsByUser(db, userId)` - כל הפוסטים של משתמש
- `createPost(db, postData)`
- `updatePost(db, postId, updateData)`
- `deletePost(db, postId)`

<details>
<summary>💡 רמז - getPostsByUser</summary>

```javascript
export const getPostsByUser = async (db, userId) => {
  return await db.collection('posts')
    .find({ userId: new ObjectId(userId) })
    .toArray();
};
```
</details>

---

#### שלב 8.3: יצירת Post Controller
צור `src/controllers/postController.js` עם כל הפונקציות המתאימות.

---

#### שלב 8.4: יצירת Post Routes
צור `src/routes/postRoutes.js` והגדר:
- `GET /` - כל הפוסטים
- `GET /:id` - פוסט ספציפי
- `GET /user/:userId` - פוסטים של משתמש
- `POST /` - יצירת פוסט
- `PUT /:id` - עדכון פוסט
- `DELETE /:id` - מחיקת פוסט

---

#### שלב 8.5: חיבור ל-Server
הוסף ל-`server.js`:
```javascript
app.use('/api/posts', postRoutes);
```

---

### ✅ אימות התרגיל
- צור משתמש, קבל את ה-ID שלו
- צור פוסט עם ה-userId
- שלוף את כל הפוסטים של המשתמש

---

## תרגיל 9: Aggregation - נתונים מתקדמים

### מטרה
ללמוד להשתמש ב-Aggregation Pipeline של MongoDB.

### שלבים

#### שלב 9.1: ספירת פוסטים לכל משתמש
ב-`postModel.js`, הוסף פונקציה `getPostCountByUser`.

<details>
<summary>💡 רמז</summary>

```javascript
export const getPostCountByUser = async (db) => {
  return await db.collection('posts').aggregate([
    {
      $group: {
        _id: '$userId',
        postCount: { $count: {} }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    {
      $unwind: '$userDetails'
    },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        userName: '$userDetails.name',
        postCount: 1
      }
    }
  ]).toArray();
};
```
</details>

---

#### שלב 9.2: פוסטים פופולריים לפי תגיות
צור פונקציה `getPopularTags` שמחזירה את התגיות הנפוצות ביותר.

<details>
<summary>💡 רמז</summary>

```javascript
export const getPopularTags = async (db, limit = 10) => {
  return await db.collection('posts').aggregate([
    { $unwind: '$tags' },
    { 
      $group: {
        _id: '$tags',
        count: { $count: {} }
      }
    },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]).toArray();
};
```
</details>

---

#### שלב 9.3: הוספת Route
הוסף routes:
- `GET /api/posts/stats/by-user`
- `GET /api/posts/stats/popular-tags`

---

### ✅ אימות התרגיל
- צור מספר משתמשים
- צור פוסטים שונים עם תגיות
- בדוק את ה-aggregation routes

---

## תרגיל 10: Error Handling מתקדם

### מטרה
לשפר את טיפול השגיאות באפליקציה.

### שלבים

#### שלב 10.1: יצירת Custom Error Classes
צור `src/utils/errors.js`:

```javascript
export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation failed') {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

export class DatabaseError extends Error {
  constructor(message = 'Database error') {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}
```

---

#### שלב 10.2: Global Error Handler
צור `src/middleware/errorHandler.js`:

<details>
<summary>💡 רמז</summary>

```javascript
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`[${err.name}]: ${message}`);
  
  res.status(statusCode).json({
    error: {
      message,
      type: err.name,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};
```
</details>

---

#### שלב 10.3: שימוש ב-Custom Errors
עדכן את ה-controllers להשתמש ב-custom errors:

```javascript
import { NotFoundError, ValidationError } from '../utils/errors.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.db, req.params.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error); // העברה ל-error handler
  }
};
```

---

#### שלב 10.4: הוספה ל-Server
הוסף את ה-error handler בסוף כל ה-middlewares ב-`server.js`:

```javascript
app.use(errorHandler);
```

---

### ✅ אימות התרגיל
- נסה לגשת למשתמש שלא קיים
- בדוק שהשגיאה מוחזרת במבנה אחיד
- וודא ש-stack trace מופיע רק ב-development

---

## תרגיל בונוס: Indexes ו-Performance

### מטרה
ללמוד ליצור indexes לשיפור ביצועים.

### שלבים

#### שלב 1: יצירת Indexes Script
צור `src/utils/createIndexes.js`:

```javascript
import { connectToDatabase } from '../config/db.js';

export const createIndexes = async () => {
  const db = await connectToDatabase();
  
  // Index ייחודי על email של users
  await db.collection('users').createIndex(
    { email: 1 }, 
    { unique: true }
  );
  
  // Index על userId בפוסטים (לחיפוש מהיר)
  await db.collection('posts').createIndex({ userId: 1 });
  
  // Index על tags
  await db.collection('posts').createIndex({ tags: 1 });
  
  // Compound index על createdAt (למיון)
  await db.collection('users').createIndex({ createdAt: -1 });
  await db.collection('posts').createIndex({ createdAt: -1 });
  
  console.log('✅ Indexes created successfully');
};

// רץ אם הקובץ מופעל ישירות
if (import.meta.url === `file://${process.argv[1]}`) {
  createIndexes()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
```

---

#### שלב 2: הרצת ה-Script
```bash
node src/utils/createIndexes.js
```

---

#### שלב 3: בדיקת Indexes
צור פונקציה ב-`userModel.js`:

```javascript
export const listIndexes = async (db, collectionName) => {
  return await db.collection(collectionName).indexes();
};
```

---

### ✅ אימות התרגיל
- הרץ את ה-script
- בדוק שה-indexes נוצרו
- נסה ליצור משתמש עם email כפול (צריך להיכשל)

---

## סיכום ונקודות חשובות

### מה למדנו? ✨
1. **מבנה מודולרי** - הפרדת אחריות (models, controllers, routes)
2. **MongoDB Native Driver** - עבודה ישירה ללא Mongoose
3. **ES6 Modules** - שימוש ב-import/export
4. **Middleware** - הבנה וכתיבה של middlewares
5. **Error Handling** - טיפול מקצועי בשגיאות
6. **Aggregation** - שאילתות מורכבות
7. **Indexes** - אופטימיזציה של ביצועים

### Best Practices שיושמו 🎯
- שימוש ב-async/await
- טיפול בשגיאות בכל שכבה
- Validation של נתונים
- קוד מודולרי וניתן לשימוש חוזר
- משתני סביבה למידע רגיש
- Status codes נכונים

### המשך לימוד 📚
- Authentication & Authorization (JWT)
- Rate Limiting
- Caching (Redis)
- Testing (Jest)
- Documentation (Swagger)
- Deployment (Docker, Cloud)

---

<div style="page-break-after: always;"></div>

# 🔐 פתרונות מלאים

<details>
<summary>🔓 לחץ כאן לצפייה בכל הפתרונות (מומלץ לפתוח רק אחרי שניסית לבד!)</summary>

## פתרון תרגיל 1: הגדרת הפרויקט

### package.json
```json
{
  "name": "mongodb-express-exercises",
  "version": "1.0.0",
  "type": "module",
  "description": "MongoDB + Express exercises",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  },
  "keywords": ["mongodb", "express", "rest-api"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongodb": "^6.3.0",
    "dotenv": "^16.3.1"
  }
}
```

### .env
```env
MONGODB_URI=mongodb://localhost:27017/exercises_db
PORT=3000
NODE_ENV=development
```

### src/config/db.js
```javascript
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/exercises_db';
let client = null;
let db = null;

export const connectToDatabase = async () => {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    console.log('✅ Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

export const closeDatabaseConnection = async () => {
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
};
```

### src/server.js
```javascript
import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase, closeDatabaseConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MongoDB + Express API' });
});

// Start server
const startServer = async () => {
  try {
    await connectToDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

startServer();
```

---

## פתרון תרגיל 2: ניהול משתמשים

### src/models/userModel.js
```javascript
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'users';

export const getAllUsers = async (db) => {
  try {
    return await db.collection(COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const getUserById = async (db, userId) => {
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format');
    }
    
    return await db.collection(COLLECTION_NAME).findOne({ 
      _id: new ObjectId(userId) 
    });
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export const createUser = async (db, userData) => {
  try {
    const newUser = {
      ...userData,
      createdAt: new Date()
    };
    
    const result = await db.collection(COLLECTION_NAME).insertOne(newUser);
    return { _id: result.insertedId, ...newUser };
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const updateUser = async (db, userId, updateData) => {
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format');
    }
    
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(userId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    return result;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export const deleteUser = async (db, userId) => {
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format');
    }
    
    const result = await db.collection(COLLECTION_NAME).deleteOne({ 
      _id: new ObjectId(userId) 
    });
    
    return result;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

export const searchUsers = async (db, options = {}) => {
  try {
    const { name, minAge, sortBy = 'createdAt', order = 'desc' } = options;
    
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (minAge) {
      query.age = { $gte: parseInt(minAge) };
    }
    
    const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
    
    return await db.collection(COLLECTION_NAME)
      .find(query)
      .sort(sort)
      .toArray();
  } catch (error) {
    throw new Error(`Error searching users: ${error.message}`);
  }
};
```

---

## פתרון תרגיל 3: Controllers

### src/controllers/userController.js
```javascript
import * as userModel from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const { name, minAge, sortBy, order } = req.query;
    
    if (name || minAge || sortBy) {
      const users = await userModel.searchUsers(req.db, { name, minAge, sortBy, order });
      return res.json(users);
    }
    
    const users = await userModel.getAllUsers(req.db);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.db, req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, age' 
      });
    }
    
    const newUser = await userModel.createUser(req.db, { name, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyUser = async (req, res) => {
  try {
    const result = await userModel.updateUser(req.db, req.params.id, req.body);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (result.modifiedCount === 0) {
      return res.json({ message: 'No changes made' });
    }
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const result = await userModel.deleteUser(req.db, req.params.id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## פתרון תרגיל 4: Routes

### src/routes/userRoutes.js
```javascript
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.addUser);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.removeUser);

export default router;
```

### עדכון src/server.js
```javascript
import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase, closeDatabaseConnection } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { attachDB } from './middleware/dbMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MongoDB + Express API' });
});

// Start server
const startServer = async () => {
  try {
    const db = await connectToDatabase();
    
    // Attach DB to requests
    app.use(attachDB(db));
    
    // Routes
    app.use('/api/users', userRoutes);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

startServer();
```

---

## פתרון תרגיל 5: Middleware

### src/middleware/dbMiddleware.js
```javascript
export const attachDB = (db) => {
  return (req, res, next) => {
    req.db = db;
    next();
  };
};
```

---

## פתרון תרגיל 6: Validation

### src/middleware/validateUser.js
```javascript
export const validateCreateUser = (req, res, next) => {
  const { name, email, age } = req.body;
  const errors = [];
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  
  if (!email || typeof email !== 'string') {
    errors.push('Email is required and must be a string');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Email must be in valid format');
    }
  }
  
  if (!age || typeof age !== 'number' || age <= 0) {
    errors.push('Age is required and must be a positive number');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { name, email, age } = req.body;
  const errors = [];
  
  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    errors.push('Name must be a non-empty string');
  }
  
  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Email must be in valid format');
    }
  }
  
  if (age !== undefined && (typeof age !== 'number' || age <= 0)) {
    errors.push('Age must be a positive number');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  next();
};
```

### עדכון src/routes/userRoutes.js
```javascript
import express from 'express';
import * as userController from '../controllers/userController.js';
import { validateCreateUser, validateUpdateUser } from '../middleware/validateUser.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', validateCreateUser, userController.addUser);
router.put('/:id', validateUpdateUser, userController.modifyUser);
router.delete('/:id', userController.removeUser);

export default router;
```

---

## פתרון תרגיל 8: Posts Collection

### src/models/postModel.js
```javascript
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'posts';

export const getAllPosts = async (db) => {
  try {
    return await db.collection(COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
};

export const getPostById = async (db, postId) => {
  try {
    if (!ObjectId.isValid(postId)) {
      throw new Error('Invalid post ID format');
    }
    
    return await db.collection(COLLECTION_NAME).findOne({ 
      _id: new ObjectId(postId) 
    });
  } catch (error) {
    throw new Error(`Error fetching post: ${error.message}`);
  }
};

export const getPostsByUser = async (db, userId) => {
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format');
    }
    
    return await db.collection(COLLECTION_NAME)
      .find({ userId: new ObjectId(userId) })
      .toArray();
  } catch (error) {
    throw new Error(`Error fetching user posts: ${error.message}`);
  }
};

export const createPost = async (db, postData) => {
  try {
    const newPost = {
      title: postData.title,
      content: postData.content,
      userId: new ObjectId(postData.userId),
      tags: postData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection(COLLECTION_NAME).insertOne(newPost);
    return { _id: result.insertedId, ...newPost };
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
};

export const updatePost = async (db, postId, updateData) => {
  try {
    if (!ObjectId.isValid(postId)) {
      throw new Error('Invalid post ID format');
    }
    
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(postId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    return result;
  } catch (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }
};

export const deletePost = async (db, postId) => {
  try {
    if (!ObjectId.isValid(postId)) {
      throw new Error('Invalid post ID format');
    }
    
    const result = await db.collection(COLLECTION_NAME).deleteOne({ 
      _id: new ObjectId(postId) 
    });
    
    return result;
  } catch (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
};

export const getPostCountByUser = async (db) => {
  try {
    return await db.collection(COLLECTION_NAME).aggregate([
      {
        $group: {
          _id: '$userId',
          postCount: { $count: {} }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$userDetails.name',
          userEmail: '$userDetails.email',
          postCount: 1
        }
      },
      {
        $sort: { postCount: -1 }
      }
    ]).toArray();
  } catch (error) {
    throw new Error(`Error getting post count: ${error.message}`);
  }
};

export const getPopularTags = async (db, limit = 10) => {
  try {
    return await db.collection(COLLECTION_NAME).aggregate([
      { $unwind: '$tags' },
      { 
        $group: {
          _id: '$tags',
          count: { $count: {} }
        }
      },
      { $sort: { count: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          tag: '$_id',
          count: 1
        }
      }
    ]).toArray();
  } catch (error) {
    throw new Error(`Error getting popular tags: ${error.message}`);
  }
};
```

### src/controllers/postController.js
```javascript
import * as postModel from '../models/postModel.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts(req.db);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.db, req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await postModel.getPostsByUser(req.db, req.params.userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, content, userId, tags } = req.body;
    
    if (!title || !content || !userId) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, content, userId' 
      });
    }
    
    const newPost = await postModel.createPost(req.db, { title, content, userId, tags });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyPost = async (req, res) => {
  try {
    const result = await postModel.updatePost(req.db, req.params.id, req.body);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (result.modifiedCount === 0) {
      return res.json({ message: 'No changes made' });
    }
    
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removePost = async (req, res) => {
  try {
    const result = await postModel.deletePost(req.db, req.params.id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostStats = async (req, res) => {
  try {
    const stats = await postModel.getPostCountByUser(req.db);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTagStats = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const tags = await postModel.getPopularTags(req.db, limit);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### src/routes/postRoutes.js
```javascript
import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/stats/by-user', postController.getPostStats);
router.get('/stats/popular-tags', postController.getTagStats);
router.get('/user/:userId', postController.getUserPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.addPost);
router.put('/:id', postController.modifyPost);
router.delete('/:id', postController.removePost);

export default router;
```

---

## פתרון תרגיל 10: Error Handling

### src/utils/errors.js
```javascript
export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation failed') {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

export class DatabaseError extends Error {
  constructor(message = 'Database error') {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}

export class DuplicateError extends Error {
  constructor(message = 'Resource already exists') {
    super(message);
    this.name = 'DuplicateError';
    this.statusCode = 409;
  }
}
```

### src/middleware/errorHandler.js
```javascript
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`[${new Date().toISOString()}] [${err.name}]: ${message}`);
  
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  
  res.status(statusCode).json({
    error: {
      message,
      type: err.name,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: `Route ${req.method} ${req.url} not found`,
      type: 'NotFoundError'
    }
  });
};
```

### עדכון סופי של src/server.js
```javascript
import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase, closeDatabaseConnection } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { attachDB } from './middleware/dbMiddleware.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to MongoDB + Express API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const startServer = async () => {
  try {
    const db = await connectToDatabase();
    
    // Attach DB to requests
    app.use(attachDB(db));
    
    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/posts', postRoutes);
    
    // 404 handler
    app.use(notFoundHandler);
    
    // Error handler (must be last)
    app.use(errorHandler);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await closeDatabaseConnection();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();
```

---

## בונוס: דוגמאות שימוש ב-API

### יצירת משתמש
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }'
```

### קבלת כל המשתמשים
```bash
curl http://localhost:3000/api/users
```

### חיפוש משתמשים
```bash
curl "http://localhost:3000/api/users?name=john&minAge=20&sortBy=name&order=asc"
```

### יצירת פוסט
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post",
    "userId": "USER_ID_HERE",
    "tags": ["javascript", "mongodb", "express"]
  }'
```

### קבלת סטטיסטיקות
```bash
curl http://localhost:3000/api/posts/stats/by-user
curl http://localhost:3000/api/posts/stats/popular-tags?limit=5
```

---

🎉 **סיימת את כל התרגילים! מזל טוב!** 🎉

כעת יש לך אפליקציה מלאה ומודולרית עם MongoDB ו-Express.
המשך ללמוד ולהתנסות!

</details>

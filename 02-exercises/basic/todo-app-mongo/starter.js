// ========================================
// Todo List App - MongoDB Native Driver
// קובץ התחלה עם TODO - למתחילים
// ========================================

// TODO 1.1: ייבא את express

// TODO 1.1: ייבא את MongoClient ו-ObjectId מ-mongodb

// TODO 1.1: ייבא את dotenv

// TODO 1.2: טען את dotenv.config()

// TODO 1.2: צור אפליקציית express

// TODO 1.2: הגדר PORT מ-process.env.PORT (ברירת מחדל: 3000)

// TODO 1.2: הוסף middleware: app.use(express.json())

// TODO 1.3: צור משתנה db שיחזיק את החיבור
let db = null;

// ========================================
// חלק 2: חיבור למסד נתונים
// ========================================

// TODO 2.1: צור פונקציה async connectToDatabase()
async function connectToDatabase() {
  // TODO: יצירת MongoClient
  // TODO: התחברות
  // TODO: שמירת החיבור ב-db
  // TODO: הדפסת הודעת הצלחה
  // TODO: טיפול בשגיאות (try/catch)
}

// ========================================
// חלק 3: פעולות CRUD בסיסיות
// ========================================

// TODO 3.1: POST /todos - יצירת משימה חדשה
// רמז: בדוק שיש title, צור newTodo עם כל השדות, insertOne

// TODO 3.2: GET /todos - קבלת כל המשימות
// רמז: find().sort({ createdAt: -1 }).toArray()

// TODO 3.3: GET /todos/:id - קבלת משימה ספציפית
// רמז: בדוק תקינות ID, findOne עם ObjectId

// TODO 3.4: PUT /todos/:id - עדכון משימה
// רמז: בנה updateData, updateOne עם $set

// TODO 3.5: DELETE /todos/:id - מחיקת משימה
// רמז: deleteOne, בדוק deletedCount

// ========================================
// חלק 4: פעולות נוספות
// ========================================

// TODO 4.1: PATCH /todos/:id/toggle - שינוי סטטוס
// רמז: מצא, החלף completed, עדכן

// TODO 4.2: GET /todos/completed - משימות שהושלמו
// רמז: find({ completed: true })

// TODO 4.3: GET /todos/pending - משימות ממתינות
// רמז: find({ completed: false })

// TODO 4.4: GET /todos/priority/:level - סינון לפי עדיפות
// רמז: find({ priority: level })

// TODO 4.5: GET /todos/search?q=... - חיפוש משימות
// רמז: $regex עם options: 'i'

// TODO 4.6: DELETE /todos - מחיקת כל המשימות שהושלמו
// רמז: deleteMany({ completed: true })

// ========================================
// חלק 5: סטטיסטיקות
// ========================================

// TODO 5.1: GET /todos/stats - סטטיסטיקות
// רמז: countDocuments לכל קטגוריה

// ========================================
// חלק 6: הפעלת השרת
// ========================================

// TODO 6.2: נתיב בסיסי
// app.get('/', (req, res) => { ... });

// TODO 6.1: פונקציית startServer
async function startServer() {
  // TODO: התחבר למסד נתונים
  // TODO: הפעל את השרת
  // TODO: הדפס הודעה
}

// TODO 6.3: קרא ל-startServer()

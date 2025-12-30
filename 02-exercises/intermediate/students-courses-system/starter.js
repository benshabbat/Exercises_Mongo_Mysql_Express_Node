// ========================================
// מערכת סטודנטים וקורסים - MongoDB Native Driver
// קובץ התחלה עם TODO
// ========================================

// TODO 1.1: ייבא את express
// TODO 1.1: ייבא את MongoClient ו-ObjectId מ-mongodb  
// TODO 1.1: ייבא את dotenv

// TODO 1.2: טען את dotenv

// TODO 1.2: צור אפליקציית express

// TODO 1.2: הגדר את PORT מ-env (ברירת מחדל: 3000)

// TODO 1.2: הוסף middleware לטיפול ב-JSON

// TODO 1.3: צור משתנה db שיחזיק את החיבור למסד הנתונים
let db = null;

// TODO 1.4: צור פונקציה async connectToDatabase()
async function connectToDatabase() {
  // TODO: יצירת MongoClient
  // TODO: התחברות
  // TODO: שמירת החיבור ב-db
  // TODO: הדפסת הודעת הצלחה
  // TODO: טיפול בשגיאות
}

// TODO 1.5: צור פונקציה getCollection(collectionName)
function getCollection(collectionName) {
  // TODO: החזר db.collection(collectionName)
}

// TODO 1.5: צור פונקציה validateObjectId(id)
function validateObjectId(id) {
  // TODO: בדוק אם id תקין
  // רמז: ObjectId.isValid(id)
}

// ========================================
// חלק 2: ניהול סטודנטים
// ========================================

// TODO 2.1: GET /students - קבלת כל הסטודנטים
// רמז: find().sort({ createdAt: -1 }).toArray()

// TODO 2.2: GET /students/:id - קבלת סטודנט ספציפי
// רמז: בדוק תקינות ID, findOne

// TODO 2.3: POST /students - יצירת סטודנט חדש
// רמז: בדוק name ו-email, הוסף enrolledCourses: []

// TODO 2.4: PUT /students/:id - עדכון סטודנט
// רמז: updateOne עם $set

// TODO 2.5: DELETE /students/:id - מחיקת סטודנט
// רמז: deleteOne

// ========================================
// חלק 3: ניהול קורסים
// ========================================

// TODO 3.1: GET /courses - קבלת כל הקורסים

// TODO 3.2: GET /courses/:id - קבלת קורס ספציפי

// TODO 3.3: POST /courses - יצירת קורס חדש
// רמז: בדוק name, instructor, credits

// TODO 3.4: PUT /courses/:id - עדכון קורס

// TODO 3.5: DELETE /courses/:id - מחיקת קורס
// ⚠️ חשוב: בדוק שאף סטודנט לא רשום!
// רמז: countDocuments({ enrolledCourses: courseId })

// ========================================
// חלק 4: ניהול הרשמות
// ========================================

// TODO 4.1: POST /students/:studentId/enroll/:courseId
// רמז: בדוק קיום, בדוק שלא רשום כבר, $addToSet

// TODO 4.2: DELETE /students/:studentId/unenroll/:courseId
// רמז: בדוק קיום, $pull

// TODO 4.3: GET /students/:studentId/courses
// רמז: $lookup או find עם $in

// TODO 4.4: GET /courses/:courseId/students
// רמז: find({ enrolledCourses: courseId })

// ========================================
// חלק 5: חיפוש וסינון
// ========================================

// TODO 5.1: GET /students/search?name=...
// רמז: { name: { $regex: ..., $options: 'i' } }

// TODO 5.2: GET /students/search?email=...

// TODO 5.3: GET /courses/search?instructor=...

// TODO 5.4: GET /courses/filter?minCredits=...&maxCredits=...
// רמז: { credits: { $gte: ..., $lte: ... } }

// TODO 5.5: GET /students/filter?hasEnrollments=true/false
// רמז: { enrolledCourses: { $size: 0 } } או { $not: { $size: 0 } }

// ========================================
// חלק 6: סטטיסטיקות
// ========================================

// TODO 6.1: GET /stats
// רמז: countDocuments, aggregate

// TODO 6.2: GET /courses/:courseId/stats

// TODO 6.3: GET /students/:studentId/stats

// ========================================
// חלק 7: פיצ'רים מתקדמים (אתגרים)
// ========================================

// TODO 7.1: POST /courses/:courseId/bulk-enroll
// Body: { studentIds: [...] }

// TODO 7.2: GET /courses/popular?limit=5

// TODO 7.3: PUT /students/:studentId/swap-course
// Body: { oldCourseId, newCourseId }

// TODO 7.4: DELETE /courses/cleanup
// מחיקת קורסים ללא סטודנטים

// ========================================
// הפעלת השרת
// ========================================

// TODO 8: יישם את הקוד להפעלת השרת
async function startServer() {
  try {
    // TODO: התחבר למסד נתונים
    // TODO: הפעל את השרת
    // TODO: הדפס הודעה
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// TODO: קרא ל-startServer()

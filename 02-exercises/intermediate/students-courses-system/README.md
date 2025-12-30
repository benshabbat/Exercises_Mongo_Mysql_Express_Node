# 🎓 תרגיל מתקדם - מערכת סטודנטים וקורסים עם MongoDB

**רמת קושי:** בינוני-מתקדם  
**משך זמן משוער:** 2-3 שעות  
**טכנולוגיות:** MongoDB Native Driver, Express, Node.js

---

## 🎯 מטרה

לבנות API מלא למערכת סטודנטים וקורסים עם קשר ביניהם, תוך שימוש ב-MongoDB Native Driver (ללא Mongoose).

המערכת מדגימה:
- ✅ עבודה עם 2 collections נפרדים
- ✅ יצירת קשר (relation) בין collections דרך מערך של IDs
- ✅ פעולות CRUD מלאות
- ✅ Aggregation למניפולציות מורכבות
- ✅ Validation ובדיקות תקינות

---

## 📋 הכנה

### שלב 1: התקנת MongoDB
ודא ש-MongoDB רץ על המחשב:
```bash
mongod --version
```

### שלב 2: יצירת הפרויקט
```bash
mkdir students-courses-system
cd students-courses-system
npm init -y
```

### שלב 3: התקנת תלויות
```bash
npm install express mongodb dotenv
```

### שלב 4: הגדרת package.json
הוסף את זה ל-`package.json`:
```json
{
  "type": "module"
}
```

### שלב 5: יצירת קובץ .env
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=studentsCoursesDB
PORT=3000
```

---

## 🗄️ מבנה Database

### Collection: `students`
```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  enrolledCourses: [
    ObjectId("..."),  // Reference לקורסים
    ObjectId("...")
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `courses`
```javascript
{
  _id: ObjectId("..."),
  name: "JavaScript for Beginners",
  instructor: "David Smith",
  credits: 4,
  description: "Learn the basics of JavaScript",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📝 מבנה התרגיל

צור קובץ `server.js` עם המבנה הבא:

---

## 🔧 חלק 1: קוד התחלתי (Setup)

### TODO 1.1: ייבוא מודולים
```javascript
// TODO: ייבא את express
// TODO: ייבא את MongoClient ו-ObjectId מ-mongodb
// TODO: ייבא את dotenv
```

### TODO 1.2: הגדרות בסיסיות
```javascript
// TODO: טען את dotenv
// TODO: צור אפליקציית express
// TODO: הגדר את PORT מ-env (ברירת מחדל: 3000)
// TODO: הוסף middleware לטיפול ב-JSON
```

### TODO 1.3: משתנה גלובלי למסד נתונים
```javascript
// TODO: צור משתנה db שיחזיק את החיבור למסד הנתונים
```

### TODO 1.4: פונקציה להתחברות למסד נתונים
```javascript
// TODO: צור פונקציה async connectToDatabase() שתבצע:
//   1. יצירת MongoClient עם MONGODB_URI
//   2. התחברות עם client.connect()
//   3. שמירת החיבור במשתנה db
//   4. הדפסת הודעת הצלחה
//   5. טיפול בשגיאות
```

### TODO 1.5: פונקציות Helper
```javascript
// TODO: צור פונקציה getCollection(collectionName) שמחזירה:
//   db.collection(collectionName)

// TODO: צור פונקציה validateObjectId(id) שבודקת:
//   אם ה-id הוא ObjectId תקין
//   מחזירה true/false
```

---

## 👥 חלק 2: ניהול סטודנטים (Students CRUD)

### TODO 2.1: GET /students - קבלת כל הסטודנטים
```javascript
// TODO: יישם route שמחזיר את כל הסטודנטים
// טיפ: השתמש ב-find().toArray()
// טיפ: מיין לפי createdAt (מהחדש לישן)
```

**דוגמת תגובה:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "enrolledCourses": [],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### TODO 2.2: GET /students/:id - קבלת סטודנט ספציפי
```javascript
// TODO: יישם route שמחזיר סטודנט לפי ID
// טיפ: בדוק תקינות ID עם validateObjectId
// טיפ: השתמש ב-findOne({ _id: new ObjectId(id) })
// טיפ: החזר 404 אם לא נמצא
```

### TODO 2.3: POST /students - יצירת סטודנט חדש
```javascript
// TODO: יישם route ליצירת סטודנט
// טיפ: בדוק ש-name ו-email קיימים
// טיפ: בדוק שהאימייל לא קיים כבר (unique)
// טיפ: הוסף שדות: enrolledCourses: [], createdAt, updatedAt
// טיפ: החזר status 201
```

**דוגמת Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### TODO 2.4: PUT /students/:id - עדכון סטודנט
```javascript
// TODO: יישם route לעדכון פרטי סטודנט
// טיפ: בדוק תקינות ID
// טיפ: אל תשנה את enrolledCourses (זה מנוהל דרך enroll/unenroll)
// טיפ: השתמש ב-updateOne עם $set
// טיפ: עדכן את updatedAt
// טיפ: החזר 404 אם לא נמצא
```

### TODO 2.5: DELETE /students/:id - מחיקת סטודנט
```javascript
// TODO: יישם route למחיקת סטודנט
// טיפ: בדוק תקינות ID
// טיפ: השתמש ב-deleteOne
// טיפ: בדוק אם נמחק (deletedCount > 0)
// טיפ: החזר 404 אם לא נמצא
```

---

## 📚 חלק 3: ניהול קורסים (Courses CRUD)

### TODO 3.1: GET /courses - קבלת כל הקורסים
```javascript
// TODO: יישם route שמחזיר את כל הקורסים
// טיפ: דומה ל-GET /students
```

### TODO 3.2: GET /courses/:id - קבלת קורס ספציפי
```javascript
// TODO: יישם route שמחזיר קורס לפי ID
// טיפ: דומה ל-GET /students/:id
```

### TODO 3.3: POST /courses - יצירת קורס חדש
```javascript
// TODO: יישם route ליצירת קורס
// טיפ: בדוק ש-name, instructor, credits קיימים
// טיפ: בדוק ש-credits הוא מספר חיובי
// טיפ: הוסף שדות: createdAt, updatedAt
```

**דוגמת Body:**
```json
{
  "name": "JavaScript for Beginners",
  "instructor": "David Smith",
  "credits": 4,
  "description": "Learn the basics of JavaScript"
}
```

### TODO 3.4: PUT /courses/:id - עדכון קורס
```javascript
// TODO: יישם route לעדכון פרטי קורס
// טיפ: דומה ל-PUT /students/:id
```

### TODO 3.5: DELETE /courses/:id - מחיקת קורס
```javascript
// TODO: יישם route למחיקת קורס
// ⚠️ חשוב: בדוק שאף סטודנט לא רשום לקורס!
// טיפ: השתמש ב-countDocuments על students
// טיפ: בדוק אם enrolledCourses מכיל את ה-courseId
// טיפ: החזר 400 אם יש סטודנטים רשומים
```

---

## 🔗 חלק 4: ניהול הרשמות (Enrollments)

### TODO 4.1: POST /students/:studentId/enroll/:courseId
**רישום סטודנט לקורס**

```javascript
// TODO: יישם route לרישום סטודנט לקורס
// שלבים:
// 1. המר את studentId ו-courseId ל-ObjectId
// 2. בדוק שהסטודנט קיים
// 3. בדוק שהקורס קיים
// 4. בדוק שהסטודנט לא רשום כבר לקורס
//    טיפ: student.enrolledCourses.some(id => id.equals(courseId))
// 5. הוסף את courseId ל-enrolledCourses
//    טיפ: $push או $addToSet
// 6. עדכן את updatedAt
// 7. החזר את הסטודנט המעודכן
```

**דוגמת תגובה:**
```json
{
  "success": true,
  "message": "Student enrolled successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "enrolledCourses": ["..."]
  }
}
```

### TODO 4.2: DELETE /students/:studentId/unenroll/:courseId
**הסרת סטודנט מקורס**

```javascript
// TODO: יישם route להסרת סטודנט מקורס
// שלבים:
// 1. בדוק שהסטודנט קיים
// 2. בדוק שהסטודנט רשום לקורס
// 3. הסר את courseId מ-enrolledCourses
//    טיפ: $pull
// 4. עדכן את updatedAt
// 5. החזר את הסטודנט המעודכן
```

### TODO 4.3: GET /students/:studentId/courses
**קבלת כל הקורסים של סטודנט (עם פרטים מלאים)**

```javascript
// TODO: יישם route שמחזיר את כל הקורסים של סטודנט
// אופציה 1 - עם Aggregation Pipeline:
//   טיפ: $lookup לחיבור עם courses collection
// 
// אופציה 2 - ללא Aggregation:
//   1. מצא את הסטודנט
//   2. מצא את הקורסים שה-_id שלהם ב-student.enrolledCourses
//      טיפ: { _id: { $in: student.enrolledCourses } }
```

**דוגמת תגובה:**
```json
{
  "success": true,
  "student": "John Doe",
  "count": 2,
  "courses": [
    {
      "_id": "...",
      "name": "JavaScript for Beginners",
      "instructor": "David Smith",
      "credits": 4
    }
  ]
}
```

### TODO 4.4: GET /courses/:courseId/students
**קבלת כל הסטודנטים בקורס**

```javascript
// TODO: יישם route שמחזיר את כל הסטודנטים בקורס
// שלבים:
// 1. בדוק שהקורס קיים
// 2. מצא את כל הסטודנטים שיש להם את courseId ב-enrolledCourses
//    טיפ: { enrolledCourses: courseId }
// 3. החזר את הקורס + רשימת הסטודנטים
```

---

## 🔍 חלק 5: חיפוש וסינון (Search & Filter)

### TODO 5.1: GET /students/search?name=John
**חיפוש סטודנטים לפי שם (חלקי)**

```javascript
// TODO: יישם route לחיפוש סטודנטים
// טיפ: השתמש ב-regex לחיפוש חלקי
// טיפ: { name: { $regex: searchTerm, $options: 'i' } }
// טיפ: ה-'i' זה case-insensitive
```

### TODO 5.2: GET /students/search?email=john@
**חיפוש סטודנטים לפי אימייל (חלקי)**

```javascript
// TODO: יישם חיפוש לפי אימייל
// טיפ: דומה לחיפוש לפי שם
```

### TODO 5.3: GET /courses/search?instructor=David
**חיפוש קורסים לפי מרצה**

```javascript
// TODO: יישם route לחיפוש קורסים לפי מרצה
// טיפ: regex כמו בסטודנטים
```

### TODO 5.4: GET /courses/filter?minCredits=3&maxCredits=5
**סינון קורסים לפי טווח נקודות זכות**

```javascript
// TODO: יישם route לסינון קורסים לפי נקודות
// טיפ: { credits: { $gte: minCredits, $lte: maxCredits } }
// טיפ: המר את הפרמטרים ל-parseInt
```

### TODO 5.5: GET /students/filter?hasEnrollments=true
**סינון סטודנטים לפי האם רשומים לקורסים**

```javascript
// TODO: יישם route לסינון סטודנטים
// אם hasEnrollments=true: מצא סטודנטים עם לפחות קורס אחד
//   טיפ: { enrolledCourses: { $exists: true, $not: { $size: 0 } } }
// אם hasEnrollments=false: מצא סטודנטים ללא קורסים
//   טיפ: { enrolledCourses: { $size: 0 } }
```

---

## 📊 חלק 6: סטטיסטיקות ו-Aggregations

### TODO 6.1: GET /stats
**סטטיסטיקות כלליות**

```javascript
// TODO: יישם route שמחזיר:
// 1. מספר כולל של סטודנטים
//    טיפ: countDocuments()
// 
// 2. מספר כולל של קורסים
// 
// 3. הקורס הפופולרי ביותר (עם הכי הרבה סטודנטים)
//    טיפ: aggregate עם $lookup ו-$count
//    או: לולאה על הקורסים וספירה ידנית
// 
// 4. הסטודנט הכי פעיל (עם הכי הרבה קורסים)
//    טיפ: aggregate עם $project { coursesCount: { $size: "$enrolledCourses" } }
```

**דוגמת תגובה:**
```json
{
  "success": true,
  "stats": {
    "totalStudents": 10,
    "totalCourses": 5,
    "totalEnrollments": 23,
    "mostPopularCourse": {
      "id": "...",
      "name": "JavaScript for Beginners",
      "enrolledCount": 8
    },
    "mostActiveStudent": {
      "id": "...",
      "name": "Sarah Smith",
      "coursesCount": 5
    }
  }
}
```

### TODO 6.2: GET /courses/:courseId/stats
**סטטיסטיקות לקורס ספציפי**

```javascript
// TODO: יישם route שמחזיר:
// 1. פרטי הקורס
// 2. מספר סטודנטים רשומים
// 3. רשימת הסטודנטים (רק שם ואימייל)
```

### TODO 6.3: GET /students/:studentId/stats
**סטטיסטיקות לסטודנט ספציפי**

```javascript
// TODO: יישם route שמחזיר:
// 1. פרטי הסטודנט
// 2. מספר קורסים רשומים
// 3. סה"כ נקודות זכות
//    טיפ: aggregate שמסכם את credits של כל הקורסים
```

---

## 🎨 חלק 7: פיצ'רים מתקדמים (אתגרים נוספים)

### TODO 7.1: POST /courses/:courseId/bulk-enroll
**רישום כמה סטודנטים לקורס בבת אחת**

```javascript
// TODO: יישם route שמקבל מערך של studentIds
// Body: { "studentIds": ["id1", "id2", "id3"] }
// טיפ: השתמש ב-updateMany עם $addToSet
```

### TODO 7.2: GET /courses/popular?limit=5
**הקורסים הפופולריים ביותר**

```javascript
// TODO: יישם route שמחזיר את הקורסים הכי פופולריים
// טיפ: Aggregation Pipeline:
//   1. $lookup לחיבור עם students
//   2. $project להוספת שדה enrolledCount
//   3. $sort לפי enrolledCount
//   4. $limit
```

### TODO 7.3: PUT /students/:studentId/swap-course
**החלפת קורס אחד באחר**

```javascript
// TODO: יישם route שמחליף קורס בסטודנט
// Body: { "oldCourseId": "...", "newCourseId": "..." }
// שלבים:
// 1. בדוק שהסטודנט רשום לקורס הישן
// 2. בדוק שהסטודנט לא רשום לקורס החדש
// 3. הסר את הקורס הישן והוסף את החדש
//    טיפ: updateOne עם $pull ו-$push בפעולה אחת
```

### TODO 7.4: DELETE /courses/cleanup
**מחיקת קורסים ללא סטודנטים**

```javascript
// TODO: יישם route שמוחק כל קורס שאין בו סטודנטים
// טיפ:
// 1. מצא את כל הקורסים
// 2. עבור כל קורס, בדוק אם יש סטודנטים
// 3. מחק את אלה בלי סטודנטים
// 4. החזר כמה קורסים נמחקו
```

---

## 🚀 הפעלת השרת

### TODO 8: הפעלה ראשונית
```javascript
// TODO: יישם את הקוד להפעלת השרת:
// 1. קרא ל-connectToDatabase()
// 2. אחרי התחברות מוצלחת, הפעל את app.listen
// 3. הדפס הודעה עם כתובת השרת
// 4. טפל בשגיאות
```

```javascript
// דוגמה:
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
```

---

## 🧪 בדיקות

### הוספת סטודנטים
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Sarah Smith","email":"sarah@example.com"}'
```

### הוספת קורסים
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"JavaScript for Beginners","instructor":"David Brown","credits":4,"description":"Learn JS basics"}'

curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Advanced React","instructor":"Emily Wilson","credits":5,"description":"Master React"}'
```

### רישום סטודנט לקורס
```bash
# קודם - קבל את ה-IDs של הסטודנט והקורס מה-response למעלה
curl -X POST http://localhost:3000/students/<STUDENT_ID>/enroll/<COURSE_ID>
```

### הצגת קורסים של סטודנט
```bash
curl http://localhost:3000/students/<STUDENT_ID>/courses
```

### חיפוש
```bash
curl "http://localhost:3000/students/search?name=John"
curl "http://localhost:3000/courses/filter?minCredits=3&maxCredits=5"
```

### סטטיסטיקות
```bash
curl http://localhost:3000/stats
```

---

## 📚 טיפים חשובים

### 1. המרת String ל-ObjectId
```javascript
import { ObjectId } from 'mongodb';

const id = new ObjectId(req.params.id);
```

### 2. בדיקת תקינות ObjectId
```javascript
function validateObjectId(id) {
  return ObjectId.isValid(id);
}
```

### 3. השוואת ObjectIds
```javascript
// ❌ לא עובד:
student.enrolledCourses.includes(courseId)

// ✅ עובד:
student.enrolledCourses.some(id => id.equals(courseId))
```

### 4. הוספת איבר למערך (ללא כפילויות)
```javascript
await studentsCollection.updateOne(
  { _id: studentId },
  { 
    $addToSet: { enrolledCourses: courseId },
    $set: { updatedAt: new Date() }
  }
);
```

### 5. הסרת איבר ממערך
```javascript
await studentsCollection.updateOne(
  { _id: studentId },
  { 
    $pull: { enrolledCourses: courseId },
    $set: { updatedAt: new Date() }
  }
);
```

### 6. חיפוש ב-array
```javascript
// מצא סטודנטים שרשומים לקורס מסוים
await studentsCollection.find({
  enrolledCourses: courseId
}).toArray();
```

### 7. Aggregation Pipeline בסיסי
```javascript
const result = await studentsCollection.aggregate([
  {
    $lookup: {
      from: 'courses',
      localField: 'enrolledCourses',
      foreignField: '_id',
      as: 'courseDetails'
    }
  }
]).toArray();
```

---

## 🎯 יעדי הלמידה

בסוף התרגיל תדעו:

- ✅ לעבוד עם MongoDB Native Driver
- ✅ לנהל קשרים בין collections דרך arrays של ObjectIds
- ✅ להשתמש באופרטורים: $push, $pull, $addToSet, $in
- ✅ לבצע Aggregation Pipeline עם $lookup
- ✅ לבדוק תקינות נתונים
- ✅ לטפל בשגיאות ו-edge cases
- ✅ לבנות API מקצועי עם Express

---

## 📖 קבצים נוספים

- [`starter.js`](starter.js) - קובץ התחלה עם כל ה-TODOs
- [`solution.js`](solution.js) - פתרון מלא (נסו לא להציץ!)
- [`test-requests.http`](test-requests.http) - בדיקות לכל ה-endpoints

---

**בהצלחה! 🚀**

**זכרו:** התרגיל הזה מאתגר - קחו אותו לאט, צעד אחר צעד!

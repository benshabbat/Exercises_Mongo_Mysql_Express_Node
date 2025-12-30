# 📝 תרגיל למתחילים - Todo List עם MongoDB

**רמת קושי:** בסיסי  
**משך זמן משוער:** 1-1.5 שעות  
**טכנולוגיות:** MongoDB Native Driver, Express, Node.js

---

## 🎯 מטרה

לבנות API פשוט לניהול רשימת משימות (Todo List) תוך לימוד יסודות MongoDB Native Driver.

התרגיל מתמקד ב:
- ✅ חיבור למסד נתונים
- ✅ פעולות CRUD בסיסיות
- ✅ עבודה עם collection אחד
- ✅ Validation פשוטה
- ✅ חיפוש וסינון בסיסי

---

## 📋 הכנה

### שלב 1: ודא ש-MongoDB רץ
```bash
mongod --version
```

### שלב 2: יצירת הפרויקט
```bash
mkdir todo-app-mongo
cd todo-app-mongo
npm init -y
```

### שלב 3: התקנת תלויות
```bash
npm install express mongodb dotenv
npm install --save-dev nodemon
```

### שלב 4: הגדרת package.json
הוסף:
```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### שלב 5: יצירת קובץ .env
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=todoAppDB
PORT=3000
```

---

## 🗄️ מבנה המשימה (Todo)

כל משימה תכיל:
```javascript
{
  _id: ObjectId("..."),           // MongoDB יוצר אוטומטית
  title: "קנה חלב",               // חובה
  description: "חלב 3% מהסופר",   // אופציונלי
  completed: false,                // ברירת מחדל: false
  priority: "medium",              // low / medium / high
  createdAt: Date,                 // תאריך יצירה
  updatedAt: Date                  // תאריך עדכון אחרון
}
```

---

## 📝 המשימות - TODO List

צור קובץ `server.js` ופתור את המשימות הבאות:

---

## 🔧 חלק 1: הגדרות בסיסיות

### TODO 1.1: ייבוא מודולים
```javascript
// TODO: ייבא את express
// TODO: ייבא את MongoClient ו-ObjectId מ-mongodb
// TODO: ייבא את dotenv
```

### TODO 1.2: הגדרות אפליקציה
```javascript
// TODO: טען את dotenv.config()
// TODO: צור אפליקציית express
// TODO: הגדר PORT מ-process.env.PORT (ברירת מחדל: 3000)
// TODO: הוסף middleware: app.use(express.json())
```

### TODO 1.3: משתנה למסד נתונים
```javascript
// TODO: צור משתנה db שיחזיק את החיבור
let db = null;
```

---

## 🔌 חלק 2: חיבור למסד נתונים

### TODO 2.1: פונקציית חיבור
```javascript
// TODO: צור פונקציה async connectToDatabase() שתבצע:
//   1. יצירת MongoClient עם process.env.MONGODB_URI
//   2. התחברות עם await client.connect()
//   3. שמירת db = client.db(process.env.DATABASE_NAME)
//   4. הדפסת הודעת הצלחה: "✅ Connected to MongoDB"
//   5. במקרה של שגיאה - הדפס ו-throw error
```

**רמז:**
```javascript
async function connectToDatabase() {
  try {
    // הקוד שלך כאן
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
```

---

## ✨ חלק 3: פעולות CRUD בסיסיות

### TODO 3.1: POST /todos - יצירת משימה חדשה
```javascript
// TODO: יישם route ליצירת משימה
// שלבים:
// 1. קבל title מ-req.body
// 2. בדוק ש-title קיים ולא ריק (אם לא - 400)
// 3. צור אובייקט newTodo עם:
//    - title
//    - description (מ-req.body או "")
//    - completed: false
//    - priority (מ-req.body או "medium")
//    - createdAt: new Date()
//    - updatedAt: new Date()
// 4. הוסף למסד נתונים: db.collection('todos').insertOne(newTodo)
// 5. החזר status 201 עם המשימה החדשה
```

**דוגמת Body:**
```json
{
  "title": "קנה חלב",
  "description": "חלב 3% מהסופר",
  "priority": "high"
}
```

**דוגמת תגובה:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "...",
    "title": "קנה חלב",
    "completed": false,
    ...
  }
}
```

---

### TODO 3.2: GET /todos - קבלת כל המשימות
```javascript
// TODO: יישם route לקבלת כל המשימות
// שלבים:
// 1. מצא את כל המשימות: db.collection('todos').find()
// 2. מיין לפי createdAt (מהחדש לישן): .sort({ createdAt: -1 })
// 3. המר למערך: .toArray()
// 4. החזר את המשימות עם count
```

**דוגמת תגובה:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "title": "קנה חלב",
      "completed": false,
      ...
    }
  ]
}
```

---

### TODO 3.3: GET /todos/:id - קבלת משימה ספציפית
```javascript
// TODO: יישם route לקבלת משימה לפי ID
// שלבים:
// 1. קבל id מ-req.params.id
// 2. בדוק תקינות עם ObjectId.isValid(id)
//    - אם לא תקין: 400 "Invalid ID"
// 3. מצא משימה: db.collection('todos').findOne({ _id: new ObjectId(id) })
// 4. אם לא נמצא: 404 "Todo not found"
// 5. החזר את המשימה
```

---

### TODO 3.4: PUT /todos/:id - עדכון משימה
```javascript
// TODO: יישם route לעדכון משימה
// שלבים:
// 1. קבל id מ-params
// 2. בדוק תקינות ID
// 3. בנה אובייקט updateData עם השדות שהתקבלו:
//    - title (אם קיים)
//    - description (אם קיים)
//    - priority (אם קיים)
//    - completed (אם קיים)
//    - updatedAt: new Date() (תמיד!)
// 4. עדכן: db.collection('todos').updateOne(
//      { _id: new ObjectId(id) },
//      { $set: updateData }
//    )
// 5. אם result.matchedCount === 0: 404 "Todo not found"
// 6. מצא והחזר את המשימה המעודכנת
```

**דוגמת Body:**
```json
{
  "title": "קנה חלב ולחם",
  "completed": true
}
```

---

### TODO 3.5: DELETE /todos/:id - מחיקת משימה
```javascript
// TODO: יישם route למחיקת משימה
// שלבים:
// 1. קבל id ובדוק תקינות
// 2. מחק: db.collection('todos').deleteOne({ _id: new ObjectId(id) })
// 3. אם result.deletedCount === 0: 404 "Todo not found"
// 4. החזר הודעת הצלחה
```

---

## 🔍 חלק 4: פעולות נוספות

### TODO 4.1: PATCH /todos/:id/toggle - שינוי סטטוס משימה
```javascript
// TODO: יישם route להחלפת completed (true ⟷ false)
// שלבים:
// 1. בדוק תקינות ID
// 2. מצא את המשימה
// 3. אם לא נמצא: 404
// 4. עדכן ל-completed: !todo.completed
// 5. החזר את המשימה המעודכנת
```

---

### TODO 4.2: GET /todos/completed - משימות שהושלמו
```javascript
// TODO: יישם route לקבלת משימות שהושלמו
// רמז: find({ completed: true })
```

---

### TODO 4.3: GET /todos/pending - משימות ממתינות
```javascript
// TODO: יישם route לקבלת משימות שלא הושלמו
// רמז: find({ completed: false })
```

---

### TODO 4.4: GET /todos/priority/:level - סינון לפי עדיפות
```javascript
// TODO: יישם route לסינון לפי priority
// שלבים:
// 1. קבל level מ-req.params.level (low/medium/high)
// 2. מצא משימות: find({ priority: level })
// 3. החזר את התוצאות
```

**דוגמה:**
```bash
GET /todos/priority/high
```

---

### TODO 4.5: GET /todos/search?q=חלב - חיפוש משימות
```javascript
// TODO: יישם route לחיפוש משימות
// שלבים:
// 1. קבל q מ-req.query.q
// 2. אם אין q: החזר מערך ריק
// 3. חפש במשימות שהכותרת מכילה את q:
//    find({ title: { $regex: q, $options: 'i' } })
// 4. 'i' = case-insensitive (לא רגיש לאותיות גדולות/קטנות)
```

**דוגמה:**
```bash
GET /todos/search?q=חלב
```

---

### TODO 4.6: DELETE /todos - מחיקת כל המשימות שהושלמו
```javascript
// TODO: יישם route למחיקת כל המשימות המסומנות כהושלמו
// רמז: deleteMany({ completed: true })
// החזר כמה משימות נמחקו
```

---

## 📊 חלק 5: סטטיסטיקות

### TODO 5.1: GET /todos/stats - סטטיסטיקות
```javascript
// TODO: יישם route שמחזיר:
// {
//   total: מספר כולל של משימות,
//   completed: כמה הושלמו,
//   pending: כמה ממתינות,
//   byPriority: {
//     low: כמה,
//     medium: כמה,
//     high: כמה
//   }
// }

// טיפים:
// - countDocuments() לספירה
// - countDocuments({ completed: true }) לספירת completed
// - countDocuments({ priority: "high" }) לספירה לפי עדיפות
```

---

## 🚀 חלק 6: הפעלת השרת

### TODO 6.1: פונקציית startServer
```javascript
// TODO: צור async function startServer() שתבצע:
// 1. await connectToDatabase()
// 2. app.listen(PORT, () => { הדפס הודעה })
// 3. טפל בשגיאות עם try/catch
```

### TODO 6.2: נתיב בסיסי
```javascript
// TODO: הוסף GET / שמחזיר הודעת ברוכים הבאים
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Todo API!',
    endpoints: {
      todos: '/todos',
      stats: '/todos/stats'
    }
  });
});
```

### TODO 6.3: הרץ את השרת
```javascript
// TODO: קרא ל-startServer()
```

---

## 🧪 בדיקות

### יצירת משימות
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"קנה חלב","priority":"high"}'

curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"נקה את הבית","description":"כל החדרים","priority":"medium"}'

curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"קרא ספר","priority":"low"}'
```

### קבלת כל המשימות
```bash
curl http://localhost:3000/todos
```

### סימון משימה כהושלמה
```bash
curl -X PATCH http://localhost:3000/todos/YOUR_TODO_ID/toggle
```

### חיפוש
```bash
curl "http://localhost:3000/todos/search?q=חלב"
```

### סטטיסטיקות
```bash
curl http://localhost:3000/todos/stats
```

---

## 💡 טיפים למתחילים

### 1. איך לבדוק אם ID תקין?
```javascript
if (!ObjectId.isValid(id)) {
  return res.status(400).json({ error: 'Invalid ID' });
}
```

### 2. איך לעדכן רק שדות שקיימים?
```javascript
const updateData = {};
if (req.body.title) updateData.title = req.body.title;
if (req.body.description !== undefined) updateData.description = req.body.description;
updateData.updatedAt = new Date();
```

### 3. איך למיין?
```javascript
.sort({ createdAt: -1 })  // מהחדש לישן
.sort({ createdAt: 1 })   // מהישן לחדש
```

### 4. איך לחפש טקסט?
```javascript
{ title: { $regex: searchTerm, $options: 'i' } }
```

### 5. טיפול בשגיאות
```javascript
try {
  // הקוד שלך
} catch (error) {
  res.status(500).json({ 
    success: false, 
    message: error.message 
  });
}
```

---

## 📚 מה נלמד בתרגיל?

- ✅ חיבור ל-MongoDB Native Driver
- ✅ insertOne - הוספת מסמך
- ✅ find - חיפוש מסמכים
- ✅ findOne - חיפוש מסמך בודד
- ✅ updateOne - עדכון מסמך
- ✅ deleteOne - מחיקת מסמך
- ✅ deleteMany - מחיקת מסמכים מרובים
- ✅ countDocuments - ספירה
- ✅ sort - מיון
- ✅ $regex - חיפוש טקסט
- ✅ ObjectId - עבודה עם IDs של MongoDB
- ✅ Validation בסיסית

---

## 🎯 אתגרים נוספים (אופציונלי)

אם סיימת, נסה להוסיף:

1. **תאריך יעד (dueDate)** - הוסף שדה dueDate למשימות
2. **קטגוריות (tags)** - מערך של תגיות למשימה
3. **GET /todos/overdue** - משימות שעבר תאריך היעד שלהן
4. **GET /todos/today** - משימות שהיעד שלהן היום
5. **PATCH /todos/mark-all-completed** - סמן הכל כהושלם

---

## 📖 קבצים נוספים

- [`starter.js`](starter.js) - קובץ התחלה עם כל ה-TODOs
- [`solution.js`](solution.js) - פתרון מלא
- [`test-requests.http`](test-requests.http) - בדיקות

---

## 🐛 שגיאות נפוצות

### "Cannot find module 'mongodb'"
```bash
npm install mongodb
```

### "connect ECONNREFUSED"
MongoDB לא רץ - הפעל אותו:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### "Invalid ID"
בדוק שאתה מעביר ObjectId תקין של 24 תווים

---

**בהצלחה! 🚀**

זכור: לך לאט, צעד אחר צעד. כל TODO הוא משימה קטנה שאפשר לפתור!

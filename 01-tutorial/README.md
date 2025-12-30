# 📖 מדריך MongoDB - Tutorial

ברוכים הבאים למדריך שלב אחר שלב ללימוד MongoDB Native Driver!

---

## 📚 תוכן השיעורים

### [📌 Lesson 01: חיבור למסד נתונים](lesson-01/)
**משך זמן: 20 דקות**

מה נלמד:
- מה זה MongoDB Driver
- איך להתחבר למסד נתונים
- בדיקת חיבור
- סגירה נכונה של חיבור

**קבצים:**
- `README.md` - הסבר מפורט
- `connect.js` - קוד לדוגמה
- `.env.example` - הגדרות

---

### [📌 Lesson 02: Create & Read](lesson-02/)
**משך זמן: 30 דקות**

מה נלמד:
- יצירת collections
- insertOne - הוספת מסמך בודד
- insertMany - הוספת מסמכים מרובים
- find - קריאת מסמכים
- findOne - קריאת מסמך בודד
- Filters בסיסיים

**קבצים:**
- `README.md` - הסבר מפורט
- `create.js` - יצירת מסמכים
- `read.js` - קריאת מסמכים

---

### [📌 Lesson 03: Update & Delete](lesson-03/)
**משך זמן: 30 דקות**

מה נלמד:
- updateOne - עדכון מסמך בודד
- updateMany - עדכון מסמכים מרובים
- deleteOne - מחיקת מסמך
- deleteMany - מחיקת מסמכים
- אופרטורי עדכון ($set, $inc, $push וכו')

**בקרוב!**

---

### [📌 Lesson 04: Queries מתקדמים](lesson-04/)
**משך זמן: 40 דקות**

מה נלמד:
- אופרטורים לוגיים ($and, $or, $not)
- חיפוש ב-arrays ($in, $all, $elemMatch)
- Regex לחיפוש טקסט
- Indexes לביצועים טובים יותר

**בקרוב!**

---

### [📌 Lesson 05: Aggregation Pipeline](lesson-05/)
**משך זמן: 45 דקות**

מה נלמד:
- מה זה Aggregation Pipeline
- $match, $group, $sort
- $project, $lookup
- דוגמאות מעשיות

**בקרוב!**

---

## 🎯 איך לעבוד עם המדריך?

### 1. לך לפי הסדר
התחל משיעור 1 והתקדם בהדרגה. כל שיעור בנוי על הקודם.

### 2. תרגל בעצמך
אל תסתפק בקריאה - הקלד את הקוד והרץ אותו!

### 3. עשה את התרגילים
בסוף כל שיעור יש תרגילים. פתור אותם לפני שממשיכים.

### 4. שאל שאלות
אם משהו לא ברור, חפש בגוגל או שאל בקהילה.

---

## 💻 הכנה

לפני שמתחילים, ודא שיש לך:

### ✅ Node.js מותקן
```bash
node --version
# צריך להיות 16 ומעלה
```

### ✅ MongoDB רץ
```bash
# בדוק אם MongoDB רץ
mongod --version

# או התחבר ל-MongoDB Atlas (ענן)
```

### ✅ עורך קוד
- VS Code (מומלץ)
- או כל עורך אחר שאתה אוהב

---

## 📦 התקנה

כל שיעור הוא פרויקט עצמאי. בכל תיקיית שיעור:

```bash
# היכנס לתיקיית השיעור
cd lesson-01

# התקן תלויות
npm install

# הרץ את הקוד
npm start
```

---

## 🎓 מסלול למידה מומלץ

### שבוע 1: יסודות
- יום 1: Lesson 01 - חיבור
- יום 2-3: Lesson 02 - Create & Read (תרגל הרבה!)
- יום 4-5: Lesson 03 - Update & Delete

### שבוע 2: מתקדם
- יום 1-2: Lesson 04 - Queries מתקדמים
- יום 3-5: Lesson 05 - Aggregation

### שבוע 3: תרגול
- עבור ל[תרגילים](../02-exercises/)
- פתור תרגילים בסיסיים ובינוניים

### שבוע 4: פרויקט
- צלול ל[פרויקט המלא](../03-project/)
- בנה משהו משלך!

---

## 💡 טיפים ללמידה

1. **תכנס לעומק** - אל תמהר, תבין כל שורת קוד
2. **נסה וטעה** - שנה קוד וראה מה קורה
3. **השתמש ב-Compass** - ראה את הנתונים ויזואלית
4. **קרא תיעוד** - MongoDB Docs הם מצוינים
5. **תרגל יומי** - 30 דקות ביום עדיף מ-3 שעות בשבוע

---

## 🐛 פתרון בעיות

### MongoDB לא רץ?
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### שגיאות התקנה?
```bash
# נקה cache ונסה שוב
npm cache clean --force
npm install
```

### שגיאת חיבור?
בדוק את ה-`.env` file - הכתובת נכונה?

---

## 📚 משאבים נוספים

- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [MongoDB University](https://university.mongodb.com/) - קורסים חינמיים
- [MongoDB Node.js Driver Docs](https://www.mongodb.com/docs/drivers/node/current/)

---

## 🎯 מטרת המדריך

בסוף המדריך תדעו:
- ✅ לעבוד בביטחון עם MongoDB Native Driver
- ✅ לבצע כל פעולות CRUD
- ✅ לכתוב queries מורכבים
- ✅ להשתמש ב-Aggregation Pipeline
- ✅ לבנות API מקצועי

---

**מוכנים? בואו נתחיל! ➡️ [Lesson 01](lesson-01/)**

---

**נוצר עם ❤️ למתחילים ב-MongoDB**

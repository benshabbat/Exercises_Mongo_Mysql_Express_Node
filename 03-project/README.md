# 🚀 פרויקט: מערכת ניהול חנות (Store Management)

**פרויקט מלא עם MongoDB Native Driver, Express ו-Node.js**

---

## 📋 תיאור הפרויקט

מערכת לניהול חנות אונליין שכוללת:
- 👤 ניהול משתמשים (Users)
- 📦 ניהול מוצרים (Products)  
- 🛒 ניהול הזמנות (Orders)
- 📊 דשבורד וסטטיסטיקות

---

## 🎯 מה תלמדו בפרויקט?

- ✅ מבנה פרויקט מקצועי
- ✅ חיבור MongoDB עם connection pool
- ✅ REST API מלא עם Express
- ✅ CRUD operations על כמה collections
- ✅ Relations בין collections
- ✅ Error handling מקצועי
- ✅ Validation של נתונים
- ✅ Aggregation למניפולציות מורכבות
- ✅ Best practices

---

## 📁 מבנה הפרויקט

```
03-project/
├── src/
│   ├── config/
│   │   └── database.js          # חיבור MongoDB
│   ├── models/
│   │   ├── User.js              # מודל משתמשים
│   │   ├── Product.js           # מודל מוצרים
│   │   └── Order.js             # מודל הזמנות
│   ├── controllers/
│   │   ├── userController.js    # לוגיקת משתמשים
│   │   ├── productController.js # לוגיקת מוצרים
│   │   ├── orderController.js   # לוגיקת הזמנות
│   │   └── statsController.js   # סטטיסטיקות
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── statsRoutes.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validator.js
│   └── utils/
│       └── helpers.js
├── tests/                        # בדיקות
├── docs/                         # תיעוד
├── .env.example
├── .gitignore
├── package.json
├── server.js                     # נקודת כניסה
└── README.md
```

---

## 🚀 התקנה והרצה

### שלב 1: התקנת תלויות
```bash
cd 03-project
npm install
```

### שלב 2: הגדרת משתני סביבה
```bash
cp .env.example .env
```

ערוך את `.env`:
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=storeDB
PORT=3000
NODE_ENV=development
```

### שלב 3: הרצת הפרויקט
```bash
# הרצה רגילה
npm start

# הרצה עם nodemon (פיתוח)
npm run dev
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  role: String, // 'customer', 'admin'
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  images: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,  // Reference to Users
  items: [{
    productId: ObjectId,  // Reference to Products
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String, // 'pending', 'processing', 'completed', 'cancelled'
  shippingAddress: {
    street: String,
    city: String,
    zipCode: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Users
- `POST /api/users` - יצירת משתמש חדש
- `GET /api/users` - קבלת כל המשתמשים
- `GET /api/users/:id` - קבלת משתמש ספציפי
- `PUT /api/users/:id` - עדכון משתמש
- `DELETE /api/users/:id` - מחיקת משתמש

### Products
- `POST /api/products` - הוספת מוצר חדש
- `GET /api/products` - קבלת כל המוצרים
- `GET /api/products/:id` - קבלת מוצר ספציפי
- `GET /api/products/category/:category` - מוצרים לפי קטגוריה
- `PUT /api/products/:id` - עדכון מוצר
- `DELETE /api/products/:id` - מחיקת מוצר

### Orders
- `POST /api/orders` - יצירת הזמנה חדשה
- `GET /api/orders` - קבלת כל ההזמנות
- `GET /api/orders/:id` - קבלת הזמנה ספציפית
- `GET /api/orders/user/:userId` - הזמנות של משתמש
- `PUT /api/orders/:id/status` - עדכון סטטוס הזמנה
- `DELETE /api/orders/:id` - מחיקת הזמנה

### Statistics
- `GET /api/stats/dashboard` - דשבורד כללי
- `GET /api/stats/sales` - סטטיסטיקות מכירות
- `GET /api/stats/products/top` - המוצרים הנמכרים ביותר

---

## 💡 תכונות מיוחדות

### 1. Connection Pool
```javascript
// config/database.js
const client = new MongoClient(uri, {
  maxPoolSize: 10,
  minPoolSize: 5
});
```

### 2. Error Handling
```javascript
// middleware/errorHandler.js
app.use((err, req, res, next) => {
  // טיפול מרוכז בשגיאות
});
```

### 3. Validation
```javascript
// middleware/validator.js
function validateProduct(data) {
  // בדיקת נתונים לפני שמירה
}
```

### 4. Aggregation Pipeline
```javascript
// דוגמה: top 5 מוצרים נמכרים
db.collection('orders').aggregate([
  { $unwind: '$items' },
  { $group: {
      _id: '$items.productId',
      totalSold: { $sum: '$items.quantity' }
  }},
  { $sort: { totalSold: -1 } },
  { $limit: 5 }
]);
```

---

## 🧪 בדיקות

```bash
# הרץ את כל הבדיקות
npm test

# בדיקה ספציפית
npm test users
```

---

## 📚 מדריכים נוספים

- [מדריך מפורט לשימוש ב-API](docs/API_GUIDE.md)
- [הוספת תכונות חדשות](docs/ADD_FEATURES.md)
- [Deploy לפרודקשן](docs/DEPLOYMENT.md)

---

## 🎯 אתגרים להרחבה

1. **Authentication** - הוסף JWT לאימות משתמשים
2. **Images Upload** - העלאת תמונות למוצרים
3. **Search** - חיפוש מתקדם במוצרים
4. **Pagination** - הוסף pagination לכל ה-endpoints
5. **Reviews** - מערכת ביקורות למוצרים
6. **Cart** - עגלת קניות
7. **Wishlist** - רשימת משאלות
8. **Email Notifications** - שליחת מיילים
9. **Admin Dashboard** - ממשק ניהול
10. **Testing** - הוסף unit tests ו-integration tests

---

## 🤝 תרומה

מצאת bug או רוצה להוסיף feature? שלח Pull Request!

---

## 📄 רישיון

MIT License

---

**נוצר עם ❤️ למתחילים ב-MongoDB**

// Controllers - פונקציות לטיפול בבקשות CRUD
// כל הפעולות משתמשות ב-MongoDB Native Driver

import { ObjectId } from 'mongodb';
import { getDatabase } from '../config/database.js';

// שם הקולקשן שבו נעבוד (אוסף המסמכים)
const COLLECTION_NAME = 'users';

/**
 * CREATE - יצירת משתמש חדש
 * POST /api/users
 */
export const createUser = async (req, res) => {
  try {
    // 1. מקבלים את הנתונים מגוף הבקשה
    const { name, email, age } = req.body;

    // 2. בדיקת ולידציה בסיסית
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'שם ואימייל הם שדות חובה' 
      });
    }

    // 3. מקבלים גישה למסד הנתונים
    const db = getDatabase();

    // 4. מוסיפים משתמש חדש לקולקשן
    const result = await db.collection(COLLECTION_NAME).insertOne({
      name,
      email,
      age: age || null,
      createdAt: new Date()
    });

    // 5. מחזירים תשובה מוצלחת
    res.status(201).json({
      success: true,
      message: 'משתמש נוצר בהצלחה',
      data: {
        _id: result.insertedId,
        name,
        email,
        age
      }
    });
  } catch (error) {
    console.error('שגיאה ביצירת משתמש:', error);
    res.status(500).json({ 
      success: false, 
      message: 'שגיאת שרת ביצירת משתמש' 
    });
  }
};

/**
 * READ ALL - קריאת כל המשתמשים
 * GET /api/users
 */
export const getAllUsers = async (req, res) => {
  try {
    // 1. מקבלים גישה למסד הנתונים
    const db = getDatabase();

    // 2. מביאים את כל המשתמשים מהקולקשן
    // find() ללא פרמטרים מחזיר את כל המסמכים
    const users = await db.collection(COLLECTION_NAME)
      .find()
      .toArray();

    // 3. מחזירים את הרשימה
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('שגיאה בקריאת משתמשים:', error);
    res.status(500).json({ 
      success: false, 
      message: 'שגיאת שרת בקריאת משתמשים' 
    });
  }
};

/**
 * READ ONE - קריאת משתמש בודד לפי ID
 * GET /api/users/:id
 */
export const getUserById = async (req, res) => {
  try {
    // 1. מקבלים את ה-ID מה-URL
    const { id } = req.params;

    // 2. בדיקה אם ה-ID תקין
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID לא תקין' 
      });
    }

    // 3. מקבלים גישה למסד הנתונים
    const db = getDatabase();

    // 4. מחפשים משתמש ספציפי
    const user = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });

    // 5. בדיקה אם המשתמש נמצא
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'משתמש לא נמצא' 
      });
    }

    // 6. מחזירים את המשתמש
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('שגיאה בקריאת משתמש:', error);
    res.status(500).json({ 
      success: false, 
      message: 'שגיאת שרת בקריאת משתמש' 
    });
  }
};

/**
 * UPDATE - עדכון משתמש קיים
 * PUT /api/users/:id
 */
export const updateUser = async (req, res) => {
  try {
    // 1. מקבלים את ה-ID והנתונים לעדכון
    const { id } = req.params;
    const { name, email, age } = req.body;

    // 2. בדיקה אם ה-ID תקין
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID לא תקין' 
      });
    }

    // 3. מקבלים גישה למסד הנתונים
    const db = getDatabase();

    // 4. בונים אובייקט עם השדות לעדכון
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (age !== undefined) updateFields.age = age;
    updateFields.updatedAt = new Date();

    // 5. מעדכנים את המשתמש
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    // 6. בדיקה אם העדכון הצליח
    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'משתמש לא נמצא' 
      });
    }

    // 7. מחזירים תשובה מוצלחת
    res.status(200).json({
      success: true,
      message: 'משתמש עודכן בהצלחה',
      data: {
        _id: id,
        ...updateFields
      }
    });
  } catch (error) {
    console.error('שגיאה בעדכון משתמש:', error);
    res.status(500).json({ 
      success: false, 
      message: 'שגיאת שרת בעדכון משתמש' 
    });
  }
};

/**
 * DELETE - מחיקת משתמש
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    // 1. מקבלים את ה-ID
    const { id } = req.params;

    // 2. בדיקה אם ה-ID תקין
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID לא תקין' 
      });
    }

    // 3. מקבלים גישה למסד הנתונים
    const db = getDatabase();

    // 4. מוחקים את המשתמש
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    });

    // 5. בדיקה אם המחיקה הצליחה
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'משתמש לא נמצא' 
      });
    }

    // 6. מחזירים תשובה מוצלחת
    res.status(200).json({
      success: true,
      message: 'משתמש נמחק בהצלחה'
    });
  } catch (error) {
    console.error('שגיאה במחיקת משתמש:', error);
    res.status(500).json({ 
      success: false, 
      message: 'שגיאת שרת במחיקת משתמש' 
    });
  }
};

// Routes - ניתוב של הבקשות ל-Controllers
// מגדירים את כל הנתיבים לפעולות CRUD

import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// ======================================
// נתיבים (Routes) לפעולות CRUD
// ======================================

/**
 * POST /api/users
 * יצירת משתמש חדש
 * Body: { name, email, age }
 */
router.post('/', createUser);

/**
 * GET /api/users
 * קבלת רשימת כל המשתמשים
 */
router.get('/', getAllUsers);

/**
 * GET /api/users/:id
 * קבלת משתמש ספציפי לפי ID
 */
router.get('/:id', getUserById);

/**
 * PUT /api/users/:id
 * עדכון משתמש קיים
 * Body: { name, email, age }
 */
router.put('/:id', updateUser);

/**
 * DELETE /api/users/:id
 * מחיקת משתמש
 */
router.delete('/:id', deleteUser);

export default router;

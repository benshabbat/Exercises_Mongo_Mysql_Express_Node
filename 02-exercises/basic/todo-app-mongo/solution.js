// ========================================
// Todo List App - MongoDB Native Driver
// פתרון מלא
// ========================================

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let db = null;

// ========================================
// חיבור למסד נתונים
// ========================================

async function connectToDatabase() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DATABASE_NAME);
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// ========================================
// CRUD בסיסי
// ========================================

// POST /todos - יצירת משימה חדשה
app.post('/todos', async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const newTodo = {
      title: title.trim(),
      description: description || '',
      completed: false,
      priority: priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('todos').insertOne(newTodo);

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: { _id: result.insertedId, ...newTodo }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /todos - קבלת כל המשימות
app.get('/todos', async (req, res) => {
  try {
    const todos = await db.collection('todos')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /todos/:id - קבלת משימה ספציפית
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const todo = await db.collection('todos').findOne({
      _id: new ObjectId(id)
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// PUT /todos/:id - עדכון משימה
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (completed !== undefined) updateData.completed = completed;
    updateData.updatedAt = new Date();

    const result = await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const updatedTodo = await db.collection('todos').findOne({
      _id: new ObjectId(id)
    });

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE /todos/:id - מחיקת משימה
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const result = await db.collection('todos').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ========================================
// פעולות נוספות
// ========================================

// PATCH /todos/:id/toggle - שינוי סטטוס
app.patch('/todos/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const todo = await db.collection('todos').findOne({
      _id: new ObjectId(id)
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const result = await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          completed: !todo.completed,
          updatedAt: new Date()
        }
      }
    );

    const updatedTodo = await db.collection('todos').findOne({
      _id: new ObjectId(id)
    });

    res.json({
      success: true,
      message: 'Todo status toggled',
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /todos/completed - משימות שהושלמו
app.get('/todos/completed', async (req, res) => {
  try {
    const todos = await db.collection('todos')
      .find({ completed: true })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /todos/pending - משימות ממתינות
app.get('/todos/pending', async (req, res) => {
  try {
    const todos = await db.collection('todos')
      .find({ completed: false })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /todos/priority/:level - סינון לפי עדיפות
app.get('/todos/priority/:level', async (req, res) => {
  try {
    const { level } = req.params;

    if (!['low', 'medium', 'high'].includes(level)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority level. Use: low, medium, or high'
      });
    }

    const todos = await db.collection('todos')
      .find({ priority: level })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /todos/search?q=... - חיפוש משימות
app.get('/todos/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json({
        success: true,
        count: 0,
        data: []
      });
    }

    const todos = await db.collection('todos')
      .find({
        title: { $regex: q, $options: 'i' }
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE /todos - מחיקת כל המשימות שהושלמו
app.delete('/todos', async (req, res) => {
  try {
    const result = await db.collection('todos').deleteMany({
      completed: true
    });

    res.json({
      success: true,
      message: `${result.deletedCount} completed todo(s) deleted`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ========================================
// סטטיסטיקות
// ========================================

// GET /todos/stats - סטטיסטיקות
app.get('/todos/stats', async (req, res) => {
  try {
    const total = await db.collection('todos').countDocuments();
    const completed = await db.collection('todos').countDocuments({ completed: true });
    const pending = await db.collection('todos').countDocuments({ completed: false });

    const lowPriority = await db.collection('todos').countDocuments({ priority: 'low' });
    const mediumPriority = await db.collection('todos').countDocuments({ priority: 'medium' });
    const highPriority = await db.collection('todos').countDocuments({ priority: 'high' });

    res.json({
      success: true,
      stats: {
        total,
        completed,
        pending,
        byPriority: {
          low: lowPriority,
          medium: mediumPriority,
          high: highPriority
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ========================================
// נתיב בסיסי
// ========================================

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Todo API! 📝',
    version: '1.0.0',
    endpoints: {
      todos: '/todos',
      completed: '/todos/completed',
      pending: '/todos/pending',
      search: '/todos/search?q=...',
      stats: '/todos/stats'
    }
  });
});

// ========================================
// הפעלת השרת
// ========================================

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Database: ${process.env.DATABASE_NAME}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

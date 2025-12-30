// ========================================
// מערכת סטודנטים וקורסים - MongoDB Native Driver
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
// Helper Functions
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

function getCollection(collectionName) {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db.collection(collectionName);
}

function validateObjectId(id) {
  return ObjectId.isValid(id);
}

// ========================================
// חלק 2: ניהול סטודנטים
// ========================================

// GET /students - קבלת כל הסטודנטים
app.get('/students', async (req, res) => {
  try {
    const students = await getCollection('students')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /students/:id - קבלת סטודנט ספציפי
app.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }

    const student = await getCollection('students').findOne({ 
      _id: new ObjectId(id) 
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /students - יצירת סטודנט חדש
app.post('/students', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    // בדיקה שהאימייל לא קיים
    const existingStudent = await getCollection('students').findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }

    const newStudent = {
      name,
      email,
      enrolledCourses: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await getCollection('students').insertOne(newStudent);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: { _id: result.insertedId, ...newStudent }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /students/:id - עדכון סטודנט
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!validateObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    updateData.updatedAt = new Date();

    const result = await getCollection('students').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const updatedStudent = await getCollection('students').findOne({ 
      _id: new ObjectId(id) 
    });

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /students/:id - מחיקת סטודנט
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }

    const result = await getCollection('students').deleteOne({ 
      _id: new ObjectId(id) 
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// חלק 3: ניהול קורסים
// ========================================

// GET /courses - קבלת כל הקורסים
app.get('/courses', async (req, res) => {
  try {
    const courses = await getCollection('courses')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /courses/:id - קבלת קורס ספציפי
app.get('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const course = await getCollection('courses').findOne({ 
      _id: new ObjectId(id) 
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /courses - יצירת קורס חדש
app.post('/courses', async (req, res) => {
  try {
    const { name, instructor, credits, description } = req.body;

    if (!name || !instructor || !credits) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, instructor, and credits are required' 
      });
    }

    if (typeof credits !== 'number' || credits <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Credits must be a positive number' 
      });
    }

    const newCourse = {
      name,
      instructor,
      credits,
      description: description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await getCollection('courses').insertOne(newCourse);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { _id: result.insertedId, ...newCourse }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /courses/:id - עדכון קורס
app.put('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, instructor, credits, description } = req.body;

    if (!validateObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (instructor) updateData.instructor = instructor;
    if (credits) updateData.credits = credits;
    if (description !== undefined) updateData.description = description;
    updateData.updatedAt = new Date();

    const result = await getCollection('courses').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const updatedCourse = await getCollection('courses').findOne({ 
      _id: new ObjectId(id) 
    });

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /courses/:id - מחיקת קורס (עם בדיקה)
app.delete('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const courseId = new ObjectId(id);

    // בדיקה אם יש סטודנטים רשומים לקורס
    const enrolledCount = await getCollection('students').countDocuments({
      enrolledCourses: courseId
    });

    if (enrolledCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot delete course. ${enrolledCount} student(s) are enrolled.` 
      });
    }

    const result = await getCollection('courses').deleteOne({ _id: courseId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// חלק 4: ניהול הרשמות
// ========================================

// POST /students/:studentId/enroll/:courseId - רישום סטודנט לקורס
app.post('/students/:studentId/enroll/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    if (!validateObjectId(studentId) || !validateObjectId(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const studentObjId = new ObjectId(studentId);
    const courseObjId = new ObjectId(courseId);

    // בדיקת קיום סטודנט
    const student = await getCollection('students').findOne({ _id: studentObjId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // בדיקת קיום קורס
    const course = await getCollection('courses').findOne({ _id: courseObjId });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // בדיקה אם כבר רשום
    const alreadyEnrolled = student.enrolledCourses.some(id => id.equals(courseObjId));
    if (alreadyEnrolled) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student already enrolled in this course' 
      });
    }

    // רישום סטודנט לקורס
    await getCollection('students').updateOne(
      { _id: studentObjId },
      { 
        $addToSet: { enrolledCourses: courseObjId },
        $set: { updatedAt: new Date() }
      }
    );

    const updatedStudent = await getCollection('students').findOne({ _id: studentObjId });

    res.json({
      success: true,
      message: 'Student enrolled successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /students/:studentId/unenroll/:courseId - הסרת סטודנט מקורס
app.delete('/students/:studentId/unenroll/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    if (!validateObjectId(studentId) || !validateObjectId(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const studentObjId = new ObjectId(studentId);
    const courseObjId = new ObjectId(courseId);

    // בדיקת קיום סטודנט
    const student = await getCollection('students').findOne({ _id: studentObjId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // בדיקה אם רשום לקורס
    const isEnrolled = student.enrolledCourses.some(id => id.equals(courseObjId));
    if (!isEnrolled) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not enrolled in this course' 
      });
    }

    // הסרה מהקורס
    await getCollection('students').updateOne(
      { _id: studentObjId },
      { 
        $pull: { enrolledCourses: courseObjId },
        $set: { updatedAt: new Date() }
      }
    );

    const updatedStudent = await getCollection('students').findOne({ _id: studentObjId });

    res.json({
      success: true,
      message: 'Student unenrolled successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /students/:studentId/courses - קבלת כל הקורסים של סטודנט
app.get('/students/:studentId/courses', async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!validateObjectId(studentId)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }

    const studentObjId = new ObjectId(studentId);
    const student = await getCollection('students').findOne({ _id: studentObjId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // מציאת כל הקורסים שהסטודנט רשום אליהם
    const courses = await getCollection('courses').find({
      _id: { $in: student.enrolledCourses }
    }).toArray();

    res.json({
      success: true,
      student: student.name,
      count: courses.length,
      courses: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /courses/:courseId/students - קבלת כל הסטודנטים בקורס
app.get('/courses/:courseId/students', async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!validateObjectId(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const courseObjId = new ObjectId(courseId);
    const course = await getCollection('courses').findOne({ _id: courseObjId });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // מציאת כל הסטודנטים הרשומים לקורס
    const students = await getCollection('students').find({
      enrolledCourses: courseObjId
    }).toArray();

    res.json({
      success: true,
      course: course.name,
      count: students.length,
      students: students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// חלק 5: חיפוש וסינון
// ========================================

// GET /students/search?name=...&email=...
app.get('/students/search', async (req, res) => {
  try {
    const { name, email } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    const students = await getCollection('students').find(query).toArray();

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /courses/search?instructor=...
app.get('/courses/search', async (req, res) => {
  try {
    const { instructor } = req.query;
    const query = {};

    if (instructor) {
      query.instructor = { $regex: instructor, $options: 'i' };
    }

    const courses = await getCollection('courses').find(query).toArray();

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /courses/filter?minCredits=...&maxCredits=...
app.get('/courses/filter', async (req, res) => {
  try {
    const minCredits = parseInt(req.query.minCredits) || 0;
    const maxCredits = parseInt(req.query.maxCredits) || 999;

    const courses = await getCollection('courses').find({
      credits: { $gte: minCredits, $lte: maxCredits }
    }).toArray();

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /students/filter?hasEnrollments=true/false
app.get('/students/filter', async (req, res) => {
  try {
    const hasEnrollments = req.query.hasEnrollments === 'true';
    let query = {};

    if (hasEnrollments) {
      query.enrolledCourses = { $exists: true, $not: { $size: 0 } };
    } else {
      query.enrolledCourses = { $size: 0 };
    }

    const students = await getCollection('students').find(query).toArray();

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// חלק 6: סטטיסטיקות
// ========================================

// GET /stats - סטטיסטיקות כלליות
app.get('/stats', async (req, res) => {
  try {
    const totalStudents = await getCollection('students').countDocuments();
    const totalCourses = await getCollection('courses').countDocuments();

    // חישוב סה"כ הרשמות
    const students = await getCollection('students').find().toArray();
    const totalEnrollments = students.reduce((sum, s) => sum + s.enrolledCourses.length, 0);

    // מציאת הקורס הפופולרי ביותר
    const courses = await getCollection('courses').find().toArray();
    let mostPopularCourse = null;
    let maxEnrolled = 0;

    for (const course of courses) {
      const enrolledCount = await getCollection('students').countDocuments({
        enrolledCourses: course._id
      });

      if (enrolledCount > maxEnrolled) {
        maxEnrolled = enrolledCount;
        mostPopularCourse = {
          id: course._id,
          name: course.name,
          enrolledCount
        };
      }
    }

    // מציאת הסטודנט הכי פעיל
    let mostActiveStudent = null;
    let maxCourses = 0;

    for (const student of students) {
      if (student.enrolledCourses.length > maxCourses) {
        maxCourses = student.enrolledCourses.length;
        mostActiveStudent = {
          id: student._id,
          name: student.name,
          coursesCount: student.enrolledCourses.length
        };
      }
    }

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalCourses,
        totalEnrollments,
        mostPopularCourse,
        mostActiveStudent
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /courses/:courseId/stats - סטטיסטיקות לקורס
app.get('/courses/:courseId/stats', async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!validateObjectId(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const courseObjId = new ObjectId(courseId);
    const course = await getCollection('courses').findOne({ _id: courseObjId });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const students = await getCollection('students').find({
      enrolledCourses: courseObjId
    }).project({ name: 1, email: 1 }).toArray();

    res.json({
      success: true,
      course: {
        id: course._id,
        name: course.name,
        instructor: course.instructor,
        credits: course.credits
      },
      enrolledCount: students.length,
      students: students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /students/:studentId/stats - סטטיסטיקות לסטודנט
app.get('/students/:studentId/stats', async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!validateObjectId(studentId)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }

    const studentObjId = new ObjectId(studentId);
    const student = await getCollection('students').findOne({ _id: studentObjId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const courses = await getCollection('courses').find({
      _id: { $in: student.enrolledCourses }
    }).toArray();

    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

    res.json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email
      },
      coursesCount: courses.length,
      totalCredits,
      courses: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// חלק 7: פיצ'רים מתקדמים
// ========================================

// POST /courses/:courseId/bulk-enroll - רישום מרובה
app.post('/courses/:courseId/bulk-enroll', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { studentIds } = req.body;

    if (!validateObjectId(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'studentIds must be a non-empty array' 
      });
    }

    const courseObjId = new ObjectId(courseId);
    const course = await getCollection('courses').findOne({ _id: courseObjId });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const studentObjIds = studentIds.map(id => new ObjectId(id));

    const result = await getCollection('students').updateMany(
      { _id: { $in: studentObjIds } },
      { 
        $addToSet: { enrolledCourses: courseObjId },
        $set: { updatedAt: new Date() }
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} students enrolled successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /courses/popular?limit=5 - קורסים פופולריים
app.get('/courses/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const result = await getCollection('courses').aggregate([
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'enrolledCourses',
          as: 'enrolledStudents'
        }
      },
      {
        $project: {
          name: 1,
          instructor: 1,
          credits: 1,
          enrolledCount: { $size: '$enrolledStudents' }
        }
      },
      {
        $sort: { enrolledCount: -1 }
      },
      {
        $limit: limit
      }
    ]).toArray();

    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /students/:studentId/swap-course - החלפת קורס
app.put('/students/:studentId/swap-course', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { oldCourseId, newCourseId } = req.body;

    if (!validateObjectId(studentId) || !validateObjectId(oldCourseId) || !validateObjectId(newCourseId)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const studentObjId = new ObjectId(studentId);
    const oldCourseObjId = new ObjectId(oldCourseId);
    const newCourseObjId = new ObjectId(newCourseId);

    const student = await getCollection('students').findOne({ _id: studentObjId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // בדיקה שרשום לקורס הישן
    const hasOldCourse = student.enrolledCourses.some(id => id.equals(oldCourseObjId));
    if (!hasOldCourse) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student not enrolled in old course' 
      });
    }

    // בדיקה שלא רשום לקורס החדש
    const hasNewCourse = student.enrolledCourses.some(id => id.equals(newCourseObjId));
    if (hasNewCourse) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student already enrolled in new course' 
      });
    }

    // בדיקה שהקורס החדש קיים
    const newCourse = await getCollection('courses').findOne({ _id: newCourseObjId });
    if (!newCourse) {
      return res.status(404).json({ success: false, message: 'New course not found' });
    }

    // החלפה
    await getCollection('students').updateOne(
      { _id: studentObjId },
      { 
        $pull: { enrolledCourses: oldCourseObjId },
        $addToSet: { enrolledCourses: newCourseObjId },
        $set: { updatedAt: new Date() }
      }
    );

    const updatedStudent = await getCollection('students').findOne({ _id: studentObjId });

    res.json({
      success: true,
      message: 'Course swapped successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /courses/cleanup - מחיקת קורסים ריקים
app.delete('/courses/cleanup', async (req, res) => {
  try {
    const courses = await getCollection('courses').find().toArray();
    let deletedCount = 0;

    for (const course of courses) {
      const enrolledCount = await getCollection('students').countDocuments({
        enrolledCourses: course._id
      });

      if (enrolledCount === 0) {
        await getCollection('courses').deleteOne({ _id: course._id });
        deletedCount++;
      }
    }

    res.json({
      success: true,
      message: `${deletedCount} empty course(s) deleted`,
      deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// נתיב בסיסי
// ========================================

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Students & Courses Management API',
    version: '1.0.0',
    endpoints: {
      students: '/students',
      courses: '/courses',
      stats: '/stats'
    }
  });
});

// ========================================
// Error Handler
// ========================================

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
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

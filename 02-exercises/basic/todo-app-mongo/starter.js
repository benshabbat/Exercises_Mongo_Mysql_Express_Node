// ========================================
// Todo List App - MongoDB Native Driver
// Starter File with TODOs - For Beginners
// ========================================

// TODO 1.1: Import express

// TODO 1.1: Import MongoClient and ObjectId from mongodb

// TODO 1.1: Import dotenv

// TODO 1.2: Load dotenv.config()

// TODO 1.2: Create express app

// TODO 1.2: Set PORT from process.env.PORT (default: 3000)

// TODO 1.2: Add middleware: app.use(express.json())

// TODO 1.3: Create db variable to hold the connection
let db = null;

// ========================================
// Part 2: Database Connection
// ========================================

// TODO 2.1: Create async function connectToDatabase()
async function connectToDatabase() {
  // TODO: Create MongoClient
  // TODO: Connect
  // TODO: Save connection to db
  // TODO: Print success message
  // TODO: Handle errors (try/catch)
}

// ========================================
// Part 3: Basic CRUD Operations
// ========================================

// TODO 3.1: POST /todos - Create new todo
// Hint: Check title exists, create newTodo with all fields, insertOne

// TODO 3.2: GET /todos - Get all todos
// Hint: find().sort({ createdAt: -1 }).toArray()

// TODO 3.3: GET /todos/:id - Get specific todo
// Hint: Validate ID, findOne with ObjectId

// TODO 3.4: PUT /todos/:id - Update todo
// Hint: Build updateData, updateOne with $set

// TODO 3.5: DELETE /todos/:id - Delete todo
// Hint: deleteOne, check deletedCount

// ========================================
// Part 4: Additional Operations
// ========================================

// TODO 4.1: PATCH /todos/:id/toggle - Toggle status
// Hint: Find, toggle completed, update

// TODO 4.2: GET /todos/completed - Get completed todos
// Hint: find({ completed: true })

// TODO 4.3: GET /todos/pending - Get pending todos
// Hint: find({ completed: false })

// TODO 4.4: GET /todos/priority/:level - Filter by priority
// Hint: find({ priority: level })

// TODO 4.5: GET /todos/search?q=... - Search todos
// Hint: $regex with options: 'i'

// TODO 4.6: DELETE /todos - Delete all completed todos
// Hint: deleteMany({ completed: true })

// ========================================
// Part 5: Statistics
// ========================================

// TODO 5.1: GET /todos/stats - Statistics
// Hint: countDocuments for each category

// ========================================
// Part 6: Start Server
// ========================================

// TODO 6.2: Root route
// app.get('/', (req, res) => { ... });

// TODO 6.1: startServer function
async function startServer() {
  // TODO: Connect to database
  // TODO: Start server
  // TODO: Print message
}

// TODO 6.3: Call startServer()

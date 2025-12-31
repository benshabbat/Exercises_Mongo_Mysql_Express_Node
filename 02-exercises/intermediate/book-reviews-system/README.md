# Book Reviews System

A Node.js + Express API for managing book reviews with text transformations, using MongoDB for users and MySQL for reviews.

## Features
- User registration and authentication (Basic Auth)
- Submit book reviews with text transformations
- Multiple transformation types: UPPERCASE, REVERSED, WORD_SHUFFLE (bonus), ROT13 (bonus)
- Retrieve original review text
- Reverse transformations programmatically
- User profile with review statistics
- List user's reviews (bonus)
- Book statistics (bonus)

## Tech Stack
- **Node.js** + **Express**
- **MongoDB** (native driver) - for users
- **MySQL2** - for reviews
- HTTP Basic Authentication
- ES Modules (type: "module")

## Database Setup

### Option 1: Docker Compose (Recommended for Local Development)

The easiest way to run all required databases and admin tools is using Docker Compose.

**Start all services:**
```bash
docker-compose up -d
```

This will start:
- **MongoDB** on port `27017`
- **Mongo Express** (MongoDB Web UI) on port `8081` - http://localhost:8081
  - Username: `admin`
  - Password: `admin123`
- **MySQL** on port `3306`
- **phpMyAdmin** (MySQL Web UI) on port `8080` - http://localhost:8080
  - Server: `mysql`
  - Username: `root`
  - Password: `rootpass`

**Stop all services:**
```bash
docker-compose down
```

**Stop and remove all data (reset):**
```bash
docker-compose down -v
```

**View logs:**
```bash
docker-compose logs -f
```

The MySQL table will be created automatically when the server starts for the first time.

---

### Option 2: Manual Docker Setup

**MongoDB:**
```bash
docker run -d -p 27017:27017 --name mongodb-reviews mongo:latest
```

**MySQL:**
```bash
docker run -d -p 3306:3306 --name mysql-reviews \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=reviews_db \
  mysql:8.0
```

---

### Option 3: Cloud Services

**MongoDB Atlas:**
1. Create free account at mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Update environment variables

**Supabase (PostgreSQL - alternative to MySQL):**
1. Create account at supabase.com
2. Create project
3. Get database credentials
4. Update environment variables

## Environment Variables

Create a `.env` file or set these variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=reviews_db
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=rootpass
MYSQL_DATABASE=reviews_db
```

## Installation & Running

```bash
# Install dependencies
npm install

# Run solution
npm start

# Run in watch mode (dev)
npm run dev

# Run starter template
npm run starter
```

## API Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Body:**
```json
{
  "username": "alice",
  "password": "secret123"
}
```

**Response 201:**
```json
{
  "id": "676a5f8c9d1e2f3a4b5c6d7e",
  "username": "alice"
}
```

---

### 2. Submit Review
**POST** `/api/reviews`

**Auth:** Basic Auth (username:password in Authorization header or body)

**Body:**
```json
{
  "username": "alice",
  "password": "secret123",
  "bookTitle": "The Great Gatsby",
  "reviewText": "This is an amazing book about the American Dream",
  "transformType": "UPPERCASE",
  "rating": 5
}
```

**Response 201:**
```json
{
  "id": 42,
  "bookTitle": "The Great Gatsby",
  "transformedText": "THIS IS AN AMAZING BOOK ABOUT THE AMERICAN DREAM",
  "transformType": "UPPERCASE",
  "rating": 5
}
```

**Transform Types:**
- `UPPERCASE` - All caps (reversible)
- `REVERSED` - String reversal (reversible)
- `WORD_SHUFFLE` - Random word order (NOT reversible) - BONUS
- `ROT13` - Caesar cipher (reversible) - BONUS

---

### 3. Get Original Review
**GET** `/api/reviews/:id/original`

**Auth:** Basic Auth

**Query/Body:** `username`, `password`

**Response 200:**
```json
{
  "id": 42,
  "bookTitle": "The Great Gatsby",
  "originalText": "This is an amazing book about the American Dream",
  "transformedText": "THIS IS AN AMAZING BOOK ABOUT THE AMERICAN DREAM",
  "transformType": "UPPERCASE"
}
```

---

### 4. Reverse Transformation
**POST** `/api/reviews/:id/reverse`

**Auth:** Basic Auth

**Body:**
```json
{
  "username": "alice",
  "password": "secret123"
}
```

**Response 200 (reversible):**
```json
{
  "id": 42,
  "originalText": "This is an amazing book about the American Dream",
  "transformType": "UPPERCASE",
  "reversible": true
}
```

**Response 400 (not reversible):**
```json
{
  "id": 42,
  "transformType": "WORD_SHUFFLE",
  "reversible": false,
  "error": "CANNOT_REVERSE_TRANSFORMATION"
}
```

---

### 5. My Profile
**GET** `/api/users/me`

**Auth:** Basic Auth

**Query/Body:** `username`, `password`

**Response 200:**
```json
{
  "username": "alice",
  "totalReviews": 7,
  "memberSince": "2025-01-15T10:30:00.000Z"
}
```

---

### 6. My Reviews (BONUS)
**GET** `/api/reviews/my`

**Auth:** Basic Auth

**Query/Body:** `username`, `password`

**Response 200:**
```json
{
  "username": "alice",
  "reviews": [
    {
      "id": 42,
      "bookTitle": "The Great Gatsby",
      "transformedText": "THIS IS...",
      "transformType": "UPPERCASE",
      "rating": 5,
      "createdAt": "2025-01-20T14:30:00.000Z"
    }
  ]
}
```

---

### 7. Book Statistics (BONUS)
**GET** `/api/books/:bookTitle/stats`

**No auth required**

**Response 200:**
```json
{
  "bookTitle": "The Great Gatsby",
  "totalReviews": 12,
  "averageRating": 4.5
}
```

---

## Project Structure

```
book-reviews-system/
├── package.json
├── README.md
├── docker-compose.yml     # Docker Compose configuration
├── starter.js             # Template for students
├── solution.js            # Complete implementation
├── test-requests.http     # HTTP client test file
└── .env                   # Environment variables (create this)
```

## Testing

Use the included `test-requests.http` file with REST Client extension in VS Code, or use curl/Postman.

## Notes

- Passwords are stored in plain text (educational purposes only - never do this in production!)
- Basic Auth credentials can be passed via Authorization header or request body
- MongoDB uses native driver (no Mongoose)
- MySQL uses mysql2 with `createConnection()` (not connection pool)
- All code uses ES modules (import/export)
- Modular structure recommended (separate files for routes, controllers, services)
- Docker Compose includes phpMyAdmin and Mongo Express for easy database management

## Database Choice Explanation

**I chose Docker Compose because:**
- All services (MongoDB, MySQL, phpMyAdmin, Mongo Express) start with one command
- No need for separate installation or cloud accounts
- Full control over database versions and configuration
- Easy to reset and recreate databases for testing
- Includes web-based admin tools (phpMyAdmin and Mongo Express) for easy data viewing
- Perfect for learning and development
- Can be easily adapted for production with environment-specific configurations
- Data persists in Docker volumes between restarts

**Benefits of included admin tools:**
- **phpMyAdmin**: Visual interface for MySQL - view tables, run queries, export data
- **Mongo Express**: Visual interface for MongoDB - view collections, edit documents, manage indexes

## Grading

| Area | Points |
|------|--------|
| POST /api/auth/register | 15 |
| POST /api/reviews | 25 |
| GET /api/reviews/:id/original | 15 |
| POST /api/reviews/:id/reverse | 20 |
| GET /api/users/me | 10 |
| Authentication & Security Flow | 10 |
| Code Quality & Modularity | 10 |
| README & Setup Instructions | 5 |
| **Bonus Features** | **+20** |

**Base Total:** 100 points  
**Maximum With Bonus:** 120 points

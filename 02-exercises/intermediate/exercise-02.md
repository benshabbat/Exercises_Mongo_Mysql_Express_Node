# Exercise 02 - Book Reviews System

## Overview
Build a book review system where users can write reviews with different text transformations. Users are stored in MongoDB, and reviews are stored in MySQL.

## Goal
Create a Node.js + Express server that:
- Stores users in MongoDB
- Stores book reviews in MySQL
- Allows users to transform their review text using different algorithms
- Authenticates users before allowing operations
- Tracks statistics per user

## Tech Requirements
- Node.js + Express
- MongoDB (Docker/Atlas - using native mongodb driver, NO mongoose)
- MySQL (Docker/Supabase - using mysql2)
- Authentication: HTTP Basic Auth
- Passwords stored as plain text (for simplicity)
- No file storage
- Modular structure
- Type: "module" in package.json

## Database Schema

### MongoDB - users collection
```
{
  _id: ObjectId,
  username: string (unique),
  password: string (plain text),
  totalReviews: number,
  createdAt: Date
}
```

### MySQL - reviews table
```
id - INT PRIMARY KEY AUTO_INCREMENT
username - VARCHAR(255)
book_title - VARCHAR(255)
original_text - TEXT
transformed_text - TEXT
transform_type - VARCHAR(50)
rating - INT (1-5)
created_at - TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## Supported Transformations
1. **UPPERCASE** - Convert entire review to uppercase (reversible)
2. **REVERSED** - Reverse the entire string (reversible)
3. **WORD_SHUFFLE** - Randomly shuffle the words order (NOT reversible) - BONUS
4. **ROT13** - Caesar cipher with rotation of 13 (reversible) - BONUS

## API Endpoints

### 1) Register User
**POST /api/auth/register**

Request Body:
```json
{
  "username": "alice",
  "password": "secret123"
}
```

Response 201:
```json
{
  "id": "mongoUserId",
  "username": "alice"
}
```

**Description:** Create a new user in MongoDB. Username must be unique.

---

### 2) Submit Review
**POST /api/reviews**

**Authentication Required** - Basic Auth (username + password in headers/body/query)

Request Body:
```json
{
  "bookTitle": "The Great Gatsby",
  "reviewText": "This is an amazing book about the American Dream",
  "transformType": "UPPERCASE",
  "rating": 5
}
```

Response 201:
```json
{
  "id": 42,
  "bookTitle": "The Great Gatsby",
  "transformedText": "THIS IS AN AMAZING BOOK ABOUT THE AMERICAN DREAM",
  "transformType": "UPPERCASE",
  "rating": 5
}
```

**Description:** 
- Transform the review text based on transformType
- Save the review in MySQL with both original and transformed text
- Increment user's totalReviews counter in MongoDB
- Rating must be between 1-5

---

### 3) Get Original Review
**GET /api/reviews/:id/original**

**Authentication Required** - Basic Auth

Response 200 (reversible transformation):
```json
{
  "id": 42,
  "bookTitle": "The Great Gatsby",
  "originalText": "This is an amazing book about the American Dream",
  "transformedText": "THIS IS AN AMAZING BOOK ABOUT THE AMERICAN DREAM",
  "transformType": "UPPERCASE"
}
```

Response 200 (non-reversible transformation):
```json
{
  "id": 42,
  "originalText": "This is an amazing book about the American Dream",
  "warning": "Original text retrieved from storage (transformation was not reversible)"
}
```

**Description:**
- Fetch the review by ID from MySQL
- Return original text (always available since we store it)

---

### 4) Reverse Transformation
**POST /api/reviews/:id/reverse**

**Authentication Required** - Basic Auth

Request: No body needed

Response 200 (reversible):
```json
{
  "id": 42,
  "originalText": "This is an amazing book about the American Dream",
  "transformType": "UPPERCASE",
  "reversible": true
}
```

Response 400 (not reversible):
```json
{
  "id": 42,
  "transformType": "WORD_SHUFFLE",
  "reversible": false,
  "error": "CANNOT_REVERSE_TRANSFORMATION"
}
```

**Description:**
- Try to reverse the transformation programmatically
- For UPPERCASE and REVERSED - return the reversed result
- For WORD_SHUFFLE and ROT13 - return error

---

### 5) My Profile
**GET /api/users/me**

**Authentication Required** - Basic Auth

Response 200:
```json
{
  "username": "alice",
  "totalReviews": 7,
  "memberSince": "2025-01-15T10:30:00.000Z"
}
```

**Description:** Return user data from MongoDB for the authenticated user.

---

### 6) My Reviews List (BONUS)
**GET /api/reviews/my**

**Authentication Required** - Basic Auth

Response 200:
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

**Description:** Return all reviews created by the authenticated user from MySQL.

---

### 7) Book Statistics (BONUS)
**GET /api/books/:bookTitle/stats**

Response 200:
```json
{
  "bookTitle": "The Great Gatsby",
  "totalReviews": 12,
  "averageRating": 4.5
}
```

**Description:** Return statistics for a specific book from MySQL.

---

## Transformation Algorithms

### UPPERCASE
- Convert all characters to uppercase
- Reversible: Yes (though we can't perfectly restore original casing)

### REVERSED
- Reverse the entire string character by character
- Reversible: Yes (reverse it again)

### WORD_SHUFFLE (BONUS)
1. Split text into words by spaces
2. Shuffle words randomly
3. Join back with spaces
- Reversible: No

### ROT13 (BONUS)
1. Shift each letter by 13 positions in the alphabet
2. A→N, B→O, ..., N→A, O→B, etc.
3. Non-letters remain unchanged
- Reversible: Yes (apply ROT13 again)

---

## Grading Criteria

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

---

## Submission Requirements

Your submission should include:

1. **Node.js Project** with modular structure
2. **README.md** containing:
   - Docker/cloud setup commands for MongoDB and MySQL
   - How to start the server
   - Complete endpoint documentation with examples
   - Database choice explanation (Docker vs Atlas/Supabase and why)
   - Environment variables needed
3. **test-requests.http** file with example requests

---

## Setup Instructions Reminder

Remember to document in your README:
- Which database hosting you chose (Docker/Atlas for MongoDB, Docker/Supabase for MySQL)
- Why you made that choice
- How to set up and run the databases
- Environment variables needed
- npm install and start commands

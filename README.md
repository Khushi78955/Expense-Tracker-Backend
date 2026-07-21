# Expense Tracker Backend

A RESTful backend API for managing personal expenses with JWT authentication, PostgreSQL, and Docker support.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Refresh Token Authentication
- Logout
- Expense CRUD
- Monthly Budget Tracking
- Budget Status Calculation
- Input Validation using Zod
- Password Hashing using bcrypt
- Rate Limiting
- Helmet Security
- Cookie-based Refresh Tokens
- Docker Support
- PostgreSQL Database

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- Zod
- Docker
- Helmet
- express-rate-limit
- cookie-parser
- pg

---

## Project Structure

```
Expense-Tracker-Backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   ├── app.js
│   └── server.js
│
├── schema.sql
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Khushi78955/Expense-Tracker-Backend.git
```

Move into the project

```bash
cd Expense-Tracker-Backend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=2000

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=expense_tracker_db

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

---

## Database Setup

Create the database

```bash
createdb expense_tracker_db
```

Run the schema

```bash
psql -d expense_tracker_db -f schema.sql
```

---

## Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## Docker

Build and run

```bash
docker compose up --build
```

Stop containers

```bash
docker compose down
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |
| POST | `/auth/refresh` |
| POST | `/auth/logout` |

---

### Expenses

| Method | Endpoint |
|---------|----------|
| POST | `/expenses` |
| GET | `/expenses` |
| GET | `/expenses/:id` |
| PUT | `/expenses/:id` |
| DELETE | `/expenses/:id` |

---

### Budget

| Method | Endpoint |
|---------|----------|
| GET | `/budgets/status` |

---

## Security

- JWT Authentication
- Refresh Tokens
- HTTP Only Cookies
- Password Hashing with bcrypt
- Helmet
- Rate Limiting
- Input Validation using Zod

---

## Author

Khushi

GitHub

https://github.com/Khushi78955

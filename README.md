# 📚 Book Management App --- Starter Project

A simple starter project for managing book data using **Node.js**,
**Express**, **Handlebars**, and **PostgreSQL**.\
This project is designed as a basic CRUD practice and collaboration
starter for learners.

---

## 🚀 Features (Starter Version)

- Express server with modular structure\
- Handlebars as the template/view engine\
- PostgreSQL connection using `pg`\
- Environment variable support using `.env`\
- Folder structure ready for scaling\
- Sample route and DB connection test

---

## 📂 Project Structure

    book-management-app/
    │
    ├─ src/
    │  ├─ app.js               # Express initialization
    │  ├─ config/
    │  │   └─ db.js            # PostgreSQL connection setup
    │  ├─ routes/              # App routes (empty for now)
    │  ├─ controllers/         # Logic controllers (empty for now)
    │  └─ views/               # Handlebars templates
    │      ├─ layouts/
    │      │    └─ main.hbs
    │      └─ pages/
    │           └─ welcome.hbs
    │
    ├─ server.js               # App entry point
    ├─ package.json
    ├─ .env.example            # Environment variable template
    └─ README.md

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd book-management-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

Copy the provided `.env.example`:

```bash
cp .env.example .env
```

Fill in your own values:

    PORT=3006

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=book_management

---

## 🗄️ Database Setup

Create the database:

```sql
CREATE DATABASE book_management;
```

Create the table:

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  sinopsis VARCHAR(100),
  author VARCHAR(255),
  publication_year INT,
  status VARCHAR(50)
);
```

(Optional) Insert sample data:

```sql
INSERT INTO books (title, sinopsis, author, publication_year, status)
VALUES ('Sample Book', 'This is a sample book.', 'John Doe', 2024, 'available');
```

---

## ▶️ Run the Project

### Development (nodemon recommended)

```bash
npm run dev
```

The app will run at:

    http://127.0.0.1:<YOUR_PORT>

---

## 🤝 Contribution Guide

- Use feature branches for new modules\
- Commit with clear messages\
- Create PR for review\
- Keep code clean and modular

---

## 📝 License

Free to use for learning and development purposes.

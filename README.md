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
    ├─ config/
    │  └─ db.js                   # PostgreSQL database connection
    │
    ├─ controllers/               # Request handlers / business logic
    │
    ├─ routes/                    # Express route definitions
    │
    ├─ sql/                       # Raw SQL files / query reference (optional)
    │
    ├─ src/
    │  ├─ public/                 # Static assets
    │  │  ├─ css/                 # Stylesheets
    │  │  └─ js/                  # Client-side JavaScript
    │  │
    │  └─ views/                  # Handlebars templates
    │     ├─ layouts/             # Main layouts
    │     │  └─ main.hbs
    │     ├─ pages/               # Page-level views
    │     └─ partials/            # Reusable components (navbar, footer, etc)
    │
    ├─ .env                       # Environment variables
    ├─ .gitignore                 # Git ignore rules
    ├─ app.js                     # Express app configuration
    ├─ server.js                  # Application entry point
    ├─ package.json               # Project metadata & dependencies
    ├─ package-lock.json
    └─ README.md                  # Project documentation

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

Seluruh kebutuhan query SQL pada project ini disimpan di dalam folder `sql/`.
Folder tersebut berisi query untuk pembuatan database, pembuatan tabel, relasi antar tabel, serta data dummy (seed).

### 📄 Contoh Create Table

Berikut contoh salah satu tabel yang terdapat di folder `sql/`:

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);
```

### 📄 Contoh Insert Data Category

Berikut contoh salah satu insert data yang terdapat di folder `sql/`:

```sql
INSERT INTO categories (name, description)
VALUES ('Teknologi', 'Buku seputar teknologi dan pemrograman');
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

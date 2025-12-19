import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Otomatis pakai env file

const { Pool } = pg; // koneksi otomatis yang efisien,

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// connection
db.connect().then(() => console.log("Connected to PostgreSQL ✔"));

export default db;

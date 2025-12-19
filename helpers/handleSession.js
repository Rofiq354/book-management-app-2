import dotenv from "dotenv";
import session from "express-session";

dotenv.config(); // supaya bisa baca file .env

const handleSession = session({
  name: "book-management-session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2, // 2 jam
  },
});

export default handleSession;

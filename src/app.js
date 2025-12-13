import express from "express";
import db from "./config/db.js"; // dapatkan database koneksi
import { engine } from "express-handlebars"; // untuk layouting seperti navbar, footer dll.
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // Mengubah URL file ES module menjadi path file normal
const __dirname = path.dirname(__filename); // ngambil folder dari file saat ini.

const app = express();

// ============================
// CONFIG VIEW ENGINE
// ============================

// express-handlebars otomatis pakai views/layouts/main.hbs sebagai root-nya
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // path buat render halamannya

// ============================
// MIDDLEWARE
// ============================
app.use(express.urlencoded({ extended: true })); // form handler
app.use(express.json()); // JSON handler
app.use("/public", express.static("src/public")); // folder public, di url ada url /public

// ============================
// ROUTES
// ============================
// app.get("/", (req, res) => {
//   res.render("pages/welcome", { title: "Home Page" });
// });

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * from public.books");
  const books = result.rows;
  res.render("pages/welcome", { books });
});

export default app;

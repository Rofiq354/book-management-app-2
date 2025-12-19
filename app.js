import express from "express";
import { engine } from "express-handlebars"; // untuk layouting seperti navbar, footer dll.
import methodOverride from "method-override"; // supaya bisa pakai full restfull, get, post, put, delete, et.c
import path from "path";
import { fileURLToPath } from "url";

// import routes
import authRouter from "./routes/authRoutes.js";
import booksRouter from "./routes/bookRoutes.js";
import rolesRouter from "./routes/roleRoutes.js";
import usersRouter from "./routes/userRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import categoriesRouter from "./routes/categoryRoutes.js";
import handleSession from "./helpers/handleSession.js";

const __filename = fileURLToPath(import.meta.url); // Mengubah URL file ES module menjadi path file normal
const __dirname = path.dirname(__filename); // ngambil folder dari file saat ini.

const app = express();

// ============================
// CONFIG VIEW ENGINE
// ============================

// express-handlebars otomatis pakai views/layouts/main.hbs sebagai root-nya
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/src", "views")); // path buat render halamannya

// ============================
// MIDDLEWARE
// ============================
app.use(express.urlencoded({ extended: true })); // form handler
app.use(express.json()); // JSON handler
app.use(methodOverride("_method"));
app.use("/public", express.static("src/public")); // folder public, di url ada url /public
app.use(handleSession);

// ============================
// ROUTES
// ============================
// Auth
app.use("/auth", authRouter);
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
// Pages
app.use("/", dashboardRouter);
app.use("/categories", categoriesRouter);
app.use("/books", booksRouter);

export default app;

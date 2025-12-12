import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config(); // supaya bisa baca file .env

const PORT = process.env.PORT || 3000; // port ngambil dari .env kalo ga ada defaultnya 3000

// server dijalankan
app.listen(PORT, () => {
  console.log(`server jalan di http://127.0.0.1:${PORT}`);
});

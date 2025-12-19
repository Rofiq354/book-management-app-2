import express from "express";
import * as bookControllers from "../controllers/bookControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, bookControllers.getAllBooks);
router.get("/:id", isAuthenticated, bookControllers.getOneBook);
router.get(
  "/:id/edit",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  bookControllers.editBook // Edit Data
);

router.post(
  "/",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  bookControllers.addBook // Create Data
);
router.put(
  "/:id",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  bookControllers.updateBook // Update Data
);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  bookControllers.deleteBook // Delete Data
);

export default router;

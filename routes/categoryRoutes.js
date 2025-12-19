import express from "express";
import * as categoryControllers from "../controllers/categoryControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, categoryControllers.getAllCategories);
router.get("/:id", isAuthenticated, categoryControllers.getOneCategory);
router.get(
  "/:id/edit",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  categoryControllers.editCategory // Edit Data
);

router.post(
  "/",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  categoryControllers.addCategory // Create Data
);
router.put(
  "/:id",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  categoryControllers.updateCategory // Update Data
);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin", "petugas"]),
  categoryControllers.deleteCategory // Delete Data
);

export default router;

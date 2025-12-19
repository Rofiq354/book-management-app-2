import express from "express";
import * as categoryControllers from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", categoryControllers.getAllCategories);
router.get("/:id", categoryControllers.getOneCategory);
router.get("/:id/edit", categoryControllers.editCategory);

router.post("/", categoryControllers.addCategory);
router.put("/:id", categoryControllers.updateCategory);
router.delete("/:id", categoryControllers.deleteCategory);

export default router;

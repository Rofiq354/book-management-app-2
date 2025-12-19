import express from "express";
import * as bookControllers from "../controllers/bookControllers.js";

const router = express.Router();

router.get("/", bookControllers.getAllBooks);
router.get("/:id", bookControllers.getOneBook);
router.get("/:id/edit", bookControllers.editBook);

router.post("/", bookControllers.addBook);
router.put("/:id", bookControllers.updateBook);
router.delete("/:id", bookControllers.deleteBook);

export default router;

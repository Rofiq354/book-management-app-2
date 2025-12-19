import express from "express";
import * as usersControllers from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", usersControllers.getUsers);
router.get("/:id", usersControllers.getUserById);

router.post("/", usersControllers.createUser);
router.put("/:id", usersControllers.updateUser);
router.delete("/:id", usersControllers.deleteUser);

export default router;

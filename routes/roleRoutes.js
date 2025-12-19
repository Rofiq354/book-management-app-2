import express from "express";
import * as roleControllers from "../controllers/roleControllers.js";

const router = express.Router();

router.get("/", roleControllers.getRoles);
router.get("/:id", roleControllers.getRoleById);

router.post("/", roleControllers.createRole);
router.put("/:id", roleControllers.updateRole);
router.delete("/:id", roleControllers.deleteRole);

export default router;

import express from "express";
import * as roleControllers from "../controllers/roleControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  checkRole(["admin"]),
  roleControllers.getRoles
);
router.get(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  roleControllers.getRoleById
);

router.post(
  "/",
  isAuthenticated,
  checkRole(["admin"]),
  roleControllers.createRole
);
router.put(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  roleControllers.updateRole
);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  roleControllers.deleteRole
);

export default router;

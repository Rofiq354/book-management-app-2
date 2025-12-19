import express from "express";
import * as usersControllers from "../controllers/usersControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  checkRole(["admin"]),
  usersControllers.getUsers
);
router.get(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  usersControllers.getUserById
);

router.post(
  "/",
  isAuthenticated,
  checkRole(["admin"]),
  usersControllers.createUser
);
router.put(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  usersControllers.updateUser
);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  usersControllers.deleteUser
);

export default router;

import express from "express";
import * as dashboardControllers from "../controllers/dashboardControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, dashboardControllers.index);

export default router;

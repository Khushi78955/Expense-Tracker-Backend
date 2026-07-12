import express from "express";
import { getStatus } from "../controllers/budgetController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/status", authenticate, getStatus);

export default router;
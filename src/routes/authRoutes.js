import express from "express";
import { authLimiter } from "../middleware/rateLimiter.js";
import { register, login, refresh, logout } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), register)
router.post("/login", authLimiter, validate(loginSchema), login)
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
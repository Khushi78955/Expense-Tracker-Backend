import express from "express";
import { create, getAll, getOne, update, remove } from "../controllers/expenseController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createExpenseSchema } from "../validators/expenseValidator.js";

const router = express.Router();

router.post("/", authenticate, validate(createExpenseSchema), create)
router.get("/", authenticate, getAll)
router.get("/:id", authenticate, getOne)
router.put("/:id", authenticate, validate(createExpenseSchema), update)
router.delete("/:id", authenticate, remove)

export default router;
import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name cannot exceed 100 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),

    monthly_budget: z
        .number()
        .nonnegative("Budget cannot be negative")
        .optional()
});


export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});
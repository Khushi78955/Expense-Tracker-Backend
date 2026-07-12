import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js"


const app = express();

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense Tracker API is running",
    })
})

app.use("/auth", authRoutes)
app.use("/expenses", expenseRoutes);
app.use("/budgets", budgetRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

export default app;

import express from "express";

import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense Tracker API is running",
    })
})

app.use("/auth", authRoutes)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

export default app;

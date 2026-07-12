import bcrypt from "bcrypt"
import pool from "../config/db.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const SALT_ROUNDS = 10;

export const registerUser = async (userData) => {
    const { name, email, password, monthly_budget = 0 } = userData;
    
    const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    )
    if(existingUser.rows.length > 0){
        throw new Error("Email already registered")
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
        `INSERT INTO users (name, email, password, monthly_budget)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, monthly_budget, created_at`,
        [name, email, hashedPassword, monthly_budget]
    )
    return result.rows[0]
}


export const loginUser = async ({email, password}) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    )
    if(result.rows.length === 0){
        throw new Error("Invalid email or password")
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await pool.query(
        `UPDATE users
         SET refresh_token = $1
         WHERE id = $2`,
        [refreshToken, user.id]
    )
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            monthly_budget: user.monthly_budget,
        },
        accessToken,
        refreshToken
    }
}
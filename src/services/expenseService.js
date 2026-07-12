import pool from "../config/db.js"

export const createExpense = async (expenseData, userId) => {
    const {title, amount, description} = expenseData;
    const result = await pool.query(
        `INSERT INTO expenses
        (user_id, title, amount, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [userId, title, amount, description || null]
    )
    return result.rows[0];
}


export const getAllExpenses = async (userId) => {
    const result = await pool.query(
        `SELECT *
        FROM expenses
        WHERE user_id = $1
        ORDER BY created_at DESC`,
        [userId]
    )
    return result.rows;
}

export const getExpenseById = async (expenseId, userId) => {
    const result = await pool.query(
        `SELECT *
        FROM expenses
        WHERE id = $1
        AND user_id = $2`,
        [expenseId, userId]
    );
    return result.rows[0];
}

export const updateExpense = async (expenseId, userId, expenseData) => {
    const {title, amount, description} = expenseData;
    const result = await pool.query(
        `UPDATE expenses
         SET title = $1,
             amount = $2,
             description = $3
         WHERE id = $4
         AND user_id = $5
         RETURNING *`,
        [title, amount, description || null, expenseId, userId]
    )
    return result.rows[0];
}

export const deleteExpense = async (expenseId, userId) => {
    const result = await pool.query(
        `DELETE FROM expenses
         WHERE id = $1
         AND user_id = $2
         RETURNING *`,
        [expenseId, userId]
    );
    return result.rows[0];
}
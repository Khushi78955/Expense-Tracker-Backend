import pool from "../config/db.js"

export const getBudgetStatus = async (userId) => {
    const result = await pool.query(
        `SELECT
            u.monthly_budget,
            COALESCE(SUM(e.amount), 0) AS total_spent
        FROM users u
        LEFT JOIN expenses e
            ON u.id = e.user_id
        WHERE u.id = $1
        GROUP BY u.monthly_budget`,
        [userId]
    );
    const budget = result.rows[0];

    const monthlyBudget = Number(budget.monthly_budget);
    const totalSpent = Number(budget.total_spent);
    const remainingBudget = monthlyBudget - totalSpent;

    const percentageUsed = monthlyBudget > 0 ? Number(((totalSpent / monthlyBudget) * 100).toFixed(2)) : 0

    return {
        monthlyBudget,
        totalSpent,
        remainingBudget,
        percentageUsed
    }
}
import { getBudgetStatus } from "../services/budgetService.js";
export const getStatus = async (req, res) => {
    try{
        const status = await getBudgetStatus(req.user.id);
        return res.status(200).json({
            success: true,
            data: status
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}
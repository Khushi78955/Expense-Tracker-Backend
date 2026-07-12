import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense} from "../services/expenseService.js";


export const create = async (req, res) => {
    try{
        const expense = await createExpense(req.body, req.user.id);
        return res.status(201).json({
            success: true,
            data: expense
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



export const getAll = async (req, res) => {
    try{
        const expenses = await getAllExpenses(req.user.id);
        return res.status(200).json({
            success: true,
            data: expenses
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getOne = async (req, res) => {
    try{
        const expense = await getExpenseById(req.params.id, req.user.id);
        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: expense
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



export const update = async (req, res) => {
    try{
        const expense = await updateExpense(req.params.id, req.user.id, req.body);
        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: expense
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const remove = async (req, res) => {
    try{
        const expense = await deleteExpense(req.params.id, req.user.id);
        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: expense
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

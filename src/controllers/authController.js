import { registerUser } from "../services/authService.js";
export const register = async (req, res) => {
    try{
        const user = await registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        })
    } catch(err){
        if (err.message === "Email already registered") {
            return res.status(409).json({
                success: false,
                message: err.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}
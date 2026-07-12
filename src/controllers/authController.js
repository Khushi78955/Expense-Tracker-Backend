import { registerUser, loginUser } from "../services/authService.js";


export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (err) {
        if (err.message === "Email already registered") {
            return res.status(409).json({
                success: false,
                message: err.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const login = async (req, res) => {
    try {
        const { user, accessToken, refreshToken } = await loginUser(req.body);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user,
        });
    } catch (err) {
    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
}
};
import jwt from "jsonwebtoken"
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../services/authService.js";


export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
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

        return res.status(500).json({
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

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user,
        });
    } catch (err) {
        if (err.message === "Invalid email or password") {
            return res.status(401).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const refresh = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        const accessToken = await refreshAccessToken(refreshToken);
        return res.status(200).json({
            success: true,
            accessToken
        })
    } catch(err){
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}


export const logout = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing"
            });
        }

        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        await logoutUser(payload.id);
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }
}

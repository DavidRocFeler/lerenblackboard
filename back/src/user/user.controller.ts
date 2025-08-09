// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { formatUserResponse, getAllUsersService, getUserByIdService } from "./user.service";

export const getAllUserController = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || "";
        const users = await getAllUsersService(token);
        
        const formattedUsers = users.map(formatUserResponse);
        
        res.status(200).json({
            success: true,
            data: formattedUsers
        });
    } catch (error: any) {
        res.status(403).json({ // 403 Forbidden para permisos denegados
            success: false,
            message: error.message
        });
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) throw new Error("ID de usuario inválido");

        const token = req.headers.authorization?.split(' ')[1] || "";
        const user = await getUserByIdService(userId, token);
        
        res.status(200).json({
            success: true,
            data: formatUserResponse(user)
        });
    } catch (error: any) {
        const statusCode = error.message.includes("inválido") ? 400 : 
                          error.message.includes("no encontrado") ? 404 : 403;
        
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};
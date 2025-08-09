// src/services/user.service.ts
import { UserRepository } from "./user.repository";
import { JWT_SECRET } from "../config/envs";
import jwt from "jsonwebtoken";

// Función reutilizable para verificar tokens
const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET!) as { 
        id: number; 
        role: string;
    };
};

export const getAllUsersService = async (token: string) => {
    // Validar SuperAdmin
    const decoded = verifyToken(token);
    if (decoded.role !== "superadmin") {
        throw new Error("Acceso denegado: Se requiere rol de SuperAdmin");
    }

    // Obtener usuarios
    return await UserRepository.find({
        relations: [
            'pictures', 
            'student',
            'student.school', 
            'teacher', 
            'teacher.school',
            'director', 
            'director.school',
            'subDirector', 
            'subDirector.school',
            'auxiliarGrade', 
            'auxiliarGrade.school',
            'auxiliar', 
            'auxiliar.school',
            'superAdmin'
        ]
    });
};

export const getUserByIdService = async (userId: number, token: string) => {
    // Validar token
    const decoded = verifyToken(token);

    // Verificar permisos (usuario propio o SuperAdmin)
    if (decoded.id !== userId && decoded.role !== "superadmin") {
        throw new Error("Solo puedes acceder a tu propia información");
    }

    // Obtener usuario
    const user = await UserRepository.findOne({
        where: { id: userId },
        relations: [
            'pictures', 
            'student',
            'student.school', 
            'teacher', 
            'teacher.school',
            'director', 
            'director.school',
            'subDirector', 
            'subDirector.school',
            'auxiliarGrade', 
            'auxiliarGrade.school',
            'auxiliar', 
            'auxiliar.school',
            'superAdmin'
        ]
    });

    if (!user) throw new Error("Usuario no encontrado");
    return user;
};

// Formateador reutilizable
export const formatUserResponse = (user: any) => ({
    ...user,
    profilePicture: user.pictures?.find((pic: { category: string }) => pic.category === 'profile') || null,
    pictures: undefined
  });
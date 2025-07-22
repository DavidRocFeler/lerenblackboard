// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminRepository, StudentRepository } from "../repositories/auth.repository";
import { JWT_SECRET } from "../config/envs";

export const loginService = async (email: string, password: string) => {
  // 1. Buscar usuario (lógica en servicio)
  const admin = await AdminRepository.findOne({ 
    where: { email }, 
    relations: ["credential"] 
  });
  
  const student = await StudentRepository.findOne({ 
    where: { email }, 
    relations: ["credential"] 
  });

  const user = admin || student;
  if (!user) throw new Error("Usuario no encontrado");

  // 2. Verificar contraseña (lógica en servicio)
  const isValid = await bcrypt.compare(password, user.credential.password);
  if (!isValid) throw new Error("Contraseña incorrecta");

  // 3. Generar token (lógica en servicio)
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: admin ? "admin" : "student"
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: admin ? "admin" : "student",
    token
  };
};
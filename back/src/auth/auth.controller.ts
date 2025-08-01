// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { loginService } from "./auth.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validación básica de campos requeridos
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const authData = await loginService(email, password);
    res.status(200).json(authData);
    
  } catch (error: any) {
    console.error("Error en loginController:", error.message); // Log más específico

    // Manejo específico de errores
    if (error.message.includes("contraseña incorrecta") || 
        error.message.includes("Contraseña incorrecta")) {
      return res.status(401).json({ error: error.message });
    } else if (error.message.includes("no encontrado") || 
               error.message.includes("no configurada")) {
      return res.status(404).json({ error: error.message });
    } else {
      // Error genérico (sin exponer detalles internos)
      return res.status(500).json({ error: "Error en el servidor" });
    }
  }
};
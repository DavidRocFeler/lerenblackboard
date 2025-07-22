// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { loginService } from "../services/auth.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const authData = await loginService(email, password);
    res.status(200).json(authData);
  } catch (error: any) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Contraseña incorrecta") {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
};
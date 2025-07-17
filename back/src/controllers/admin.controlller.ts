// src/controllers/admin.controller.ts
import { Request, Response } from "express";
import { adminService } from "../services/admin.service";

// Exporta la función directamente (no un objeto)
export const getAllAdminController = async (req: Request, res: Response) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Error fetching admins" });
  }
};
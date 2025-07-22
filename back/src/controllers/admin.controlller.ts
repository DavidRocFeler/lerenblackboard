import { Request, Response } from "express";
import { getAllAdminsService } from "../services/admin.service";

export const getAllAdminController = async (req: Request, res: Response) => {
  try {
    const admins = await getAllAdminsService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Error fetching admins" });
  }
};
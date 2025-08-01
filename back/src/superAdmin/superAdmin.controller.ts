import { Request, Response } from "express";
import { createSuperAdminService, getAllSuperAdminsService, updateSuperAdminService } from "./superAdmin.service";
import { ICreateSuperAdminDto, IUpdateSuperAdmin } from "./createSuperAdmin.dto";

export const getAllAdminController = async (req: Request, res: Response) => {
  try {
    const admins = await getAllSuperAdminsService();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Error fetching admins" });
  }
};

export const createSuperAdminController = async (req: Request, res: Response) => {
  try {
    const createDto: ICreateSuperAdminDto = req.body;
    
    // Validación básica
    if (!createDto.password || createDto.password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    const newAdmin = await createSuperAdminService(createDto);
    res.status(201).json(newAdmin);
    
  } catch (error: any) {
    if (error.message.includes('ya está registrado')) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error creating super admin:', error);
      res.status(500).json({ error: 'Error al crear super administrador' });
    }
  }
};

export const updateSuperAdminController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updateDto: IUpdateSuperAdmin = req.body;
    
    const updatedAdmin = await updateSuperAdminService(id, updateDto);
    res.status(200).json(updatedAdmin);
    
  } catch (error: any) {
    if (error.message.includes('no encontrado') || error.message.includes('Credencial')) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating super admin:', error);
      res.status(500).json({ error: 'Error al actualizar super administrador' });
    }
  }
};
// src/controllers/director.controller.ts
import { Request, Response } from "express";
import { createDirectorService, deleteDirectorService, getAllDirectorsService, getDirectorByIdService, updateDirectorService } from "./director.service";

// Obtener todos los directores
export const getAllDirectorController = async (req: Request, res: Response) => {
  try {
    const directors = await getAllDirectorsService();
    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener directores", error });
  }
};

// Obtener un director por ID
export const getDirectorByIdController = async (req: Request, res: Response) => {
  try {
    const directorId = parseInt(req.params.directorId);
    const director = await getDirectorByIdService(directorId);

    if (!director) {
      return res.status(404).json({ message: "Director no encontrado" });
    }

    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener director", error });
  }
};

// Crear un nuevo director
export const createNewDirectorController = async (req: Request, res: Response) => {
  try {
    const result = await createDirectorService(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un director existente
export const updateDirectorController = async (req: Request, res: Response) => {
  try {
    const directorId = parseInt(req.params.directorId);
    const result = await updateDirectorService(directorId, req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.message === "Director no encontrado" ? 404 : 500).json({ 
      message: error.message 
    });
  }
};

// Eliminar un director
export const deleteDirectorByIdController = async (req: Request, res: Response) => {
  try {
    const directorId = parseInt(req.params.directorId);
    const result = await deleteDirectorService(directorId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.message === "Director no encontrado" ? 404 : 500).json({ 
      message: error.message 
    });
  }
};
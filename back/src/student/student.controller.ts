import { Request, Response } from "express";
import { catchedController } from "../config/utils/catchedController";
import { getAllStudentsService, getStudentByIdService } from "./student.service";

export const getAllStudentsController = catchedController(async (req: Request, res: Response) => {
  const students = await getAllStudentsService();
  res.status(200).json(students);
});

export const getStudentByIdController = catchedController(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
    
    const token = authHeader.split(" ")[1];
    
    const student = await getStudentByIdService(studentId, token);
    res.status(200).json(student);
  }
);
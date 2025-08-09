import { Request, Response } from "express";
import { catchedController } from "../config/utils/catchedController";
import { getAllStudentsService, getStudentByIdService, getStudentsBySchoolAndLevelService, getStudentsBySchoolLevelAndGradeService, getStudentsBySchoolLevelGradeAndSectionService, getStudentsBySchoolService } from "./student.service";
import { EducationLevel, Grade } from "./Student.entity";

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

export const getStudentsBySchoolController = async (req: Request, res: Response) => {
  try {
    const students = await getStudentsBySchoolService(
      Number(req.params.schoolId),
      req.params.level as EducationLevel
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
};

export const getStudentsBySchoolAndLevelController = async (req: Request, res: Response) => {
  try {
    const students = await getStudentsBySchoolAndLevelService(
      Number(req.params.schoolId),
      req.params.level as EducationLevel
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
};

export const getStudentsBySchoolLevelAndGradeController = async (req: Request, res: Response) => {
  try {
    const students = await getStudentsBySchoolLevelAndGradeService(
      Number(req.params.schoolId),
      req.params.level as EducationLevel,
      req.params.grade as Grade
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
};

export const getStudentsBySchoolLevelGradeAndSectionController = async (req: Request, res: Response) => {
  try {
    const students = await getStudentsBySchoolLevelGradeAndSectionService(
      Number(req.params.schoolId),
      req.params.level as EducationLevel,
      req.params.grade as Grade,
      req.params.section
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
};
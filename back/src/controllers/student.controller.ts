import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getAllStudentsService } from "../services/student.service";
import {
  registerUserService,
} from "../services/student.service";

export const registerStudent = catchedController(
  async (req: Request, res: Response) => {
    const { email, password, name, address, phone } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
    });
    res.status(201).send(newUser);
  }
);

export const getAllStudents = catchedController(async (req: Request, res: Response) => {
  const students = await getAllStudentsService();
  res.status(200).json(students);
});

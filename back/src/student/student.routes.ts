// src/routes/student.routes.ts
import { Router } from "express";
import { getAllStudentsController, getStudentByIdController } from "./student.controller";

const studentRouter = Router();

studentRouter.get("/", getAllStudentsController);
studentRouter.get("/:studentId", getStudentByIdController);

export default studentRouter;

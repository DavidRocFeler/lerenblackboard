// src/routes/student.routes.ts
import { Router } from "express";
import { getAllStudentsController, getStudentByIdController, getStudentsBySchoolAndLevelController, getStudentsBySchoolController, getStudentsBySchoolLevelAndGradeController, getStudentsBySchoolLevelGradeAndSectionController, updateStudentController } from "./student.controller";

const studentRouter = Router();

studentRouter.get("/", getAllStudentsController);
studentRouter.get("/:studentId", getStudentByIdController);
studentRouter.put("/:studentId", updateStudentController);

studentRouter.get("/school/:schoolId", getStudentsBySchoolController);
studentRouter.get("/school/:schoolId/level/:level", getStudentsBySchoolAndLevelController);
studentRouter.get("/school/:schoolId/level/:level/grade/:grade", getStudentsBySchoolLevelAndGradeController);
studentRouter.get("/school/:schoolId/level/:level/grade/:grade/section/:section", getStudentsBySchoolLevelGradeAndSectionController);

export default studentRouter;

// src/routes/student.routes.ts
import { Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateStudentLogin from "../middlewares/userLogin.middleware";
import { getAllStudents } from "../controllers/student.controller";

const studentRouter = Router();

// studentRouter.post("/register", validateUserRegister, registerStudent);
// studentRouter.post("/login", validateStudentLogin, login);
studentRouter.get("/", getAllStudents);
// studentRouter.get("/:studentId", getStudentById);

export default studentRouter;

import { Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { login, registerUser, getUsers } from "../controllers/student.controller";

const studentRouter = Router();

studentRouter.post("/register", validateUserRegister, registerUser);
studentRouter.post("/login", validateUserLogin, login);
studentRouter.get("/", getUsers);


export default studentRouter;

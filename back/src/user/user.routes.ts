// src/routes/student.routes.ts
import { Router } from "express";
import { getAllUserController, getUserByIdController } from "./user.controller";

const userRouter = Router();

userRouter.get("/", getAllUserController);
userRouter.get("/:userId", getUserByIdController);

export default userRouter

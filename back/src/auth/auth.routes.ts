// src/routes/auth.routes.ts
import { Router } from "express";
import { loginController } from "./auth.controller";

const authRouter = Router();
authRouter.post("/login", loginController);
export default authRouter;
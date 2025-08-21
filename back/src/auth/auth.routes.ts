// src/routes/auth.routes.ts
import { Router } from "express";
import { loginAdminController, loginController } from "./auth.controller";

const authRouter = Router();

// authRouter.post("/login", loginController);
authRouter.post("/schools/:slug/login", loginController);
authRouter.post("/admin/login", loginAdminController);

export default authRouter;
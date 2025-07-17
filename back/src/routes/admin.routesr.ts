// src/routes/admin.routes.ts
import { Router } from "express";
import { getAllAdminController } from "../controllers/admin.controlller";

const adminRouter = Router();

adminRouter.get("/", getAllAdminController);

export default adminRouter;
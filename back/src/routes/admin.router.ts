// src/routes/admin.routes.ts
import { Router } from "express";
import { getAllAdminController } from "../controllers/admin.controlller";

const adminRouter = Router();

// adminRouter.get("/login", validateAdminLogin);
// adminRouter.get("/register", validateAdminRegister);
adminRouter.get("/", getAllAdminController);
// adminRouter.get("/:adminId", getAdminByIdController);

export default adminRouter;
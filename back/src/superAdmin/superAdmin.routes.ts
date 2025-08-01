// src/routes/admin.routes.ts
import { Router } from "express";
import { createSuperAdminController, getAllAdminController, updateSuperAdminController } from "./superAdmin.controller";

const adminRouter = Router();

// adminRouter.get("/login", validateAdminLogin);
// adminRouter.get("/register", validateAdminRegister);
adminRouter.get("/", getAllAdminController);
adminRouter.post('/', createSuperAdminController);
adminRouter.put('/:id', updateSuperAdminController);
// adminRouter.get("/:adminId", getAdminByIdController);

export default adminRouter;
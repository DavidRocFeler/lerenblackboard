import { Router } from "express";
import { createSchoolController, deleteSchoolController, getAllSchoolsController, getSchoolByIdControler, updateSchoolController } from "./school.controller";

// src/routes/school.router.ts
const schoolRouter = Router();

schoolRouter.get('/', getAllSchoolsController);
schoolRouter.get('/:schoolId', getSchoolByIdControler);
schoolRouter.put('/:schoolId', updateSchoolController);
schoolRouter.post('/', createSchoolController);
schoolRouter.delete('/:schoolId', deleteSchoolController);

export default schoolRouter;
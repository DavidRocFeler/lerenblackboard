import { Router } from "express";
import { createSchoolController, deleteSchoolController, getAllSchoolsController, getSchoolByIdControler, updateSchoolController } from "./school.controller";

// src/routes/school.router.ts
const routerSchool = Router();

routerSchool.get('/', getAllSchoolsController);
routerSchool.get('/:schoolId', getSchoolByIdControler);
routerSchool.put('/:schoolId', updateSchoolController);
routerSchool.post('/', createSchoolController);
routerSchool.delete('/:schoolId', deleteSchoolController);

export default routerSchool;
// src/routes/claudinary.routes.ts
import { Router } from "express";
import { deletePictureSchoolByIdController, deletePictureUserByIdController, getAllPictureSchoolController, getAllPictureUserController, getPictureSchoolByIdController, getPictureUserByIdController, uploadPictureSchoolByIdController, uploadPictureUserByIdController } from "./claudimary.controller";
import { upload } from '../config/middlewares/multer.middleware';

const claudinaryRouter = Router();
claudinaryRouter.get("/users/:userId", getPictureUserByIdController);
claudinaryRouter.get("/users", getAllPictureUserController);
claudinaryRouter.put("/users/:userId", upload.single('file'), uploadPictureUserByIdController);
claudinaryRouter.delete("/users/:userId", deletePictureUserByIdController);

claudinaryRouter.patch("/schools/:schoolId", uploadPictureSchoolByIdController);
claudinaryRouter.delete("/schools/:schoolId", deletePictureSchoolByIdController);
claudinaryRouter.get("/schools/:schoolId", getPictureSchoolByIdController);
claudinaryRouter.get("/schools", getAllPictureSchoolController);

export default claudinaryRouter;
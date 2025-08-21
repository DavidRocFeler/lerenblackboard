// src/routes/student.routes.ts
import { Router } from "express";
import { createNewDirectorController, deleteDirectorByIdController, getAllDirectorController, getDirectorByIdController, updateDirectorController } from "./director.controller";


const directorRouter = Router();

directorRouter.get("/", getAllDirectorController);
directorRouter.get("/:directorId", getDirectorByIdController);
directorRouter.post("/", createNewDirectorController);
directorRouter.put("/directorId", updateDirectorController);
directorRouter.delete("/:directorId", deleteDirectorByIdController);

export default directorRouter;

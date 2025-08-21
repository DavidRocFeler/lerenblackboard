// src/repositories/student.repository.ts
import { AppDataSource } from "../config/dataSource";
import { DirectorEntity } from "./Director.entity";

export const DirectorRepository = AppDataSource.getRepository(DirectorEntity);
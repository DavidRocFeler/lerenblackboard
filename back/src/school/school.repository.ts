// src/repositories/student.repository.ts
import { AppDataSource } from "../config/dataSource";
import { SchoolEntity } from "./School.entity";

export const SchoolRepository = AppDataSource.getRepository(SchoolEntity);
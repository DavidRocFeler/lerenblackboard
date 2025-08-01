// src/repositories/student.repository.ts
import { AppDataSource } from "../config/dataSource";
import { StudentEntity } from "./Student.entity";

export const StudentRepository = AppDataSource.getRepository(StudentEntity);
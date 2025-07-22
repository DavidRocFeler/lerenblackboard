// src/repositories/auth.repository.ts
import { AppDataSource } from "../config/dataSource";
import { Admin } from "../entities/Admin";
import { Student } from "../entities/Student";

export const AdminRepository = AppDataSource.getRepository(Admin);
export const StudentRepository = AppDataSource.getRepository(Student);
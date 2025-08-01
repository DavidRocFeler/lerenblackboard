// src/repositories/auth.repository.ts
import { AppDataSource } from "../config/dataSource";
import { StudentEntity } from "../student/Student.entity";
import { SuperAdminEntity } from "../superAdmin/SuperAdmin.entity";

export const AdminRepository = AppDataSource.getRepository(SuperAdminEntity);
export const StudentRepository = AppDataSource.getRepository(StudentEntity);
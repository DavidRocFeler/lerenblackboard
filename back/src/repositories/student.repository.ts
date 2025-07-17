import { AppDataSource } from "../config/dataSource";
import { Student } from "../entities/Student";

export const StudentRepository = AppDataSource.getRepository(Student);
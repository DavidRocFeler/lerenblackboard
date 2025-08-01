// src/repositories/student.repository.ts
import { AppDataSource } from "../config/dataSource";
import { UserEntity } from "./user.entity";

export const UserRepository = AppDataSource.getRepository(UserEntity);
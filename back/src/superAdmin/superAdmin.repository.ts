// src/repositories/superAdmin.repository.ts
import { AppDataSource } from "../config/dataSource";
import { SuperAdminEntity } from "./SuperAdmin.entity";

export const SuperAdminRepository = AppDataSource.getRepository(SuperAdminEntity);

// src/claudinary/claudinary.repository.ts
import { AppDataSource } from "../config/dataSource";
import { ClaudinaryEntity } from "./Claudinary.entity";

export const ClaudinaryRepository = AppDataSource.getRepository(ClaudinaryEntity);
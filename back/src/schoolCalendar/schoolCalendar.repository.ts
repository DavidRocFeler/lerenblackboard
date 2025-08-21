// src/repositories/student.repository.ts
import { AppDataSource } from "../config/dataSource";
import { SchoolCalendarEntity } from "./schoolCalendar.Entity";

export const SchoolCalendarRepository = AppDataSource.getRepository(SchoolCalendarEntity); 
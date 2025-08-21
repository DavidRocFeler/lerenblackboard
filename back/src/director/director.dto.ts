// src/director/director.dto.ts
import { ClaudinaryEntity } from "../claudinary/Claudinary.entity";

export interface ICreateDirectorDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  governmentId: string;
  address?: string;
  city?: string;
  country?: string;
  hireDate?: Date;
  officeNumber?: string;
  isActive?: boolean;
  shift: "morning" | "afternoon";
  school: {
    id: number;
  };
}
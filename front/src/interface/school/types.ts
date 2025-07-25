// src/interfaces/school/types.ts
export interface ISchool {
  id: number;
  name: string;
  slug: string;
  logo: string;
  background: string;
  primaryColor?: string; // Para el overlay
  secondaryColor?: string;
}
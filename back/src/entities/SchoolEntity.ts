// src/entities/School.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StudentEntity } from "./StudentEntity";
import { TeacherEntity } from "./TeacherEntity";
import { AuxiliarGradeEntity } from "./AuxiliarGradeEntity";
import { AuxiliarEntity } from "./AuxiliarEntity";
import { SubDirectorEntity } from "./SubDirectorEntity";
import { DirectorEntity } from "./DirectorEntity";
// ... other role imports

@Entity({ name: "schools" })
export class SchoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Core Identity
  @Column({ nullable: false })
  name: string; // Official name (e.g., "Sor Ana de los Ángeles School")

  @Column({ unique: true, nullable: false })
  slug: string; // URL-friendly (e.g., "sor-ana-school")

  // Visual Branding
  @Column({ nullable: true })
  logo: string; // Path to logo (e.g., "/schools/sorana/logo.png")

  @Column({ nullable: true })
  background: string; // Background image

  @Column({ nullable: true })
  primaryColor?: string; // Primary brand color (e.g., "#3B82F6")

  @Column({ nullable: true })
  secondaryColor?: string; // Secondary color

  // Location (Generalized for LatAm)
  @Column({ nullable: false })
  address: string; // Full address

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  stateOrRegion: string; // State/Department/Region (e.g., "Lima", "São Paulo")

  @Column({ nullable: false })
  country: string; // Country name (e.g., "Peru", "Mexico")

  // Regulatory/Admin (Flexible for all countries)
  @Column({ nullable: true })
  regulatoryCode?: string; // Generic field for codes like UGEL (Peru), SEP (Mexico), etc.

  @Column({ nullable: true })
  regulatoryEntity?: string; // Name of the regulatory body (e.g., "UGEL 07", "Ministry of Education")

  // Contact
  @Column({ nullable: false })
  phone: string; // Main contact number

  @Column({ nullable: false })
  email: string; // Institutional email

  // Education Levels (Generalized)
  @Column({
    type: "enum",
    enum: ["preschool", "primary", "secondary", "k12"],
    nullable: false
  })
  educationLevel: "preschool" | "primary" | "secondary" | "k12";

  // Shifts (Common in LatAm)
  @Column("simple-array", { nullable: false })
  shifts: string[]; // e.g., ["morning", "afternoon", "evening"]

  // Dates
  @Column({ type: "date", nullable: true })
  foundingDate: Date; // School founding date

  // Relations (All role entities)
  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers: TeacherEntity[];

  @OneToMany(() => AuxiliarGradeEntity, (auxiliar_grade) => auxiliar_grade.school)
  auxiliar_grade: AuxiliarGradeEntity[];

  @OneToMany(() => AuxiliarEntity, (auxiliar) => auxiliar.school)
  auxiliar: AuxiliarEntity[];

  @OneToMany(() => SubDirectorEntity, (subdirector) => subdirector.school)
  subdirector: SubDirectorEntity[];

  @OneToMany(() => DirectorEntity, (director) => director.school)
  director: DirectorEntity[];
}
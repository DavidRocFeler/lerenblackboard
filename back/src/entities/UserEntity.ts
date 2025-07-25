// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { TeacherEntity } from "./TeacherEntity";
import { StudentEntity } from "./StudentEntity";
import { DirectorEntity } from "./DirectorEntity";
import { SubDirectorEntity } from "./SubDirectorEntity";
import { AuxiliarGradeEntity } from "./AuxiliarGradeEntity";
import { AuxiliarEntity } from "./AuxiliarEntity";
import { SuperAdminEntity } from "./SuperAdminEntity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  role: "student" | "teacher" | "director" | "subdirector" | "auxiliar_grade" | "auxiliar" | "superadmin"; // Roles posibles

  // Relaciones opcionales con roles
  @OneToOne(() => StudentEntity, (student) => student.user) // Usa función
  student?: StudentEntity;

  @OneToOne(() => TeacherEntity, (teacher) => teacher.user) // Usa función
  teacher?: TeacherEntity;

  @OneToOne(() => DirectorEntity, (director) => director.user)
  director?: DirectorEntity;

  @OneToOne(() => SubDirectorEntity, (subDirector) => subDirector.user)
  subDirector?: SubDirectorEntity;

   // Nueva relación
   @OneToOne(() => AuxiliarGradeEntity, (auxiliarGrade) => auxiliarGrade.user)
   auxiliarGrade?: AuxiliarGradeEntity;

   @OneToOne(() => AuxiliarEntity, (auxiliar) => auxiliar.user)
   auxiliar?: AuxiliarEntity;

   @OneToOne(() => SuperAdminEntity, (superAdmin) => superAdmin.user)
   superAdmin?: SuperAdminEntity; 
  // ...otros campos comunes (email, password si no usas Credential)
}
// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { StudentEntity } from "../student/Student.entity";
import { TeacherEntity } from "../teacher/Teacher.entity";
import { DirectorEntity } from "../director/Director.entity";
import { SubDirectorEntity } from "../subDirector/SubDirector.entity";
import { AuxiliarGradeEntity } from "../auxiliarGrade/AuxiliarGrade.entity";
import { AuxiliarEntity } from "../auxiliar/Auxiliar.entity";
import { SuperAdminEntity } from "../superAdmin/SuperAdmin.entity";

// src/entities/User.ts
@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  role: "student" | "teacher" | "director" | "subdirector" | "auxiliar_grade" | "auxiliar" | "superadmin";

  // Relaciones opcionales con roles - AGREGAR @JoinColumn aquí
  @OneToOne(() => StudentEntity, (student) => student.user)
  @JoinColumn() // 👈 AGREGAR ESTO
  student?: StudentEntity;

  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  @JoinColumn() // 👈 AGREGAR ESTO
  teacher?: TeacherEntity;

  @OneToOne(() => DirectorEntity, (director) => director.user)
  @JoinColumn() // 👈 AGREGAR ESTO
  director?: DirectorEntity;

  @OneToOne(() => SubDirectorEntity, (subDirector) => subDirector.user)
  @JoinColumn() // 👈 AGREGAR ESTO
  subDirector?: SubDirectorEntity;

  @OneToOne(() => AuxiliarGradeEntity, (auxiliarGrade) => auxiliarGrade.user)
  @JoinColumn() // 👈 AGREGAR ESTO
  auxiliarGrade?: AuxiliarGradeEntity;

  @OneToOne(() => AuxiliarEntity, (auxiliar) => auxiliar.user)
  @JoinColumn() // 👈 AGREGAR ESTO
  auxiliar?: AuxiliarEntity;

  @OneToOne(() => SuperAdminEntity, (superAdmin) => superAdmin.user)
  @JoinColumn() // 👈 AGREGAR ESTO
  superAdmin?: SuperAdminEntity;
}
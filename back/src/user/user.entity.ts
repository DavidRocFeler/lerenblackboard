// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { StudentEntity } from "../student/Student.entity";
import { TeacherEntity } from "../teacher/Teacher.entity";
import { DirectorEntity } from "../director/Director.entity";
import { SubDirectorEntity } from "../subDirector/SubDirector.entity";
import { AuxiliarGradeEntity } from "../auxiliarGrade/AuxiliarGrade.entity";
import { AuxiliarEntity } from "../auxiliar/Auxiliar.entity";
import { SuperAdminEntity } from "../superAdmin/SuperAdmin.entity";
import { ClaudinaryEntity } from "../claudinary/Claudinary.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  role: "student" | "teacher" | "director" | "subdirector" | "auxiliar_grade" | "auxiliar" | "superadmin";

  // Relaciones opcionales con roles
  @OneToOne(() => StudentEntity, (student) => student.user)
  @JoinColumn()
  student?: StudentEntity;

  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  @JoinColumn()
  teacher?: TeacherEntity;

  @OneToOne(() => DirectorEntity, (director) => director.user)
  @JoinColumn()
  director?: DirectorEntity;

  @OneToOne(() => SubDirectorEntity, (subDirector) => subDirector.user)
  @JoinColumn()
  subDirector?: SubDirectorEntity;

  @OneToOne(() => AuxiliarGradeEntity, (auxiliarGrade) => auxiliarGrade.user)
  @JoinColumn()
  auxiliarGrade?: AuxiliarGradeEntity;

  @OneToOne(() => AuxiliarEntity, (auxiliar) => auxiliar.user)
  @JoinColumn()
  auxiliar?: AuxiliarEntity;

  @OneToOne(() => SuperAdminEntity, (superAdmin) => superAdmin.user)
  @JoinColumn()
  superAdmin?: SuperAdminEntity;

  // 🆕 NUEVA RELACIÓN: Un usuario puede tener múltiples imágenes
  @OneToMany(() => ClaudinaryEntity, (picture) => picture.user)
  pictures?: ClaudinaryEntity[];

  // 🆕 NUEVA PROPIEDAD CALCULADA: Para obtener la imagen de perfil fácilmente
  get profilePicture(): ClaudinaryEntity | undefined {
    return this.pictures?.find(pic => pic.category === 'profile');
  }
}

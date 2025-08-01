// src/entities/AuxiliarGrade.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { CredentialEntity } from "../credential/Crdential.entity";
import { UserEntity } from "../user/user.entity";
import { SchoolEntity } from "../school/School.entity";

@Entity({ name: "auxiliar_grades" })
export class AuxiliarGradeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Personal Info
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: false, unique: true })
  governmentId: string; // DNI/RUT/Cédula (único)

  // Address
  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  // Professional Info
  @Column({ nullable: false })
  assignedGrade: string; // 👈 Grado asignado (ej: "1st", "2nd")

  @Column("simple-array", { nullable: false })
  sections: string[]; // 👈 Secciones supervisadas (ej: ["A", "B"])

  @Column({ 
    type: "enum", 
    enum: ["morning", "afternoon"], 
    nullable: false 
  })
  shift: "morning" | "afternoon";

  @Column({ type: "date", nullable: true })
  hireDate?: Date;

  // Status
  @Column({ type: "boolean", default: true })
  isActive: boolean;

  // Relations
  @OneToOne(() => CredentialEntity, { cascade: true, eager: true })
  @JoinColumn()
  credential: CredentialEntity;

  @OneToOne(() => UserEntity, (user) => user.auxiliarGrade)
  user?: UserEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  school: SchoolEntity;
}
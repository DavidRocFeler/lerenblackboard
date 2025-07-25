// src/entities/Auxiliar.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Credential } from "./Credential";
import { UserEntity } from "./UserEntity";
import { SchoolEntity } from "./SchoolEntity";

@Entity({ name: "auxiliars" })
export class AuxiliarEntity {
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
  assignedGrade: string; // 👈 Grado asignado (ej: "1st")

  @Column({ nullable: false })
  assignedSection: string; // 👈 Sección específica (ej: "A")

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
  @OneToOne(() => Credential, { cascade: true, eager: true })
  @JoinColumn()
  credential: Credential;

  @OneToOne(() => UserEntity, (user) => user.auxiliar)
  user?: UserEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  school: SchoolEntity;
}
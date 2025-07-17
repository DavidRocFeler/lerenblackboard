// src/entities/Student.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Credential } from "./Credential";

@Entity({ name: "students" })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  phone?: string;

  // Campos opcionales
  @Column({ nullable: true })
  parentName?: string;

  @Column({ nullable: true })
  parentPhone?: string;

  @Column({ nullable: true })
  parentEmail?: string;

  @Column({ nullable: true })
  level?: string;

  @Column({ nullable: true })
  section?: string;

  @Column({ 
    type: "boolean", 
    default: true  // 👈 Por defecto estará ACTIVO (true)
  })
  isActive: boolean;  // 👈 Reemplaza al enum (true=ACTIVE, false=INACTIVE)

  @Column({ nullable: true })
  birthdate?: string;

  @Column({ nullable: true })
  studentCode?: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ type: "decimal", nullable: true })
  balance?: number;

  // Relación 1:1 con Credential
  @OneToOne(() => Credential, { cascade: true, eager: true })
  @JoinColumn()
  credential: Credential;
}
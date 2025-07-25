// src/entities/Student.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { Credential } from "./Credential";
import { UserEntity } from "./UserEntity";
import { SchoolEntity } from "./SchoolEntity";

@Entity({ name: "students" })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Nombre completo (separado)
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  // Datos de contacto
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: false, unique: true })
  governmentId: string; // DNI/RUT/Cédula (único)

  // Datos de padres/madres
  @Column({ nullable: true })
  fatherName?: string;

  @Column({ nullable: true })
  motherName?: string;

  @Column({ nullable: true })
  parentPhone?: string;

  @Column({ nullable: true })
  parentEmail?: string;

  // Datos académicos
  @Column({ nullable: true })
  level?: string; // Ej: "Primaria", "Secundaria"

  @Column({ nullable: true })
  section?: string; // Ej: "A", "B"

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ nullable: true })
  birthdate?: string;

  @Column({ nullable: true })
  studentCode?: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ type: "decimal", nullable: true })
  balance?: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  // Relación 1:1 con Credential (o User)
  @OneToOne(() => Credential, { cascade: true, eager: true })
  @JoinColumn()
  credential: Credential;

  @OneToOne(() => UserEntity, (user) => user.student) // Relación inversa
  user?: UserEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  school: SchoolEntity;
}
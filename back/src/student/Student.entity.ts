// src/entities/Student.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { SchoolEntity } from "../school/School.entity";
import { CredentialEntity } from "../credential/Crdential.entity";

export enum EducationLevel {
  INICIAL = "Inicial",
  PRIMARIA = "Primaria", 
  SECUNDARIA = "Secundaria"
}

export enum Grade {
  INICIAL_3 = "3 años",
  INICIAL_4 = "4 años",
  INICIAL_5 = "5 años",

  PRIMARIA_1 = "1° Primaria",
  PRIMARIA_2 = "2° Primaria",
  PRIMARIA_3 = "3° Primaria",
  PRIMARIA_4 = "4° Primaria",
  PRIMARIA_5 = "5° Primaria",
  PRIMARIA_6 = "6° Primaria",
  // ... hasta 6° Primaria
  SECUNDARIA_1 = "1° Secundaria",
  SECUNDARIA_2 = "2° Secundaria",
  SECUNDARIA_3 = "3° Secundaria",
  SECUNDARIA_4 = "4° Secundaria",
  SECUNDARIA_5 = "5° Secundaria",
}

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
  @Column({
    type: "enum",
    enum: EducationLevel,
    nullable: false,
    default: EducationLevel.PRIMARIA
  })
  level: EducationLevel; // Ahora es enum, no string

  // Añade el nuevo campo grade:
  @Column({
    type: "enum", 
    enum: Grade,
    nullable: false
  })
  grade: Grade;

  // Mantén section como está (strings "A", "B", etc.)
  @Column({ nullable: false })
  section: string;

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
  @OneToOne(() => CredentialEntity, { cascade: true, eager: true })
  @JoinColumn()
  credential: CredentialEntity;

  @OneToOne(() => UserEntity, (user) => user.student) // Relación inversa
  user?: UserEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  school: SchoolEntity;
}
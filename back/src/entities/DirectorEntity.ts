// src/entities/Director.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Credential } from "./Credential";
import { UserEntity } from "./UserEntity";
import { SchoolEntity } from "./SchoolEntity";

@Entity({ name: "directors" })
export class DirectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Nombre completo
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

  // Dirección completa
  @Column({ nullable: true })
  address?: string; // Ej: "Av. Principal 123"

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  // Datos profesionales
  @Column({ type: "date", nullable: true })
  hireDate?: Date; // Fecha de nombramiento

  @Column({ nullable: true })
  officeNumber?: string; // Número de oficina

  // Estado
  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ 
    type: "enum", 
    enum: ["morning", "afternoon"], 
    nullable: false 
  })
  shift: "morning" | "afternoon"; // 👈 Principal's shift

  // Relación 1:1 con Credential (si no usas User)
  @OneToOne(() => Credential, { cascade: true, eager: true })
  @JoinColumn()
  credential: Credential;

  // Relación con User (opcional)
  @OneToOne(() => UserEntity, (user) => user.director)
  user?: UserEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  school: SchoolEntity;
}
// src/entities/Teacher.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Credential } from "./Credential";
import { UserEntity } from "./UserEntity"; // Si decides usar una entidad User base
import { SchoolEntity } from "./SchoolEntity";

@Entity({ name: "teachers" })
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Nombre completo (separado para mejor manejo)
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

  // Datos profesionales
  @Column("simple-array", { nullable: true }) // Ej: ["Matemáticas", "Física"]
  specialty?: string[];

  @Column({ type: "date", nullable: true })
  hireDate?: Date; // Fecha de contratación

  @Column({ nullable: true })
  classroom?: string; // Aula asignada

  // Estado
  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  // Relación 1:1 con Credential (si no usas User)
  @OneToOne(() => Credential, { cascade: true, eager: true })
  @JoinColumn()
  credential: Credential;

  // Relación con User (si decides tener una entidad base)
  @OneToOne(() => UserEntity, (user) => user.teacher) // Relación inversa
  user?: UserEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  school: SchoolEntity;
}
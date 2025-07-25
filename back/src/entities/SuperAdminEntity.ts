// src/entities/SuperAdminEntity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "super_admins" })
export class SuperAdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🔹 Datos personales (separados)
  @Column({ nullable: false })
  firstName: string; // Primer nombre

  @Column({ nullable: false })
  lastName: string; // Apellido(s)

  @Column({ nullable: false, unique: true })
  governmentId: string; // DNI/RUT/Cédula (único)

  @Column({ nullable: false, unique: true })
  personalEmail: string; // Email personal (no institucional)

  @Column({ nullable: false })
  phone: string; // Teléfono directo

  // 🔹 Datos laborales
  @Column({ type: "date", nullable: false })
  hireDate: Date; // Fecha de contratación

  @Column({ nullable: true })
  contractType?: string; // "Tiempo completo", "Consultor", etc.

  @Column({ nullable: true })
  emergencyContact?: string; // Contacto de emergencia (nombre + teléfono)

  // 🔹 Relación con UserEntity (para autenticación)
  @OneToOne(() => UserEntity, (user) => user.superAdmin)
  user: UserEntity;
}
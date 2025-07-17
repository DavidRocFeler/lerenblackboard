// src/entities/Admin.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Credential } from "./Credential";

@Entity({ name: "admins" })  // Tabla separada para admins
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @OneToOne(() => Credential, { cascade: true, eager: true })
  @JoinColumn()
  credential: Credential;  // Relación 1:1 con Credential
}
// src/entities/Director.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { CredentialEntity } from "../credential/Crdential.entity";
import { UserEntity } from "../user/user.entity";
import { SchoolEntity } from "../school/School.entity";
import { ClaudinaryEntity } from "../claudinary/Claudinary.entity";

@Entity({ name: "directors" })
export class DirectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: false, unique: true })
  governmentId: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ type: "date", nullable: true })
  hireDate?: Date;

  @Column({ nullable: true })
  officeNumber?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ 
    type: "enum", 
    enum: ["morning", "afternoon"], 
    nullable: false 
  })
  shift: "morning" | "afternoon";

  // Relación 1:1 con Credential
  @OneToOne(() => CredentialEntity, { eager: false })
  @JoinColumn()
  credential: CredentialEntity;

  // Relación con School
  @ManyToOne(() => SchoolEntity, (school) => school.directors)
  school: SchoolEntity;

  // Relación con User (igual que StudentEntity)
  @OneToOne(() => UserEntity, (user) => user.director)
  user?: UserEntity;

  // 🟡 ELIMINADO: Campo profilePicture duplicado
  // @OneToOne(() => ClaudinaryEntity, { 
  //   eager: true,
  //   nullable: true,
  //   cascade: true
  // })
  // @JoinColumn()
  // profilePicture?: ClaudinaryEntity;

  // Propiedad calculada para acceder a la picture del usuario
  get picture(): ClaudinaryEntity | undefined {
    return this.user?.profilePicture;
  }

  // Método helper para obtener todas las imágenes del usuario
  get userPictures(): ClaudinaryEntity[] | undefined {
    return this.user?.pictures;
  }
}
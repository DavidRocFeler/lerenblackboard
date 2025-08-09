// src/entities/Student.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { SchoolEntity } from "../school/School.entity";
import { CredentialEntity } from "../credential/Crdential.entity";
import { ClaudinaryEntity } from "../claudinary/Claudinary.entity";

export enum EducationLevel {
  INICIAL = "Inicial",
  PRIMARIA = "Primaria",
  SECUNDARIA = "Secundaria"
}

export enum Grade {
  INICIAL_3 = "3_años",
  INICIAL_4 = "4_años",
  INICIAL_5 = "5_años",
  PRIMARIA_1 = "1_Primaria",
  PRIMARIA_2 = "2_Primaria",
  PRIMARIA_3 = "3_Primaria",
  PRIMARIA_4 = "4_Primaria",
  PRIMARIA_5 = "5_Primaria",
  PRIMARIA_6 = "6_Primaria",
  SECUNDARIA_1 = "1_Secundaria",
  SECUNDARIA_2 = "2_Secundaria",
  SECUNDARIA_3 = "3_Secundaria",
  SECUNDARIA_4 = "4_Secundaria",
  SECUNDARIA_5 = "5_Secundaria",
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
  governmentId: string;

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
  level: EducationLevel;

  @Column({
    type: "enum",
    enum: Grade,
    nullable: false
  })
  grade: Grade;

  @Column({ nullable: false })
  section: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ nullable: true })
  birthdate?: string;

  @Column({ nullable: true })
  studentCode?: string;

  @Column({ type: "decimal", nullable: true })
  balance?: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  // Relación 1:1 con Credential
  @OneToOne(() => CredentialEntity, { eager: false })
  @JoinColumn()
  credential: CredentialEntity;

  // 🔄 RELACIÓN MODIFICADA: Relación inversa con User (sin @JoinColumn)
  @OneToOne(() => UserEntity, (user) => user.student)
  user?: UserEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  school: SchoolEntity;

  // 🆕 NUEVA PROPIEDAD CALCULADA: Para acceder fácilmente a la picture del usuario
  get picture(): ClaudinaryEntity | undefined {
    return this.user?.profilePicture;
  }

  // 🆕 MÉTODO HELPER: Para obtener todas las imágenes del usuario
  get userPictures(): ClaudinaryEntity[] | undefined {
    return this.user?.pictures;
  }
}

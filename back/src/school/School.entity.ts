// SchoolEntity 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { StudentEntity } from "../student/Student.entity";
import { TeacherEntity } from "../teacher/Teacher.entity";
import { AuxiliarGradeEntity } from "../auxiliarGrade/AuxiliarGrade.entity";
import { AuxiliarEntity } from "../auxiliar/Auxiliar.entity";
import { SubDirectorEntity } from "../subDirector/SubDirector.entity";
import { DirectorEntity } from "../director/Director.entity";
import { ClaudinaryEntity } from "../claudinary/Claudinary.entity";

@Entity({ name: "schools" })
export class SchoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Core Identity
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  // Relaciones con imágenes (cambiadas a OneToOne)
  @OneToOne(() => ClaudinaryEntity, {
    cascade: true,
    nullable: true,
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: "logoId" })
  logo?: ClaudinaryEntity;

  @OneToOne(() => ClaudinaryEntity, {
    cascade: true,
    nullable: true,
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: "backgroundId" })
  background?: ClaudinaryEntity;

  @Column({ nullable: true })
  primaryColor?: string;

  @Column({ nullable: true })
  secondaryColor?: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  stateOrRegion: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: true })
  regulatoryCode?: string;

  @Column({ nullable: true })
  regulatoryEntity?: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @Column({
    type: "enum",
    enum: ["preschool", "primary", "secondary", "k12"],
    nullable: false
  })
  educationLevel: "preschool" | "primary" | "secondary" | "k12";

  @Column("simple-array", { nullable: false })
  shifts: string[];

  @Column({ type: "date", nullable: true })
  foundingDate: Date;

  // Otras relaciones...
  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers: TeacherEntity[];

  @OneToMany(() => AuxiliarGradeEntity, (auxiliar) => auxiliar.school)
  auxiliars_grade: AuxiliarGradeEntity[];

  @OneToMany(() => AuxiliarEntity, (auxiliar) => auxiliar.school)
  auxiliars: AuxiliarEntity[];

  @OneToMany(() => SubDirectorEntity, (subdirector) => subdirector.school)
  subdirectors: SubDirectorEntity[];

  @OneToMany(() => DirectorEntity, (director) => director.school)
  directors: DirectorEntity[];
}
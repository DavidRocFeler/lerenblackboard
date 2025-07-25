// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
// import { Student } from "./Student";

// @Entity({ name: "attendances" })
// export class Attendance {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Student, student => student.attendances)
//   student: Student;

//   @Column({ type: "date" })
//   date: string; // Formato: 'YYYY-MM-DD'

//   @Column({ type: "boolean", default: false })
//   isPresent: boolean; // false = faltó, true = asistió

//   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
//   registeredAt: Date;
// }
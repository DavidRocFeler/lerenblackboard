import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { CredentialEntity } from "../credential/Crdential.entity";
import { SchoolEntity } from "../school/School.entity";
import { StudentEntity } from "../student/Student.entity";
import { TeacherEntity } from "../teacher/Teacher.entity";
import { AuxiliarEntity } from "../auxiliar/Auxiliar.entity";
import { AuxiliarGradeEntity } from "../auxiliarGrade/AuxiliarGrade.entity";
import { SubDirectorEntity } from "../subDirector/SubDirector.entity";
import { DirectorEntity } from "../director/Director.entity";
import { UserEntity } from "../user/user.entity";
import { SuperAdminEntity } from "../superAdmin/SuperAdmin.entity";
import { ClaudinaryEntity } from "../claudinary/Claudinary.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities: [
    CredentialEntity, 
    SchoolEntity, 
    StudentEntity, 
    TeacherEntity, 
    AuxiliarEntity, 
    AuxiliarGradeEntity,
    SubDirectorEntity,
    DirectorEntity,
    UserEntity,
    SuperAdminEntity,
    ClaudinaryEntity
  ],
  subscribers: [],
  migrations: [],
});

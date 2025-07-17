import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { Student } from "../entities/Student";
import { Credential } from "../entities/Credential";
import { Admin } from "../entities/Admin";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [Student, Credential, Admin],
  subscribers: [],
  migrations: [],
});

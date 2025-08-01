import { AppDataSource } from "../config/dataSource";
import { CredentialEntity } from "./Crdential.entity";

export const CredentialRepository = AppDataSource.getRepository(CredentialEntity);
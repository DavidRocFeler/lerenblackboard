import { AppDataSource } from "../setting/dataSource";
import { Credential } from "../entities/Credential";

export const CredentialRepository = AppDataSource.getRepository(Credential);
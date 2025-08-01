import bcrypt from "bcrypt";
import { CredentialRepository } from "./credential.repository";
import ICreateCredentialDto from "./credential.dto";
import { CredentialEntity } from "./Crdential.entity";
// ...

export const createCredentialService = async (credentialDto: ICreateCredentialDto): Promise<CredentialEntity> => {
    const { password } = credentialDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const credential = CredentialRepository.create({ password: hashedPassword });
    await CredentialRepository.save(credential);
    return credential;
}

export const checkPasswordService = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}
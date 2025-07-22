import { AppDataSource } from "../config/dataSource";
import { Admin } from "../entities/Admin";

export const AdminRepository = AppDataSource.getRepository(Admin);

export const adminRepository = {
  findSafeAdmins: async () => {
    const admins = await AdminRepository.createQueryBuilder("admin")
      .leftJoinAndSelect("admin.credential", "credential")
      .select([
        "admin.id",
        "admin.name",
        "admin.email",
        "credential.id"  // Solo esto de la credencial
      ])
      .getMany();
    return admins;
  }
};
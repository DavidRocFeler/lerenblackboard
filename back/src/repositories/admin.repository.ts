import { AppDataSource } from "../config/dataSource";
import { Admin } from "../entities/Admin"; 

export const AdminRepository = AppDataSource.getRepository(Admin);

export const adminRepository = {
    findSafeAdmins: () => AdminRepository.find({
      relations: ["credential"],
      select: ["id", "name", "email"]
    })
  };
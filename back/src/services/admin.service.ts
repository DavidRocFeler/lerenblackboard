// src/modules/admin/admin.service.ts
import { adminRepository } from "../repositories/admin.repository";

export const adminService = {
  getAllAdmins: async () => {
    return adminRepository.findSafeAdmins();
  }
};
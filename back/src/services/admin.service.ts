import { adminRepository } from "../repositories/admin.repository";

export const getAllAdminsService = {
  getAllAdmins: async () => {
    const admins = await adminRepository.findSafeAdmins();
    return admins.map(admin => ({
      ...admin,
      credential: undefined // Elimina completamente el campo credential
    }));
  }
};
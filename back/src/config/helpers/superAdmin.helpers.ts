// src/helpers/superAdmin.helper.ts

import { ICreateSuperAdminDto } from "../../superAdmin/createSuperAdmin.dto";


export const superAdminData: ICreateSuperAdminDto = {
    firstName: "Admin",
    lastName: "Principal",
    governmentId: "ADMIN-001",
    email: "admin@lerenblackboard.com",
    phone: "+1234567890",
    hireDate: new Date(2025, 6, 26),
    contractType: "Full-time",
    emergencyContact: "Contacto de emergencia",
    password: "Admin123!"
  };
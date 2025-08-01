// Cambia el nombre del archivo a superAdmin.service.ts para mayor claridad

import { AppDataSource } from "../config/dataSource";
import { CredentialEntity } from "../credential/Crdential.entity";
import { ICreateSuperAdminDto, IUpdateSuperAdmin } from "./createSuperAdmin.dto";
import { SuperAdminRepository } from "./superAdmin.repository";
import bcrypt from 'bcrypt';

export const getAllSuperAdminsService = async () => {
  const superAdmins = await SuperAdminRepository.createQueryBuilder("superAdmin")
    .leftJoinAndSelect("superAdmin.user", "user")
    .select([
      "superAdmin.id",
      "superAdmin.firstName",
      "superAdmin.lastName",
      "superAdmin.governmentId",
      "superAdmin.email",
      "superAdmin.phone",
      "superAdmin.hireDate",
      "superAdmin.contractType",
      "superAdmin.emergencyContact",
      "user.id"
    ])
    .getMany();

  return superAdmins.map(superAdmin => ({
    id: superAdmin.id,
    firstName: superAdmin.firstName,
    lastName: superAdmin.lastName,
    governmentId: superAdmin.governmentId,
    email: superAdmin.email,
    phone: superAdmin.phone,
    hireDate: superAdmin.hireDate,
    contractType: superAdmin.contractType,
    emergencyContact: superAdmin.emergencyContact,
    userId: superAdmin.user?.id  // Optional chaining por si no tiene usuario relacionado
  }));
};

export const createSuperAdminService = async (createDto: ICreateSuperAdminDto) => {
  // Verificar si el email ya existe
  const existingAdmin = await SuperAdminRepository.findOne({ 
    where: { email: createDto.email } 
  });
  
  if (existingAdmin) {
    throw new Error('El email ya está registrado');
  }

  // Crear la credencial primero
  const credential = new CredentialEntity();
  credential.password = await bcrypt.hash(createDto.password, 10);
  
  // Guardar la credencial
  const credentialRepository = AppDataSource.getRepository(CredentialEntity);
  await credentialRepository.save(credential);

  // Crear el SuperAdmin
  const superAdmin = SuperAdminRepository.create({
    ...createDto,
    credential: credential
  });

  // Guardar y retornar (sin la contraseña)
  const savedAdmin = await SuperAdminRepository.save(superAdmin);
  
  return {
    id: savedAdmin.id,
    firstName: savedAdmin.firstName,
    lastName: savedAdmin.lastName,
    email: savedAdmin.email,
    phone: savedAdmin.phone,
    hireDate: savedAdmin.hireDate,
    contractType: savedAdmin.contractType,
    emergencyContact: savedAdmin.emergencyContact,
    governmentId: savedAdmin.governmentId
  };
};

export const updateSuperAdminService = async (
  id: number, 
  updateDto: IUpdateSuperAdmin
) => {
  const admin = await SuperAdminRepository.findOne({ 
    where: { id },
    relations: ['credential']
  });

  if (!admin) {
    throw new Error('Super administrador no encontrado');
  }

  // Actualizar campos básicos
  SuperAdminRepository.merge(admin, updateDto);

  // Si viene password, actualizarla
  if (updateDto.password) {
    if (!admin.credential) {
      throw new Error('Credencial no configurada');
    }
    admin.credential.password = await bcrypt.hash(updateDto.password, 10);
  }

  const updatedAdmin = await SuperAdminRepository.save(admin);
  
  return {
    id: updatedAdmin.id,
    firstName: updatedAdmin.firstName,
    lastName: updatedAdmin.lastName,
    email: updatedAdmin.email,
    phone: updatedAdmin.phone,
    hireDate: updatedAdmin.hireDate,
    contractType: updatedAdmin.contractType,
    emergencyContact: updatedAdmin.emergencyContact,
    governmentId: updatedAdmin.governmentId
  };
};
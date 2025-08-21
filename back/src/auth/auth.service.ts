// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { AppDataSource } from "../config/dataSource";
import { StudentEntity } from "../student/Student.entity";
import { TeacherEntity } from "../teacher/Teacher.entity";
import { DirectorEntity } from "../director/Director.entity";
import { SubDirectorEntity } from "../subDirector/SubDirector.entity";
import { AuxiliarGradeEntity } from "../auxiliarGrade/AuxiliarGrade.entity";
import { AuxiliarEntity } from "../auxiliar/Auxiliar.entity";
import { SuperAdminEntity } from "../superAdmin/SuperAdmin.entity";
import { SchoolRepository } from "../school/school.repository";

// Servicio para usuarios regulares (con escuela)
export const loginService = async (
  email: string, 
  password: string,
  schoolSlug: string
) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  try {
    // Buscar el usuario en todos los roles excepto superadmin
    const roleRepositories = [
      { repo: AppDataSource.getRepository(StudentEntity), role: "student" },
      { repo: AppDataSource.getRepository(TeacherEntity), role: "teacher" },
      { repo: AppDataSource.getRepository(DirectorEntity), role: "director" },
      { repo: AppDataSource.getRepository(SubDirectorEntity), role: "subdirector" },
      { repo: AppDataSource.getRepository(AuxiliarGradeEntity), role: "auxiliar_grade" },
      { repo: AppDataSource.getRepository(AuxiliarEntity), role: "auxiliar" }
    ];

    let user: any = null;
    let userRole: string = '';

    for (const { repo, role } of roleRepositories) {
      const foundUser = await repo.findOne({
        where: { email },
        relations: ["credential", "school"]
      });

      if (foundUser) {
        user = foundUser;
        userRole = role;
        break;
      }
    }

    if (!user) throw new Error("Usuario no encontrado");

    // Validar coincidencia de colegio
    const school = await SchoolRepository.findOne({ where: { slug: schoolSlug } });
    if (!school) throw new Error("Colegio no encontrado");

    if (user.school?.id !== school.id) {
      throw new Error("No tienes acceso a este colegio");
    }

    return handleRegularUserLogin(user, userRole, password);

  } catch (error) {
    throw error;
  }
};

// Servicio específico para superadmin
export const loginAdminService = async (email: string, password: string) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  try {
    // Buscar solo en superadmin
    const superAdminRepo = AppDataSource.getRepository(SuperAdminEntity);
    const superAdmin = await superAdminRepo.findOne({
      where: { email },
      relations: ["credential"]
    });

    if (!superAdmin) {
      throw new Error("Superadmin no encontrado");
    }

    return handleSuperAdminLogin(superAdmin, password);

  } catch (error) {
    throw error;
  }
};

// Funciones auxiliares (mantienen la misma lógica)
async function handleSuperAdminLogin(superAdmin: SuperAdminEntity, password: string) {
  if (!superAdmin.credential) {
    throw new Error("Credenciales no configuradas para superadmin");
  }

  const isValid = await bcrypt.compare(password, superAdmin.credential.password);
  if (!isValid) {
    throw new Error("Contraseña incorrecta para superadmin");
  }

  const tokenPayload = {
    id: superAdmin.id,
    email: superAdmin.email,
    role: "superadmin",
    schoolId: null
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET!, { expiresIn: "24h" });

  return {
    id: superAdmin.id,
    firstName: superAdmin.firstName,
    lastName: superAdmin.lastName,
    email: superAdmin.email,
    role: "superadmin",
    token,
    schoolId: null
  };
}

async function handleRegularUserLogin(user: any, role: string, password: string) {
  if (!user.credential) {
    throw new Error("Credenciales no configuradas");
  }

  const isValid = await bcrypt.compare(password, user.credential.password);
  if (!isValid) {
    throw new Error("Contraseña incorrecta");
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role,
    schoolId: user.school?.id
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET!, { expiresIn: "24h" });

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role,
    token,
    schoolId: user.school?.id
  };
}
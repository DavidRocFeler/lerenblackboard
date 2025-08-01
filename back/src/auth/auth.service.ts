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

export const loginService = async (email: string, password: string) => {
  // console.log("Iniciando login para:", email); // Debug 1
  // Verificar conexión a BD
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  try {
    // 1. Buscar SuperAdmin con credenciales
    const superAdmin = await AppDataSource.getRepository(SuperAdminEntity)
      .createQueryBuilder("superAdmin")
      .where("superAdmin.email = :email", { email })
      .leftJoinAndSelect("superAdmin.credential", "credential")
      .leftJoinAndSelect("superAdmin.user", "user")
      .getOne();

      // console.log("Resultado de la consulta:", superAdmin); // Debug 2

      if (superAdmin) {
        return handleSuperAdminLogin(superAdmin, password);
      }

    // 2. Buscar en otros roles (con escuela)
    const roleRepositories = [
      { repo: AppDataSource.getRepository(StudentEntity), role: "student" },
      { repo: AppDataSource.getRepository(TeacherEntity), role: "teacher" },
      { repo: AppDataSource.getRepository(DirectorEntity), role: "director" },
      { repo: AppDataSource.getRepository(SubDirectorEntity), role: "subdirector" },
      { repo: AppDataSource.getRepository(AuxiliarGradeEntity), role: "auxiliar_grade" },
      { repo: AppDataSource.getRepository(AuxiliarEntity), role: "auxiliar" }
    ];

    for (const { repo, role } of roleRepositories) {
      const user = await repo.findOne({
        where: { email },
        relations: ["credential", "school"]
      });

      if (user) {
        return handleRegularUserLogin(user, role, password);
      }
    }

    throw new Error("Usuario no encontrado");

  } catch (error) {
    // console.error("Error en loginService:", error);
    throw error; // Re-lanzamos el error para que el controlador lo maneje
  }
};

// Funciones auxiliares para manejar diferentes tipos de login
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
import LoginUserDto from "../dtos/loginUser.dto";
import RegisterUserDto from "../dtos/registerUser.dto";
import { Student } from "../entities/Student";
import { StudentRepository } from "../repositories/student.repository";
import { ClientError } from "../utils/errors";
import {
  checkPasswordService,
  createCredentialService,
} from "./credential.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await StudentRepository.findOneBy({ email });
  return !!user;
};

export const registerUserService = async (
  registerUserDto: RegisterUserDto
): Promise<Student> => {
  const user = await StudentRepository.create(registerUserDto);
  await StudentRepository.save(user);
  const credential = await createCredentialService({
    password: registerUserDto.password,
  });
  user.credential = credential;
  await StudentRepository.save(user);
  return user;
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<{ token: string; user: Student }> => {
  const user: Student | null = await StudentRepository.findOne({
    where: {
      email: loginUserDto.email,
    },
    relations: ["credential"],
  });
  if (!user) throw new Error("User not found");
  if (
    await checkPasswordService(loginUserDto.password, user.credential.password)
  ) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return {
      user,
      token,
    };
  } else {
    throw new ClientError("Invalid password");
  }
};

export const getAllStudentsService = async () => {
    return StudentRepository.createQueryBuilder("student")
      .leftJoinAndSelect("student.credential", "credential")
      .select([
        "student.id",
        "student.name",
        "student.email",
        "student.phone",
        "student.parentName",
        "student.parentPhone",
        "student.parentEmail",
        "student.level",
        "student.section",
        "student.isActive",
        "student.birthdate",
        "student.studentCode",
        "student.picture",
        "student.balance",
        "credential.id" // Solo el ID, sin password
      ])
      .getMany();
  }
  
  export const getStudentByIdService = async (studentId: string, token: string) => {
    // 1. Validar que el token exista
    if (!token) {
      throw new Error("Token no proporcionado");
    }
  
    let payload;
    try {
      // 2. Validar token y extraer payload con manejo de errores
      payload = jwt.verify(token, JWT_SECRET) as { 
        id: string;
        role: "admin" | "student"; 
      };
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  
    // 3. Convertir IDs a número para comparación con BD
    const studentIdNum = parseInt(studentId);
    const payloadIdNum = parseInt(payload.id);
  
    if (isNaN(studentIdNum)) throw new Error("ID de estudiante inválido");
    if (isNaN(payloadIdNum)) throw new Error("Token corrupto");
  
    // 4. Autorización
    if (payload.role !== "admin" && payloadIdNum !== studentIdNum) {
      throw new Error("Acceso no autorizado");
    }
  
    // 5. Consulta a BD
    const student = await StudentRepository.createQueryBuilder("student")
      .leftJoinAndSelect("student.credential", "credential")
      .where("student.id = :studentId", { studentId: studentIdNum })
      .select([
        "student.id",
        "student.name", 
        "student.email",
        "student.phone",
        "student.parentName",
        "student.parentPhone",
        "student.parentEmail",
        "student.level",
        "student.section",
        "student.isActive",
        "student.birthdate",
        "student.studentCode",
        "student.picture",
        "student.balance",
        "credential.id"
      ])
      .getOne();
  
    if (!student) {
      throw new Error("Estudiante no encontrado");
    }
  
    return student;
  };
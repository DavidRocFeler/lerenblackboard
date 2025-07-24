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
      ])
      .getMany();
  }
  
  export const getStudentByIdService = async (studentId: string, token: string) => {
    console.log('[DEBUG] Token recibido:', token); // Verificar si llega el token
    
    // 1. Validar que el token exista
    if (!token) {
      console.error('[ERROR] Token no proporcionado');
      throw new Error("Token no proporcionado");
    }
  
    let payload;
    try {
      // Verificar si el token incluye 'Bearer ' y limpiarlo si es necesario
      const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
      console.log('[DEBUG] Token limpio:', cleanToken);
      
      // 2. Validar token y extraer payload con manejo de errores
      payload = jwt.verify(cleanToken, JWT_SECRET) as { 
        id: string;
        role: "admin" | "student"; 
      };
      console.log('[DEBUG] Payload decodificado:', payload);
    } catch (error) {
      console.error('[ERROR] Fallo en verificación JWT:', error);
      throw new Error("Token inválido o expirado");
    }
  
    // 3. Convertir IDs a número para comparación con BD
    const studentIdNum = parseInt(studentId);
    const payloadIdNum = parseInt(payload.id);
    console.log('[DEBUG] IDs convertidos:', { studentIdNum, payloadIdNum });
  
    if (isNaN(studentIdNum)) {
      console.error('[ERROR] ID de estudiante inválido');
      throw new Error("ID de estudiante inválido");
    }
    if (isNaN(payloadIdNum)) {
      console.error('[ERROR] Token corrupto - ID no numérico');
      throw new Error("Token corrupto");
    }
  
    // 4. Autorización
    if (payload.role !== "admin" && payloadIdNum !== studentIdNum) {
      console.error('[ERROR] Acceso no autorizado', {
        role: payload.role,
        payloadId: payloadIdNum,
        requestedId: studentIdNum
      });
      throw new Error("Acceso no autorizado");
    }
  
    try {
      // 5. Consulta a BD
      console.log('[DEBUG] Realizando consulta a BD para studentId:', studentIdNum);
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
        ])
        .getOne();
  
      if (!student) {
        console.error('[ERROR] Estudiante no encontrado en BD');
        throw new Error("Estudiante no encontrado");
      }
  
      console.log('[DEBUG] Estudiante encontrado:', { id: student.id, name: student.name });
      return student;
    } catch (dbError) {
      console.error('[ERROR] Error en consulta a BD:', dbError);
      throw new Error("Error al buscar estudiante");
    }
  };
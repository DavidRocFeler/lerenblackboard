import { JWT_SECRET } from "../config/envs";
import { EducationLevel, Grade } from "./Student.entity";
import { StudentRepository } from "./student.repository";
import jwt from "jsonwebtoken";

export const getAllStudentsService = async () => {
  return StudentRepository.createQueryBuilder("student")
    .leftJoinAndSelect("student.credential", "credential")
    .leftJoinAndSelect("student.user", "user")
    .leftJoinAndSelect("user.pictures", "pictures", "pictures.category = :category", { category: "profile" })
    .leftJoinAndSelect("student.school", "school")
    .select([
      // Datos del estudiante
      "student.id",
      "student.firstName",
      "student.lastName",
      "student.email",
      "student.phone",
      "student.governmentId",
      "student.fatherName",
      "student.motherName",
      "student.parentPhone",
      "student.parentEmail",
      "student.level",
      "student.grade",
      "student.section",
      "student.isActive",
      "student.birthdate",
      "student.studentCode",
      "student.balance",
      "student.address",
      "student.city",
      "student.country",
      
      // Datos de las credenciales

      // No incluyas el password por seguridad
      
      // Datos del usuario
      "user.id",
      "user.role",
      
      // Datos de la imagen de perfil
      "pictures.id",
      "pictures.cloudinaryUrl",
      "pictures.originalName",
      "pictures.category",
      "pictures.description",
      
      // Datos de la escuela
      "school.id",
      "school.name" // Asumiendo que tu SchoolEntity tiene un campo name
    ])
    .getMany();
};
  
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
          "student.firstName",
          "student.lastName",
          "student.email",
          "student.phone",
          "student.governmentId",  // Añadido (faltaba)
          "student.fatherName",    // Cambiado de parentName (que no existe)
          "student.motherName",    // Añadido
          "student.parentPhone",
          "student.parentEmail",
          "student.level",
          "student.section",
          "student.isActive",
          "student.birthdate",
          "student.studentCode",
          "student.picture",
          "student.balance",
          "student.address",      // Añadido (nuevo campo)
          "student.city",         // Añadido (nuevo campo)
          "student.country",      // Añadido (nuevo campo)
          "student.school"        // Opcional
        ])
        .getOne();
      if (!student) {
        console.error('[ERROR] Estudiante no encontrado en BD');
        throw new Error("Estudiante no encontrado");
      }
  
      console.log('[DEBUG] Estudiante encontrado:', { id: student.id, name: student.email });
      return student;
    } catch (dbError) {
      console.error('[ERROR] Error en consulta a BD:', dbError);
      throw new Error("Error al buscar estudiante");
    }
};

  // src/services/student.service.ts
  export const getStudentsBySchoolService = async (schoolId: number, level: EducationLevel) => {
    return StudentRepository.createQueryBuilder("student")
      .leftJoinAndSelect("student.user", "user")
      .leftJoinAndSelect("user.pictures", "pictures", "pictures.category = :category", { category: "profile" })
      .leftJoinAndSelect("student.school", "school")
      .where("school.id = :schoolId", { schoolId })
      .select([
        // Datos del estudiante
        "student.id",
        "student.firstName",
        "student.lastName",
        "student.email",
        "student.phone",
        "student.governmentId",
        "student.fatherName",
        "student.motherName",
        "student.parentPhone",
        "student.parentEmail",
        "student.level",
        "student.grade",
        "student.section",
        "student.isActive",
        "student.birthdate",
        "student.studentCode",
        "student.balance",
        "student.address",
        "student.city",
        "student.country",
        
        // Datos de las credenciales
  
        // No incluyas el password por seguridad
        
        // Datos del usuario
        "user.id",
        "user.role",
        
        // Datos de la imagen de perfil
        "pictures.id",
        "pictures.cloudinaryUrl",
        "pictures.originalName",
        "pictures.category",
        "pictures.description",
        
        // Datos de la escuela
        "school.id",
        "school.name" // Asumiendo que tu SchoolEntity tiene un campo name
      ])
      .getMany();
  };

export const getStudentsBySchoolAndLevelService = async (schoolId: number, level: EducationLevel) => {
  return StudentRepository.createQueryBuilder("student")
    .leftJoinAndSelect("student.user", "user")
    .leftJoinAndSelect("user.pictures", "pictures", "pictures.category = :category", { category: "profile" })
    .leftJoinAndSelect("student.school", "school")
    .where("school.id = :schoolId", { schoolId })
    .andWhere("student.level = :level", { level })
    .select([
      // Datos del estudiante
      "student.id",
      "student.firstName",
      "student.lastName",
      "student.email",
      "student.phone",
      "student.governmentId",
      "student.fatherName",
      "student.motherName",
      "student.parentPhone",
      "student.parentEmail",
      "student.level",
      "student.grade",
      "student.section",
      "student.isActive",
      "student.birthdate",
      "student.studentCode",
      "student.balance",
      "student.address",
      "student.city",
      "student.country",
      
      // Datos de las credenciales

      // No incluyas el password por seguridad
      
      // Datos del usuario
      "user.id",
      "user.role",
      
      // Datos de la imagen de perfil
      "pictures.id",
      "pictures.cloudinaryUrl",
      "pictures.originalName",
      "pictures.category",
      "pictures.description",
      
      // Datos de la escuela
      "school.id",
      "school.name" // Asumiendo que tu SchoolEntity tiene un campo name
    ])
    .getMany();
};

export const getStudentsBySchoolLevelAndGradeService = async (
  schoolId: number, 
  level: EducationLevel, 
  grade: Grade
) => {
  return StudentRepository.createQueryBuilder("student")
    .leftJoinAndSelect("student.user", "user")
    .leftJoinAndSelect("user.pictures", "pictures", "pictures.category = :category", { category: "profile" })
    .leftJoinAndSelect("student.school", "school")
    .where("school.id = :schoolId", { schoolId })
    .andWhere("student.level = :level", { level })
    .andWhere("student.grade = :grade", { grade })
    .select([
      // Datos del estudiante
      "student.id",
      "student.firstName",
      "student.lastName",
      "student.email",
      "student.phone",
      "student.governmentId",
      "student.fatherName",
      "student.motherName",
      "student.parentPhone",
      "student.parentEmail",
      "student.level",
      "student.grade",
      "student.section",
      "student.isActive",
      "student.birthdate",
      "student.studentCode",
      "student.balance",
      "student.address",
      "student.city",
      "student.country",
      
      // Datos de las credenciales

      // No incluyas el password por seguridad
      
      // Datos del usuario
      "user.id",
      "user.role",
      
      // Datos de la imagen de perfil
      "pictures.id",
      "pictures.cloudinaryUrl",
      "pictures.originalName",
      "pictures.category",
      "pictures.description",
      
      // Datos de la escuela
      "school.id",
      "school.name" // Asumiendo que tu SchoolEntity tiene un campo name
    ])
    .getMany();
};

export const getStudentsBySchoolLevelGradeAndSectionService = async (
  schoolId: number, 
  level: EducationLevel, 
  grade: Grade, 
  section: string
) => {
  return StudentRepository.createQueryBuilder("student")
    .leftJoinAndSelect("student.user", "user")
    .leftJoinAndSelect("user.pictures", "pictures", "pictures.category = :category", { category: "profile" })
    .leftJoinAndSelect("student.school", "school")
    .where("school.id = :schoolId", { schoolId })
    .andWhere("student.level = :level", { level })
    .andWhere("student.grade = :grade", { grade })
    .andWhere("student.section = :section", { section })
    .select([
      // Datos del estudiante
      "student.id",
      "student.firstName",
      "student.lastName",
      "student.email",
      "student.phone",
      "student.governmentId",
      "student.fatherName",
      "student.motherName",
      "student.parentPhone",
      "student.parentEmail",
      "student.level",
      "student.grade",
      "student.section",
      "student.isActive",
      "student.birthdate",
      "student.studentCode",
      "student.balance",
      "student.address",
      "student.city",
      "student.country",
      
      // Datos de las credenciales

      // No incluyas el password por seguridad
      
      // Datos del usuario
      "user.id",
      "user.role",
      
      // Datos de la imagen de perfil
      "pictures.id",
      "pictures.cloudinaryUrl",
      "pictures.originalName",
      "pictures.category",
      "pictures.description",
      
      // Datos de la escuela
      "school.id",
      "school.name" // Asumiendo que tu SchoolEntity tiene un campo name
    ])
    .getMany();
};
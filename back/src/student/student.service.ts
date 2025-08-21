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
  console.log('=== INICIO DEBUG ===');
  console.log('1. Parámetros recibidos:', { studentId, tokenSnippet: token.slice(0, 10) + '...' });

  try {
    // 1. Validar token
    const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    console.log('2. Token limpio:', cleanToken);

    const payload = jwt.verify(cleanToken, JWT_SECRET) as { id: string; role: string };
    console.log('3. Payload decodificado:', payload);

    // 2. Validar IDs
    const studentIdNum = parseInt(studentId);
    const payloadIdNum = parseInt(payload.id);
    console.log('4. IDs convertidos:', { studentIdNum, payloadIdNum });

    if (isNaN(studentIdNum) || isNaN(payloadIdNum)) {
      throw new Error('IDs inválidos');
    }

    // 3. Autorización
    if (payload.role !== "admin" && payloadIdNum !== studentIdNum) {
      throw new Error('No autorizado');
    }

    // 4. Consulta a la BD
    console.log('5. Antes de la consulta a BD');
    const student = await StudentRepository.createQueryBuilder("student")
    .leftJoinAndSelect("student.user", "user")
    .leftJoinAndSelect("user.pictures", "pictures", "pictures.category = :category", { category: "profile" })
    .where("student.id = :studentId", { studentId: studentIdNum })
    .getOne(); // ✅ Retorna TODOS los campos

    console.log('6. Resultado de la consulta:', student);
    if (!student) throw new Error('Estudiante no encontrado');

    return student;
  } catch (error: any) {
    console.error('=== ERROR ===', {
      message: error.message,
      stack: error.stack, // ¡Esto es clave!
      fullError: JSON.stringify(error, null, 2)
    });
    throw new Error(error.message);
  } finally {
    console.log('=== FIN DEBUG ===');
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
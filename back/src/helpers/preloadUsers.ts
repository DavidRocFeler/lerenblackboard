// src/services/preload.service.ts
import { Credential } from "../entities/Credential";
import bcrypt from "bcrypt";
import { StudentRepository } from "../repositories/student.repository";
import { AdminRepository } from "../repositories/admin.repository";
import { CredentialRepository } from "../repositories/credential.repository";

// Datos del estudiante (con isActive: boolean)
const studentData = [
  {
    id: 1,
    name: "Valentina A.",
    email: "valentina@school.com",
    password: "Valentina123!",
    phone: "999888777",
    parentName: "María González",
    parentPhone: "111222333",
    parentEmail: "maria@example.com",
    level: "Primaria",
    section: "A",
    isActive: true, // true = ACTIVO
    birthdate: "2010-05-15",
    studentCode: "STU-001",
    picture: "valentina.jpg",
    balance: 100.50
  },
  {
      id: 2,
      name: "Eva Juliet",
      email: "eva@example.com",
      password: "EvaJuliet123!",
      phone: "555555555",
      parentName: "Madre de Eva",
      parentPhone: "444444444",
      parentEmail: "madre_eva@example.com",
      level: "Primaria",
      section: "B",
      isActive: true,
      birthdate: "2010-05-15",
      studentCode: "ST002",
      picture: "url_imagen_eva",
      balance: 75.00,
  }
]
  
// Datos del admin
const adminData = {
  name: "Admin",
  email: "admin@school.com",
  password: "Admin123!"
};

export const preloadData = async () => {
  try {
    // Verificar si ya existen datos
    if ((await StudentRepository.count()) === 0 && (await AdminRepository.count()) === 0) {
      
      // 1. Precargar estudiantes
      for (const studentItem of studentData) {
        const studentCredential = new Credential();
        studentCredential.password = await bcrypt.hash(studentItem.password, 10);
        await CredentialRepository.save(studentCredential);

        const student = StudentRepository.create({
          ...studentItem,
          credential: studentCredential
        });
        await StudentRepository.save(student);
      }

      // 2. Precargar admin
      const adminCredential = new Credential();
      adminCredential.password = await bcrypt.hash(adminData.password, 12); // Hash más fuerte para admin
      await CredentialRepository.save(adminCredential);

      const admin = AdminRepository.create({
        name: adminData.name,
        email: adminData.email,
        credential: adminCredential
      });
      await AdminRepository.save(admin);

      console.log(`✅ ${studentData.length} estudiantes + 1 admin precargados`);
    } else {
      console.log("⚠️ Ya existen datos en la BD");
    }
  } catch (error) {
    console.error("❌ Error en el preload:", error);
    throw error;
  }
};
// src/helpers/preload.helper.ts

import bcrypt from "bcrypt";

// Importar datos
import { schoolData } from "./schoolData.helpers";
import { studentData } from "./studentData.helpers";
import { superAdminData } from "./superAdmin.helpers";
import { SchoolRepository } from "../../school/school.repository";
import { StudentRepository } from "../../student/student.repository";
import { UserRepository } from "../../user/user.repository";
import { CredentialRepository } from "../../credential/credential.repository";
import { SuperAdminRepository } from "../../superAdmin/superAdmin.repository";
import { EducationLevel, Grade } from "../../student/Student.entity";
import { ClaudinaryRepository } from "../../claudinary/claudinary.repository";

export const preloadData = async () => {
  try {
    // 1. Precargar escuelas
    if ((await SchoolRepository.count()) === 0) {
      for (const school of schoolData) {
        await SchoolRepository.save(SchoolRepository.create(school));
      }
      console.log(`✅ ${schoolData.length} escuelas precargadas`);
    }

    // 2. Precargar estudiantes
    if ((await StudentRepository.count()) === 0) {
      const schools = await SchoolRepository.find();
      
      for (const student of studentData) {
        try {
          console.log(`🔍 Creando estudiante: ${student.firstName} ${student.lastName}`);
          
          // Crear UserEntity
          const userEntity = UserRepository.create({ role: "student" });
          await UserRepository.save(userEntity);

          // Crear Credential
          const credential = CredentialRepository.create({
            password: await bcrypt.hash(student.password, 12)
          });
          await CredentialRepository.save(credential);

          const convertLevel = (level: string): EducationLevel => {
            switch(level) {
              case "Inicial": return EducationLevel.INICIAL;
              case "Primaria": return EducationLevel.PRIMARIA;
              case "Secundaria": return EducationLevel.SECUNDARIA;
              default: throw new Error(`Nivel inválido: ${level}`);
            }
          };
          
          // Crear StudentEntity
          const studentEntity = StudentRepository.create({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            phone: student.phone,
            governmentId: student.governmentId,
            fatherName: student.fatherName,
            motherName: student.motherName,
            parentPhone: student.parentPhone,
            parentEmail: student.parentEmail,
            section: student.section,
            isActive: student.isActive,
            birthdate: student.birthdate,
            studentCode: student.studentCode,
            picture: student.picture && typeof student.picture === 'object' ? 
            ClaudinaryRepository.create(student.picture) : 
            undefined,
            balance: student.balance,
            credential,
            user: userEntity,
            level: typeof student.level === 'string' ? convertLevel(student.level) : student.level,
            grade: student.grade as Grade,
            school: schools.find(s => s.id === student.school.id)
          });
          await StudentRepository.save(studentEntity);

          console.log(`✅ Estudiante ${student.firstName} creado exitosamente`);
        } catch (error) {
          console.error(`❌ Error creando estudiante ${student.firstName}:`, error);
        }
      }

      console.log(`✅ ${studentData.length} estudiantes precargados`);
    }

    // 3. Precargar SuperAdmin
    if ((await SuperAdminRepository.count()) === 0) {
      try {
        console.log("🔍 Creando SuperAdmin...");

        // Crear UserEntity para SuperAdmin
        const adminUser = UserRepository.create({ role: "superadmin" });
        await UserRepository.save(adminUser);

        // Crear Credential para SuperAdmin
        const adminCredential = CredentialRepository.create({
          password: await bcrypt.hash(superAdminData.password, 12)
        });
        await CredentialRepository.save(adminCredential);

        // Crear SuperAdminEntity (sin campo credential ya que SuperAdmin no lo tiene)
        const superAdmin = SuperAdminRepository.create({
          firstName: superAdminData.firstName,
          lastName: superAdminData.lastName,
          governmentId: superAdminData.governmentId,
          email: superAdminData.email,
          phone: superAdminData.phone,
          hireDate: superAdminData.hireDate,
          contractType: superAdminData.contractType,
          emergencyContact: superAdminData.emergencyContact,
          user: adminUser,
          credential: adminCredential
        });
        await SuperAdminRepository.save(superAdmin);

        console.log("✅ SuperAdmin creado exitosamente");
      } catch (error) {
        console.error("❌ Error creando SuperAdmin:", error);
      }
    }

    console.log("🎉 Preload completado exitosamente");
  } catch (error) {
    console.error("❌ Error general en el preload:", error);
  }
};
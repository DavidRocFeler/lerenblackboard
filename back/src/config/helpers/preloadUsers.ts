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
import { schoolCalendarData } from "./schoolCalendar.helper";
import { CalendarEventType } from "../../schoolCalendar/schoolCalendar.Entity";
import { SchoolCalendarRepository } from "../../schoolCalendar/schoolCalendar.repository";
import { directorData } from "./directorData";
import { DirectorRepository } from "../../director/director.repository";

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

    // 4. Precargar eventos del calendario (SOLO SI NO HAY DATOS)
    if ((await SchoolCalendarRepository.count()) === 0) {
      const schools = await SchoolRepository.find();

      for (const event of schoolCalendarData) {
        try {
          const school = schools.find(s => s.id === event.schoolId);
          if (!school) {
            console.warn(`⚠️ Escuela ID ${event.schoolId} no encontrada para evento "${event.title}"`);
            continue;
          }

          await SchoolCalendarRepository.save({
            title: event.title,
            date: event.date,
            description: event.description,
            eventType: event.eventType as CalendarEventType, // Asegura el tipo enum
            school: school // Relación directa
          });

          console.log(`✅ Evento "${event.title}" creado para ${school.name}`);
        } catch (error) {
          console.error(`❌ Error en evento "${event.title}":`, error);
        }
      }
      console.log(`📅 ${schoolCalendarData.length} eventos precargados`);
    }

    //5 directors
    if ((await DirectorRepository.count()) === 0) {
      const schools = await SchoolRepository.find();
      
      for (const director of directorData) {
        try {
          console.log(`🔍 Creando director: ${director.firstName} ${director.lastName}`);
          
          // 1. Crear Credential primero
          const credential = CredentialRepository.create({
            password: await bcrypt.hash(director.password, 12)
          });
          await CredentialRepository.save(credential);

          // 2. Crear DirectorEntity (SIN user primero)
          const directorEntity = DirectorRepository.create({
            firstName: director.firstName,
            lastName: director.lastName,
            email: director.email,
            phone: director.phone,
            governmentId: director.governmentId,
            address: director.address,
            city: director.city,
            country: director.country,
            hireDate: director.hireDate,
            officeNumber: director.officeNumber,
            isActive: director.isActive,
            shift: director.shift,
            credential,
            school: schools.find(s => s.id === director.school.id)
          });
          await DirectorRepository.save(directorEntity);

          // 3. Crear UserEntity con la imagen de perfil Y la relación con el director
          const userEntity = UserRepository.create({ 
            role: "director",
            director: directorEntity // ← ESTA ES LA CLAVE: establecer la relación bidireccional
          });
          
          await UserRepository.save(userEntity);

          // 5. Actualizar el director con la referencia al usuario
          directorEntity.user = userEntity;
          await DirectorRepository.save(directorEntity);

          console.log(`✅ Director ${director.firstName} creado exitosamente`);
        } catch (error) {
          console.error(`❌ Error creando director ${director.firstName}:`, error);
        }
      }
      console.log(`✅ ${directorData.length} directores precargados`);
    }

    console.log("🎉 Preload completado exitosamente");
  } catch (error) {
    console.error("❌ Error general en el preload:", error);
  }
};
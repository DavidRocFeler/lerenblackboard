// src/helpers/userData.helper.ts

import { ICreateStudentDto } from "../../student/student.dto";
import { EducationLevel, Grade } from "../../student/Student.entity";


export const studentData: ICreateStudentDto[] = [
    {
      id: 1,
      firstName: "Valentina",
      lastName: "A.",
      email: "valentina@lerenblackboard.com",
      password: "Leren123!",
      phone: "999888777",
      governmentId: "DNI-87654321",
      fatherName: "María González",
      motherName: "Padre Valentina",
      parentPhone: "111222333",
      parentEmail: "maria@example.com",
      level: EducationLevel.PRIMARIA, // Usa el enum directamente
      grade: Grade.PRIMARIA_2, // Usa el enum directamente
      section: "A",
      isActive: true,
      birthdate: "2010-05-15",
      studentCode: "STU-001",
      picture: "valentina.jpg",
      balance: 100.50,
      school: {
        id: 1
      }
    },
    {
      id: 2,
      firstName: "Eva Juliet",
      lastName: "Palomino Alva",
      email: "eva@lerenblackboard.com",
      password: "Leren123!",
      phone: "555555555",
      governmentId: "DNI-12345678",
      fatherName: "Padre de Eva",
      motherName: "Madre de Eva",
      parentPhone: "444444444",
      parentEmail: "madre_eva@example.com",
      level: EducationLevel.PRIMARIA, // Usa el enum directamente
      grade: Grade.PRIMARIA_2, // Usa el enum directamente
      section: "A",
      isActive: true,
      birthdate: "2010-05-15",
      studentCode: "ST002",
      picture: "url_imagen_eva",
      balance: 75.00,
      school: {
        id: 1
      }
    }
  ];
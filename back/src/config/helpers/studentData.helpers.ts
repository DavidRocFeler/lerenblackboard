// src/helpers/userData.helper.ts

import { ClaudinaryEntity } from "../../claudinary/Claudinary.entity";
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
      picture: {
        id: 1,
        originalName: "valentina-profile.jpg",
        filename: "valentina-profile-12345.jpg",
        cloudinaryUrl: "https://res.cloudinary.com/.../valentina.jpg",
        cloudinaryPublicId: "students/valentina-12345",
        mimeType: "image/jpeg",
        size: 1024,
        category: "profile",
        entityType: "user",
        userId: 1
      } as unknown as ClaudinaryEntity,
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
      picture: {
        id: 1,
        originalName: "valentina-profile.jpg",
        filename: "valentina-profile-12345.jpg",
        cloudinaryUrl: "https://res.cloudinary.com/.../valentina.jpg",
        cloudinaryPublicId: "students/valentina-12345",
        mimeType: "image/jpeg",
        size: 1024,
        category: "profile",
        entityType: "user",
        userId: 2
      } as unknown as ClaudinaryEntity ,
      balance: 75.00,
      school: {
        id: 1
      }
    },
    {
      id: 3,
      firstName: "Carlos",
      lastName: "Mendoza",
      email: "carlos@sanmarcos.edu.pe",
      password: "SanMarcos123!",
      phone: "999111222",
      governmentId: "DNI-11223344",
      fatherName: "Luis Mendoza",
      motherName: "Ana Mendoza",
      parentPhone: "999111223",
      parentEmail: "padres_carlos@example.com",
      level: EducationLevel.PRIMARIA,
      grade: Grade.PRIMARIA_3,
      section: "B",
      isActive: true,
      birthdate: "2009-08-22",
      studentCode: "SM-001",
      picture: {
        id: 3,
        originalName: "carlos-profile.jpg",
        filename: "carlos-profile-67890.jpg",
        cloudinaryUrl: "https://res.cloudinary.com/.../carlos.jpg",
        cloudinaryPublicId: "students/carlos-67890",
        mimeType: "image/jpeg",
        size: 1024,
        category: "profile",
        entityType: "user",
        userId: 3
      } as unknown as ClaudinaryEntity,
      balance: 120.00,
      school: {
        id: 2  // Pertenece al Colegio San Marcos
      }
    },
    {
      id: 4,
      firstName: "Lucía",
      lastName: "Fernández",
      email: "lucia@sanmarcos.edu.pe",
      password: "SanMarcos123!",
      phone: "999333444",
      governmentId: "DNI-55667788",
      fatherName: "Roberto Fernández",
      motherName: "Claudia Fernández",
      parentPhone: "999333445",
      parentEmail: "padres_lucia@example.com",
      level: EducationLevel.SECUNDARIA,
      grade: Grade.SECUNDARIA_2,
      section: "A",
      isActive: true,
      birthdate: "2008-03-15",
      studentCode: "SM-002",
      picture: {
        id: 4,
        originalName: "lucia-profile.jpg",
        filename: "lucia-profile-13579.jpg",
        cloudinaryUrl: "https://res.cloudinary.com/.../lucia.jpg",
        cloudinaryPublicId: "students/lucia-13579",
        mimeType: "image/jpeg",
        size: 1024,
        category: "profile",
        entityType: "user",
        userId: 4
      } as unknown as ClaudinaryEntity,
      balance: 85.50,
      school: {
        id: 2  // Pertenece al Colegio San Marcos
      }
    }
];
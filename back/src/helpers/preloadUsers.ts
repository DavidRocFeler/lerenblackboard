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
    email: "valentina@lerenblackboard.com",
    password: "Leren123!",
    phone: "999888777",
    parentName: "María González",
    parentPhone: "111222333",
    parentEmail: "maria@example.com",
    level: "Primaria",
    section: "A",
    isActive: true,
    birthdate: "2010-05-15",
    studentCode: "STU-001",
    picture: "valentina.jpg",
    balance: 100.50
  },
  {
    id: 2,
    name: "Eva Juliet",
    email: "eva@lerenblackboard.com",
    password: "Leren123!",
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
  },
  {
    id: 3,
    name: "Alessca",
    email: "alessca@lerenblackboard.com",
    password: "Leren123!",
    phone: "987654321",
    parentName: "Roberto Mendoza",
    parentPhone: "123456789",
    parentEmail: "roberto@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-07-22",
    studentCode: "STU-003",
    picture: "alessca.jpg",
    balance: 85.25
  },
  {
    id: 4,
    name: "Rafaella",
    email: "rafaella@lerenblackboard.com",
    password: "Leren123!",
    phone: "987123654",
    parentName: "Carlos Ramírez",
    parentPhone: "321654987",
    parentEmail: "carlos@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-03-10",
    studentCode: "STU-004",
    picture: "rafaella.jpg",
    balance: 90.00
  },
  {
    id: 5,
    name: "Denzel",
    email: "denzel@lerenblackboard.com",
    password: "Leren123!",
    phone: "963852741",
    parentName: "Laura Smith",
    parentPhone: "741852963",
    parentEmail: "laura@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-08-05",
    studentCode: "STU-005",
    picture: "denzel.jpg",
    balance: 110.75
  },
  {
    id: 6,
    name: "Austin",
    email: "austin@lerenblackboard.com",
    password: "Leren123!",
    phone: "951753852",
    parentName: "Michael Johnson",
    parentPhone: "357159456",
    parentEmail: "michael@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-11-18",
    studentCode: "STU-006",
    picture: "austin.jpg",
    balance: 65.50
  },
  {
    id: 7,
    name: "Mateo",
    email: "mateo@lerenblackboard.com",
    password: "Leren123!",
    phone: "852963741",
    parentName: "Ana López",
    parentPhone: "456123789",
    parentEmail: "ana@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-04-30",
    studentCode: "STU-007",
    picture: "mateo.jpg",
    balance: 120.00
  },
  {
    id: 8,
    name: "Anthuan",
    email: "anthuan@lerenblackboard.com",
    password: "Leren123!",
    phone: "753159486",
    parentName: "Pedro Martínez",
    parentPhone: "486753159",
    parentEmail: "pedro@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-09-12",
    studentCode: "STU-008",
    picture: "anthuan.jpg",
    balance: 95.25
  },
  {
    id: 9,
    name: "Dominic",
    email: "dominic@lerenblackboard.com",
    password: "Leren123!",
    phone: "654987321",
    parentName: "Sofía Rodríguez",
    parentPhone: "321987654",
    parentEmail: "sofia@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-06-25",
    studentCode: "STU-009",
    picture: "dominic.jpg",
    balance: 80.00
  },
  {
    id: 10,
    name: "Alex",
    email: "alex@lerenblackboard.com",
    password: "Leren123!",
    phone: "369258147",
    parentName: "Juan Pérez",
    parentPhone: "147258369",
    parentEmail: "juan@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-02-14",
    studentCode: "STU-010",
    picture: "alex.jpg",
    balance: 105.75
  },
  {
    id: 11,
    name: "Alessandro",
    email: "alessandro@lerenblackboard.com",
    password: "Leren123!",
    phone: "258147369",
    parentName: "Luisa Fernández",
    parentPhone: "369147258",
    parentEmail: "luisa@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-10-08",
    studentCode: "STU-011",
    picture: "alessandro.jpg",
    balance: 70.50
  },
  {
    id: 12,
    name: "Enzo",
    email: "enzo@lerenblackboard.com",
    password: "Leren123!",
    phone: "147369258",
    parentName: "Ricardo Gómez",
    parentPhone: "258369147",
    parentEmail: "ricardo@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-12-03",
    studentCode: "STU-012",
    picture: "enzo.jpg",
    balance: 115.00
  },
  {
    id: 13,
    name: "Luz Valentina",
    email: "luzvalentina@lerenblackboard.com",
    password: "Leren123!",
    phone: "789456123",
    parentName: "Patricia Castro",
    parentPhone: "123456789",
    parentEmail: "patricia@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-01-20",
    studentCode: "STU-013",
    picture: "luzvalentina.jpg",
    balance: 88.75
  },
  {
    id: 14,
    name: "Bianca",
    email: "bianca@lerenblackboard.com",
    password: "Leren123!",
    phone: "654321987",
    parentName: "Gabriel Silva",
    parentPhone: "987321654",
    parentEmail: "gabriel@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-07-07",
    studentCode: "STU-014",
    picture: "bianca.jpg",
    balance: 92.50
  },
  {
    id: 15,
    name: "Valeria",
    email: "valeria@lerenblackboard.com",
    password: "Leren123!",
    phone: "321654987",
    parentName: "Daniela Herrera",
    parentPhone: "987654321",
    parentEmail: "daniela@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-05-28",
    studentCode: "STU-015",
    picture: "valeria.jpg",
    balance: 78.25
  },
  {
    id: 16,
    name: "Thiago",
    email: "thiago@lerenblackboard.com",
    password: "Leren123!",
    phone: "951486273",
    parentName: "Fernando Díaz",
    parentPhone: "273486951",
    parentEmail: "fernando@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-09-15",
    studentCode: "STU-016",
    picture: "thiago.jpg",
    balance: 102.00
  },
  {
    id: 17,
    name: "Eva",
    email: "eva2@lerenblackboard.com",
    password: "Leren123!",
    phone: "852741963",
    parentName: "María Rodríguez",
    parentPhone: "963741852",
    parentEmail: "maria2@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-04-05",
    studentCode: "STU-017",
    picture: "eva2.jpg",
    balance: 87.50
  },
  {
    id: 18,
    name: "Angeles",
    email: "angeles@lerenblackboard.com",
    password: "Leren123!",
    phone: "753951486",
    parentName: "José Sánchez",
    parentPhone: "486951753",
    parentEmail: "jose@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-11-22",
    studentCode: "STU-018",
    picture: "angeles.jpg",
    balance: 94.75
  },
  {
    id: 19,
    name: "Jhesta",
    email: "jhesta@lerenblackboard.com",
    password: "Leren123!",
    phone: "369147258",
    parentName: "Carmen Vargas",
    parentPhone: "258147369",
    parentEmail: "carmen@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-03-17",
    studentCode: "STU-019",
    picture: "jhesta.jpg",
    balance: 81.00
  },
  {
    id: 20,
    name: "Evelyn",
    email: "evelyn@lerenblackboard.com",
    password: "Leren123!",
    phone: "147258369",
    parentName: "Alberto Ruiz",
    parentPhone: "369258147",
    parentEmail: "alberto@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-08-30",
    studentCode: "STU-020",
    picture: "evelyn.jpg",
    balance: 99.50
  },
  {
    id: 21,
    name: "Génesis",
    email: "genesis@lerenblackboard.com",
    password: "Leren123!",
    phone: "258369147",
    parentName: "Rosa Torres",
    parentPhone: "147369258",
    parentEmail: "rosa@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-12-12",
    studentCode: "STU-021",
    picture: "genesis.jpg",
    balance: 76.25
  },
  {
    id: 22,
    name: "Jick",
    email: "jick@lerenblackboard.com",
    password: "Leren123!",
    phone: "369258147",
    parentName: "Manuel Ortega",
    parentPhone: "147258369",
    parentEmail: "manuel@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-02-28",
    studentCode: "STU-022",
    picture: "jick.jpg",
    balance: 108.00
  },
  {
    id: 23,
    name: "Valentina R.",
    email: "valentinar@lerenblackboard.com",
    password: "Leren123!",
    phone: "147369258",
    parentName: "Andrea Molina",
    parentPhone: "258369147",
    parentEmail: "andrea@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-06-08",
    studentCode: "STU-023",
    picture: "valentinar.jpg",
    balance: 83.75
  },
  {
    id: 24,
    name: "Dylan",
    email: "dylan@lerenblackboard.com",
    password: "Leren123!",
    phone: "258147369",
    parentName: "Roberto Navarro",
    parentPhone: "369147258",
    parentEmail: "roberto2@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-10-15",
    studentCode: "STU-024",
    picture: "dylan.jpg",
    balance: 97.25
  },
  {
    id: 25,
    name: "Hyrum",
    email: "hyrum@lerenblackboard.com",
    password: "Leren123!",
    phone: "369147258",
    parentName: "Silvia Jiménez",
    parentPhone: "258147369",
    parentEmail: "silvia@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-01-05",
    studentCode: "STU-025",
    picture: "hyrum.jpg",
    balance: 89.50
  },
  {
    id: 26,
    name: "Carlos",
    email: "carlos@lerenblackboard.com",
    password: "Leren123!",
    phone: "147258369",
    parentName: "Eduardo Ríos",
    parentPhone: "369258147",
    parentEmail: "eduardo@example.com",
    level: "Primaria",
    section: "G",
    isActive: true,
    birthdate: "2010-07-19",
    studentCode: "STU-026",
    picture: "carlos.jpg",
    balance: 104.75
  }
];
  
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
// src/helpers/directorData.helper.ts
import { ICreateDirectorDto } from "../../director/director.dto";

export const directorData: ICreateDirectorDto[] = [
  {
    id: 1,
    firstName: "María",
    lastName: "García López",
    email: "maria.garcia@sorana.edu.pe",
    password: "SorAna123!",
    phone: "+51987654321",
    governmentId: "DNI-12345678",
    address: "Av. Los Ángeles 123",
    city: "Lima",
    country: "Perú",
    hireDate: new Date(2015, 2, 10),
    officeNumber: "Oficina 101",
    isActive: true,
    shift: "morning",
    // 🟡 ELIMINAR: picture ya no va aquí, se maneja a través del User
    // picture: { ... },
    school: {
      id: 1
    }
  },
  {
    id: 2,
    firstName: "Carlos",
    lastName: "Martínez Rojas",
    email: "carlos.martinez@sanmarcos.edu.pe",
    password: "SanMarcos123!",
    phone: "+51912345678",
    governmentId: "DNI-87654321",
    address: "Calle San Marcos 456",
    city: "Arequipa",
    country: "Perú",
    hireDate: new Date(2018, 5, 15),
    officeNumber: "Oficina Principal",
    isActive: true,
    shift: "morning",
    // 🟡 ELIMINAR: picture ya no va aquí
    // picture: { ... },
    school: {
      id: 2
    }
  }
];
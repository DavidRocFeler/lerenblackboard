// src/helpers/schoolData.helper.ts

import { ICreateSchoolDto } from "../../school/school.dto";


export const schoolData: ICreateSchoolDto[] = [
    {
      name: "Sor Ana de los Ángeles",
      slug: "sor-ana",
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      address: "Av. Los Ángeles 123",
      city: "Lima",
      stateOrRegion: "Lima",
      country: "Perú",
      regulatoryCode: "UGEL-07-001",
      regulatoryEntity: "UGEL 07",
      phone: "+5112345678",
      email: "contacto@sorana.edu.pe",
      educationLevel: "k12" as const,
      shifts: ["morning", "afternoon"],
      foundingDate: new Date(1990, 0, 15)
    },
    {
      name: "Colegio San Marcos",
      slug: "san-marcos",
      primaryColor: "#EF4444",
      secondaryColor: "#F59E0B",
      address: "Calle San Marcos 456",
      city: "Arequipa",
      stateOrRegion: "Arequipa",
      country: "Perú",
      regulatoryCode: "UGEL-04-002",
      regulatoryEntity: "UGEL 04",
      phone: "+5198765432",
      email: "informes@sanmarcos.edu.pe",
      educationLevel: "primary" as const,
      shifts: ["morning"],
      foundingDate: new Date(1985, 5, 20)
    }
  ];
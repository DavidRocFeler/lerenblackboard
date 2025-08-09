import { ICreateClaudinaryDto } from "../claudinary/claudinary.dto";

// src/schools/schools.dto.ts
export interface ICreateSchoolDto {
    name: string;
    slug: string;
    address: string;
    city: string;
    stateOrRegion: string;
    country: string;
    phone: string;
    email: string;
    educationLevel: 'preschool' | 'primary' | 'secondary' | 'k12';
    shifts: string[];
    logoFile?: ICreateClaudinaryDto;  // Para uploads
    backgroundFile?: ICreateClaudinaryDto;  
    primaryColor?: string;
    secondaryColor?: string;
    regulatoryCode?: string;
    regulatoryEntity?: string;
    foundingDate?: Date;
  }
  
  export interface IUpdateSchoolDto extends Partial<Omit<ICreateSchoolDto, 'logoFile' | 'backgroundFile'>> {
    // Campos específicos para actualización de imágenes
    logoFile?: ICreateClaudinaryDto;
    backgroundFile?: ICreateClaudinaryDto;
    removeLogo?: boolean;  // Flag para eliminar logo
    removeBackground?: boolean;
  }
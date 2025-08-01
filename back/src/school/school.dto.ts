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
    logo?: string;
    background?: string;
    primaryColor?: string;
    secondaryColor?: string;
    regulatoryCode?: string;
    regulatoryEntity?: string;
    foundingDate?: Date;
  }
  
  export interface IUpdateSchoolDto extends Partial<ICreateSchoolDto> {}
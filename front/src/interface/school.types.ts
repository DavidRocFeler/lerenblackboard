// src/interfaces/school/types.ts

export interface ISchool {
  id: number;
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
  primaryColor?: string;
  secondaryColor?: string;
  regulatoryCode?: string;
  regulatoryEntity?: string;
  foundingDate?: string; 
  directors: any[]; 
  logo?: null | {
    id: number;
    originalName: string;
    filename: string;
    cloudinaryUrl: string;
    cloudinaryPublicId: string;
    mimeType: string;
    size: number;
    description: string | null;
    category: string;
    entityType: string;
    createdAt: string;
    updatedAt: string;
    userId: string | null;
  };
  background?: null | { // Añadido para manejar el caso null o posiblemente una estructura similar a logo
    id: number;
    originalName: string;
    filename: string;
    cloudinaryUrl: string;
    cloudinaryPublicId: string;
    mimeType: string;
    size: number;
    description: string | null;
    category: string;
    entityType: string;
    createdAt: string;
    updatedAt: string;
    userId: string | null;
  };
}
//src/claudinary/claudinary.dto.ts
export interface ICreateClaudinaryDto {
    id: number;
    originalName: string;
    filename: string;
    cloudinaryUrl: string;
    cloudinaryPublicId: string;
    mimeType: string;
    size: number;
    description?: string;
    category: "profile" | "document" | "gallery" | "other";
    entityType: "user" | "school";
    userId?: number;
    schoolId?: number;
    user?: {
      id: number;
    };
    school?: {
      id: number;
    };
  }
  
  export interface IUpdateClaudinaryDto extends Partial<ICreateClaudinaryDto> {}
// src/claudinary/claudinary.dto.ts

// DTO para creación (CREATE)
export interface ICreateClaudinaryDto {
  originalName: string;          // Requerido
  filename: string;              // Requerido
  cloudinaryUrl: string;         // Requerido
  cloudinaryPublicId: string;    // Requerido
  mimeType: string;              // Requerido
  size: number;                  // Requerido
  description?: string;          // Opcional
  category: "profile" | "document" | "gallery" | "other"; // Requerido
  entityType: "user" | "school"; // Requerido
  
  // Relaciones (solo una será usada)
  userId?: number;               // Opcional (si entityType = "user")
  schoolId?: number;             // Opcional (si entityType = "school")
}

// DTO para actualización (UPDATE)
export interface IUpdateClaudinaryDto {
  id: number;                    // Requerido para updates
  originalName?: string;
  filename?: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  mimeType?: string;
  size?: number;
  description?: string;
  category?: "profile" | "document" | "gallery" | "other";
  // entityType NO debería ser actualizable (cambiaría la relación)
}

// DTO para respuesta (GET)
export interface IClaudinaryResponseDto extends ICreateClaudinaryDto {
  id: number;                    // Agregado para responses
  createdAt: Date;
  updatedAt: Date;
  user?: { id: number };         // Relación expandida (opcional)
  school?: { id: number };       // Relación expandida (opcional)
}
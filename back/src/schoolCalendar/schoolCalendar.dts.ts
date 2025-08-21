// src/interfaces/ISchoolCalendarData.ts
export interface ISchoolCalendarEvent {
    id?: number;
    title: string;
    date: Date;
    description: string;
    eventType: "Deportes" | "Reunion" | "Recaudación" | "Celebracion";
    schoolId: number; // Vinculación directa con la escuela
  }
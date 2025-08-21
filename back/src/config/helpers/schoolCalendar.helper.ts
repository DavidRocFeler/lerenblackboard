// src/data/schoolCalendar.data.ts

import { ISchoolCalendarEvent } from "../../schoolCalendar/schoolCalendar.dts";

export const schoolCalendarData: ISchoolCalendarEvent[] = [
  // Eventos para la escuela ID 1 (Sor Ana de los Ángeles)
  {
    id: 1,
    title: "Día del Maestro",
    date: new Date(2024, 6, 6), // 6 de Julio 2024
    description: "Celebración especial para nuestros profesores",
    eventType: "Celebracion",
    schoolId: 1
  },
  {
    id: 2,
    title: "Olimpiadas Escolares",
    date: new Date(2024, 7, 15), // 15 de Agosto 2024
    description: "Competencias deportivas interaulas",
    eventType: "Deportes",
    schoolId: 1
  },

  // Eventos para la escuela ID 2 (Colegio San Marcos)
  {
    id: 3,
    title: "Reunión de Padres",
    date: new Date(2024, 5, 20), // 20 de Junio 2024
    description: "Evaluación del primer bimestre",
    eventType: "Reunion",
    schoolId: 2
  },
  {
    id: 4,
    title: "Feria de Ciencias",
    date: new Date(2024, 8, 10), // 10 de Septiembre 2024
    description: "Exposición de proyectos científicos",
    eventType: "Celebracion",
    schoolId: 2
  },
  {
    id: 5,
    title: "Campaña de Donación",
    date: new Date(2024, 9, 1), // 1 de Octubre 2024
    description: "Recolección de útiles para niños necesitados",
    eventType: "Recaudación",
    schoolId: 2
  }
];
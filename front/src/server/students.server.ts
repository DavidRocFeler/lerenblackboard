import { IStudentDetails } from "@/interface/student.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// 🔓 Función PÚBLICA - Sin autorización
export async function getAllStudentDetails(): Promise<IStudentDetails[]> {
  const response = await fetch(`${API_URL}/students`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch all students');
  }

  return await response.json();
}

// 🔒 Función PRIVADA - Con autorización Bearer Token
export async function getStudentById(studentId: number, token: string): Promise<IStudentDetails> {
  const response = await fetch(`${API_URL}/students/${studentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate', // Desactiva caché
      'Pragma': 'no-cache', // Para compatibilidad con HTTP/1.0
      'Expires': '0', // Fecha de expiración en el pasado
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado - Token inválido');
    }
    if (response.status === 403) {
      throw new Error('Acceso denegado - Sin permisos');
    }
    if (response.status === 404) {
      throw new Error('Estudiante no encontrado');
    }
    throw new Error('Error al obtener datos del estudiante');
  }

  return await response.json();
}

// 🔒 Función para obtener estudiantes por grado y sección
export async function getAllStudentsByGradeAndSectionServer(
  schoolId: number,
  level: string,
  grade: string,
  section: string,
  token: string
): Promise<IStudentDetails[]> {
  // Codificar los parámetros para URL segura
  const encodedLevel = encodeURIComponent(level);
  const encodedGrade = encodeURIComponent(grade);
  const encodedSection = encodeURIComponent(section);
  
  const response = await fetch(
    `${API_URL}/students/school/${schoolId}/level/${encodedLevel}/grade/${encodedGrade}/section/${encodedSection}`, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado - Token inválido');
    }
    if (response.status === 403) {
      throw new Error('Acceso denegado - Sin permisos para ver estos estudiantes');
    }
    if (response.status === 404) {
      throw new Error('Estudiantes no encontrados para esta sección');
    }
    throw new Error('Error al obtener datos de los estudiantes');
  }

  return await response.json();
}

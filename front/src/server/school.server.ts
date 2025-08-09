import { ISchool } from "@/interface/school.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// 🔓 Función PÚBLICA - Sin autorización
export async function getAllSchoolServer(): Promise<ISchool[]> {
  try {
    const response = await fetch(`${API_URL}/school`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch schools:', error);
    throw error;
  }
}

// 🔒 Función PRIVADA - Con autorización Bearer Token
export async function getSchoolByIdServer(schoolId: string, token: string): Promise<ISchool> {
  try {
    const response = await fetch(`${API_URL}/school/${schoolId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch school with ID ${schoolId}:`, error);
    throw error;
  }
}

// 🔒 Función PRIVADA - Crear escuela
export async function createSchoolServer(schoolData: Omit<ISchool, 'id'>, token: string): Promise<ISchool> {
  try {
    const response = await fetch(`${API_URL}/school`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(schoolData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create school:', error);
    throw error;
  }
}

// 🔒 Función PRIVADA - Actualizar escuela
export async function updateSchoolServer(schoolId: string, schoolData: Partial<ISchool>, token: string): Promise<ISchool> {
  try {
    const response = await fetch(`${API_URL}/school/${schoolId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(schoolData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to update school with ID ${schoolId}:`, error);
    throw error;
  }
}

// 🔒 Función PRIVADA - Eliminar escuela
export async function deleteSchoolServer(schoolId: string, token: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/school/${schoolId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete school with ID ${schoolId}:`, error);
    throw error;
  }
}
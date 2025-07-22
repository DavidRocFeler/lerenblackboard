// src/server/login.server.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'student';
  token: string;
}

export interface StudentDetails {
  id: number;
  email: string;
  name: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  level: string;
  section: string;
  isActive: boolean;
  birthdate: string;
  studentCode: string;
  picture: string;
  balance: string;
  credential: {
    id: number;
  };
}

export async function login(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Si el servidor no responde (ej: CORS, red caída, servidor offline)
    if (!response.ok) {
      const data = await response.json().catch(() => null); // <- Si la respuesta no es JSON válido
      const errorMessage = data?.error; // <- Usa data.error o mensaje por defecto
      throw new Error(errorMessage);
    }

    return await response.json(); // <- Si todo está bien, devuelve los datos del usuario
  } catch (error) {
    // Si fetch falla completamente (servidor offline, red caída)
    if (error instanceof TypeError) {
      throw new Error('Error en el servidor, comuniquese con soporte');
    }
    // Si es otro error (ej: JSON inválido), lo relanzamos
    throw error;
  }
}

export async function getStudentDetails(token: string): Promise<StudentDetails> {
  const response = await fetch(`${API_URL}/students`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch student details');
  }

  return await response.json();
}
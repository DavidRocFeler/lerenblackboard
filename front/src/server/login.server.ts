import { IUserData } from "@/interface/user.types";

// src/server/login.server.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// src/server/login.server.ts
export async function login(
  email: string, 
  password: string,
  slug: string // Nuevo parámetro para el slug
): Promise<IUserData> {
  try {
    const response = await fetch(`${API_URL}/auth/schools/${slug}/login`, { // Usamos el slug dinámico
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const errorMessage = data?.error || 'Error en la autenticación';
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Error de conexión con el servidor');
    }
    throw error;
  }
}


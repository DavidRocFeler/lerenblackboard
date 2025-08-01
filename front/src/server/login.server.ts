import { IUser } from "@/interface/student.types";

// src/server/login.server.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function login(email: string, password: string): Promise<IUser> {
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


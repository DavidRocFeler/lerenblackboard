import { ISchoolCalendarEvent } from "@/interface/school.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// Obtener todos los eventos del calendario
export async function getAllCalendarSchoolServer(token: string): Promise<ISchoolCalendarEvent[]> {
  const response = await fetch(`${API_URL}/calendar`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch all calendar events');
  }

  return await response.json();
}

// Obtener un evento específico por ID
export async function getEventCalendarByIdServer(calendarId: string, token: string): Promise<ISchoolCalendarEvent> {
  const response = await fetch(`${API_URL}/calendar/${calendarId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch calendar event with ID: ${calendarId}`);
  }

  return await response.json();
}

// Crear un nuevo evento en el calendario
export async function createNewEventCalendarServer(
  eventData: Omit<ISchoolCalendarEvent, 'id' | 'schoolId'>, // ← QUITAR schoolId
  token: string
): Promise<ISchoolCalendarEvent> {
  const response = await fetch(`${API_URL}/calendar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // ← El token YA TIENE el schoolId
    },
    body: JSON.stringify(eventData), // ← Envías SOLO los datos del evento
  });

  if (!response.ok) {
    throw new Error('Failed to create new calendar event');
  }

  return await response.json();
}

// Actualizar un evento existente
export async function updateEventCalendarServer(calendarId: string, eventData: Partial<ISchoolCalendarEvent>, token: string): Promise<ISchoolCalendarEvent> {
  const response = await fetch(`${API_URL}/calendar/${calendarId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update calendar event with ID: ${calendarId}`);
  }

  return await response.json();
}

// Eliminar un evento del calendario
export async function deleteEventCalendarServer(calendarId: string, token: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/calendar/${calendarId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete calendar event with ID: ${calendarId}`);
  }

  return await response.json();
}
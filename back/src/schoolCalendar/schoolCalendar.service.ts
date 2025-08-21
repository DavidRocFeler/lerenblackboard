import { SchoolCalendarEntity } from "./schoolCalendar.Entity";
import { SchoolCalendarRepository } from "./schoolCalendar.repository";

// 1. Obtener todos los eventos de un colegio
export const getAllEventsService = async (schoolId: number) => {
    return await SchoolCalendarRepository.find({
        where: { school: { id: schoolId } },
        order: { date: "ASC" }
    });
};

// 2. Buscar evento por ID y colegio
export const getEventByIdService = async (eventId: number, schoolId: number) => {
    const event = await SchoolCalendarRepository.findOne({
        where: {
            id: eventId,
            school: { id: schoolId }
        }
    });
    if (!event) throw new Error("Evento no encontrado");
    return event;
};

// 3. Crear/Actualizar evento
export const upsertEventService = async (eventData: {
    id?: number;
    title: string;
    date: Date;
    description?: string;
    eventType: string;
    schoolId: number;
}) => {
    // 1. Crear nueva entidad si no existe ID
    let event = eventData.id ? await SchoolCalendarRepository.findOneBy({ id: eventData.id }) : new SchoolCalendarEntity();
    
    // 2. Verificar si existe (para updates)
    if (eventData.id && !event) {
        throw new Error("Evento no encontrado para actualizar");
    }
    
    // 3. Asignar propiedades (TypeScript seguro)
    Object.assign(event!, {
        title: eventData.title,
        date: eventData.date,
        description: eventData.description,
        eventType: eventData.eventType,
        school: { id: eventData.schoolId }
    });

    // 4. Guardar (el ! confirma a TypeScript que event no es null)
    return await SchoolCalendarRepository.save(event!);
};

// 4. Eliminar evento
export const deleteEventService = async (eventId: number, schoolId: number) => {
    const result = await SchoolCalendarRepository.delete({
        id: eventId,
        school: { id: schoolId }
    });
    if (result.affected === 0) throw new Error("Evento no encontrado");
};
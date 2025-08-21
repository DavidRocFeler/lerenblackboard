import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getAllEventsService } from "./schoolCalendar.service";
import { getEventByIdService } from "./schoolCalendar.service";
import { upsertEventService } from "./schoolCalendar.service";
import { deleteEventService } from "./schoolCalendar.service";

const getSchoolIdFromToken = (req: Request): number => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token no proporcionado");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { schoolId: number };
    return decoded.schoolId;
};

// 1. GET / (Todos los eventos)
export const getAllEventsOfCalendarController = async (req: Request, res: Response) => {
    try {
        const schoolId = getSchoolIdFromToken(req);
        const events = await getAllEventsService(schoolId);
        res.status(200).json(events);
    } catch (error : any) {
        res.status(401).json({ error: error.message });
    }
};

// 2. GET /:calendarId (Evento por ID)
export const getEventCalendarByIdController = async (req: Request, res: Response) => {
    try {
        const schoolId = getSchoolIdFromToken(req);
        const event = await getEventByIdService(parseInt(req.params.calendarId), schoolId);
        res.status(200).json(event);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};

// 3. POST / (Crear/Actualizar)
export const updateNewEventCalendarController = async (req: Request, res: Response) => {
    try {
        const schoolId = getSchoolIdFromToken(req);
        const event = await upsertEventService({
            ...req.body,
            schoolId
        });
        res.status(201).json(event);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// 4. DELETE /:calendarId (Eliminar)
export const deleteEventCalendarByIdController = async (req: Request, res: Response) => {
    try {
        const schoolId = getSchoolIdFromToken(req);
        await deleteEventService(parseInt(req.params.calendarId), schoolId);
        res.status(204).send();
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};
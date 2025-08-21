// src/routes/student.routes.ts
import { Router } from "express";
import {  deleteEventCalendarByIdController, getAllEventsOfCalendarController, getEventCalendarByIdController, updateNewEventCalendarController } from "./schoolCalendar.controller";

const schoolCalendarRouter = Router();

schoolCalendarRouter.get("/", getAllEventsOfCalendarController);
schoolCalendarRouter.get("/:calendarId", getEventCalendarByIdController);
schoolCalendarRouter.post("/", updateNewEventCalendarController);
schoolCalendarRouter.delete("/:calendarId", deleteEventCalendarByIdController);

export default schoolCalendarRouter;

// src/entities/SchoolCalendar.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SchoolEntity } from "../school/School.entity";

export enum CalendarEventType {
  SPORTS = "Deportes",
  MEETING = "Reunion",
  FUNDRAISING = "Recaudación",
  CELEBRATION = "Celebracion",
}

@Entity({ name: "school_calendar" })
export class SchoolCalendarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: CalendarEventType,
    nullable: false,
  })
  eventType: CalendarEventType;

  @ManyToOne(() => SchoolEntity, (school) => school.calendarEvents, {
    nullable: false,
    onDelete: "CASCADE",
  })
  school: SchoolEntity;
}
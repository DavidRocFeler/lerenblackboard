'use client';
import { Calendar as CalendarIcon } from "lucide-react";
import { ISchoolCalendarEvent } from "@/interface/school.types";

// Cambia el tipo de las props para usar ISchoolCalendarEvent
interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: ISchoolCalendarEvent[]; // Usamos tu interfaz personalizada
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ selectedDate, setSelectedDate, events }: CalendarProps) => {
  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    
    return days;
  };

  // Función mejorada para comparar fechas - compara solo año, mes y día
  const hasEvent = (day: number) => {
    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();
    
    return events.some(event => {
      // Obtenemos año, mes y día del evento
      const eventYear = event.date.getFullYear();
      const eventMonth = event.date.getMonth();
      const eventDay = event.date.getDate();
      
      // Comparamos año, mes y día exactamente
      return (
        eventYear === currentYear &&
        eventMonth === currentMonth &&
        eventDay === day
      );
    });
  };

  return (
    <div className="lg:col-span-2 border-0 shadow-lg rounded-lg bg-white">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900">
              <CalendarIcon className="h-5 w-5" />
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h2>
            <p className="text-sm text-gray-500">School events and important dates</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center font-semibold text-gray-600 text-sm">
                {day}
              </div>
            ))}
            {getDaysInMonth().map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square p-1 text-center text-sm border rounded-lg cursor-pointer transition-colors
                  ${day ? 'hover:bg-blue-50' : ''}
                  ${day && hasEvent(day) ? 'bg-yellow-100 border-yellow-300' : 'border-gray-200'}
                `}
              >
                {day && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className={hasEvent(day) ? 'font-bold text-blue-900' : 'text-gray-700'}>
                      {day}
                    </span>
                    {hasEvent(day) && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
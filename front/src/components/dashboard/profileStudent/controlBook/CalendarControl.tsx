import { Calendar, Minimize2 } from "lucide-react";
import { format, isWeekend, } from "date-fns";

interface NoteData {
  date: string;
  payments: "Pendiente" | "Al día";
  attendance: "Presente" | "Ausente";
  notes: string[];
}
const CalendarControl = ({ 
  fechaSeleccionada, 
  setFechaSeleccionada,
  currentDate,
  notesDatabase,
  onToggleCalendar 
}: { 
  fechaSeleccionada: Date, 
  setFechaSeleccionada: (date: Date) => void,
  currentDate: Date,
  notesDatabase: NoteData[],
  onToggleCalendar: () => void
}) => {
  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const obtenerDiasDelMes = () => {
    const año = fechaSeleccionada.getFullYear();
    const mes = fechaSeleccionada.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaInicioSemana = primerDia.getDay();

    const dias = [];
    
    for (let i = 0; i < diaInicioSemana; i++) {
      dias.push(null);
    }
    
    for (let dia = 1; dia <= diasEnMes; dia++) {
      dias.push(new Date(año, mes, dia));
    }
    
    return dias;
  };

  const getAttendanceForDate = (date: Date) => {
    if (isWeekend(date)) return null; // Ignorar fines de semana
    
    const dateStr = format(date, 'yyyy-MM-dd');
    const note = notesDatabase.find(n => n.date === dateStr);
    return note?.attendance;
  };

  const handleDayClick = (date: Date | null) => {
    if (date && !isWeekend(date)) {
      setFechaSeleccionada(date);
    }
  };

  const dias = obtenerDiasDelMes();

  return (
    <div className="border-0 shadow-lg rounded-lg bg-white h-fit w-full">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-[3rem]">
          <div className="">
            <h2 className="mb-[1rem] sm:mb-0 flex items-center gap-2 text-xl font-bold text-gray-800">
              <Calendar className="h-5 w-5" />
              {nombresMeses[fechaSeleccionada.getMonth()]} {fechaSeleccionada.getFullYear()}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFechaSeleccionada(new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() - 1, 1))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
            >
              ←
            </button>
            <button
              onClick={() => setFechaSeleccionada(new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
            >
              →
            </button>
            <button 
              onClick={onToggleCalendar}
              className="sm:hidden border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {diasSemana.map(dia => (
              <div key={dia} className="p-1 text-center font-semibold text-gray-600 text-xs sm:text-sm">
                {dia}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {dias.map((date, index) => {
              if (date === null) {
                return <div key={index} className="p-1 aspect-square" />;
              }
              
              const dia = date.getDate();
              const isCurrent = format(date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd');
              const isWeekendDay = isWeekend(date);
              const attendance = !isWeekendDay ? getAttendanceForDate(date) : null;
              
              return (
                <button
                  key={index}
                  onClick={() => handleDayClick(date)}
                  disabled={isWeekendDay}
                  className={`text-center aspect-square flex items-center justify-center
                    ${isWeekendDay ? 'text-gray-400 cursor-not-allowed' : ''}
                    ${isCurrent ? 'ring-2 ring-red-500' : ''}
                    ${attendance === 'Presente' ? 'bg-green-100 text-green-800' : ''}
                    ${attendance === 'Ausente' ? 'bg-red-100 text-red-800' : ''}
                    ${!attendance && !isWeekendDay ? 'hover:bg-gray-100' : ''}
                  `}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarControl;
import { Notebook, ChevronLeft, ChevronRight, Loader2, Check, X, Maximize2, Minimize2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { format, addDays, subDays } from "date-fns";
import CalendarControl from "./CalendarControl";

interface NoteData {
  date: string;
  payments: "Pendiente" | "Al día";
  attendance: "Presente" | "Ausente";
  notes: string[];
}

interface NotesSectionProps {
  initialDate?: Date;
}

const NotesSection = ({ initialDate = new Date() }: NotesSectionProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [calendarDate, setCalendarDate] = useState<Date>(initialDate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<NoteData | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Datos de ejemplo
  const notesDatabase: NoteData[] = [
    {
      date: format(new Date(), 'yyyy-MM-dd'),
      payments: "Pendiente",
      attendance: "Presente",
      notes: [
        "No entregó tarea de matemáticas",
        "Excelente participación en ciencias"
      ]
    },
    {
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      payments: "Al día",
      attendance: "Ausente",
      notes: [
        "Falta justificada por médico"
      ]
    },
    {
      date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      payments: "Pendiente",
      attendance: "Presente",
      notes: [
        "Llegó tarde a clase",
        "Debe traer materiales para arte"
      ]
    }
  ];

  // Verificar el tamaño de la pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 640); // sm breakpoint de Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchNoteForDate = (date: Date) => {
    setIsLoading(true);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    setTimeout(() => {
      const foundNote = notesDatabase.find(note => note.date === dateStr) || {
        date: dateStr,
        payments: Math.random() > 0.5 ? "Pendiente" : "Al día",
        attendance: Math.random() > 0.5 ? "Presente" : "Ausente",
        notes: []
      };
      
      setCurrentNote(foundNote);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchNoteForDate(currentDate);
  }, [currentDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setCurrentDate(newDate);
      setCalendarDate(newDate);
    }
  };

  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updateWidth(); // Medición inicial

    return () => resizeObserver.disconnect();
  }, []);

  // 2. Función que determina los estilos basados en el ancho
  const getContainerStyles = () => {
    const baseStyles = "flex mb-6";
    return containerWidth < 620 
      ? `${baseStyles} flex-col` 
      : `${baseStyles} flex-row justify-between items-center`;
  };

  const navigateDays = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1);
    setCurrentDate(newDate);
    setCalendarDate(newDate);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // En móvil, mostramos solo el calendario o solo el cuaderno
  if (isMobileView) {
    return (
      <div className="h-fit">
        {showCalendar ? (
          <div className="h-full">
            <CalendarControl
              fechaSeleccionada={calendarDate} 
              setFechaSeleccionada={setCurrentDate}
              currentDate={currentDate}
              notesDatabase={notesDatabase}
              onToggleCalendar={toggleCalendar}
            />
          </div>
        ) : (
          <div className="border border-red-200 rounded-lg p-6 h-fit flex flex-col bg-white">
            <div className="flex flex-col  sm:justify-between sm:items-center mb-6">
              <h3 className="mb-[1rem] sm:mb-0 text-lg font-bold text-red-800 flex items-center gap-2">
                <Notebook className="h-5 w-5" />
                Cuaderno de Control
              </h3>
              
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={format(currentDate, 'yyyy-MM-dd')}
                  onChange={handleDateChange}
                  className="cursor-pointer border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                />
                <button 
                  onClick={toggleCalendar}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Maximize2 className="h-5 w-5 text-xl font-bold cursor-pointer" />
                </button>
              </div>
            </div>

            <div className="flex-grow relative border border-gray-100 rounded-lg shadow-inner bg-white p-6">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                </div>
              ) : currentNote ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium">
                      {format(new Date(currentNote.date), 'PPPP')}
                      </p>
                    </div>
                    
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Pagos</p>
                      <p className={`font-medium ${currentNote.payments === "Pendiente" ? "text-amber-600" : "text-green-600"}`}>
                        {currentNote.payments}
                      </p>
                    </div>
                    
                    <div className="border-b pb-2">
                      <p className="text-sm text-gray-500">Asistencia</p>
                      <div className="flex items-center gap-1">
                        {currentNote.attendance === "Presente" ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span>{currentNote.attendance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Notas del día:</p>
                    {currentNote.notes.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {currentNote.notes.map((note, index) => (
                          <li key={index} className="text-sm text-gray-700">{note}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No hay notas registradas este día</p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => navigateDays('prev')}
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <ChevronLeft className="h-5 w-5 cursor-pointer" />
                <span className="hidden sm:inline">Día anterior</span>
              </button>
              
              <button
                onClick={() => navigateDays('next')}
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <span className="hidden sm:inline">Día siguiente</span>
                <ChevronRight className="h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vista de escritorio
  return (
    <div className={`flex flex-col ${showCalendar ? 'lg:flex-row' : ''} gap-4`}>
      {showCalendar && (
        <div className="lg:w-[70%] w-full shadow-xl">
          <CalendarControl 
            fechaSeleccionada={calendarDate} 
            setFechaSeleccionada={setCurrentDate}
            currentDate={currentDate}
            notesDatabase={notesDatabase}
            onToggleCalendar={toggleCalendar}
          />
        </div>
      )}
      
      <div ref={containerRef} className="border border-red-200 shadow-xl rounded-lg bg-white p-6 h-[80vh] flex flex-col">
      {/* Contenedor principal con estilos dinámicos */}
      <div className={getContainerStyles()}>
        <h3 className={`${containerWidth < 620 ? 'mb-[1rem]' : 'mb-0'} text-lg font-bold text-red-800 flex items-center gap-2`}>
          <Notebook className="h-5 w-5" />
          Cuaderno de Control
        </h3>
        
        <div className="flex flex-row-reverse items-center gap-2">
          <button onClick={toggleCalendar} className="text-gray-600 hover:text-gray-800 ml-5">
            {showCalendar ? (
              <Minimize2 className="h-5 w-5 text-xl font-bold cursor-pointer" />
            ) : (
              <Maximize2 className="h-5 w-5 text-xl font-bold cursor-pointer" />
            )}
          </button>
          <input
            type="date"
            value={format(currentDate, 'yyyy-MM-dd')}
            onChange={handleDateChange}
            className="mr-auto cursor-pointer border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          />
        
        </div>
      </div>


        <div className="flex-grow relative border border-gray-100 rounded-lg shadow-inner bg-white p-6">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            </div>
          ) : currentNote ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-medium">
                  {format(new Date(currentNote.date), 'PPPP')}
                  </p>
                </div>
                
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Pagos</p>
                  <p className={`font-medium ${currentNote.payments === "Pendiente" ? "text-amber-600" : "text-green-600"}`}>
                    {currentNote.payments}
                  </p>
                </div>
                
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Asistencia</p>
                  <div className="flex items-center gap-1">
                    {currentNote.attendance === "Presente" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span>{currentNote.attendance}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Notas del día:</p>
                {currentNote.notes.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {currentNote.notes.map((note, index) => (
                      <li key={index} className="text-sm text-gray-700">{note}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No hay notas registradas este día</p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex justify-between items-center mt-4 space-x-10">
          <button
            onClick={() => navigateDays('prev')}
            className="flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            <ChevronLeft className="h-5 w-5 cursor-pointer" />
            <span className="hidden sm:inline">Día anterior</span>
          </button>
          
          <button
            onClick={() => navigateDays('next')}
            className="flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            <span className="hidden sm:inline">Día siguiente</span>
            <ChevronRight className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
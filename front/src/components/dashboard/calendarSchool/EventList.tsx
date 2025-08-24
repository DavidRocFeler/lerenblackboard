'use client';
import { ISchoolCalendarEvent } from "@/interface/school.types";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useAuthStore } from '@/store/auth.store';

interface EventListProps {
  events: ISchoolCalendarEvent[];
  onAddEvent: () => void;
}

const getEventColor = (eventType: "Deportes" | "Reunion" | "Recaudación" | "Celebracion") => {
  switch (eventType) {
    case "Celebracion": return "bg-yellow-100 text-yellow-800";
    case "Deportes": return "bg-green-100 text-green-800";
    case "Reunion": return "bg-blue-100 text-blue-800";
    case "Recaudación": return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const EventList = ({ events, onAddEvent }: EventListProps) => {
  // Obtener el usuario del store de autenticación
  const { user } = useAuthStore();
  
  // Determinar si el botón debe mostrarse
  const shouldShowAddButton = user?.role !== "student";

  // ✅ CORREGIDO: Ahora recibe string y lo convierte a Date para formatear
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="border-0 shadow-lg h-fit rounded-lg bg-white">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row">
          <h2 className="text-xl font-bold text-blue-900">Próximos Eventos</h2>
          {/* Botón condicional */}
          {shouldShowAddButton && (
            <button
              onClick={onAddEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center cursor-pointer ml-0 mt-5 sm:ml-auto sm:mt-0"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar Evento
            </button>
          )}
        </div>
        <div className="mt-6 space-y-3">
          {events
            // ✅ CORREGIDO: Convertir a Date solo para el sorting
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 6)
            .map((event) => (
              <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-blue-900">{event.title}</h3>
                  {/* Botones de edición/eliminación también condicionales */}
                  {shouldShowAddButton && (
                    <div className="flex gap-1">
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="flex items-center justify-between">
                  {/* ✅ CORREGIDO: Pasar string a formatDate */}
                  <span className="text-xs text-gray-500">
                    {formatDate(event.date)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getEventColor(event.eventType)}`}>
                    {event.eventType}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
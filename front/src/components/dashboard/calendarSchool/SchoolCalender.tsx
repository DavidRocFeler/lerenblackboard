'use client';
import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import EventList from "./EventList";
import EventModal from "./EventModal";
import { ISchoolCalendarEvent } from "@/interface/school.types";
import { getAllCalendarSchoolServer } from "@/server/schoolCalender.server";
import { useAuthStore } from "@/store/auth.store";
import Swal from "sweetalert2";

const SchoolCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<ISchoolCalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<ISchoolCalendarEvent, 'id' | 'schoolId'>>({
    title: "",
    date: "",
    description: "",
    eventType: "Celebracion"
  });

  // 🔧 Función para manejar eventos creados - SIN conversión de fecha
  const handleEventCreated = (createdEvent: ISchoolCalendarEvent) => {
    try {
      // ✅ El backend ya devuelve date como string, no convertir
      setEvents(prev => [...prev, createdEvent]);
      
    } catch (error) {
      console.error('Error al procesar evento creado:', error);
      Swal.fire('Error', 'No se pudo agregar el evento al calendario', 'error');
    }
  };

  // Cargar eventos desde la API
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        const timer = setTimeout(async () => {
          const { user } = useAuthStore.getState();
          
          if (!user?.token) {
            setLoading(false);
            return;
          }
  
          try {
            const eventsFromAPI = await getAllCalendarSchoolServer(user.token);
            
            // ✅ MANTENER fechas como string, solo filtrar eventos válidos
            const validEvents: ISchoolCalendarEvent[] = eventsFromAPI
              .filter(event => event.date != null && event.date !== ""); // ← Filtrar eventos sin fecha
  
            setEvents(validEvents);
  
          } catch (error) {
            console.error('Error loading events:', error);
            setEvents([]);
          } finally {
            setLoading(false);
          }
        }, 100);
  
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error in loadEvents:', error);
        setLoading(false);
      }
    };
  
    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando eventos del calendario...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
        />
        <EventList
          events={events}
          onAddEvent={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <EventModal
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          onClose={() => setShowModal(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  );
};

export default SchoolCalendar;
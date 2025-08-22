'use client';
import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import EventList from "./EventList";
import EventModal from "./EventModal";
import { ISchoolCalendarEvent } from "@/interface/school.types";
import { getAllCalendarSchoolServer } from "@/server/schoolCalender.server";
import { useAuthStore } from "@/store/auth.store";

const SchoolCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<ISchoolCalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<ISchoolCalendarEvent, 'id'>>({
    title: "",
    date: new Date(),
    description: "",
    eventType: "Celebracion",
    schoolId: 1
  });

  // Cargar eventos desde la API
  useEffect(() => {
    // console.group('[SchoolCalendar] Carga de eventos');
    
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        // Esperar un poco para que se inicialice el store (como en tu Dashboard)
        const timer = setTimeout(async () => {
          const { user } = useAuthStore.getState();
          
          // console.log('🔍 Datos del usuario para calendar:', {
          //   hasToken: !!user?.token,
          //   hasId: !!user?.id,
          //   token: user?.token ? user.token.substring(0, 10) + '...' : 'undefined'
          // });

          if (!user?.token) {
            // console.error('🚨 No hay token disponible para cargar eventos');
            setLoading(false);
            // console.groupEnd();
            return;
          }

          try {
            // console.log('📌 Llamando a getAllCalendarSchoolServer...');
            const eventsFromAPI = await getAllCalendarSchoolServer(user.token);
            
            // console.log('✅ Eventos recibidos del backend:', eventsFromAPI);

            // Convertir fechas string a Date objects
            const eventsWithDateObjects: ISchoolCalendarEvent[] = eventsFromAPI.map(event => ({
              ...event,
              date: new Date(event.date) // Convertir string a Date
            }));

            // console.log('🔄 Eventos con fechas convertidas:', eventsWithDateObjects);
            setEvents(eventsWithDateObjects);

          } catch (error) {
            // console.error('❌ Error al cargar eventos:', error);
            setEvents([]);
          } finally {
            setLoading(false);
            // console.groupEnd();
          }
        }, 100); // Mismo delay que tu Dashboard

        return () => clearTimeout(timer);
      } catch (error) {
        // console.error('❌ Error en loadEvents:', error);
        setLoading(false);
        // console.groupEnd();
      }
    };

    loadEvents();
  }, []);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventWithId: ISchoolCalendarEvent = {
      ...newEvent,
      id: Date.now() // Generamos un ID temporal
    };
    setEvents(prev => [...prev, eventWithId]);
    setNewEvent({
      title: "",
      date: new Date(),
      description: "",
      eventType: "Celebracion",
      schoolId: 1
    });
    setShowModal(false);
  };

  // Mostrar loading mientras cargan los datos
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
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
};

export default SchoolCalendar;
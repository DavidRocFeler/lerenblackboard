'use client';
import { ISchoolCalendarEvent } from '@/interface/school.types';
import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { createNewEventCalendarServer } from '@/server/schoolCalender.server';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/store/auth.store';

// 🆕 Tipo para el formulario (sin id ni schoolId)
type EventFormData = Omit<ISchoolCalendarEvent, 'id' | 'schoolId'>;

type EventModalProps = {
  newEvent: EventFormData;
  setNewEvent: (event: EventFormData) => void;
  onClose: () => void;
  onEventCreated: (event: ISchoolCalendarEvent) => void;
};

const EventModal: React.FC<EventModalProps> = ({ 
  newEvent, 
  setNewEvent, 
  onClose, 
  onEventCreated 
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsComplete(
      !!newEvent.title && 
      !!newEvent.date && 
      !!newEvent.description
    );
  }, [newEvent]);

  const handleDateBlur = () => {
    if (dateInputRef.current) {
      dateInputRef.current.type = "date";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isComplete) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { user } = useAuthStore.getState();
      
      if (!user?.token) {
        throw new Error('No se encontró token de autenticación');
      }
      
      // 🆕 Convertir Date a string ISO para el backend
      const eventData = {
        title: newEvent.title,
        date: newEvent.date, // ← Date → string ISO
        description: newEvent.description,
        eventType: newEvent.eventType
      };
      
      const createdEvent = await createNewEventCalendarServer(eventData, user.token);
      
      Swal.fire({
        icon: 'success',
        title: '¡Evento creado!',
        text: 'El evento se ha creado correctamente',
        timer: 2000,
        showConfirmButton: false
      });
      
      onEventCreated(createdEvent);
      onClose();
      
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Error al crear el evento',
      });
      setError(err.message || 'Error al crear el evento');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9888]">
      <div className="bg-white rounded-lg p-6 sm:max-w-md w-[90%]">
        <div className="mb-4">
          <h3 className="text-lg font-bold">Agregar Nuevo Evento</h3>
          <p className="text-sm text-gray-500">Crear un nuevo evento en el calendario</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
            <input 
              id="title" 
              type="text" 
              placeholder="Ingresa el título del evento"
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                newEvent.title ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300'
              }`}
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <div className="relative">
              <input
                id="date"
                ref={dateInputRef}
                type="date"
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  newEvent.date ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300'
                }`}
                onBlur={handleDateBlur}
                onChange={(e) => {
                  const dateValue = e.target.value || "";
                  setNewEvent({...newEvent, date: dateValue});
                }}
                value={newEvent.date || ""}
                disabled={isLoading}
              />
              {newEvent.date && (
                <div className="absolute right-10 top-2 text-sm text-gray-600 pointer-events-none">
                  {format(newEvent.date, 'EEE, d MMM')}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea 
              id="description" 
              placeholder="Descripción del evento"
              rows={3}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                newEvent.description ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300'
              }`}
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              disabled={isLoading}
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
            <select
              id="type"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={newEvent.eventType}
              onChange={(e) => setNewEvent({...newEvent, eventType: e.target.value as "Deportes" | "Reunion" | "Recaudación" | "Celebracion"})}
              disabled={isLoading}
            >
              <option value="Celebracion">Celebración</option>
              <option value="Deportes">Deportes</option>
              <option value="Reunion">Reunión</option>
              <option value="Recaudación">Recaudación</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              type="submit"
              disabled={!isComplete || isLoading}
              className={`
                flex-1 py-2 rounded-md transition-colors flex items-center justify-center
                ${!isComplete || isLoading
                  ? 'bg-blue-200 text-blue-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                }
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando...
                </>
              ) : (
                'Crear Evento'
              )}
            </button>
            <button 
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
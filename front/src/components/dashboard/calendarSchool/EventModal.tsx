'use client';
import { ISchoolCalendarEvent } from '@/interface/school.types';
import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';

type EventModalProps = {
  newEvent: ISchoolCalendarEvent,
  setNewEvent: (event: any) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

const EventModal: React.FC<EventModalProps> = ({ newEvent, setNewEvent, onClose, onSubmit }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [isComplete, setIsComplete] = useState(false);

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
      if (!newEvent.date) {
        dateInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9888]">
      <div className="bg-white rounded-lg p-6 sm:max-w-md w-[90%]">
        <div className="mb-4">
          <h3 className="text-lg font-bold">Add New Event</h3>
          <p className="text-sm text-gray-500">Create a new calendar event</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input 
              id="title" 
              type="text" 
              placeholder="Enter event title"
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                newEvent.title ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300'
              }`}
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
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
                    // Convierte el string a Date al guardar
                    const dateValue = e.target.value ? new Date(e.target.value) : null;
                    setNewEvent({...newEvent, date: dateValue});
                }}
                // Convierte el Date a string para el input
                value={newEvent.date ? newEvent.date.toISOString().split('T')[0] : ""}
              />
              {newEvent.date && (
                <div className="absolute right-10 top-2 text-sm text-gray-600 pointer-events-none">
                  {format(newEvent.date, 'EEE, d MMM')}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              id="description" 
              placeholder="Event description"
              rows={3}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                newEvent.description ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-gray-300'
              }`}
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <select
              id="type"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={newEvent.eventType}
              onChange={(e) => setNewEvent({...newEvent, eventType: e.target.value as "Deportes" | "Reunion" | "Recaudación" | "Celebracion"})}
            >
              <option value="Celebracion">Celebracion</option>
              <option value="Deportes">Deportes</option>
              <option value="Reunion">Reunion</option>
              <option value="Recaudación">Recaudación</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              type="submit"
              disabled={!isComplete}
              className={`
                flex-1 py-2 rounded-md transition-colors
                ${!isComplete 
                  ? 'bg-blue-200 text-blue-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                }
              `}
            >
              Create Event
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
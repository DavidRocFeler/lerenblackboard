'use client'
// components/DailyControl.tsx
import React, { useState, useEffect } from 'react';
import { Check, ClipboardList, Printer } from 'lucide-react';
import { IStudentDetails } from '@/interface/student.types';

interface IDailyControlProps {
  students: IStudentDetails[];
  onStudentClick: (studentId: string) => void;
}

const DailyControl: React.FC<IDailyControlProps> = ({ students, onStudentClick }) => {
  const [copies, setCopies] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [currentDatePeru, setCurrentDatePeru] = useState<string>('');

  const updatePeruDate = () => {
    const now = new Date();
    const peruOffset = -5 * 60 * 60 * 1000;
    const peruTime = new Date(now.getTime() + peruOffset);
    const year = peruTime.getUTCFullYear();
    const month = (peruTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = peruTime.getUTCDate().toString().padStart(2, '0');
    setCurrentDatePeru(`${year}-${month}-${day}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };

  useEffect(() => {
    updatePeruDate();
    const midnightPeru = new Date();
    midnightPeru.setUTCHours(5, 0, 0, 0);
    if (new Date() > midnightPeru) {
      midnightPeru.setUTCDate(midnightPeru.getUTCDate() + 1);
    }
    const timeUntilMidnight = midnightPeru.getTime() - new Date().getTime();
    
    const timer = setTimeout(() => {
      updatePeruDate();
      setInterval(updatePeruDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyChange = (studentId: string, value: string) => {
    setCopies(prev => ({
      ...prev,
      [studentId]: parseInt(value) || 0
    }));
  };

  const handleNoteChange = (studentId: string, value: string) => {
    setNotes(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  return (
    <div className="border rounded-lg overflow-y-auto responsive-gradual-width-students">
      {/* Encabezados */}
      <div className="p-2 text-sm font-medium text-gray-500 bg-gray-50 sm:space-x-0 grid grid-cols-5 w-[46rem] sm:w-full">
        <div>Alumno</div>
        <div className="text-center">Fecha</div>
        <div className="text-center">Asistencia</div>
        <div className="text-center mr-4">Copias</div>
        <div>Anotaciones</div>
      </div>
      
      {/* Lista de estudiantes */}
      <div className="">
        {students.map(student => (
          <div key={student.id} className="items-center p-2 hover:bg-gray-50 space-x-[3rem] w-[46rem] sm:w-full grid grid-cols-5">
            {/* Nombre - COMPLETO Y EN UNA LÍNEA */}
            <div 
              className="font-medium cursor-pointer hover:text-blue-600 whitespace-nowrap w-fit"
              onClick={() => onStudentClick(student.id.toString())}
            >
              {`${student.firstName} ${student.lastName}`}
            </div>
            
            {/* Fecha */}
            <div className="w-[9rem] sm:w-full items-center text-center text-black">
              {formatDate(currentDatePeru)}
            </div>
            
            {/* Asistencia */}
            <div className="w-[9rem] sm:w-full flex justify-center">
              <button
                onClick={() => toggleAttendance(student.id.toString())}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  attendance[student.id] ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Check className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
            
            {/* Copias */}
            <div className="flex items-center w-fit justify-center gap-2 relative">
              <input
                type="number"
                value={copies[student.id] || ''}
                onChange={(e) => handleCopyChange(student.id.toString(), e.target.value)}
                className="w-20 h-8 pl-2 pr-6 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
              <Printer className="w-[1rem] text-gray-400 absolute right-1 top-1" />
            </div>
            
            {/* Anotaciones */}
            <div className="relative w-fit flex justify-center">
              <textarea
                value={notes[student.id] || ''}
                onChange={(e) => handleNoteChange(student.id.toString(), e.target.value)}
                placeholder="Observaciones"
                className="w-[11rem] h-8 min-h-[32px] pl-[0.5rem] pr-[2rem] py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <ClipboardList className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyControl;
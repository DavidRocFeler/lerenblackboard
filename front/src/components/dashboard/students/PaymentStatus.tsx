'use client'
// components/PaymentStatus.tsx
import { IStudentDetails } from '@/interface/student.types';
import React, { useState, useEffect } from 'react';

interface IPaymentStatusProps {
  students: IStudentDetails[];
  onStudentClick: (studentId: string) => void;
}

const PaymentStatus: React.FC<IPaymentStatusProps> = ({ students, onStudentClick }) => {
  const [paymentStatus, setPaymentStatus] = useState<Record<string, boolean>>({});
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

  const togglePaymentStatus = (studentId: string) => {
    setPaymentStatus(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  return (
    <div className="border rounded-lg overflow-y-auto responsive-gradual-width-students">
      {/* Encabezados */}
      <div className="p-2 text-sm font-medium text-gray-500 bg-gray-50 grid grid-cols-3 w-[30rem] sm:w-full">
        <div>Alumno</div>
        <div className="text-center">Fecha</div>
        <div className="text-center">Estado</div>
      </div>
      
      {/* Lista de estudiantes */}
      <div className="">
        {students.map(student => (
          <div key={student.id} className="items-center p-2 hover:bg-gray-50 grid grid-cols-3 w-[30rem] sm:w-full">
            {/* Nombre - COMPLETO Y EN UNA LÍNEA */}
            <div 
              className="font-medium cursor-pointer hover:text-blue-600 whitespace-nowrap min-w-0"
              onClick={() => onStudentClick(student.id.toString())}
            >
              {`${student.firstName} ${student.lastName}`}
            </div>
            
            {/* Fecha */}
            <div className="text-center text-black">
              {formatDate(currentDatePeru)}
            </div>
            
            {/* Estado */}
            <div className="text-center">
              <span 
                className={`inline-block px-2 py-1 text-xs cursor-pointer rounded-full ${
                  paymentStatus[student.id] ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
                onClick={() => togglePaymentStatus(student.id.toString())}
              >
                {paymentStatus[student.id] ? "Pagado" : "Pendiente"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStatus;
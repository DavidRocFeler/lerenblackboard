// components/PaymentStatus.tsx
import React, { useState, useEffect } from 'react';

interface Student {
  id: string;
  name: string;
}

interface PaymentStatusProps {
  students: Student[];
  onStudentClick: (studentId: string) => void;
}

const PaymentStatus = ({ students, onStudentClick }: PaymentStatusProps) => {
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
    <div className="border rounded-lg overflow-y-auto w-full">
      {/* Encabezados */}
      <div className="flex p-2 text-sm font-medium text-gray-500 bg-gray-50">
        <div className="w-1/2">Alumno</div>
        <div className="w-1/4 text-center">Fecha</div>
        <div className="w-1/4 text-center">Estado</div>
      </div>
      
      {/* Lista de estudiantes */}
      <div className="divide-y w-full">
        {students.map(student => (
          <div key={student.id} className="flex items-center p-2 hover:bg-gray-50">
            <div 
              className="w-1/2 font-medium cursor-pointer hover:text-blue-600"
              onClick={() => onStudentClick(student.id)}
            >
              {student.name}
            </div>
            <div className="w-1/4 text-center text-black">
              {formatDate(currentDatePeru)}
            </div>
            <div className="w-1/4 text-center">
              <span 
                className={`inline-block px-2 py-1 text-xs cursor-pointer rounded-full ${
                  paymentStatus[student.id] ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
                onClick={() => togglePaymentStatus(student.id)}
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
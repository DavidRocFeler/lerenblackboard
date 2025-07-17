import React, { useState, useEffect } from 'react';
import { Download, Check, ClipboardList, Printer } from 'lucide-react';
import StudentProfile from './StudentProfile';

const Students = () => {
  const [activeTab, setActiveTab] = useState<'status' | 'control'>('status');
  const [copies, setCopies] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [paymentStatus, setPaymentStatus] = useState<Record<string, boolean>>({});
  const [currentDatePeru, setCurrentDatePeru] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const students = [
    { id: 'student-1', name: 'Valentina A.' },
    { id: 'student-2', name: 'Alessca' },
    { id: 'student-3', name: 'Rafaella' },
    { id: 'student-4', name: 'Denzel' },
    { id: 'student-5', name: 'Austin' },
    { id: 'student-6', name: 'Mateo' },
    { id: 'student-7', name: 'Anthuan' },
    { id: 'student-8', name: 'Dominic' },
    { id: 'student-9', name: 'Alex' },
    { id: 'student-10', name: 'Alessandro' },
    { id: 'student-11', name: 'Enzo' },
    { id: 'student-12', name: 'Luz Valentina' },
    { id: 'student-13', name: 'Bianca' },
    { id: 'student-14', name: 'Valeria' },
    { id: 'student-15', name: 'Thiago' },
    { id: 'student-16', name: 'Eva' },
    { id: 'student-17', name: 'Angeles' },
    { id: 'student-18', name: 'Jhesta' },
    { id: 'student-19', name: 'Evelyn' },
    { id: 'student-20', name: 'Génesis' },
    { id: 'student-21', name: 'Jick' },
    { id: 'student-22', name: 'Valentina R.' },
    { id: 'student-23', name: 'Dylan' },
    { id: 'student-24', name: 'Hyrum' },
    { id: 'student-25', name: 'Carlos' }
  ];

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

  const handleStudentClick = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  if (selectedStudent) {
    return (
      <StudentProfile 
        studentId={selectedStudent} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-6">
          <div className="flex flex-col gap-4">
            <div className='flex flex-row'>
              <h2 className="text-xl font-bold text-blue-900">Gestión de Alumnos</h2>
              <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded-lg ml-auto">
                  Guardar
              </button>              
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => setActiveTab('status')}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'status' ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Estado de Pagos
              </button>
              <button 
                onClick={() => setActiveTab('control')}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'control' ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Control Diario
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6 pt-0">
          {activeTab === 'status' ? (
            /* Vista de Estado de Pagos */
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
                      onClick={() => handleStudentClick(student.id)}
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
          ) : (
            /* Vista de Control Diario */
            <div className="border rounded-lg overflow-y-auto responsive-gradual-width-students">
              {/* Encabezados */}
              <div className="p-2 text-sm font-medium text-gray-500 bg-gray-50 sm:space-x-0 grid grid-cols-5 w-[46rem] sm:w-full">
                <div >Alumno</div>
                <div className="text-center">Fecha</div>
                <div className="text-center">Asistencia</div>
                <div className="text-center mr-4">Copias</div>
                <div >Anotaciones</div>
              </div>
              
              {/* Lista de estudiantes */}
              <div className="">
                {students.map(student => (
                  <div key={student.id} className="items-center p-2 hover:bg-gray-50 space-x-[3rem] sm:space-x-0 w-[46rem] sm:w-full grid grid-cols-5">
                    {/* Nombre */}
                    <div 
                      className="w-[7rem] font-medium cursor-pointer hover:text-blue-600"
                      onClick={() => handleStudentClick(student.id)}
                    >
                      {student.name}
                    </div>
                    
                    {/* Fecha */}
                    <div className="w-[4rem] sm:w-full items-center text-center text-black">
                      {formatDate(currentDatePeru)}
                    </div>
                    
                    {/* Asistencia */}
                    <div className="w-[4rem] sm:w-full flex justify-center">
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          attendance[student.id] ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Copias */}
                    <div className="flex items-center w-fit justify-center gap-2 relative">
                      <input
                        type="number"
                        value={copies[student.id] || ''}
                        onChange={(e) => handleCopyChange(student.id, e.target.value)}
                        className="w-20 h-8 pl-2 pr-6 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                      <Printer className="w-[1rem] text-gray-400 absolute right-1 top-1" />
                    </div>
                    
                    {/* Anotaciones */}
                    <div className="relative w-fit flex justify-center">
                      <textarea
                        value={notes[student.id] || ''}
                        onChange={(e) => handleNoteChange(student.id, e.target.value)}
                        placeholder="Observaciones"
                        className="w-[11rem] h-8 min-h-[32px] pl-[0.5rem] pr-[2rem] py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ClipboardList className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;

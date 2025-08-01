'use client'
import React from 'react';
import { useState } from 'react';
import { ArrowLeft, Phone, User, Mail, Calendar, Hash, ChevronRight, DollarSign, Clock, Notebook, BookOpen, Bookmark } from 'lucide-react';
import { students } from '@/helpers/studentData.helpers';

interface StudentProfileProps {
  studentId: string;
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({studentId, onBack}) => {
  // En una implementación real, esto vendría de una API o contexto
  const student = students.find(s => s.id === studentId);
  const [currentView, setCurrentView] = useState<"profile" | "balance" | "payments" | "notes" | "accounting" | "syllabus">("profile");

  const sections = [
    { id: 'balance', title: 'Saldo a Favor', icon: <DollarSign className="h-5 w-5" />, color: 'text-blue-600 bg-blue-100 border-blue-200' },
    { id: 'payments', title: 'Pagos Pendientes', icon: <Clock className="h-5 w-5" />, color: 'text-amber-600 bg-amber-100 border-amber-200' },
    { id: 'notes', title: 'Cuaderno de Control', icon: <Notebook className="h-5 w-5" />, color: 'text-red-600 bg-red-100 border-red-200' },
    { id: 'accounting', title: 'Libro Contable', icon: <BookOpen className="h-5 w-5" />, color: 'text-green-600 bg-green-100 border-green-200' },
    { id: 'gradebook', title: 'Libreta de Notas', icon: <Bookmark className="h-5 w-5" />, color: 'text-purple-600 bg-purple-100 border-purple-200' },
  ];

  if (!student) {
    return (
      <div className="border-0 shadow-lg rounded-lg bg-white p-6">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4  cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </button>
        <p>Estudiante no encontrado</p>
      </div>
    );
  }

  return (
    <div className="border-0 shadow-lg rounded-lg bg-white p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6  cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a la lista
      </button>
      
      {/* Header del perfil */}
      <div className="relative flex flex-col-reverse md:flex-row md:items-center md:justify-between mb-8">
        <div>
            <img className='w-[10rem] rounded-full object-cover border-4 border-white shadow-md mb-[1rem]' src={student.picture} alt="pictureProfile"/>
          <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
          <div className="flex items-center mt-2">
            <span className={`px-3 py-1 rounded-full text-xs ${
              student.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : student.status === 'inactive' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {student.status === 'active' ? 'Activo' : student.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
            </span>
            <span className="ml-3 text-sm text-gray-500">
              {student.level} - {student.section}
            </span>
          </div>
        </div>
        
        <div className="mb-[3rem] sm:absolute top-0 right-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Editar Perfil
          </button>
        </div>
      </div>
      
      {/* Información del estudiante */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Información del Estudiante
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {student.phone || 'No especificado'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de nacimiento</p>
              <p className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {student.birthdate || 'No especificada'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Código de estudiante</p>
              <p className="flex items-center">
                <Hash className="h-4 w-4 mr-2 text-gray-400" />
                {student.studentCode || 'No especificado'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Información del Padre/Tutor
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p>{student.parentName || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {student.parentPhone || 'No especificado'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Correo electrónico</p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {student.parentEmail || 'No especificado'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información académica */}
      {/* <div className="bg-gray-50 p-5 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-4 flex items-center">
          <Hash className="h-5 w-5 mr-2 text-blue-600" />
          Información Académica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nivel</p>
            <p>{student.level || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sección</p>
            <p>{student.section || 'No especificado'}</p>
          </div>
        </div>
      </div> */}

      <div className="space-y-3">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={`border rounded-lg bg-white p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-all ${section.color.replace('text', 'border')}`}
              onClick={() => setCurrentView(section.id as any)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${section.color}`}>
                  {section.icon}
                </div>
                <span className="font-medium text-gray-700">{section.title}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
    </div>
  );
};

export default StudentProfile;
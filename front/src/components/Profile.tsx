import { 
  DollarSign, 
  Clock, 
  Notebook, 
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Phone,
  User,
  Mail,
  Calendar,
  Hash,
  Bookmark
} from "lucide-react";
import { useState } from "react";
import BalanceSection from "./BalanceSection";
import PaymentsSection from "./PaymentsSection";
import NotesSection from "./NotesSection";
import AccountingSection from "./AccountingSection";
import { students } from "@/helpers/studentData.helpers";
import GradeBook from "./GradeBook";

const Profile = () => {
  const [currentView, setCurrentView] = useState<"profile" | "balance" | "payments" | "notes" | "accounting" | "syllabus" | "gradebook">("profile");
  
  // Obtenemos los datos del estudiante 'student-1' del array importado
  const studentData = students.find(student => student.id === 'student-1');
  
  if (!studentData) {
    return (
      <div className="border-0 shadow-lg rounded-lg bg-white p-6">
        <p>Estudiante no encontrado</p>
      </div>
    );
  }

  const sections = [
    { id: 'balance', title: 'Saldo a Favor', icon: <DollarSign className="h-5 w-5" />, color: 'text-blue-600 bg-blue-100 border-blue-200' },
    { id: 'payments', title: 'Pagos Pendientes', icon: <Clock className="h-5 w-5" />, color: 'text-amber-600 bg-amber-100 border-amber-200' },
    { id: 'accounting', title: 'Libro Contable', icon: <BookOpen className="h-5 w-5" />, color: 'text-green-600 bg-green-100 border-green-200' },
    { id: 'notes', title: 'Cuaderno de Control', icon: <Notebook className="h-5 w-5" />, color: 'text-red-600 bg-red-100 border-red-200' },
    { id: 'gradebook', title: 'Libreta de Notas', icon: <Bookmark className="h-5 w-5" />, color: 'text-purple-600 bg-purple-100 border-purple-200' },
  ];

  if (currentView !== "profile") {
    return (
      <div className="border-0 shadow-lg rounded-lg bg-white p-6">
        <button
          onClick={() => setCurrentView("profile")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al perfil
        </button>
        {currentView === "balance" && <BalanceSection {...studentData} />}
        {currentView === "payments" && <PaymentsSection data={{ pendingPayments: studentData.pendingPayments?.data || [] }} />}
        {currentView === "accounting" && <AccountingSection />}
        {currentView === "notes" && <NotesSection initialDate={new Date()} />}
        {currentView === "gradebook" && (
          studentData.gradeBook ? (
            <GradeBook 
              data={studentData.gradeBook} 
              onBackToProfile={() => setCurrentView("profile")} 
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay datos de libreta de notas disponibles</p>
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div className="border-0 shadow-lg rounded-lg bg-white p-6">
      {/* Header del perfil */}
      <div className="relative flex flex-col-reverse md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <img 
            className='w-[10rem] rounded-full object-cover border-4 border-white shadow-md mb-[1rem]' 
            src={studentData.picture || '/default-profile.jpg'} 
            alt="pictureProfile"
          />
          <h1 className="text-2xl font-bold text-gray-800">{studentData.name}</h1>
          <div className="flex items-center mt-2">
            <span className={`px-3 py-1 rounded-full text-xs ${
              studentData.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : studentData.status === 'inactive' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {studentData.status === 'active' ? 'Activo' : studentData.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
            </span>
            <span className="ml-3 text-sm text-gray-500">
              {studentData.level} - {studentData.section}
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
                {studentData.phone || 'No especificado'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de nacimiento</p>
              <p className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {studentData.birthdate || 'No especificada'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Código de estudiante</p>
              <p className="flex items-center">
                <Hash className="h-4 w-4 mr-2 text-gray-400" />
                {studentData.studentCode || 'No especificado'}
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
              <p>{studentData.parentName || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {studentData.parentPhone || 'No especificado'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Correo electrónico</p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {studentData.parentEmail || 'No especificado'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secciones interactivas */}
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

export default Profile;
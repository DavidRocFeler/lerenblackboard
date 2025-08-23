// components/Students.tsx (actualizado)
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PaymentStatus from './PaymentStatus';
import DailyControl from './DailyControl';
import StudentProfile from './StudentsProfile';
import AllStudentsGrade from '@/components/AllStudentGrade';
import AllStudentsGradeSection from '@/components/AllStudentGradeSection';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { getSelectedLevel, getTransformedGrade } from '@/utils/localStorageGrade';
import { IStudentDetails } from '@/interface/student.types';
import { getAllStudentsByGradeAndSectionServer } from '@/server/students.server';
import { useAuthStore } from '@/store/auth.store';

type ViewMode = 'grades' | 'sections' | 'students' | 'profile';

const Students: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paymentStatus' | 'dailyControl'>('paymentStatus');
  const [viewMode, setViewMode] = useState<ViewMode>('grades');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [studentsData, setStudentsData] = useState<IStudentDetails[]>([]);
const [loading, setLoading] = useState(false);
const { user } = useAuthStore();

// Nueva función
const getAllStudents = async () => {
  // console.log('🔵 [1] fetchStudents INICIADA');
  // // Verificar condiciones de entrada
  // console.log('🔍 [2] Verificando condiciones:');
  // console.log('user?.token:', user?.token);
  // console.log('user?.schoolId:', user?.schoolId);
  // console.log('selectedGrade:', selectedGrade);
  // console.log('selectedSection:', selectedSection);
  
  if (!user?.token || !user?.schoolId || !selectedGrade || !selectedSection) {
  // console.log('❌ [3] Condiciones NO cumplidas - ABORTANDO');
  return;
  }
  // console.log('✅ [3] Condiciones CUMPLIDAS - Continuando');
  
  const level = getSelectedLevel();
  const transformedGrade = getTransformedGrade();
  // console.log('🔍 [4] Nivel obtenido:', level);
  // console.log('🔄 [4.1] Grade transformado:', transformedGrade);
  
  if (!level || !transformedGrade) {
  // console.log('❌ [5] No level o transformedGrade found - ABORTANDO');
  return;
  }
  // console.log('✅ [5] Nivel y grade válidos:', level, transformedGrade);
  
  setLoading(true);
  // console.log('🔄 [6] Loading: true');
  try {
  // console.log('📡 [7] Llamando al servidor con:');
  // console.log(' - schoolId:', user.schoolId);
  // console.log(' - level:', level);
  // console.log(' - grade:', transformedGrade);
  // console.log(' - section:', selectedSection);
  
  const data = await getAllStudentsByGradeAndSectionServer(
  user.schoolId,
  level,
  transformedGrade, // ← Usando transformedGrade en lugar de selectedGrade
  selectedSection,
  user.token
  );
  
  // console.log('✅ [8] Datos recibidos del backend:', data);
  // console.log('📊 Tipo de datos:', Array.isArray(data) ? 'Array' : typeof data);
  // console.log('📦 Cantidad de elementos:', Array.isArray(data) ? data.length : 'N/A');
  setStudentsData(data);
  // console.log('✅ [9] Estado studentsData actualizado');
  } catch (error: any) {
  // console.error('❌ [8] Error completo:', error);
  // console.error('📌 Tipo de error:', error?.constructor?.name);
  // console.error('🔗 Mensaje:', error?.message);
  // console.error('📝 Stack:', error?.stack);
  Swal.fire({
  icon: 'error',
  title: 'Error',
  text: error.message || 'Error al obtener los estudiantes'
  });
  } finally {
  setLoading(false);
  console.log('🔄 [10] Loading: false');
  }
  };

// Nuevo useEffect
useEffect(() => {
 if (viewMode === 'students') {
   getAllStudents();
 }
}, [viewMode, selectedGrade, selectedSection]);

  const students = [
    { id: 'student-1', name: 'Valentina A.' },
    { id: 'student-2', name: 'Alessca' },
  ];

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    setViewMode('sections');
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
    setViewMode('students');
  };

  const handleBackToGrades = () => {
    setViewMode('grades');
    setSelectedGrade('');
  };

  const handleBackToSections = () => {
    setViewMode('sections');
    setSelectedSection('');
  };

  const handleStudentClick = (studentId: string) => {
    setSelectedStudent(studentId);
    setViewMode('profile');
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setViewMode('students');
  };

  // Renderizar la vista actual
  const renderCurrentView = () => {
    switch (viewMode) {
      case 'grades':
        return <AllStudentsGrade onGradeSelect={handleGradeSelect} />;
      
      case 'sections':
        return (
          <AllStudentsGradeSection
            selectedGrade={selectedGrade}
            onSectionSelect={handleSectionSelect}
            onBack={handleBackToGrades}
          />
        );
      
      case 'profile':
        return (
          <StudentProfile 
            studentId={selectedStudent!} 
            onBack={handleBackToList}
          />
        );
      
      case 'students':
      default:
        return activeTab === 'paymentStatus' ? (
          <PaymentStatus 
            students={studentsData}
            onStudentClick={handleStudentClick}
          />
        ) : (
          <DailyControl 
            students={studentsData}
            onStudentClick={handleStudentClick}
          />
        );
    }
  };

  if (viewMode === 'profile') {
    return renderCurrentView();
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header solo visible en modo estudiantes */}
        {viewMode === 'students' && (
          <div className="p-6">
            <div className="flex flex-col gap-2">
              <div className='flex flex-col sm:flex-row'>
                <h2 className="text-xl font-bold text-blue-900">
                  Estudiantes - {selectedGrade} {selectedSection}
                </h2>
                <button className="cursor-pointer px-4 py-2 text-sm text-white bg-blue-600 rounded-lg ml-0 sm:ml-auto mt-5 sm:mt-0">
                  Guardar
                </button>              
              </div>
              <div className="flex flex-col [@media(min-width:899px)]:flex-row gap-2">
                <button 
                  onClick={() => setActiveTab('paymentStatus')}
                  className={`px-4 py-2 rounded-md text-sm cursor-pointer ${
                    activeTab === 'paymentStatus' ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Estado de Pagos
                </button>
                <button 
                  onClick={() => setActiveTab('dailyControl')}
                  className={`px-4 py-2 rounded-md text-sm cursor-pointer ${
                    activeTab === 'dailyControl' ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Control Diario
                </button>
                <button 
                  onClick={handleBackToSections}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  ← Cambiar Sección
                </button>
                <button className="flex items-center justify-center gap-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  <Download className="w-4 h-4 cursor-pointer" />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <div className={viewMode === 'students' ? 'p-6 pt-0' : ''}>
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default Students;
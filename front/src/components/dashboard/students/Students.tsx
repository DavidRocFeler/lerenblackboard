// components/Students.tsx (actualizado)
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PaymentStatus from './PaymentStatus';
import DailyControl from './DailyControl';
import StudentProfile from './StudentsProfile';
import AllStudentsGrade from '@/components/AllStudentGrade';
import AllStudentsGradeSection from '@/components/AllStudentGradeSection';

type ViewMode = 'grades' | 'sections' | 'students' | 'profile';

const Students: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paymentStatus' | 'dailyControl'>('paymentStatus');
  const [viewMode, setViewMode] = useState<ViewMode>('grades');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

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
            students={students}
            onStudentClick={handleStudentClick}
          />
        ) : (
          <DailyControl 
            students={students}
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
              <div className="flex flex-col sm:flex-row gap-2">
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
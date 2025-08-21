// components/AllStudentsGradeSection.tsx
import React from 'react';

interface SectionCardProps {
  grade: string;
  section: string;
  studentCount: number;
  onClick: () => void;
}

interface AllStudentsGradeSectionProps {
  selectedGrade: string;
  onSectionSelect: (section: string) => void;
  onBack: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ grade, section, studentCount, onClick }) => {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-green-300"
      onClick={onClick}
    >
      <div className="text-center">
        <h3 className="font-bold text-2xl text-green-900 mb-2">Sección {section}</h3>
        <p className="text-sm text-gray-600 mb-2">{grade} de Primaria</p>
        <div className="mt-3">
          <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
            {studentCount} estudiantes
          </span>
        </div>
      </div>
    </div>
  );
};

const AllStudentsGradeSection: React.FC<AllStudentsGradeSectionProps> = ({
  selectedGrade,
  onSectionSelect,
  onBack
}) => {
  // Función para manejar la selección de sección (REEMPLAZA la anterior)
  const handleSectionClick = (section: string) => {
    // REEMPLAZAR la sección anterior en localStorage
    localStorage.setItem('selectedSection', section);
    
    console.log(`✅ Sección guardada en localStorage: ${section}`);
    
    // Llamar la función padre
    onSectionSelect(section);
  };

  // Secciones disponibles para cada grado (A, B, C, D)
  const sections = [
    { section: 'A', studentCount: 25 },
    { section: 'B', studentCount: 22 },
    { section: 'C', studentCount: 28 },
    { section: 'D', studentCount: 24 }
  ];

  return (
    <div className="p-6">
      {/* Header con botón de volver */}
      <div className="flex flex-col-reverse sm:items-center mb-6 sm:flex-row">
        <h2 className="text-2xl font-bold text-green-900">
          Grado {selectedGrade} - Seleccionar Sección
        </h2>
        <button
          onClick={onBack}
          className="bg-green-100 hover:bg-green-200 text-green-800 cursor-pointer px-4 py-2 rounded-md text-sm ml-0 sm:ml-4 mb-4 sm:mb-0"
        >
          ← Volver
        </button>
      </div>

      {/* Grid de secciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sections.map((sectionInfo) => (
          <SectionCard
            key={`section-${sectionInfo.section}`}
            grade={selectedGrade}
            section={sectionInfo.section}
            studentCount={sectionInfo.studentCount}
            onClick={() => handleSectionClick(sectionInfo.section)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllStudentsGradeSection;
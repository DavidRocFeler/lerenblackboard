// components/AllStudentsGrade.tsx
import React from 'react';

interface GradeCardProps {
  grade: string;
  level: string;
  studentCount: number;
  onClick: () => void;
}

interface AllStudentsGradeProps {
  onGradeSelect: (grade: string, level: string) => void;
}

const GradeCard: React.FC<GradeCardProps> = ({ grade, level, studentCount, onClick }) => {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
      onClick={onClick}
    >
      <div className="text-center">
        <h3 className="font-bold text-2xl text-blue-900 mb-2">{grade}</h3>
        <p className="text-sm text-gray-600 mb-2">{level}</p>
        <div className="mt-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {studentCount} estudiantes en total
          </span>
        </div>
      </div>
    </div>
  );
};

const AllStudentsGrade: React.FC<AllStudentsGradeProps> = ({ onGradeSelect }) => {
  // Función para manejar la selección de grado
  const handleGradeClick = (grade: string, level: string) => {
    // Guardar en localStorage
    localStorage.setItem('selectedGrade', grade);
    localStorage.setItem('selectedLevel', level);
    localStorage.removeItem('selectedSection');
    
    console.log(`✅ Grado guardado en localStorage: ${grade} - ${level}`);
    
    // Llamar la función padre
    onGradeSelect(grade, level);
  };

  // Grados de primaria (1ro a 6to)
  const primaryGrades = [
    { grade: '1ro', level: 'Primaria', studentCount: 150 },
    { grade: '2do', level: 'Primaria', studentCount: 145 },
    { grade: '3ro', level: 'Primaria', studentCount: 160 },
    { grade: '4to', level: 'Primaria', studentCount: 155 },
    { grade: '5to', level: 'Primaria', studentCount: 148 },
    { grade: '6to', level: 'Primaria', studentCount: 162 }
  ];

  // Grados de secundaria (1ro a 5to)
  const secondaryGrades = [
    { grade: '1ro', level: 'Secundaria', studentCount: 170 },
    { grade: '2do', level: 'Secundaria', studentCount: 165 },
    { grade: '3ro', level: 'Secundaria', studentCount: 158 },
    { grade: '4to', level: 'Secundaria', studentCount: 172 },
    { grade: '5to', level: 'Secundaria', studentCount: 168 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Seleccionar Grado</h2>
      
      {/* Primaria */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Educación Primaria</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {primaryGrades.map((gradeInfo) => (
            <GradeCard
              key={`primaria-${gradeInfo.grade}`}
              grade={gradeInfo.grade}
              level={gradeInfo.level}
              studentCount={gradeInfo.studentCount}
              onClick={() => handleGradeClick(gradeInfo.grade, gradeInfo.level)}
            />
          ))}
        </div>
      </div>

      {/* Secundaria */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Educación Secundaria</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {secondaryGrades.map((gradeInfo) => (
            <GradeCard
              key={`secundaria-${gradeInfo.grade}`}
              grade={gradeInfo.grade}
              level={gradeInfo.level}
              studentCount={gradeInfo.studentCount}
              onClick={() => handleGradeClick(gradeInfo.grade, gradeInfo.level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStudentsGrade;
import { ISubject } from "@/interface/types";

// Componente para la tarjeta de materia
const SubjectCard = ({ 
  subject, 
  onClick 
}: { 
  subject: ISubject; 
  onClick: () => void 
}) => {
  const bgColor = subject.category === 'classic' ? 'bg-green-100' : 'bg-purple-100';
  const textColor = subject.category === 'classic' ? 'text-green-800' : 'text-purple-800';
  const borderColor = subject.category === 'classic' ? 'border-green-200' : 'border-purple-200';
  const progressBarColor = subject.category === 'classic' ? 'bg-green-500' : 'bg-purple-500';
  
  return (
    <div 
      className={`border ${borderColor} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{subject.name}</h4>
        <span className={`text-xs ${bgColor} ${textColor} px-2 py-1 rounded-full`}>
          {subject.progress}%
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{subject.description}</p>
      
      {/* Barra de progreso */}
      <div className="mt-auto">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${progressBarColor}`}
            style={{ width: `${subject.progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Progreso</p>
      </div>
    </div>
  );
};

export default SubjectCard;
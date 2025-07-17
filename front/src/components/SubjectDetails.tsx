'use client'
import { ISubject } from "@/interface/types";
import { useState } from "react";
import { communicationSubSubjects } from "@/helpers/comunicationData.helpers";
import SubTemas from "./SubTemas";

const SubjectDetails = ({ subject, onBack }: { subject: ISubject; onBack: () => void }) => {
  const [selectedSubSubject, setSelectedSubSubject] = useState<string | null>(null);
  const currentSubSubject = communicationSubSubjects.find(sub => sub.id === selectedSubSubject);

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      {currentSubSubject ? (
        <SubTemas 
          subSubject={currentSubSubject} 
          onBack={() => setSelectedSubSubject(null)} 
        />
      ) : (
        <>
          <button 
            onClick={onBack}
            className="mb-6 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all"
          >
            ← Volver al temario
          </button>
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{subject.name}</h3>
        <p className="text-gray-600">{subject.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">Progreso general</span>
            <span className="text-sm font-semibold">{subject.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${subject.category === 'classic' ? 'bg-green-500' : 'bg-purple-500'}`} 
              style={{ width: `${subject.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Contenido principal de la materia */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {subject.content.map((section, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold text-lg mb-3 text-gray-700">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-2"></span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

        
      <div className="mt-8">
            <h4 className="text-xl font-bold mb-6 text-gray-800">Áreas de Aprendizaje</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {communicationSubSubjects.map((subSubject) => (
                <div 
                  key={subSubject.id}
                  className="border rounded-xl p-4 bg-green-50 hover:bg-green-100 border-green-200 cursor-pointer transition-colors"
                  onClick={() => setSelectedSubSubject(subSubject.id)}
                >
                  <h5 className="font-bold text-lg text-green-800">{subSubject.name}</h5>
                  <p className="text-sm text-green-600 mt-1">{subSubject.description}</p>
                  <div className="mt-3">
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      {subSubject.classes.length} clases
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectDetails;
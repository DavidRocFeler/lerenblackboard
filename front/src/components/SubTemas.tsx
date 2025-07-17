'use client'
import { ISubSubject } from "@/interface/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SubTemasProps {
  subSubject: ISubSubject;
  onBack: () => void;
}

const SubTemas = ({ subSubject, onBack }: SubTemasProps) => {
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <button 
        onClick={onBack}
        className="mb-6 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all"
      >
        ← Regresar
      </button>
      
      <h3 className="text-2xl font-bold mb-2 text-gray-800">{subSubject.name}</h3>
      <p className="text-gray-600 mb-6">{subSubject.description}</p>
      
      <div className="space-y-6">
        {subSubject.content.map((section, index) => (
          <div key={index}>
            <h4 className="font-medium text-lg mb-2">{section.title}</h4>
            <ul className="list-disc pl-5 space-y-1">
              {section.items.map((item, i) => (
                <li key={i} className="text-gray-600">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2">Progreso: {subSubject.progress}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full bg-green-500" 
            style={{ width: `${subSubject.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Listado de clases con acordeón */}
      <div className="mt-8">
        <h4 className="font-bold text-lg mb-4">Plan de Clases</h4>
        <div className="space-y-2">
          {subSubject.classes.map((clase) => (
            <div key={clase.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedClass(expandedClass === clase.id ? null : clase.id)}
              >
                <div>
                  <h5 className="font-medium">{clase.title}</h5>
                  <p className="text-sm text-gray-500">{clase.description}</p>
                </div>
                {expandedClass === clase.id ? (
                  <ChevronUp className="text-green-600" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </div>
              
              {expandedClass === clase.id && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg animate-fade-in border border-green-100">
                  <p className="text-gray-700">{clase.content}</p>
                  <div className="mt-3 pt-2 border-t border-green-200">
                    <p className="text-sm font-medium text-gray-600">Actividad práctica:</p>
                    <p className="text-green-700">{clase.activity}</p>
                    <p className="text-xs text-gray-500 mt-2">Duración: {clase.duration} minutos</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubTemas;
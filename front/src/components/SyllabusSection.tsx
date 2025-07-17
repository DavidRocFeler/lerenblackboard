'use client'
import React, { useState } from "react";
import { BookText } from "lucide-react";
import { ISubject } from "@/interface/types";
import { subjectsData } from "@/helpers/dataSyllabus.helper";
import SubjectDetails from "./SubjectDetails";
import SubjectCard from "./SubjectCard";

const SyllabusSection = () => {
  const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);

  if (selectedSubject) {
    return <SubjectDetails subject={selectedSubject} onBack={() => setSelectedSubject(null)} />;
  }

  return (
    <div className="border border-purple-200 rounded-lg bg-white p-6">
      <div className="flex justify-between items-center mb-[4rem]">
        <h3 className="text-lg font-bold text-purple-800 flex items-center gap-2">
          <BookText className="h-5 w-5" />
          Temario Escolar
        </h3>
      </div>
      <div className="space-y-4">        
        <div>
          <h4 className="font-bold text-green-700 mb-3">Materias Fundamentales</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {subjectsData.filter(s => s.category === 'classic').map(subject => (
              <SubjectCard 
                key={subject.id}
                subject={subject}
                onClick={() => setSelectedSubject(subject)}
              />
            ))}
          </div>
          
          <h4 className="font-bold text-purple-700 mb-3">Materias Innovadoras</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectsData.filter(s => s.category === 'innovative').map(subject => (
              <SubjectCard 
                key={subject.id}
                subject={subject}
                onClick={() => setSelectedSubject(subject)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusSection;

// src/components/ListSchool.tsx
'use client';
import { useRouter } from 'next/navigation';
import { schoolsList } from '@/helpers/listSchool.helpers';
import { ISchool } from '@/interface/school/types';
import { X } from 'lucide-react';

const ListSchoolView = () => {
  const router = useRouter();
  
  const handleRedirectToLoginAdmin = () => {
    router.push('/loginadmin');
  };

  const handleSchoolSelect = (school: ISchool) => {
    // Redirige a /[slug]/login
    router.push(`/schools/${school.slug}/login`);
  };

  return (
    <div className="pt-14 px-4 pb-4 xl:p-4">
      <button 
        onClick={handleRedirectToLoginAdmin}
        className='cursor-pointer absolute top-4 right-4 sm:top-5 sm:right-5 rounded-full bg-gray-700 p-2 hover:bg-gray-500'
      >
        <X className='text-white'/>
      </button>

      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto mt-4 z-50 relative">
        <div className="bg-gray-700 p-4">
          <h1 className="text-xl font-bold text-white">Colegios en nuestra plataforma</h1>
        </div>
        
        <div>
          {schoolsList.map((school: ISchool) => (
            <div
              key={school.id}
              onClick={() => handleSchoolSelect(school)}
              className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors flex items-center gap-4"
            >
              <img 
                src={school.logo} 
                alt={`Logo ${school.name}`} 
                className="w-10 h-10 object-contain rounded-full border border-gray-200" 
              />
              <span className="font-medium text-gray-800">{school.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListSchoolView;
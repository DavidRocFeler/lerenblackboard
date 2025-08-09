// app/[slug]/login/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { getAllSchoolServer } from '@/server/school.server';
import LoginForm from '@/components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ISchool } from '@/interface/school.types';

export default function DynamicLogin() {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState<ISchool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      if (!params?.slug) return;
      
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      
      try {
        const schools = await getAllSchoolServer();
        const foundSchool = schools.find(s => s.slug === slug);
        setSchool(foundSchool || null);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setSchool(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [params?.slug]);

  if (!params?.slug || loading) {
    return <div>Cargando colegio...</div>;
  }

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  return (
    <div className="relative min-h-screen">
      <button
        onClick={() => router.push('/listschool')}
        className="cursor-pointer absolute top-4 left-4 z-50 flex items-center gap-1 text-white hover:text-blue-200 bg-black/30 p-2 rounded-lg backdrop-blur-sm"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Lista de colegios</span>
      </button>

      {!school ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-red-500 mb-4">Colegio no encontrado</p>
            <p>El colegio con slug "{slug}" no existe en nuestro sistema.</p>
          </div>
        </div>
      ) : (
        <LoginForm schoolData={school} />
      )}
    </div>
  );
}
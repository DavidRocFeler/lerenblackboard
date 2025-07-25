// app/[slug]/login/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { schoolsList } from '@/helpers/listSchool.helpers';
import LoginForm from '@/components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DynamicLogin() {
  const params = useParams();
  const router = useRouter();
  
  if (!params?.slug) {
    return <div>Cargando colegio...</div>;
  }

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const school = schoolsList.find(s => s.slug === slug);

  return (
    <div className="relative min-h-screen">
      {/* Botón de volver - Siempre visible */}
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
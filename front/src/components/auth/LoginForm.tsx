'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ISchool } from '@/interface/school/types';

interface LoginFormProps {
  schoolData: ISchool;
}

const LoginForm = ({ schoolData }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Solo previene el comportamiento por defecto del formulario
    // No hay conexión a base de datos aún
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Fondo dinámico del colegio */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${schoolData.background}')` }}
      ></div>
      
      {/* Overlay azul con opacidad */}
      <div className="absolute inset-0 bg-blue-600 opacity-70"></div>
      
      {/* Contenedor principal del login */}
      <div className="relative w-full max-w-md px-8 pb-10 pt-[5rem] bg-white rounded-lg shadow-lg z-10 mx-4">
        {/* Logo dinámico del colegio */}
        <img 
          src={schoolData.logo} 
          className='absolute top-5 right-5 w-8' 
          alt={`Logo ${schoolData.name}`} 
        />
        <h1 className="text-[1.2rem] font-bold text-center text-gray-800 mb-8">
          LEREN BLACKBOARD
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Estás en la App de: <strong>{schoolData.name}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ISchool } from '@/interface/school.types';
import { login } from '@/server/login.server';
import { useAuthStore } from '@/store/auth.store';
import Swal from 'sweetalert2';

interface LoginFormProps {
  schoolData: ISchool;
}

const LoginForm = ({ schoolData }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData = await login(email, password);
      
      if (!userData?.token) {
        throw new Error('Token no recibido del backend');
      }

      // Guardar datos de usuario en el store
      useAuthStore.getState().setUser({
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName, // ✅ Usa campos separados
        lastName: userData.lastName,
        role: userData.role,
        token: userData.token,
        schoolId: userData.schoolId
      });

      // Redirección basada en el rol
      const redirectPath = userData.role === 'superadmin' 
        ? '/admin-dashboard' 
        : `/schools/${schoolData.slug}/dashboard`;
      
      router.push(redirectPath);
      
      Swal.fire({
        title: '¡Éxito!',
        text: 'Inicio de sesión exitoso',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        padding: '1.5rem',
        backdrop: 'rgba(0,0,0,0.4)',
        customClass: {
          container: '!z-[99999]',
          popup: 'max-w-md w-full !z-[99999]'
        },
      });

    } catch (error) {
      let errorMessage = 'Error al iniciar sesión';
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      setError(errorMessage);

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3b82f6',
        padding: '1.5rem',
        backdrop: 'rgba(0,0,0,0.4)',
        customClass: {
          container: '!z-[99999]',
          popup: 'max-w-md w-full !z-[99999]'
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Fondo dinámico del colegio */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${schoolData.background?.cloudinaryUrl}')` }}
      ></div>
      
      {/* Overlay azul con opacidad */}
      <div className="absolute inset-0 bg-blue-600 opacity-70"></div>
      
      {/* Contenedor principal del login */}
      <div className="relative w-full max-w-md px-8 pb-10 pt-[5rem] bg-white rounded-lg shadow-lg z-10 mx-4">
        {/* Logo dinámico del colegio */}
        <img 
          src={schoolData.logo?.cloudinaryUrl} 
          className='absolute top-5 right-5 w-8' 
          alt={`Logo ${schoolData.name}`} 
        />
        <h1 className="text-[1.2rem] font-bold text-center text-gray-800 mb-8">
          LEREN BLACKBOARD
        </h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </>
              ) : 'Iniciar sesión'}
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
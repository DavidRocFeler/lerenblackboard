'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { login } from '@/server/login.server';
import Swal from 'sweetalert2';

const Loggin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const user = await login(email, password);
      setUser(user);
      
      await router.push('/dashboard');
      
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
      let errorMessage = 'Ocurrió un error al iniciar sesión';
      
      if (error instanceof Error) {
        // Mapeamos mensajes específicos del backend
        switch(error.message) {
          case 'Usuario no encontrado':
            errorMessage = 'El correo electrónico no está registrado';
            break;
          case 'Contraseña incorrecta':
            errorMessage = 'La contraseña ingresada es incorrecta';
            break;
          case 'No se pudo conectar al servidor':
            errorMessage = 'Problemas de conexión con el servidor';
            break;
          default:
            errorMessage = error.message;
        }
      }
  
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
  };
  
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Fondo con imagen */}
      <div 
        className="absolute inset-0 bg-[url('/sorAnaPicture.png')] bg-cover bg-center"
      ></div>
      
      {/* Overlay azul con opacidad */}
      <div className="absolute inset-0 bg-blue-600 opacity-70"></div>
      
      {/* Contenedor principal del login */}
      <div className="relative w-full max-w-md px-8 pb-10 pt-[5rem] bg-white rounded-lg shadow-lg z-10 mx-4">
        <img src="/SorAnaLogo.png" className='absolute top-5 right-5 w-8' alt="" />
        <h1 className="text-[1.2rem] font-bold text-center text-gray-800 mb-8">LEREN BLACKBOARD</h1>
        
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
              className={`cursor-pointer w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
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
      </div>
    </div>
  );
};

export default Loggin;
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LogginAdminView = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado');
  };

  const handleRedirect = () => {
    router.push('/listschool')
  }


  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Fondo con imagen */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"
      ></div>
      
      {/* Overlay azul con opacidad */}
      <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
      
      {/* Contenedor principal del login */}
      <div className="relative w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg z-10 mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">LEREN BLACKBOARD</h1>
        
        {/* Botón para mostrar/ocultar colegios */}
        <button
          type="button"
          onClick={handleRedirect}
          className="cursor-pointer w-full mb-6 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
        >
          Ver todos los colegios que actualmente implementan nuestra plataforma
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Recuérdame
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
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
      </div>
    </div>
  );
};

export default LogginAdminView;
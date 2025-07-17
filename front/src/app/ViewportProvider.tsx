'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ViewportProvider = ({ children }: { children: React.ReactNode }) => {
  const [isViewportTooSmall, setIsViewportTooSmall] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marcar como montado en el cliente
    setIsMounted(true);
    
    const checkViewport = () => {
      setIsViewportTooSmall(window.innerHeight < 500);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Generar moléculas de forma consistente
  const molecules = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: (i * 13 + 17) % 100, // Valores determinísticos basados en el índice
    y: (i * 23 + 31) % 100,
    size: 0.3 + (i % 3) * 0.15, // Tamaños consistentes
    delay: (i * 0.3) % 2, // Delays consistentes
  }));

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return (
      <div className="relative w-full min-h-screen bg-black">
        {children}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Animación de moléculas */}
      {molecules.map((molecule) => (
        <motion.div
          key={molecule.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: `${molecule.size}rem`,
            height: `${molecule.size}rem`,
            left: `${molecule.x}%`,
            top: `${molecule.y}%`,
          }}
          animate={{
            x: [0, (molecule.id % 2 === 0 ? 15 : -15)],
            y: [0, (molecule.id % 3 === 0 ? 15 : -15)],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: molecule.delay,
          }}
        />
      ))}
      
      {/* Bloqueo condicional */}
      {isViewportTooSmall ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-bold text-xl text-center"
          >
            Solo para pantallas con más de 500px de alto
          </motion.p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
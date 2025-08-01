'use client';

import { motion } from 'framer-motion';

export const Molecules = () => {
  const molecules = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.5 + 0.3,
    delay: Math.random() * 2,
  }));

  return (
    <>
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
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: molecule.delay,
          }}
        />
      ))}
    </>
  );
};
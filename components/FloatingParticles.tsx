import React from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
}

const FloatingParticles: React.FC = () => {
  const particles: Particle[] = [
    { id: 1, size: 300, x: '10%', y: '20%', color: 'rgba(37, 99, 235, 0.1)', duration: 7, delay: 0 },
    { id: 2, size: 200, x: '80%', y: '10%', color: 'rgba(124, 58, 237, 0.08)', duration: 5, delay: 1 },
    { id: 3, size: 250, x: '70%', y: '60%', color: 'rgba(37, 99, 235, 0.06)', duration: 6, delay: 2 },
    { id: 4, size: 180, x: '20%', y: '70%', color: 'rgba(124, 58, 237, 0.07)', duration: 4, delay: 0.5 },
    { id: 5, size: 220, x: '50%', y: '40%', color: 'rgba(37, 99, 235, 0.05)', duration: 8, delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;

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
  // Slower, more subtle floating particles
  const particles: Particle[] = [
    { id: 1, size: 400, x: '5%', y: '15%', color: 'rgba(6, 182, 212, 0.08)', duration: 18, delay: 0 },
    { id: 2, size: 350, x: '75%', y: '5%', color: 'rgba(37, 99, 235, 0.06)', duration: 15, delay: 2 },
    { id: 3, size: 300, x: '65%', y: '55%', color: 'rgba(6, 182, 212, 0.05)', duration: 20, delay: 4 },
    { id: 4, size: 280, x: '15%', y: '65%', color: 'rgba(37, 99, 235, 0.07)', duration: 16, delay: 1 },
    { id: 5, size: 320, x: '45%', y: '35%', color: 'rgba(124, 58, 237, 0.04)', duration: 22, delay: 3 },
    { id: 6, size: 250, x: '85%', y: '45%', color: 'rgba(6, 182, 212, 0.06)', duration: 19, delay: 5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Radial Glow - light blue center fading to deep blue edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 20%, rgba(6, 182, 212, 0.12) 0%, rgba(37, 99, 235, 0.08) 30%, rgba(15, 23, 42, 0.03) 70%, transparent 100%)'
        }}
      />
      
      {/* Secondary deeper glow layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37, 99, 235, 0.1) 0%, transparent 60%)'
        }}
      />
      
      {/* Very subtle tech grid - softened */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 
            'linear-gradient(rgba(37, 99, 235, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%)',
        }}
      />
      
      {/* Floating Particles - slower movement */}
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
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
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

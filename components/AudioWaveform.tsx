import React from 'react';
import { motion, type Easing } from 'framer-motion';

type WaveformState = 'idle' | 'listening' | 'speaking';

interface AudioWaveformProps {
  state: WaveformState;
  barCount?: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({
  state,
  barCount = 5,
}) => {
  const getBarAnimation = (index: number) => {
    const delay = index * 0.1;
    const ease: Easing = 'easeInOut';

    switch (state) {
      case 'idle':
        return {
          scaleY: 0.3,
          transition: { duration: 0.3 },
        };
      case 'listening':
        return {
          scaleY: [0.3, 0.5, 0.3],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease,
            delay,
          },
        };
      case 'speaking':
        // Different patterns for each bar to create organic movement
        const patterns = [
          [0.3, 1, 0.5, 0.8, 0.3],
          [0.5, 0.3, 1, 0.4, 0.7],
          [0.4, 0.8, 0.3, 1, 0.5],
          [0.6, 0.4, 0.9, 0.3, 0.7],
          [0.3, 0.7, 0.4, 0.9, 0.3],
        ];
        return {
          scaleY: patterns[index % patterns.length],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            ease,
            delay,
          },
        };
      default:
        return { scaleY: 0.3 };
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 h-14">
      {Array.from({ length: barCount }).map((_, index) => (
        <motion.div
          key={index}
          className="w-2 rounded-full origin-center"
          style={{
            background: 'linear-gradient(to top, #2563eb, #7c3aed)',
            height: '56px',
          }}
          initial={{ scaleY: 0.3 }}
          animate={getBarAnimation(index)}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;

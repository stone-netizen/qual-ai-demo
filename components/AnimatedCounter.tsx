import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  label: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  duration = 2,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the value to determine animation type
    const numericMatch = value.match(/^(\d+)/);
    const suffix = value.replace(/^\d+/, '');

    if (numericMatch) {
      const targetNum = parseInt(numericMatch[1], 10);
      const startTime = Date.now();
      const durationMs = duration * 1000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.round(targetNum * easeOut);

        setDisplayValue(`${currentNum}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    } else {
      // For non-numeric values like "24/7", just show immediately with animation
      setDisplayValue(value);
    }
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="text-4xl font-bold text-accent mb-2">
        {displayValue}
      </div>
      <div className="text-sm text-gray-600 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export default AnimatedCounter;

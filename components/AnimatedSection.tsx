import React from 'react';
import { motion, Variants } from 'framer-motion';
import { fadeInUp, defaultViewport } from '../lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: 'section' | 'div' | 'article';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  variants = fadeInUp,
  delay = 0,
  as = 'div',
}) => {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible as any)?.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </Component>
  );
};

export default AnimatedSection;

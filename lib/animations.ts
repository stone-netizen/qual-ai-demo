import { Variants } from 'framer-motion';

// Scroll-triggered reveal variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Container for staggered children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};

// Button animations
export const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// Viewport settings for scroll animations
export const defaultViewport = {
  once: true,
  margin: '-50px',
};

// Accordion content expand/collapse
export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

// Chevron rotation for accordion
export const chevronRotate: Variants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 180 },
};

// Sticky CTA appearance
export const stickyCtaVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Float animation for phone mockup
export const floatAnimation: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

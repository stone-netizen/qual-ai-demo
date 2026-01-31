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

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
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

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Micro-interactions
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};

export const tapScale = {
  scale: 0.98,
};

// Card hover effect
export const cardHover = {
  y: -8,
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
  transition: { duration: 0.3 },
};

// Button animations
export const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

// Viewport settings for scroll animations
export const defaultViewport = {
  once: true,
  margin: '-50px',
};

export const viewportEarly = {
  once: true,
  margin: '-100px',
};

// Waveform bar animation for audio visualizer
export const waveformBar: Variants = {
  idle: {
    scaleY: 0.3,
    transition: { duration: 0.3 },
  },
  listening: {
    scaleY: [0.3, 0.5, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  speaking: {
    scaleY: [0.3, 1, 0.5, 0.8, 0.3],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
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

// Toast slide-in from left
export const toastSlide: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
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

// Particle float animation
export const particleFloat: Variants = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: {
      duration: 5 + i,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

// Counter animation helper
export const counterAnimation = {
  duration: 2,
  ease: 'easeOut' as const,
};

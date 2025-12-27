import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button, ButtonProps } from "./button";

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  strength?: number;
}

export function MagneticButton({ 
  children, 
  strength = 0.3, 
  className,
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-50, 50], [5, -5]);
  const rotateY = useTransform(springX, [-50, 50], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
      }}
      className="inline-block"
    >
      <Button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={`${className} transition-all duration-200 will-change-transform`}
        {...props}
      >
        <motion.span
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {children}
        </motion.span>
      </Button>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizStickyCTAProps {
  targetRef: React.RefObject<HTMLElement>;
  ctaText: string;
  onClick: () => void;
}

const QuizStickyCTA: React.FC<QuizStickyCTAProps> = ({
  targetRef,
  ctaText,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when target is NOT in view
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-100px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  // Only show on mobile
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]',
        'p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]',
        'md:hidden' // Only show on mobile
      )}
    >
      <Button
        onClick={onClick}
        className={cn(
          'w-full h-[52px] text-base font-semibold',
          'bg-blue-600 hover:bg-blue-700 text-white'
        )}
      >
        {ctaText}
      </Button>
    </div>
  );
};

export default QuizStickyCTA;

import React from 'react';
import { Button } from '@/components/ui/button';
import { QUIZ_HERO } from '@/lib/quiz-constants';

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-[28px] md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {QUIZ_HERO.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          {QUIZ_HERO.subheadline}
        </p>

        {/* CTA Button */}
        <Button
          onClick={onCtaClick}
          className="h-[52px] px-8 text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm w-full md:w-auto"
        >
          {QUIZ_HERO.ctaText}
        </Button>

        {/* Trust Bar */}
        <p className="mt-8 text-sm text-gray-500">
          {QUIZ_HERO.trustBar}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

import React, { useState, useRef, useCallback } from 'react';
import HeroSection from '@/components/quiz/HeroSection';
import BenefitsSection from '@/components/quiz/BenefitsSection';
import QuizForm from '@/components/quiz/QuizForm';
import ResultsBanner from '@/components/quiz/ResultsBanner';
import VSLSection from '@/components/quiz/VSLSection';
import CalendarSection from '@/components/quiz/CalendarSection';
import QuizStickyCTA from '@/components/quiz/QuizStickyCTA';
import { QUIZ_HERO, RESULTS_STICKY_CTA_TEXT } from '@/lib/quiz-constants';
import type { QuizData } from '@/lib/quiz-types';

type QuizView = 'quiz' | 'results';

const Quiz: React.FC = () => {
  const [view, setView] = useState<QuizView>('quiz');
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const quizFormRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Scroll to quiz form
  const scrollToQuiz = useCallback(() => {
    quizFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Scroll to calendar (results page)
  const scrollToCalendar = useCallback(() => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Handle quiz completion
  const handleQuizComplete = useCallback((data: QuizData) => {
    setQuizData(data);
    setView('results');
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Render quiz page (Page 1)
  if (view === 'quiz') {
    return (
      <div className="min-h-screen bg-white">
        {/* Minimal Header with QualAI Logo */}
        <header className="bg-white border-b border-gray-100 py-4 px-4 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xl font-bold text-gray-900">QualAI</span>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <HeroSection onCtaClick={scrollToQuiz} />

          {/* Benefits Section */}
          <BenefitsSection />

          {/* Quiz Form Section */}
          <section ref={quizFormRef} className="py-12 md:py-16 px-4 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <QuizForm onComplete={handleQuizComplete} />
            </div>
          </section>
        </main>

        {/* Mobile Sticky CTA (shows when quiz is not in view) */}
        <QuizStickyCTA
          targetRef={quizFormRef}
          ctaText={QUIZ_HERO.ctaText}
          onClick={scrollToQuiz}
        />
      </div>
    );
  }

  // Render results page (Page 2)
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header with QualAI Logo */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-xl font-bold text-gray-900">QualAI</span>
        </div>
      </header>

      <main>
        {/* Results Banner */}
        <ResultsBanner />

        {/* VSL Section */}
        <VSLSection />

        {/* Calendar Section */}
        <CalendarSection calendarRef={calendarRef} />
      </main>

      {/* Mobile Sticky CTA (shows when calendar is not in view) */}
      <QuizStickyCTA
        targetRef={calendarRef}
        ctaText={RESULTS_STICKY_CTA_TEXT}
        onClick={scrollToCalendar}
      />
    </div>
  );
};

export default Quiz;

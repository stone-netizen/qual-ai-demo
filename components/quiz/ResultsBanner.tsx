import React from 'react';
import { RESULTS_BANNER } from '@/lib/quiz-constants';

interface ResultsBannerProps {
  // Future: could accept quiz data for personalization
  showDynamicLine?: boolean;
}

const ResultsBanner: React.FC<ResultsBannerProps> = ({ showDynamicLine = false }) => {
  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-[28px] md:text-4xl font-bold text-gray-900 mb-4">
          {RESULTS_BANNER.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
          {RESULTS_BANNER.subheadline}
        </p>

        {/* Dynamic revenue line (stubbed) */}
        {showDynamicLine && (
          <p className="mt-6 text-lg font-medium text-blue-700 bg-blue-50 rounded-lg p-4">
            {RESULTS_BANNER.dynamicLine}
          </p>
        )}
      </div>
    </section>
  );
};

export default ResultsBanner;

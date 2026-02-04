import React from 'react';
import { RESULTS_CALENDAR } from '@/lib/quiz-constants';

interface CalendarSectionProps {
  calendarRef?: React.RefObject<HTMLDivElement>;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ calendarRef }) => {
  return (
    <section ref={calendarRef} className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
          {RESULTS_CALENDAR.headline}
        </h2>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-600 text-center mb-8 max-w-xl mx-auto">
          {RESULTS_CALENDAR.subheadline}
        </p>

        {/* Calendar Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm mb-2">Calendar Integration</p>
              <p className="text-gray-400 text-xs">
                (Calendly, Cal.com, or GHL embed will go here)
              </p>
            </div>
          </div>
        </div>

        {/* Preparation bullets */}
        <div className="max-w-lg mx-auto mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Before your call:</h3>
          <ul className="space-y-2">
            {RESULTS_CALENDAR.preparationBullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust text */}
        <p className="text-center text-sm text-gray-500 italic">
          {RESULTS_CALENDAR.trustText}
        </p>
      </div>
    </section>
  );
};

export default CalendarSection;

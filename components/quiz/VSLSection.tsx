import React from 'react';
import { Check } from 'lucide-react';
import { RESULTS_VSL } from '@/lib/quiz-constants';

const VSLSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          {RESULTS_VSL.title}
        </h2>

        {/* Video Placeholder - 16:9 aspect ratio */}
        <div className="relative w-full max-w-[720px] mx-auto mb-10">
          <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-blue-600 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Video Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Benefit bullets */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {RESULTS_VSL.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{benefit.text}</h3>
                <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VSLSection;

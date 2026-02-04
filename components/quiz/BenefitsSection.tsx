import React from 'react';
import { Phone, Bot, RefreshCw, Star, Handshake } from 'lucide-react';
import { QUIZ_BENEFITS } from '@/lib/quiz-constants';

// Map icon names to Lucide components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  phone: Phone,
  robot: Bot,
  refresh: RefreshCw,
  star: Star,
  handshake: Handshake,
};

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {QUIZ_BENEFITS.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Phone;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;


import React from 'react';
import { CRM_INTEGRATIONS } from '../constants';

const CRMLogos: React.FC = () => {
  return (
    <section className="py-16 bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
            Integrates With Your Tools
          </p>
        </div>

        {/* Marquee container with fade edges */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none"></div>
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none"></div>

          {/* Marquee track */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...CRM_INTEGRATIONS, ...CRM_INTEGRATIONS].map((crm, idx) => (
                <div
                  key={idx}
                  className="mx-6 px-6 py-3 bg-navy-900/50 border border-navy-800 rounded-xl hover:border-navy-700 hover:bg-navy-800/50 transition-all duration-300 cursor-default flex items-center justify-center"
                >
                  <img
                    src={crm.logo}
                    alt={crm.name}
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex animate-marquee whitespace-nowrap items-center" aria-hidden="true">
              {[...CRM_INTEGRATIONS, ...CRM_INTEGRATIONS].map((crm, idx) => (
                <div
                  key={idx}
                  className="mx-6 px-6 py-3 bg-navy-900/50 border border-navy-800 rounded-xl hover:border-navy-700 hover:bg-navy-800/50 transition-all duration-300 cursor-default flex items-center justify-center"
                >
                  <img
                    src={crm.logo}
                    alt={crm.name}
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMLogos;

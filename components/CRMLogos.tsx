import React from 'react';
import { CRM_INTEGRATIONS } from '../constants';

// Build Logo.dev URL for a domain with dark theme and transparency
const getLogoUrl = (domain: string): string => {
  const token = import.meta.env.VITE_LOGODEV_TOKEN;
  if (!token) {
    // Fallback: show domain text if no token configured
    return '';
  }
  // Use PNG format for transparency, dark theme for light-colored logos on dark bg
  return `https://img.logo.dev/${domain}?token=${token}&format=png&theme=dark`;
};

const CRMLogos: React.FC = () => {
  const logodevToken = import.meta.env.VITE_LOGODEV_TOKEN;

  return (
    <section className="py-16 bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
            Integrates With Your Tools
          </p>
        </div>

        {/* Marquee container with responsive fade edges */}
        <div className="relative">
          {/* Left fade - responsive widths */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none"></div>
          {/* Right fade - responsive widths */}
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none"></div>

          {/* Marquee track */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...CRM_INTEGRATIONS, ...CRM_INTEGRATIONS].map((crm, idx) => (
                <div
                  key={idx}
                  className="mx-2 sm:mx-4 md:mx-6 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-navy-900/50 border border-navy-800 rounded-full hover:border-navy-700 hover:bg-navy-800/50 transition-all duration-300 cursor-default flex items-center justify-center"
                >
                  {logodevToken ? (
                    <img
                      src={getLogoUrl(crm.domain)}
                      alt={crm.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs font-medium text-center leading-tight">
                      {crm.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex animate-marquee whitespace-nowrap items-center" aria-hidden="true">
              {[...CRM_INTEGRATIONS, ...CRM_INTEGRATIONS].map((crm, idx) => (
                <div
                  key={idx}
                  className="mx-2 sm:mx-4 md:mx-6 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-navy-900/50 border border-navy-800 rounded-full hover:border-navy-700 hover:bg-navy-800/50 transition-all duration-300 cursor-default flex items-center justify-center"
                >
                  {logodevToken ? (
                    <img
                      src={getLogoUrl(crm.domain)}
                      alt={crm.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs font-medium text-center leading-tight">
                      {crm.name}
                    </span>
                  )}
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


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BRAND, ROUTES } from '../constants';

const VSLSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* VSL Video Area */}
        <div className="aspect-video bg-navy-950 relative flex items-center justify-center group cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent z-10"></div>
          
          <div className="relative z-20 text-center px-6">
            <div className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-accent/30 opacity-75"></div>
              <svg className="w-10 h-10 text-white ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-heading tracking-tight">Watch the Pilot Briefing</h3>
            <p className="text-blue-200 mt-4 text-sm md:text-lg opacity-80 font-medium">How we deliver {BRAND.guarantee}.</p>
          </div>
          
          <div className="absolute inset-0 bg-navy-800 opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
        </div>

        {/* Booking / Calendar Area */}
        <div className="p-8 md:p-16 lg:p-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-950 mb-6 font-heading tracking-tight">Schedule Your Evaluation</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">Evaluation takes ~15 minutes. We review territory eligibility and pilot capacity.</p>
          </div>
          
          <div className="min-h-[600px] w-full bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 relative group">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-navy-900 font-bold text-xl mb-2">Calendar Embed</p>
            <p className="text-gray-400 text-sm text-center max-w-md">[Your GoHighLevel Calendar Widget Here]</p>
            
            {/* Simulation button - Small & Discrete */}
            <button 
              onClick={() => navigate(ROUTES.POST_BOOKING)}
              className="mt-12 px-6 py-2.5 bg-white text-gray-400 hover:text-accent border border-gray-200 rounded-full text-[10px] font-bold transition-all uppercase tracking-widest hover:border-accent/20 hover:shadow-lg shadow-sm"
            >
              Test Redirect Flow
            </button>
          </div>

          {/* Compliance Disclosure */}
          <div className="mt-16 max-w-2xl mx-auto px-8 py-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <p className="text-[10px] leading-relaxed text-gray-400 text-center uppercase tracking-wider font-bold mb-2">A2P 10DLC Compliance Disclosure</p>
            <p className="text-[11px] leading-relaxed text-gray-500 text-center italic">
              By scheduling, you agree to receive automated messages from {BRAND.name} regarding this inquiry. Msg/data rates apply. Reply STOP to opt out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSLSection;

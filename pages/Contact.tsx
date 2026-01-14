
import React from 'react';
import VSLSection from '../components/VSLSection';
import { BRAND } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy-950 mb-6 font-heading tracking-tight">Evaluate Your Pilot Eligibility</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our evaluation process is built to be direct, transparent, and respectful of your time.
            </p>
          </div>

          <div className="mb-24">
            <VSLSection />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 font-heading">Operator Context</h3>
              <p className="text-blue-800 leading-relaxed mb-6">
                We only accept HVAC companies that are ready for a systematic shift in how they handle inbound demand. Our pilot is not for everyone—it's for growth-minded operators who are tired of manual follow-up.
              </p>
              <ul className="space-y-3">
                {["System-led qualification", "Context-based response", "Operator-first scheduling"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-blue-700 font-medium text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy-950 font-heading">Direct Channels</h3>
              <div className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white">
                <div className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Support Email</div>
                <div className="text-navy-950 font-bold">{BRAND.supportEmail}</div>
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white">
                <div className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Direct Phone</div>
                <div className="text-navy-950 font-bold">{BRAND.supportPhone}</div>
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white">
                <div className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Office Headquarters</div>
                <div className="text-navy-950 font-bold text-sm leading-relaxed">{BRAND.address}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

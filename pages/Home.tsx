
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import VSLSection from '../components/VSLSection';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-accent rounded-full text-xs font-bold uppercase tracking-wider mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Pilot Program Evaluation Open
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-navy-950 leading-[1.1] mb-8 font-heading">
                Automated Booking Systems for <span className="text-accent">HVAC Companies</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
                Not an agency. A booking system.
              </p>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-xl">
                We build and manage a direct-to-calendar booking system that captures, qualifies, and schedules leads before your team even picks up the phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={ROUTES.CONTACT} className="bg-navy-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-navy-800 transition-all text-center shadow-xl shadow-navy-900/10">
                  Book Pilot Evaluation
                </Link>
                <Link to={ROUTES.HOW_IT_WORKS} className="bg-white border border-gray-200 text-navy-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all text-center">
                  How it Works
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                  Built for Operators
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                  Opt-out Anytime
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] rotate-3 -z-10"></div>
              <div className="bg-navy-900 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden aspect-square flex items-center justify-center border-8 border-navy-800">
                 <div className="text-center text-white p-8">
                   <div className="text-4xl font-bold mb-4">5 Minute</div>
                   <div className="text-xl text-blue-300 font-medium opacity-80 mb-8 uppercase tracking-widest">Average Speed to Booked</div>
                   <div className="space-y-4">
                     <div className="bg-navy-800/50 p-4 rounded-xl border border-navy-700/50 flex justify-between items-center">
                       <span>Inbound Lead</span>
                       <span className="text-xs text-blue-400">0:01s</span>
                     </div>
                     <div className="bg-accent p-4 rounded-xl shadow-lg flex justify-between items-center">
                       <span>AI Qualification</span>
                       <span className="text-xs text-white/80">0:45s</span>
                     </div>
                     <div className="bg-navy-800/50 p-4 rounded-xl border border-navy-700/50 flex justify-between items-center">
                       <span>Booked Call</span>
                       <span className="text-xs text-blue-400">3:12m</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Transparent Communication. Built for Operators.</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <span className="text-2xl font-bold text-navy-900">HVAC PROS</span>
            <span className="text-2xl font-bold text-navy-900">TRUSTED AIR</span>
            <span className="text-2xl font-bold text-navy-900">ELITE COOLING</span>
            <span className="text-2xl font-bold text-navy-900">SERVICE FIRST</span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-navy-950 mb-6 font-heading">Stop Chasing Homeowners. <br/>Start Booking Services.</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Traditional marketing gets you names and numbers. Qual AI delivers confirmed appointments directly to your CRM.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all">
              <div className="w-12 h-12 bg-blue-50 text-accent rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-4 font-heading">Instant AI Follow-up</h3>
              <p className="text-gray-600 leading-relaxed">
                As soon as a lead hits your system, our AI engages via SMS to qualify their needs and check availability.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all">
              <div className="w-12 h-12 bg-blue-50 text-accent rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-4 font-heading">Voice-Assisted Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                For high-value inquiries, our automated voice system calls the lead to finalize the appointment time.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all">
              <div className="w-12 h-12 bg-blue-50 text-accent rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-4 font-heading">Direct Calendar Sync</h3>
              <p className="text-gray-600 leading-relaxed">
                Zero manual entry. Appointments are synced to your existing field service software or dispatch calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VSL Funnel Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-950 mb-4 font-heading">Automated Booking Pilot</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Watch how we eliminate lead waste and then schedule your decision-based evaluation.</p>
          </div>
          <VSLSection />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-950 mb-12 text-center font-heading">Common Questions</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50">
              <h4 className="font-bold text-navy-900 mb-2">Is this a marketing agency?</h4>
              <p className="text-gray-600">No. We don't just "run ads." We provide a full software and booking system that manages the entire conversion process from the first click to a booked appointment on your calendar.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50">
              <h4 className="font-bold text-navy-900 mb-2">What happens if a lead doesn't respond?</h4>
              <p className="text-gray-600">Our system performs multi-channel follow-up across SMS, email, and voice over a 30-day period (unless they opt-out) to ensure no lead is left behind.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50">
              <h4 className="font-bold text-navy-900 mb-2">Can I opt-out of the pilot?</h4>
              <p className="text-gray-600">Yes. The pilot is designed to be low-friction. If it's not a fit for your operations, you can cancel at any time with 30 days notice.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

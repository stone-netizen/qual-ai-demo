
import React from 'react';
import { BRAND } from '../constants';

const PostBooking: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Branding & Status */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-blue-50 text-accent rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-blue-100">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-navy-950 mb-6 font-heading tracking-tight text-center leading-[1.1]">
            Your Evaluation is Confirmed. <br />
            <span className="text-accent underline decoration-blue-100 underline-offset-8">Watch This Next.</span>
          </h1>

          {/* Video Player Section - Cinematic Focus */}
          <div className="relative mb-12 group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-navy-950 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 aspect-video flex items-center justify-center">
              <video
                controls
                className="w-full h-full object-cover rounded-[2rem]"
                poster="/video-thumbnail.jpg"
                ref={(video) => {
                  if (video) {
                    video.playbackRate = 1.25;
                  }
                }}
              >
                <source src="https://nsettu1cw1vbtxot.public.blob.vercel-storage.com/copy_8D75FEF7-1701-4148-9D6C-DC742D5A1034.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto text-center leading-relaxed">
            Please watch this 5-minute briefing before our call. It explains exactly how we fulfill our <span className="text-navy-900 font-semibold">{BRAND.guarantee}</span> pilot guarantee.
          </p>
        </div>

        {/* Content Below Video - High Authority */}
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-navy-950 mb-6 font-heading flex items-center gap-3 uppercase tracking-wider">
                <span className="w-8 h-px bg-accent"></span>
                The Pilot Goal
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                Our objective during the 60-day pilot is to install a permanent booking asset in your business that handles the speed-to-booked gap (averaging 5 minutes).
              </p>
              <ul className="space-y-4">
                {[
                  "Qualified Diagnostic Leads Only",
                  "Direct FieldEdge/ServiceTitan Sync",
                  "Automated Text & Voice Follow-up",
                  "20 Guaranteed Appointments"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-center text-sm font-medium text-navy-900">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-[2rem] p-10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Preparation</h3>
              <p className="text-navy-900 font-bold text-xl mb-4 font-heading leading-snug">
                Please have your current dispatch capacity ready.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                We'll be looking at your service area maps and determining if we have the bandwidth to support your territory during the call.
              </p>
            </div>
          </div>

          {/* Final Respectful Sign-off */}
          <div className="pt-12 border-t border-gray-100 text-center pb-20">
            <p className="text-gray-400 text-sm italic font-medium">
              A calendar invite has been sent to your email. We look forward to seeing if the Qual AI Pilot is a fit for your operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBooking;

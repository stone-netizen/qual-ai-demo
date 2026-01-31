import React from 'react';
import { motion } from 'framer-motion';
import { floatAnimation } from '../lib/animations';

const PhoneMockup: React.FC = () => {
  return (
    <motion.div
      className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 mr-8 xl:mr-16"
      style={{
        perspective: '1000px',
      }}
      variants={floatAnimation}
      animate="animate"
    >
      <div
        className="relative"
        style={{
          transform: 'rotateY(-15deg) rotateX(5deg)',
        }}
      >
        {/* Phone Frame */}
        <div className="w-64 h-[520px] bg-navy-950 rounded-[40px] p-3 shadow-2xl shadow-navy-950/40 border border-navy-800">
          {/* Screen */}
          <div className="w-full h-full bg-gradient-to-b from-navy-900 to-navy-950 rounded-[32px] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 pt-4 pb-2">
              <span className="text-white/60 text-xs font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 flex gap-0.5">
                  <div className="flex-1 bg-white/60 rounded-sm"></div>
                  <div className="flex-1 bg-white/60 rounded-sm"></div>
                  <div className="flex-1 bg-white/60 rounded-sm"></div>
                  <div className="flex-1 bg-white/30 rounded-sm"></div>
                </div>
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2v2h-2v-2H9v2H7v-2H5a2 2 0 01-2-2V6a2 2 0 012-2h2V2h2v2h6V2h2v2zm0 2H5v12h12V6z"/>
                </svg>
              </div>
            </div>

            {/* App Content */}
            <div className="px-4 pt-4">
              {/* Logo */}
              <div className="text-center mb-6">
                <span className="text-lg font-bold text-white">Qual <span className="text-accent">AI</span></span>
              </div>

              {/* Call Status */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </div>
                <p className="text-white font-medium text-sm">AI Assistant Speaking</p>
                <p className="text-blue-300/60 text-xs mt-1">0:42</p>
              </div>

              {/* Waveform */}
              <div className="flex items-center justify-center gap-1 mb-8">
                {[0.4, 0.7, 1, 0.6, 0.8].map((scale, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-accent to-purple-400 rounded-full"
                    style={{ height: 32 }}
                    animate={{
                      scaleY: [scale * 0.3, scale, scale * 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Transcript Preview */}
              <div className="bg-navy-800/50 rounded-xl p-3 mb-4 border border-navy-700/50">
                <p className="text-white/80 text-xs leading-relaxed">
                  "I can get a technician to your location tomorrow between 9-11 AM. Would that work for you?"
                </p>
              </div>

              {/* End Call Button */}
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>

        {/* Reflection Effect */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 bg-accent/10 blur-xl rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default PhoneMockup;

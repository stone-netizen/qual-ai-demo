import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_PROOF } from '../constants';
import { toastSlide } from '../lib/animations';

const SocialProofToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Show first toast after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Hide toast after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Show next toast after 10 seconds (5s visible + 5s hidden)
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SOCIAL_PROOF.length);
      setIsVisible(true);
    }, 10000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, currentIndex]);

  const currentProof = SOCIAL_PROOF[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-50"
          variants={toastSlide}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 max-w-sm flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {currentProof.name.charAt(0)}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy-950">
                New partner signed up
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {currentProof.name} • {currentProof.location}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {currentProof.timeAgo}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofToast;

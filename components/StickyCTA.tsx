import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, MESSAGING } from '../constants';
import { stickyCtaVariants } from '../lib/animations';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on contact page
  const shouldShow = location.pathname !== ROUTES.CONTACT;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          variants={stickyCtaVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <button
            onClick={() => navigate(ROUTES.CONTACT)}
            className="flex items-center gap-2 bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all duration-300"
          >
            {MESSAGING.cta.primary}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;

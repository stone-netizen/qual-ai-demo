import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      // Show after minimal scroll (100px)
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-6 z-50"
          variants={stickyCtaVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <button
            onClick={() => navigate(ROUTES.CONTACT)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            {MESSAGING.cta.primary}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;

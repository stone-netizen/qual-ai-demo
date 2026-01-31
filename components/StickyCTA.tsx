import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES, MESSAGING, UI_CONFIG } from '../constants';
import { stickyCtaVariants } from '../lib/animations';
import { Button } from '@/components/ui/button';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on contact page
  const shouldShow = location.pathname !== ROUTES.CONTACT;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > UI_CONFIG.STICKY_CTA_SCROLL_THRESHOLD);
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
          <Button
            size="lg"
            onClick={() => navigate(ROUTES.CONTACT)}
            className="bg-accent hover:bg-blue-600 text-white px-6 py-3 h-auto rounded-xl font-semibold shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all duration-300"
          >
            {MESSAGING.cta.primary}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;

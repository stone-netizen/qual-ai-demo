import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { accordionContent, chevronRotate } from '../lib/animations';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <motion.div
      className="rounded-xl border border-gray-100 bg-gray-50/50 overflow-hidden"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h4 className="font-semibold text-navy-950 pr-4">
          {question}
        </h4>
        <motion.svg
          className="w-5 h-5 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          variants={chevronRotate}
          animate={isOpen ? 'expanded' : 'collapsed'}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionContent}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQItem from './FAQItem';
import { staggerContainer, fadeInUp, defaultViewport } from '../lib/animations';

interface FAQEntry {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQEntry[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="space-y-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={fadeInUp}>
          <FAQItem
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQAccordion;

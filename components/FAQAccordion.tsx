import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { staggerContainer, fadeInUp, defaultViewport } from '../lib/animations';

interface FAQEntry {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQEntry[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <AccordionItem
              value={`item-${index}`}
              className="rounded-xl border border-gray-100 bg-gray-50/50 overflow-hidden px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-navy-950 hover:no-underline py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default FAQAccordion;

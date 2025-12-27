import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Answer a few operational questions",
    copy: "No login or signup. Just basics about calls, follow-up, and appointments.",
  },
  {
    title: "See where revenue is leaking",
    copy: "Instant breakdown with conservative estimates and system-by-system impact.",
  },
  {
    title: "Optional: Validate the numbers in a Revenue Leak Review",
    copy: "If it matters, you can book a short review — no pitch.",
  },
];

export function HowItWorksV2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateX: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="bg-black text-white py-10 sm:py-12">
      <motion.div 
        style={{ y }}
        className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 will-change-transform"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-3 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">How it works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Simple, fast, and built to give you clarity without the sales pressure.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-3 card-hover gpu-accelerated text-center sm:text-left"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold text-white mx-auto sm:mx-0"
              >
                {idx + 1}
              </motion.div>
              <h3 className="text-base sm:text-lg font-semibold">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.copy}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}


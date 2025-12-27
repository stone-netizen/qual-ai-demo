import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function WhatThisDiagnosticDoes() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section ref={ref} className="bg-black text-white py-8 sm:py-10">
      <motion.div
        style={{ y }}
        className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 will-change-transform"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-2 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold"
          >
            What this diagnostic actually looks at
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            This system identifies directional leakage using conservative, industry-verified benchmarks for service businesses doing $50K–$500K/month.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="rounded-2xl border border-white/5 bg-black p-4 sm:p-5 space-y-2 hover:border-emerald-500/20 transition-all duration-300 card-hover text-center sm:text-left"
          >
            <motion.h3
              variants={itemVariants}
              className="text-sm font-black uppercase tracking-widest text-emerald-500"
            >
              What this estimates
            </motion.h3>
            <motion.ul
              variants={containerVariants}
              className="space-y-1 text-slate-300 text-sm"
            >
              <motion.li variants={itemVariants}>Missed calls & after-hours gaps</motion.li>
              <motion.li variants={itemVariants}>Slow response & limited follow-up</motion.li>
              <motion.li variants={itemVariants}>No-show appointments</motion.li>
              <motion.li variants={itemVariants}>Dormant leads untouched</motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}


import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useRef } from "react";

interface HeroSectionV2Props {
  onStart: () => void;
}

export function HeroSectionV2({ onStart }: HeroSectionV2Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black text-white gpu-accelerated">
      {/* Parallax Background Grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#0b0b0b_1px,transparent_1px),linear-gradient(to_bottom,#0b0b0b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 will-change-transform"
      />

      {/* Parallax Background Gradient */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-black via-black to-black will-change-transform"
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/25 rounded-full blur-sm"
        />
      </div>

      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 will-change-transform text-center"
      >
        <div className="space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-200 mx-auto max-w-full">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 text-[9px] sm:text-[10px] font-semibold whitespace-nowrap">
              New
            </span>
            <span className="text-slate-200 text-center">
              For service businesses with inbound leads — run a revenue diagnostic
            </span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-[clamp(1.75rem,5vw,4.5rem)] font-black leading-[1.0] tracking-tight px-2 sm:px-0 italic uppercase">
              Your Business Is Leaking Revenue <br />
              <span className="text-emerald-500">(And You Probably Can&apos;t See It)</span>
            </h1>
            <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto px-2 sm:px-0 font-medium leading-relaxed">
              In this free 15-minute walkthrough, we&apos;ll show you exactly where you&apos;re losing money, time, and leads — and how others are fixing it fast with systems and AI.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] pt-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">✓</span>
              NO PITCH
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">✓</span>
              NO PRESSURE
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">✓</span>
              JUST A FREE CLARITY MAP
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <MagneticButton
              size="lg"
              onClick={onStart}
              strength={0.4}
              className="px-10 sm:px-14 py-4 sm:py-5 h-auto text-lg sm:text-2xl font-black uppercase italic rounded-2xl bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all hover:scale-105 active:scale-95"
            >
              Book My Free Revenue Leak Audit
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


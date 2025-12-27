import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leak } from "@/utils/calculations";
import { LeakCard } from "./LeakCard";

interface LeakBreakdownGridProps {
  leaks: Leak[];
  onBookCall: () => void;
  industry?: string;
  reactivationCard?: React.ReactNode;
}

export function LeakBreakdownGrid({ leaks, onBookCall, industry, reactivationCard }: LeakBreakdownGridProps) {
  const [openLeakId, setOpenLeakId] = useState<string | null>(null);
  const activeLeaks = leaks.filter((leak) => leak.monthlyLoss > 0);

  if (activeLeaks.length === 0) return null;

  return (
    <section id="leak-breakdown" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Gap Analysis
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-black text-white mb-2 leading-tight">Identified Operational Leaks</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">Hypothesized impact based on common bottlenecks in service operations.</p>
        </motion.div>

        <div className="grid gap-4 md:gap-5">
          {activeLeaks.slice(0, 2).map((leak, index) => (
            <div key={leak.type} className="space-y-4">
              <LeakCard
                leak={leak}
                rank={index + 1}
                onBookCall={onBookCall}
                industry={industry}
                isOpen={openLeakId === leak.type}
                onToggle={(isOpen) => setOpenLeakId(isOpen ? leak.type : null)}
              />
            </div>
          ))}

          {/* Reactivation placement: below first 2 gap cards */}
          {reactivationCard}

          {activeLeaks.slice(2).map((leak, index) => (
            <div key={leak.type} className="space-y-4">
              <LeakCard
                leak={leak}
                rank={index + 3}
                onBookCall={onBookCall}
                industry={industry}
                isOpen={openLeakId === leak.type}
                onToggle={(isOpen) => setOpenLeakId(isOpen ? leak.type : null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

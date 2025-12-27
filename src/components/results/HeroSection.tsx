import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/calculations";

interface HeroSectionProps {
  businessName: string;
  industry?: string;
  monthlyLoss: number;
  annualLoss: number;
  percentOfRevenue: number;
  leakCount: number;
  totalRange: { low: number; mid: number; high: number };
  onBookCall: () => void;
}

export const HeroSection = ({
  businessName,
  monthlyLoss,
  percentOfRevenue,
  leakCount,
  totalRange,
  onBookCall,
}: HeroSectionProps) => {
  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Verified Operational Diagnosis
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.9]">
            {businessName}&apos;s <span className="text-emerald-500">Revenue Leak</span>
          </h1>

          {/* Centered Large Box */}
          <div className="relative py-12 px-8 rounded-[2.5rem] bg-black border border-white/5 backdrop-blur-sm overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Estimated Monthly Loss</p>
            <div className="flex items-center justify-center gap-2 text-6xl md:text-8xl font-black text-white tracking-tighter tabular-nums mb-4">
              <span>{formatCurrency(totalRange.low)}</span>
              <span className="text-slate-500 opacity-50">–</span>
              <span>{formatCurrency(totalRange.high)}</span>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                <AlertTriangle className="w-5 h-5 text-emerald-500" />
                <span>{percentOfRevenue}% of Revenue Leaking</span>
              </div>

              <div className="w-full max-w-sm space-y-4 relative z-20">
                <Link
                  to="/vsl"
                  className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-black text-xl font-black uppercase italic rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center no-underline"
                >
                  Confirm Technical Review
                </Link>
                <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Technical Verification</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>15 Minutes</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>No Sales Pitch</span>
                </div>
              </div>

              <p className="text-slate-400 font-medium text-sm max-w-md">
                "This report identifies directional leakage based on your trailing performance data."
              </p>
            </div>
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-black border border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Annual Exposure</div>
              <div className="text-xl font-bold text-white tracking-tight">
                {formatCurrency(totalRange.low * 12)}–{formatCurrency(totalRange.high * 12)}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-black border border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Priority Gaps</div>
              <div className="text-xl font-bold text-white tracking-tight">
                {leakCount} Critical Point{leakCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Benchmarked against 200+ service operations
          </div>
        </motion.div>
      </div>
    </section>
  );
};

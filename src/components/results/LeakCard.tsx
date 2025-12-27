import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { formatCurrency, Leak } from "@/utils/calculations";

interface LeakCardProps {
  leak: Leak;
  industry: string;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onBookCall: () => void;
  rank: number;
}

export const LeakCard = ({ leak, industry, isOpen = false, onToggle, onBookCall, rank }: LeakCardProps) => {
  const [showWhy, setShowWhy] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const severityColor = {
    critical: "text-red-500",
    high: "text-red-400",
    medium: "text-amber-500",
    low: "text-emerald-500",
  }[leak.severity];

  const severityBg = {
    critical: "bg-red-500/10 border-red-500/20",
    high: "bg-red-500/5 border-red-500/10",
    medium: "bg-amber-500/5 border-amber-500/10",
    low: "bg-emerald-500/5 border-emerald-500/10",
  }[leak.severity];

  return (
    <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? "bg-black border-emerald-500/20 shadow-xl" : "bg-black border-white/5 hover:border-white/10"
      }`}>
      {/* Header - Compact */}
      <div
        className="p-4 cursor-pointer flex items-center justify-between gap-4"
        onClick={() => onToggle(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${severityBg}`}>
            <AlertTriangle className={`w-5 h-5 ${severityColor}`} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{leak.label}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] uppercase font-black tracking-widest ${severityColor}`}>
                {leak.severity} Impact
              </span>
            </div>
          </div>
        </div>

        <div className="text-right flex items-center gap-4">
          <div className="hidden sm:block">
            <div className="text-lg font-black text-white tabular-nums">
              {formatCurrency(leak.monthlyLoss)}
            </div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest text-right">
              Per Month
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-90 text-white" : ""}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-6 space-y-6">
              <div className="sm:hidden block p-4 bg-white/5 rounded-xl mb-4">
                <div className="text-2xl font-black text-white tabular-nums">
                  {formatCurrency(leak.monthlyLoss)}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Estimated Monthly Leakage
                </div>
              </div>

              <div className="text-sm text-slate-400 leading-relaxed italic">
                {leak.recommendation}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-6 pt-2">
                <button
                  onClick={() => setShowWhy(!showWhy)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                >
                  {showWhy ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  Show why this happens
                </button>
                <button
                  onClick={() => setShowCalculation(!showCalculation)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                >
                  {showCalculation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  View calculation
                </button>
              </div>

              <AnimatePresence>
                {showWhy && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Root Cause Analysis</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        This system gap represents a significant portion of your operational revenue leakage. In the {industry} industry, this is typically caused by {leak.label.toLowerCase()} inefficiencies and lack of automation.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showCalculation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/50">Calculation Input Basis</h4>
                      <div className="space-y-2">
                        {Object.entries(leak.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-slate-300 font-mono tracking-tight">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Primary Card CTA */}
              <div className="pt-4 mt-2 border-t border-white/5">
                <Link
                  to="/vsl"
                  className="w-full h-14 bg-white hover:bg-slate-100 text-black text-sm font-black uppercase tracking-wider rounded-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 no-underline"
                >
                  Confirm This Leak
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { motion } from "framer-motion";
import { formatCurrency, ReactivationLeak } from "@/utils/calculations";

interface QuickWinCardProps {
  reactivation: ReactivationLeak;
  onViewPlan: () => void;
  compact?: boolean;
}

export function QuickWinCard({ reactivation, onViewPlan, compact = false }: QuickWinCardProps) {
  const dormantCount = reactivation.dormantLeads?.viableLeads || 0;
  const pastCount = reactivation.pastCustomers?.winnableCustomers || 0;
  const totalContacts = dormantCount + pastCount;

  if (compact) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-500/20 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                    Fastest Win (Optional)
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">Dormant Lead Reactivation</h3>
                <p className="text-xs text-amber-200/50 mt-0.5">Estimated {formatCurrency(reactivation.monthlyLoss)}/mo in warm-lead recovery</p>
              </div>
            </div>
            <button
              onClick={onViewPlan}
              className="px-6 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
            >
              Preview Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-500/20 backdrop-blur-xl"
      >
        {/* Glow effect */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />

        <div className="relative p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center animate-pulse">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-wide mb-2">
                Quick Win
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Dormant Lead Reactivation</h3>
              <p className="text-sm text-amber-200/70 mt-1">Fastest money to recover • No ad spend needed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-black/30 border border-amber-500/10">
              <div className="text-xs text-amber-200/50 uppercase tracking-wider mb-2">Recovery</div>
              <div className="text-3xl sm:text-4xl font-black text-white tabular-nums mb-1">{formatCurrency(reactivation.monthlyLoss)}</div>
              <div className="text-sm text-amber-200/60">per month</div>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-black/30 border border-amber-500/10">
              <div className="text-xs text-amber-200/50 uppercase tracking-wider mb-2">Contacts</div>
              <div className="text-3xl sm:text-4xl font-black text-white tabular-nums mb-1">{totalContacts}</div>
              <div className="text-sm text-amber-200/60">warm leads</div>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/20 border border-amber-500/30">
              <div className="text-xs text-amber-200/70 uppercase tracking-wider mb-2">Timeline</div>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 tabular-nums mb-1">7d</div>
              <div className="text-sm sm:text-base font-semibold text-amber-200">to first results</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-amber-500/5 border border-amber-500/10">
            <p className="text-sm text-slate-200 leading-relaxed">
              You have <span className="font-semibold text-white">{dormantCount} dormant contacts</span> and{" "}
              <span className="font-semibold text-white">{pastCount} past customers</span> who haven&apos;t bought in 6-12 months.
              Industry data shows <span className="font-semibold text-amber-400">22% reactivation rate</span> with proper outreach.
            </p>
          </div>

          <button
            onClick={onViewPlan}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02]"
          >
            See what reactivation would look like →
          </button>
        </div>
      </motion.div>
    </div>
  );
}

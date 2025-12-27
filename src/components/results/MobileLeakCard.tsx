import { motion } from "framer-motion";
import { formatCurrency, Leak } from "@/utils/calculations";
import { ProgressiveDisclosure } from "./ProgressiveDisclosure";

interface MobileLeakCardProps {
  leak: Leak;
  rank: number;
  onViewSolution: () => void;
}

export function MobileLeakCard({ leak, rank, onViewSolution }: MobileLeakCardProps) {
  const severityColor: Record<string, string> = {
    critical: "text-red-400 bg-red-500/10 border-red-500/20",
    high: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };
  const severityBadge = severityColor[leak.severity] || severityColor.low;

  const primaryDetail =
    leak.details?.missedCallsPerMonth
      ? `${leak.details.missedCallsPerMonth} missed calls monthly`
      : leak.details?.lossRate
      ? leak.details.lossRate
      : "Revenue leaking here";

  return (
    <motion.div
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg space-y-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold">
            #{rank}
          </div>
          <div>
            <p className="text-xs text-slate-400">Leak</p>
            <h3 className="text-lg font-semibold text-white">{leak.label}</h3>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${severityBadge}`}>
          {leak.severity}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-black text-white tabular-nums">{formatCurrency(leak.monthlyLoss)}</div>
        <div className="text-sm text-slate-500">/mo</div>
      </div>
      <div className="text-xs text-slate-500 tabular-nums">{formatCurrency(leak.annualLoss)}/year</div>

      <div className="text-sm text-slate-300">{primaryDetail}</div>

      <ProgressiveDisclosure summary="See details">
        <div className="space-y-2 text-slate-200 text-sm">
          {leak.details && Object.entries(leak.details).length > 0 ? (
            Object.entries(leak.details).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-4">
                <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-slate-200">{String(value)}</span>
              </div>
            ))
          ) : (
            <span className="text-slate-400">More details coming soon.</span>
          )}
        </div>
      </ProgressiveDisclosure>

      <button
        onClick={onViewSolution}
        className="w-full py-3 rounded-xl bg-slate-800 text-white font-semibold border border-slate-700 hover:bg-slate-700 transition"
      >
        View Solution →
      </button>
    </motion.div>
  );
}


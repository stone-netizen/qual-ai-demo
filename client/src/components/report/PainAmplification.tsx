/**
 * PainAmplification Component (Redesigned)
 * 
 * Clean, professional financial impact display.
 * No dramatic language, no "DEVASTATING" badges, no alarmist styling.
 */

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/calculations-v2";

interface LossData {
  daily: number;
  weekly: number;
  monthly: number;
  quarterly: number;
  annual: number;
  three_year: number;
}

interface PainAmplificationProps {
  losses: LossData;
}

export function PainAmplification({ losses }: PainAmplificationProps) {
  const periods = [
    { label: "Daily", value: losses.daily, delay: 0.05 },
    { label: "Weekly", value: losses.weekly, delay: 0.1 },
    { label: "Monthly", value: losses.monthly, delay: 0.15, highlight: true },
    { label: "Quarterly", value: losses.quarterly, delay: 0.2 },
    { label: "Annual", value: losses.annual, delay: 0.25, highlight: true },
    { label: "3-Year", value: losses.three_year, delay: 0.3 }
  ];

  return (
    <div className="space-y-4">
      {/* Clean grid of metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {periods.map((period) => (
          <motion.div
            key={period.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: period.delay, duration: 0.3 }}
            className={`p-4 rounded-xl border ${
              period.highlight 
                ? "bg-slate-50 border-slate-300" 
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              {period.label}
            </p>
            <p className={`text-lg font-semibold tabular-nums ${
              period.highlight ? "text-slate-900" : "text-slate-700"
            }`}>
              {formatCurrency(period.value)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Subtle note - no alarmist language */}
      <p className="text-sm text-slate-500">
        Estimates based on current conversion rates and average transaction value. 
        Includes direct revenue opportunity only.
      </p>
    </div>
  );
}

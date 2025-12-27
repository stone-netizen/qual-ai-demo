import { Leak } from "@/utils/calculations";

interface LeakVisualizationProps {
  leaks: Leak[];
}

export function LeakVisualization({ leaks }: LeakVisualizationProps) {
  if (!leaks.length) return null;

  const max = Math.max(...leaks.map((l) => l.monthlyLoss));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h3 className="text-lg font-semibold text-white mb-4">Impact by leak</h3>
      <div className="space-y-3">
        {leaks.map((leak) => {
          const ratio = max > 0 ? leak.monthlyLoss / max : 0;
          return (
            <div key={leak.type} className="space-y-1">
              <div className="flex justify-between text-sm text-slate-300">
                <span>{leak.label}</span>
                <span className="tabular-nums text-slate-400">${leak.monthlyLoss.toLocaleString()}/mo</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  style={{ width: `${Math.max(8, ratio * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


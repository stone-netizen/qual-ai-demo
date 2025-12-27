import { Lightbulb } from "lucide-react";
import { Leak } from "@/utils/calculations";

function getInsightsForLeaks(leaks: Leak[]) {
  const hasAfterHours = leaks.some((l) => l.type === "after-hours");
  const hasMissedCalls = leaks.some((l) => l.type === "missed-calls");
  const hasReactivation = leaks.some((l) => l.type === "reactivation");

  if (hasAfterHours || hasMissedCalls) {
    return { primaryRecommendation: "Add after-hours coverage and answer within 5 minutes to stop the bleeding." };
  }
  if (hasReactivation) {
    return { primaryRecommendation: "Run a 2-week reactivation sprint on leads older than 90 days." };
  }
  return { primaryRecommendation: "Tighten follow-up speed and messaging; then reactivate older leads." };
}

export function OperatorInsights({ leaks }: { leaks: Leak[] }) {
  const insights = getInsightsForLeaks(leaks);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-black border border-white/5 p-8">
        <h3 className="text-xl font-bold text-white mb-6 uppercase italic tracking-tight">
          What This Usually Means
        </h3>

        <div className="space-y-6 text-slate-300">
          <p className="leading-relaxed">
            In most businesses we review, this type of leakage isn&apos;t caused by effort or intent. It&apos;s caused by timing, handoffs, and coverage gaps that are hard to see from inside the operation.
          </p>

          <div>
            <p className="text-white font-bold text-sm uppercase mb-3">Common Failure Patterns:</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong className="text-white">The 5-Minute Window:</strong> Speed to contact drops lead value by 400% after just 10 minutes.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong className="text-white">Weekend Decay:</strong> Leads generated between Friday 5pm and Monday 9am often have a sub-10% booking rate.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong className="text-white">Follow-up Depth:</strong> 80% of sales require 5+ follow-up attempts, yet the average operation stops after 2.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-white/5">
            <p className="text-sm font-medium italic text-slate-400">
              The only way to know if this matters in your case is to verify it against real call and lead data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


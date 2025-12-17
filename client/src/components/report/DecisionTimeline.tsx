/**
 * DecisionTimeline Component
 * 
 * Shows the COST OF WAITING
 * Makes inaction feel expensive without fake urgency tactics
 */

import { formatCurrency } from "@/lib/calculations-v2";

interface DecisionTimelineProps {
  weeklyLoss: number;
  monthlyLoss: number;
}

export function DecisionTimeline({
  weeklyLoss,
  monthlyLoss
}: DecisionTimelineProps) {
  // Calculate escalating costs
  const oneWeekCost = weeklyLoss;
  const oneMonthCost = monthlyLoss;
  const threeMonthCost = monthlyLoss * 3;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        
        <h2 className="text-2xl font-bold mb-8 text-center">
          Cost of Waiting
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          
          {/* Start Today */}
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">If you start today</p>
            <p className="text-3xl font-bold text-green-400">$0</p>
            <p className="text-xs text-slate-400 mt-1">additional loss</p>
          </div>

          {/* Wait 1 Week */}
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">Wait 1 week</p>
            <p className="text-3xl font-bold text-amber-400">
              -{formatCurrency(oneWeekCost, 0).replace('$', '')}
            </p>
            <p className="text-xs text-slate-400 mt-1">lost opportunity</p>
          </div>

          {/* Wait 1 Month */}
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">Wait 1 month</p>
            <p className="text-3xl font-bold text-orange-400">
              -{formatCurrency(oneMonthCost, 0).replace('$', '')}
            </p>
            <p className="text-xs text-slate-400 mt-1">gone forever</p>
          </div>

          {/* Wait 3 Months */}
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">Wait 3 months</p>
            <p className="text-3xl font-bold text-red-400">
              -{formatCurrency(threeMonthCost, 0).replace('$', '')}
            </p>
            <p className="text-xs text-slate-400 mt-1">unrecoverable</p>
          </div>

        </div>

        <div className="text-center">
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            The revenue you lose while "thinking it over" doesn't come back. 
            Every lead that goes to a competitor is gone permanently.
          </p>
        </div>

      </div>

    </section>
  );
}


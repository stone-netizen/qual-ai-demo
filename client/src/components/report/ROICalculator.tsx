/**
 * ROI Calculator Section - LEAK-FOCUSED
 * 
 * Show RECOVERY vs investment, not revenue
 * - "What it costs to plug the leak vs what you'll recover"
 * - Focus on stopping the bleed
 */

import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";

interface ROICalculatorProps {
  monthlyInvestment: number;
  monthlyRecovery: number;
  netRecovery: number;
  roi: number;
  paybackDays: number;
  weekLeak: number;
  monthLeak: number;
  quarterLeak: number;
  yearOneRecovery: number;
}

export function ROICalculator({
  monthlyInvestment,
  monthlyRecovery,
  netRecovery,
  roi,
  paybackDays,
  weekLeak,
  monthLeak,
  quarterLeak,
  yearOneRecovery
}: ROICalculatorProps) {
  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Recovery vs. Investment
          </h2>
          <p className="text-slate-600">
            What it costs to plug the leak vs. what you'll recover
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200">
          
          {/* Main Numbers */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-2">Monthly Investment</p>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900">
                {formatCurrency(monthlyInvestment)}
              </p>
              <p className="text-xs text-slate-500 mt-2">AI receptionist + automation</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-500 mb-2">Monthly Recovery</p>
              <p className="text-3xl sm:text-4xl font-bold text-green-600">
                +{formatCurrency(monthlyRecovery)}
              </p>
              <p className="text-xs text-green-600 mt-2">Opportunities captured back</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-500 mb-2">Net Recovery</p>
              <p className="text-3xl sm:text-4xl font-bold text-green-600">
                +{formatCurrency(netRecovery)}
              </p>
              <p className="text-xs text-slate-500 mt-2">{roi}% return</p>
            </div>

          </div>

          {/* What This Means Callout - RECOVERY framing */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  What Plugging This Leak Means
                </h4>
                <p className="text-blue-800 mb-3">
                  Over the next year, you'll recover approximately{' '}
                  <strong>{formatCurrency(yearOneRecovery)}</strong> that's currently 
                  slipping through the cracks. That's money that could:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Hire another staff member</li>
                  <li>• Invest in new equipment or technology</li>
                  <li>• Expand your service offerings</li>
                  <li>• Actually take a vacation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payback Timeline */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-slate-900 mb-4">Recovery Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Day 1-{paybackDays}</span>
                <span className="text-sm font-medium text-slate-900">Investment recovered</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Day {paybackDays + 1}-30</span>
                <span className="text-sm font-medium text-green-600">
                  Pure recovery: ~{formatCurrency(netRecovery)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Month 2-12</span>
                <span className="text-sm font-medium text-green-600">
                  Cumulative recovery: {formatCurrency(yearOneRecovery)}
                </span>
              </div>
            </div>
          </div>

          {/* Cost of Delay - SHOW LEAKAGE NOT REVENUE */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h4 className="font-semibold text-red-900 mb-4">Cost of the Leak Over Time</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">$0</p>
                <p className="text-xs text-slate-600 mt-1">If you fix it today</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">
                  -{formatCurrency(weekLeak)}
                </p>
                <p className="text-xs text-slate-600 mt-1">Wait 1 week</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  -{formatCurrency(monthLeak)}
                </p>
                <p className="text-xs text-slate-600 mt-1">Wait 1 month</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-red-700">
                  -{formatCurrency(quarterLeak)}
                </p>
                <p className="text-xs text-slate-600 mt-1">Wait 3 months</p>
              </div>
            </div>
            <p className="text-sm text-center text-red-700 mt-4">
              Every week the leak continues, that's money you'll never get back
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

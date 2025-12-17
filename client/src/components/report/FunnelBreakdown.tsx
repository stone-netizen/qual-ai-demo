/**
 * Funnel Breakdown Section - LEAK-FOCUSED
 * 
 * Show LOSSES at each stage, not revenue
 * - "Where leads are slipping through"
 * - Focus on lost leads and recovery potential
 */

import { AlertCircle, CheckCircle } from "lucide-react";
import { type FunnelStage, formatCurrency } from "@/lib/calculations-v2";

interface FunnelBreakdownProps {
  currentFunnel: FunnelStage[];
  optimizedFunnel: FunnelStage[];
  leadsPerMonth: number;
  avgValue: number;
  totalLeakage: number;
  recoverable: number;
  leadsLost: number;
  leadsRecoverable: number;
  biggestBottleneck?: {
    stageName: string;
    dropoffPercent: number;
    leadsLost: number;
    leakValue: number;
  };
}

/**
 * SIMPLIFIED: Per-stage losses show lead counts only.
 * Dollar amounts only shown at total summary level for accuracy.
 */

function LeakStage({ 
  stage, 
  previousStage,
  showLoss = true
}: { 
  stage: FunnelStage;
  previousStage?: FunnelStage;
  showLoss?: boolean;
}) {
  const lost = previousStage ? previousStage.count - stage.count : 0;
  const dropPercent = previousStage && previousStage.count > 0 
    ? Math.round((1 - stage.count / previousStage.count) * 100)
    : 0;

  return (
    <div className={`bg-slate-50 rounded-lg p-4 ${showLoss && lost > 0 ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-slate-900">{stage.name}</span>
        <span className="text-2xl font-bold text-slate-900">{stage.count.toLocaleString()}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 mb-3">
        <div 
          className={`h-3 rounded-full ${lost > 0 ? 'bg-orange-500' : 'bg-slate-400'}`}
          style={{ width: `${stage.percentage}%` }}
        />
      </div>
      
      {/* THE LOSS - Show leads only, no inflated dollar amounts per stage */}
      {showLoss && lost > 0 && (
        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-700">Lost at this stage:</span>
            <span className="font-bold text-red-700">{lost} leads</span>
          </div>
          <p className="text-xs text-red-600 mt-1">
            {dropPercent}% drop-off rate
          </p>
        </div>
      )}
    </div>
  );
}

function RecoveryStage({ 
  stage,
  currentStage
}: { 
  stage: FunnelStage;
  currentStage: FunnelStage;
}) {
  const recovered = stage.count - currentStage.count;
  const improvementPercent = currentStage.count > 0 
    ? Math.round((recovered / currentStage.count) * 100)
    : 0;

  return (
    <div className={`bg-green-50 rounded-lg p-4 ${recovered > 0 ? 'border-l-4 border-l-green-500' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-slate-900">{stage.name}</span>
        <span className="text-2xl font-bold text-slate-900">{stage.count.toLocaleString()}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 mb-3">
        <div 
          className="h-3 rounded-full bg-green-500"
          style={{ width: `${stage.percentage}%` }}
        />
      </div>
      
      {/* THE RECOVERY - Show leads only, no per-stage dollar amounts */}
      {recovered > 0 && (
        <div className="bg-green-100 rounded-lg p-3 border border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">Recovered:</span>
            <span className="font-bold text-green-700">+{recovered} leads</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            +{improvementPercent}% improvement
          </p>
        </div>
      )}
    </div>
  );
}

export function FunnelBreakdown({
  currentFunnel,
  optimizedFunnel,
  leadsPerMonth,
  avgValue,
  totalLeakage,
  recoverable,
  leadsLost,
  leadsRecoverable,
  biggestBottleneck
}: FunnelBreakdownProps) {

  // Calculate bottleneck if not provided
  // Use conservative 10% expected conversion for leak value estimate
  const CONSERVATIVE_CONVERSION = 0.10;
  
  const bottleneck = biggestBottleneck || (() => {
    let maxDropoff = { index: 1, percent: 0, lost: 0 };
    for (let i = 1; i < currentFunnel.length; i++) {
      const prev = currentFunnel[i - 1];
      const curr = currentFunnel[i];
      const dropoff = prev.count > 0 ? Math.round((1 - curr.count / prev.count) * 100) : 0;
      if (dropoff > maxDropoff.percent) {
        maxDropoff = { index: i, percent: dropoff, lost: prev.count - curr.count };
      }
    }
    const stageName = `${currentFunnel[maxDropoff.index - 1]?.name || 'Leads'} → ${currentFunnel[maxDropoff.index]?.name || 'Contacted'}`;
    return {
      stageName,
      dropoffPercent: maxDropoff.percent,
      leadsLost: maxDropoff.lost,
      leakValue: Math.round(maxDropoff.lost * avgValue * CONSERVATIVE_CONVERSION)
    };
  })();

  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Where Leads Are Slipping Through
          </h2>
          <p className="text-slate-600">
            Every stage shows how many potential customers you're losing
          </p>
        </div>

        {/* Biggest Bottleneck Callout */}
        {bottleneck && bottleneck.dropoffPercent > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <p className="font-semibold text-red-900 mb-2 text-lg">
              🔴 Biggest Leak: {bottleneck.stageName}
            </p>
            <p className="text-red-800 mb-3">
              You're losing <strong>{bottleneck.dropoffPercent}%</strong> of leads at this stage. 
              That's <strong>{bottleneck.leadsLost} potential customers</strong> every month who never move forward.
            </p>
            <p className="text-sm text-red-700 font-medium">
              Estimated impact: <strong>{formatCurrency(bottleneck.leakValue)}/month</strong> in lost opportunity
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Current - Focus on LOSSES */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Current Lead Leakage
            </h3>
            
            <div className="space-y-4">
              {currentFunnel.map((stage, i) => (
                <LeakStage 
                  key={i}
                  stage={stage}
                  previousStage={i > 0 ? currentFunnel[i - 1] : undefined}
                  showLoss={i > 0}
                />
              ))}
            </div>

            {/* Total Current Leakage */}
            <div className="mt-6 bg-red-50 border-2 border-red-500 rounded-xl p-6">
              <p className="text-sm text-red-700 font-medium mb-1">Total Monthly Leakage</p>
              <p className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">
                {formatCurrency(totalLeakage)}
              </p>
              <p className="text-sm text-red-600">
                {leadsLost} potential customers falling through the cracks
              </p>
            </div>
          </div>

          {/* Optimized - Show RECOVERY not revenue */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              With AI-Powered Follow-Up
            </h3>
            
            <div className="space-y-4">
              {optimizedFunnel.map((stage, i) => (
                <RecoveryStage 
                  key={i}
                  stage={stage}
                  currentStage={currentFunnel[i]}
                />
              ))}
            </div>

            {/* Total Recovery */}
            <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-6">
              <p className="text-sm text-green-700 font-medium mb-1">Recoverable Monthly</p>
              <p className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">
                {formatCurrency(recoverable)}
              </p>
              <p className="text-sm text-green-600">
                {leadsRecoverable} more customers captured per month
              </p>
            </div>
          </div>

        </div>

        {/* The Math - NO REVENUE CLAIMS */}
        <div className="mt-12 bg-slate-900 rounded-xl p-6 sm:p-8 text-white">
          <h4 className="text-xl font-bold mb-6 text-center">The Leak Math</h4>
          
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-2">Leads Currently Lost</p>
              <p className="text-3xl sm:text-4xl font-bold text-red-400 mb-2">{leadsLost}</p>
              <p className="text-xs text-slate-400">Per month through gaps</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400 mb-2">Leads Recoverable</p>
              <p className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">{leadsRecoverable}</p>
              <p className="text-xs text-slate-400">With AI automation</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400 mb-2">Monthly Opportunity</p>
              <p className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">{formatCurrency(recoverable)}</p>
              <p className="text-xs text-slate-400">At {formatCurrency(avgValue)}/customer</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <p className="text-sm text-slate-300">
              These numbers are based on your stated lead volume ({leadsPerMonth}/month) 
              and your average customer value ({formatCurrency(avgValue)}). The actual captured value 
              depends on your close rates and implementation quality.
            </p>
          </div>
        </div>

        {/* 60% Recovery Explanation - WHY NOT 100%? */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <h5 className="font-semibold text-amber-900 mb-2">Why 60% Recovery (Not 100%)?</h5>
              <p className="text-sm text-amber-800 mb-3">
                Our projections are conservative and realistic. Not all lost leads would have converted 
                even with perfect follow-up:
              </p>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Some leads are unqualified or just researching</li>
                <li>• Some have budget or timing issues beyond your control</li>
                <li>• Some would never convert regardless of response speed</li>
              </ul>
              <p className="text-xs text-amber-600 mt-3">
                The 60% recovery estimate reflects real-world performance from AI-assisted practices.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

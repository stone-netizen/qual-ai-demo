/**
 * CompetitiveThreat Component
 * 
 * Creates urgency through real-time loss visualization
 * Shows what's happening RIGHT NOW while they read the report
 */

import { Phone, Clock, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";

interface CompetitiveThreatProps {
  missedCallsPerDay: number;
  avgValuePerCall: number;
  responseTimeHours: number;
  weeklyLoss: number;
  competitorCaptureDaily: number;
}

export function CompetitiveThreat({
  missedCallsPerDay,
  avgValuePerCall,
  responseTimeHours,
  weeklyLoss,
  competitorCaptureDaily
}: CompetitiveThreatProps) {
  // Calculate revenue lost from today's missed calls
  const todayMissedRevenue = Math.round(missedCallsPerDay * avgValuePerCall * 0.6);
  
  // Response time impact (percentage of leads lost)
  const leadsLostPercent = responseTimeHours >= 2 ? 75 : responseTimeHours >= 0.5 ? 50 : 25;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 bg-red-50/30 rounded-2xl">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          While You Read This
        </h2>
        <p className="text-slate-600">
          Here's what's happening in real-time
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Card 1 - Missed Calls Today */}
        <div className="bg-white border border-red-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">~{Math.round(missedCallsPerDay)}</p>
          <p className="text-sm text-slate-600">Missed calls so far today</p>
          <p className="text-xs text-red-600 font-medium mt-2">
            ≈ {formatCurrency(todayMissedRevenue)} in lost revenue
          </p>
        </div>

        {/* Card 2 - Response Time */}
        <div className="bg-white border border-orange-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">
            {responseTimeHours >= 24 ? 'Next day' : `${responseTimeHours}+ hrs`}
          </p>
          <p className="text-sm text-slate-600">Average response time</p>
          <p className="text-xs text-orange-600 font-medium mt-2">
            {leadsLostPercent}% of leads are already gone
          </p>
        </div>

        {/* Card 3 - Competitor Capture */}
        <div className="bg-white border border-green-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">
            {formatCurrency(competitorCaptureDaily)}
          </p>
          <p className="text-sm text-slate-600">Competitors captured today</p>
          <p className="text-xs text-green-600 font-medium mt-2">
            That could've been yours
          </p>
        </div>

      </div>

      {/* Bottom urgency stat */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-600">
          Every week you wait to fix this costs approximately{' '}
          <span className="font-bold text-slate-900">{formatCurrency(weeklyLoss)}</span>
        </p>
      </div>

    </section>
  );
}


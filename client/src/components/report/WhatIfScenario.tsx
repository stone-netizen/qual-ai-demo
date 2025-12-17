/**
 * WhatIfScenario Component (Redesigned)
 * 
 * Professional scenario builder with clean styling.
 * Uses INCREMENTAL improvement model.
 */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/calculations-v2";

interface WhatIfScenarioProps {
  baseMonthlyRevenue: number;
  currentContactRate: number;
  currentBookingRate: number;
  showRate: number;
  closeRate: number;
  avgValue: number;
  leadsPerMonth: number;
  missedCallsPerWeek: number;
}

// Realistic caps
const MAX_TOTAL_IMPROVEMENT_PERCENT = 80;
const MAX_SINGLE_FACTOR_PERCENT = 40;

export function WhatIfScenario({
  baseMonthlyRevenue,
  avgValue,
  missedCallsPerWeek
}: WhatIfScenarioProps) {
  const [captureBoost, setCaptureBoost] = useState(0);
  const [responseImprovement, setResponseImprovement] = useState(0);
  const [neverMissCall, setNeverMissCall] = useState(false);

  const projection = useMemo(() => {
    if (!baseMonthlyRevenue || baseMonthlyRevenue <= 0) {
      return { revenue: 0, increase: 0, percentIncrease: 0 };
    }

    let incrementalGain = 0;

    // Lead capture improvement
    const leadCaptureGain = baseMonthlyRevenue * (MAX_SINGLE_FACTOR_PERCENT / 100) * (captureBoost / 100);
    incrementalGain += leadCaptureGain;

    // Response time improvement
    const responseBoosts = [0, 0.05, 0.10, 0.15, 0.20];
    const responseGain = baseMonthlyRevenue * (responseBoosts[responseImprovement] || 0);
    incrementalGain += responseGain;

    // Missed call recovery
    if (neverMissCall && missedCallsPerWeek > 0) {
      const recoveredCalls = missedCallsPerWeek * 4.33 * 0.50;
      const conversionRate = 0.15;
      const callRevenue = recoveredCalls * conversionRate * avgValue;
      incrementalGain += callRevenue;
    }

    const maxAllowedGain = baseMonthlyRevenue * (MAX_TOTAL_IMPROVEMENT_PERCENT / 100);
    const cappedGain = Math.min(incrementalGain, maxAllowedGain);

    const newRevenue = baseMonthlyRevenue + cappedGain;
    const percentIncrease = (cappedGain / baseMonthlyRevenue) * 100;

    return {
      revenue: newRevenue,
      increase: cappedGain,
      percentIncrease: isFinite(percentIncrease) ? percentIncrease : 0
    };
  }, [captureBoost, responseImprovement, neverMissCall, baseMonthlyRevenue, missedCallsPerWeek, avgValue]);

  const responseLabels = ["Current", "1 hour", "30 min", "5 min", "Instant"];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Scenario Builder</h2>
        <p className="text-slate-600">Explore how different improvements could impact revenue</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Lead Capture */}
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="font-medium text-slate-900 mb-3">Lead Capture Improvement</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Improvement level</span>
                  <span className="font-medium text-slate-700">
                    {captureBoost === 0 ? "No change" : `+${captureBoost}%`}
                  </span>
                </div>
                <Slider
                  value={[captureBoost]}
                  onValueChange={(val) => setCaptureBoost(val[0])}
                  min={0}
                  max={100}
                  step={10}
                />
                <p className="text-xs text-slate-400">
                  Via AI chat, instant follow-up
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="font-medium text-slate-900 mb-3">Response Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Target response</span>
                  <span className="font-medium text-slate-700">
                    {responseLabels[responseImprovement]}
                  </span>
                </div>
                <Slider
                  value={[responseImprovement]}
                  onValueChange={(val) => setResponseImprovement(val[0])}
                  min={0}
                  max={4}
                  step={1}
                />
                <p className="text-xs text-slate-400">
                  Faster response typically improves conversion
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Missed Calls */}
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">After-Hours Coverage</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Currently missing ~{missedCallsPerWeek} calls/week
                  </p>
                </div>
                <Switch
                  checked={neverMissCall}
                  onCheckedChange={setNeverMissCall}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="p-6 space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">
                Projected Monthly Revenue
              </p>
              <motion.div
                key={projection.revenue}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-4xl font-bold text-slate-900 tabular-nums"
              >
                {formatCurrency(projection.revenue)}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="text-xs font-medium text-slate-500 uppercase mb-1">
                  Increase
                </p>
                <p className={`text-xl font-semibold tabular-nums ${
                  projection.increase > 0 ? "text-emerald-600" : "text-slate-400"
                }`}>
                  {projection.increase > 0 ? `+${formatCurrency(projection.increase)}` : "$0"}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="text-xs font-medium text-slate-500 uppercase mb-1">
                  Growth
                </p>
                <p className={`text-xl font-semibold ${
                  projection.percentIncrease > 0 ? "text-blue-600" : "text-slate-400"
                }`}>
                  {projection.percentIncrease > 0 
                    ? `+${projection.percentIncrease.toFixed(0)}%` 
                    : "0%"
                  }
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Current</span>
                <span className="text-slate-700 tabular-nums">{formatCurrency(baseMonthlyRevenue)}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  animate={{ 
                    width: `${Math.min(100, (projection.revenue / (baseMonthlyRevenue * 1.8)) * 100)}%` 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Annual */}
            <div className="bg-slate-900 text-white rounded-lg p-4 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                Annual Potential
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {formatCurrency(projection.revenue * 12)}
              </p>
            </div>

            {projection.percentIncrease >= MAX_TOTAL_IMPROVEMENT_PERCENT && (
              <p className="text-xs text-slate-400 text-center">
                *Capped at {MAX_TOTAL_IMPROVEMENT_PERCENT}% for realistic estimates
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400">
        Projections are estimates based on adjustable assumptions. Actual results depend on 
        implementation quality and market conditions.
      </p>
    </section>
  );
}

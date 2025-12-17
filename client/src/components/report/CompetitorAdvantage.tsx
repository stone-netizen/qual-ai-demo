/**
 * CompetitorAdvantage Component (Redesigned)
 * 
 * Clean comparison table without dramatic language.
 * Professional, data-driven presentation.
 */

import { motion } from "framer-motion";
import { type CompetitorComparison } from "@/lib/calculations-v2";
import { Card, CardContent } from "@/components/ui/card";

interface CompetitorAdvantageProps {
  comparisons: CompetitorComparison[];
  monthlyLeadsLost: number;
  competitorsCapturedValue: number;
}

export function CompetitorAdvantage({ 
  comparisons
}: CompetitorAdvantageProps) {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Industry Comparison</h2>
        <p className="text-slate-600">How your metrics compare to AI-enhanced practices</p>
      </div>

      {/* Comparison Table */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-100 bg-slate-50">
            <div className="text-sm font-medium text-slate-600">Metric</div>
            <div className="text-sm font-medium text-slate-600 text-center">Current</div>
            <div className="text-sm font-medium text-blue-600 text-center">With AI</div>
          </div>
          
          {/* Table rows */}
          <div className="divide-y divide-slate-100">
            {comparisons.map((comparison, index) => (
              <motion.div
                key={comparison.metric}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-3 gap-4 p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="text-sm font-medium text-slate-700">
                  {comparison.metric}
                </div>
                <div className="text-sm text-slate-600 text-center">
                  {comparison.yours}
                </div>
                <div className="text-sm text-blue-600 font-medium text-center">
                  {comparison.competitors}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brief context note */}
      <p className="text-sm text-slate-500">
        Comparison based on industry benchmarks for practices using AI-powered lead engagement.
        Individual results vary based on implementation and market factors.
      </p>
    </section>
  );
}

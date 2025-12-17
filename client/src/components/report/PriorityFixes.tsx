import { useMemo } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  ChevronRight,
  X,
  Check,
  Info
} from 'lucide-react';
import { formatCurrency, type LeakItem } from '@/lib/calculations-v2';
import { getIndustryConfig } from '@/lib/industry-config';

interface PriorityFixesProps {
  leaks: LeakItem[];
  avgValue: number;
  totalMonthlyLoss: number;
  businessType?: string;
}

export function PriorityFixes({ 
  leaks, 
  avgValue, 
  totalMonthlyLoss,
  businessType = 'other'
}: PriorityFixesProps) {
  // Get industry configuration
  const config = useMemo(() => getIndustryConfig(businessType), [businessType]);
  
  // Get primary color based on industry
  const getPrimaryColors = () => {
    switch (businessType) {
      case 'medspa':
        return {
          border: 'border-l-purple-500',
          badge: 'bg-purple-100 text-purple-600',
          insight: 'bg-purple-50 border-purple-200',
          insightText: 'text-purple-800'
        };
      case 'dental':
        return {
          border: 'border-l-blue-500',
          badge: 'bg-blue-100 text-blue-600',
          insight: 'bg-blue-50 border-blue-200',
          insightText: 'text-blue-800'
        };
      case 'chiro':
        return {
          border: 'border-l-green-500',
          badge: 'bg-green-100 text-green-600',
          insight: 'bg-green-50 border-green-200',
          insightText: 'text-green-800'
        };
      case 'physio':
        return {
          border: 'border-l-indigo-500',
          badge: 'bg-indigo-100 text-indigo-600',
          insight: 'bg-indigo-50 border-indigo-200',
          insightText: 'text-indigo-800'
        };
      default:
        return {
          border: 'border-l-red-500',
          badge: 'bg-red-100 text-red-600',
          insight: 'bg-slate-50 border-slate-200',
          insightText: 'text-slate-800'
        };
    }
  };

  const colors = getPrimaryColors();
  
  // Use industry-specific fixes from config, mapped with calculated values
  const priorityFixes = useMemo(() => {
    const industryFixes = config.priorityFixes;
    
    // Distribute the total loss across the 3 priority fixes
    // Typically: 45%, 35%, 20% distribution
    const distributions = [0.45, 0.35, 0.20];
    
    return industryFixes.map((fix, index) => ({
      ...fix,
      recoveryValue: Math.round(totalMonthlyLoss * distributions[index]),
      percentage: Math.round(distributions[index] * 100)
    }));
  }, [config.priorityFixes, totalMonthlyLoss]);

  // Calculate total recovery
  const totalRecovery = priorityFixes.reduce((sum, fix) => sum + fix.recoveryValue, 0);

  return (
    <section className="py-16 px-4 sm:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Total */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Your 3 Highest-Impact Fixes
          </h2>
          <p className="text-slate-600 mb-4">
            Ranked by recovery potential for {config.displayName.toLowerCase()} practices
          </p>
          
          {/* Total Recovery Callout */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm">
            <span className="text-sm text-slate-500">Total Recoverable:</span>
            <span className="text-xl font-bold text-green-600">{formatCurrency(totalRecovery)}/month</span>
          </div>
        </div>

        <div className="space-y-6">
          {priorityFixes.map((fix, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl border-l-4 ${colors.border} p-6 sm:p-8 shadow-sm`}
            >
              
              {/* Header - Show RECOVERY potential + percentage */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${colors.badge} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-slate-900">
                        {fix.name}
                      </h3>
                      <span className={`text-xs ${colors.badge} px-2 py-0.5 rounded-full`}>
                        {fix.percentage}% of loss
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {fix.description}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right ml-14 sm:ml-0">
                  <p className="text-sm text-slate-500 mb-1">Recovery Potential</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(fix.recoveryValue)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">per month</p>
                </div>
              </div>

              {/* Current State vs After */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <p className="text-sm font-medium text-red-800 mb-3">What You're Losing</p>
                  <ul className="space-y-2 text-sm text-red-700">
                    {fix.losses.map((loss, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{loss}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <p className="text-sm font-medium text-green-800 mb-3">What You'll Capture</p>
                  <ul className="space-y-2 text-sm text-green-700">
                    {fix.recovery.map((gain, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{gain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Industry-Specific Insight */}
              <div className={`${colors.insight} rounded-lg p-4 border mb-4`}>
                <div className="flex items-start gap-3">
                  <Info className={`w-5 h-5 ${colors.insightText} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-sm font-medium ${colors.insightText} mb-2`}>
                      {config.displayName} Industry Insight
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-slate-500 mb-1">Key Metric</p>
                        <p className={`font-medium ${colors.insightText}`}>{fix.industryInsight.metric}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Impact</p>
                        <p className={`font-medium ${colors.insightText}`}>{fix.industryInsight.impact}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Benchmark</p>
                        <p className={`font-medium ${colors.insightText}`}>{fix.industryInsight.benchmark}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-700 mb-3">Implementation Timeline</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      1
                    </div>
                    <span className="text-sm text-slate-600">Day 1: Activate</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      7
                    </div>
                    <span className="text-sm text-slate-600">Week 1: Results</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">
                      30
                    </div>
                    <span className="text-sm text-slate-600">Month 1: Full ROI</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200 text-center">
          <p className="text-slate-600 mb-2">
            Combined, these 3 fixes can recover up to
          </p>
          <p className="text-3xl font-bold text-green-600 mb-1">
            {formatCurrency(totalRecovery)}/month
          </p>
          <p className="text-sm text-slate-500">
            or {formatCurrency(totalRecovery * 12)}/year for your {config.displayName.toLowerCase()} practice
          </p>
        </div>
      </div>
    </section>
  );
}

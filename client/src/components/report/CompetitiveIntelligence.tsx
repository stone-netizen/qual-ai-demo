/**
 * Competitive Intelligence Section - INDUSTRY-SPECIFIC
 * 
 * Show LEAKAGE comparison with industry-specific benchmarks
 * - "Your leakage vs industry leakage"
 * - Focus on gaps and recovery opportunity
 * - Dynamic colors based on industry
 */

import { useMemo } from 'react';
import { TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";
import { getIndustryConfig } from "@/lib/industry-config";

interface MetricData {
  responseTime: number; // in minutes
  contactRate: number;
  bookingRate: number;
  showRate: number;
  closeRate: number;
  leakage: number; // Monthly leakage, not revenue
}

interface CompetitiveIntelligenceProps {
  businessName: string;
  city: string;
  businessType: string;
  yourMetrics: MetricData;
  industryAvg: MetricData;
  topPerformers: MetricData;
}

function MetricBar({ 
  label, 
  value, 
  max, 
  color,
  suffix = "",
}: { 
  label: string; 
  value: number; 
  max: number; 
  color: "red" | "yellow" | "green" | "gray" | "purple" | "blue" | "indigo";
  suffix?: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses: Record<string, string> = {
    red: "bg-red-500",
    yellow: "bg-amber-500",
    green: "bg-green-500",
    gray: "bg-slate-400",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500"
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-900">{value}{suffix}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function getResponseTimeColor(minutes: number): "red" | "yellow" | "green" {
  if (minutes <= 5) return "green";
  if (minutes <= 30) return "yellow";
  return "red";
}

function getPercentageColor(value: number, thresholds: { good: number; ok: number }): "red" | "yellow" | "green" {
  if (value >= thresholds.good) return "green";
  if (value >= thresholds.ok) return "yellow";
  return "red";
}

export function CompetitiveIntelligence({
  businessName,
  city,
  businessType,
  yourMetrics,
  industryAvg,
  topPerformers
}: CompetitiveIntelligenceProps) {
  // Get industry configuration
  const config = useMemo(() => getIndustryConfig(businessType), [businessType]);
  
  const leakageGap = yourMetrics.leakage - topPerformers.leakage;

  // Get industry-specific colors
  const getColors = () => {
    switch (businessType) {
      case 'medspa':
        return {
          yourBorder: 'border-purple-500',
          yourBadgeBg: 'bg-purple-500',
          yourLabelBg: 'bg-purple-900',
          topGradient: 'from-purple-50 to-pink-50',
          topBorder: 'border-purple-200',
          topBadgeBg: 'bg-purple-600',
          topBottomBorder: 'border-purple-200',
          topLabel: 'text-purple-700',
          topValue: 'text-purple-800',
          gapBorder: 'border-l-purple-500'
        };
      case 'dental':
        return {
          yourBorder: 'border-blue-500',
          yourBadgeBg: 'bg-blue-500',
          yourLabelBg: 'bg-blue-900',
          topGradient: 'from-blue-50 to-cyan-50',
          topBorder: 'border-blue-200',
          topBadgeBg: 'bg-blue-600',
          topBottomBorder: 'border-blue-200',
          topLabel: 'text-blue-700',
          topValue: 'text-blue-800',
          gapBorder: 'border-l-blue-500'
        };
      case 'chiro':
        return {
          yourBorder: 'border-green-500',
          yourBadgeBg: 'bg-green-500',
          yourLabelBg: 'bg-green-900',
          topGradient: 'from-green-50 to-emerald-50',
          topBorder: 'border-green-200',
          topBadgeBg: 'bg-green-600',
          topBottomBorder: 'border-green-200',
          topLabel: 'text-green-700',
          topValue: 'text-green-800',
          gapBorder: 'border-l-green-500'
        };
      case 'physio':
        return {
          yourBorder: 'border-indigo-500',
          yourBadgeBg: 'bg-indigo-500',
          yourLabelBg: 'bg-indigo-900',
          topGradient: 'from-indigo-50 to-violet-50',
          topBorder: 'border-indigo-200',
          topBadgeBg: 'bg-indigo-600',
          topBottomBorder: 'border-indigo-200',
          topLabel: 'text-indigo-700',
          topValue: 'text-indigo-800',
          gapBorder: 'border-l-indigo-500'
        };
      default:
        return {
          yourBorder: 'border-slate-900',
          yourBadgeBg: 'bg-slate-900',
          yourLabelBg: 'bg-slate-900',
          topGradient: 'from-green-50 to-emerald-50',
          topBorder: 'border-green-200',
          topBadgeBg: 'bg-green-600',
          topBottomBorder: 'border-green-200',
          topLabel: 'text-green-700',
          topValue: 'text-green-800',
          gapBorder: 'border-l-red-500'
        };
    }
  };

  const colors = getColors();

  // Industry-specific metric labels
  const getMetricLabels = () => {
    switch (businessType) {
      case 'medspa':
        return {
          contactRate: 'Consultation Rate',
          bookingRate: 'Booking Rate',
          showRate: 'Consultation Show Rate'
        };
      case 'dental':
        return {
          contactRate: 'Contact Rate',
          bookingRate: 'Appointment Rate',
          showRate: 'Show Rate'
        };
      case 'chiro':
        return {
          contactRate: 'Contact Rate',
          bookingRate: 'Booking Rate',
          showRate: 'First Visit Rate'
        };
      case 'physio':
        return {
          contactRate: 'Referral Contact Rate',
          bookingRate: 'Scheduling Rate',
          showRate: 'Session Show Rate'
        };
      default:
        return {
          contactRate: 'Contact Rate',
          bookingRate: 'Booking Rate',
          showRate: 'Show Rate'
        };
    }
  };

  const metricLabels = getMetricLabels();

  return (
    <section className="py-16 px-4 sm:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Your Lead Response Performance
          </h2>
          <p className="text-slate-600">
            Compared to {config.displayName.toLowerCase()} practices in {city}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Your Performance */}
          <div className={`bg-white rounded-xl p-6 sm:p-8 border-2 ${colors.yourBorder} relative`}>
            <div className={`absolute -top-3 left-4 ${colors.yourLabelBg} text-white text-xs font-bold px-3 py-1 rounded`}>
              YOUR PRACTICE
            </div>
            <h3 className="font-semibold text-slate-900 mb-6 truncate">{businessName}</h3>
            
            <div className="space-y-4">
              <MetricBar 
                label="Response Time" 
                value={yourMetrics.responseTime} 
                max={300} 
                color={getResponseTimeColor(yourMetrics.responseTime)}
                suffix=" min"
              />
              <MetricBar 
                label={metricLabels.contactRate}
                value={yourMetrics.contactRate} 
                max={100} 
                color={getPercentageColor(yourMetrics.contactRate, { good: 70, ok: 50 })}
                suffix="%"
              />
              <MetricBar 
                label={metricLabels.bookingRate}
                value={yourMetrics.bookingRate} 
                max={100} 
                color={getPercentageColor(yourMetrics.bookingRate, { good: 55, ok: 40 })}
                suffix="%"
              />
              <MetricBar 
                label={metricLabels.showRate}
                value={yourMetrics.showRate} 
                max={100} 
                color={getPercentageColor(yourMetrics.showRate, { good: 80, ok: 65 })}
                suffix="%"
              />
            </div>

            {/* THE KEY METRIC - Overall conversion rate for fair comparison */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Overall Conversion Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {Math.round((yourMetrics.contactRate / 100) * (yourMetrics.bookingRate / 100) * (yourMetrics.showRate / 100) * (yourMetrics.closeRate / 100) * 100)}%
              </p>
              <p className="text-xs text-slate-500 mt-1">Lead to {config.language.customer}</p>
            </div>
          </div>

          {/* Industry Average */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 relative">
            <div className="absolute -top-3 left-4 bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded">
              {config.displayName.toUpperCase()} AVG
            </div>
            <h3 className="font-semibold text-slate-700 mb-6">Typical Practice</h3>
            
            <div className="space-y-4">
              <MetricBar 
                label="Response Time" 
                value={industryAvg.responseTime} 
                max={300} 
                color="gray"
                suffix=" min"
              />
              <MetricBar 
                label={metricLabels.contactRate}
                value={industryAvg.contactRate} 
                max={100} 
                color="gray"
                suffix="%"
              />
              <MetricBar 
                label={metricLabels.bookingRate}
                value={industryAvg.bookingRate} 
                max={100} 
                color="gray"
                suffix="%"
              />
              <MetricBar 
                label={metricLabels.showRate}
                value={industryAvg.showRate} 
                max={100} 
                color="gray"
                suffix="%"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Overall Conversion Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-700">
                {Math.round((industryAvg.contactRate / 100) * (industryAvg.bookingRate / 100) * (industryAvg.showRate / 100) * (industryAvg.closeRate / 100) * 100)}%
              </p>
              <p className="text-xs text-slate-500 mt-1">Industry average</p>
            </div>
          </div>

          {/* Top Performers */}
          <div className={`bg-gradient-to-br ${colors.topGradient} rounded-xl p-6 sm:p-8 border ${colors.topBorder} relative`}>
            <div className={`absolute -top-3 left-4 ${colors.topBadgeBg} text-white text-xs font-bold px-3 py-1 rounded`}>
              TOP 10%
            </div>
            <h3 className="font-semibold text-slate-900 mb-6">Best-in-Class</h3>
            
            <div className="space-y-4">
              <MetricBar 
                label="Response Time" 
                value={topPerformers.responseTime} 
                max={300} 
                color="green"
                suffix=" min"
              />
              <MetricBar 
                label={metricLabels.contactRate}
                value={topPerformers.contactRate} 
                max={100} 
                color="green"
                suffix="%"
              />
              <MetricBar 
                label={metricLabels.bookingRate}
                value={topPerformers.bookingRate} 
                max={100} 
                color="green"
                suffix="%"
              />
              <MetricBar 
                label={metricLabels.showRate}
                value={topPerformers.showRate} 
                max={100} 
                color="green"
                suffix="%"
              />
            </div>

            <div className={`mt-8 pt-6 border-t ${colors.topBottomBorder}`}>
              <p className={`text-sm ${colors.topLabel} mb-1`}>Overall Conversion Rate</p>
              <p className={`text-2xl sm:text-3xl font-bold ${colors.topValue}`}>
                {Math.round((topPerformers.contactRate / 100) * (topPerformers.bookingRate / 100) * (topPerformers.showRate / 100) * (topPerformers.closeRate / 100) * 100)}%
              </p>
              <p className={`text-xs ${colors.topLabel} mt-1`}>Best-in-class</p>
            </div>
          </div>

        </div>

        {/* The Gap - FOCUS ON CONVERSION RATE GAP */}
        <div className={`bg-white rounded-xl p-6 sm:p-8 border-l-4 ${colors.gapBorder}`}>
          <div className="flex items-start gap-4">
            <TrendingDown className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              {(() => {
                const yourConversion = Math.round((yourMetrics.contactRate / 100) * (yourMetrics.bookingRate / 100) * (yourMetrics.showRate / 100) * (yourMetrics.closeRate / 100) * 100);
                const topConversion = Math.round((topPerformers.contactRate / 100) * (topPerformers.bookingRate / 100) * (topPerformers.showRate / 100) * (topPerformers.closeRate / 100) * 100);
                const conversionGap = topConversion - yourConversion;
                
                return (
                  <>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Your Conversion Gap
                    </h4>
                    <p className="text-slate-700 mb-4">
                      You're converting at <strong className="text-red-600">{yourConversion}%</strong> while 
                      top {config.displayName.toLowerCase()} practices in {city} convert at <strong className="text-green-600">{topConversion}%</strong>.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-sm text-slate-600 mb-2">
                        <strong>Gap Analysis:</strong>
                      </p>
                      <p className="text-2xl font-bold text-red-600 mb-1">
                        +{conversionGap} percentage points
                      </p>
                      <p className="text-xs text-slate-500">
                        Potential improvement to match best-in-class {config.language.customerPlural} conversion
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

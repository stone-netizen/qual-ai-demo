import { useState, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  PhoneOff, 
  TrendingDown, 
  DollarSign,
  Moon,
  Clock,
  AlertCircle,
  Activity,
  Users,
  AlertTriangle
} from 'lucide-react';
import { formatCurrency } from '@/lib/calculations-v2';
import { getIndustryConfig, type IndustryType } from '@/lib/industry-config';

interface ExecutiveSummaryProps {
  businessName: string;
  city: string;
  businessType: string;
  monthlyLeak: number;
  annualLeak: number;
  leadsPerMonth: number;
  leadsLost: number;
  conversionGap: number;
  currentRate: number;
  topRate: number;
  avgValue: number;
  perSecondLoss: number;
  captureRate: number;
  // Industry-specific metrics
  afterHoursLoss?: number;
  responseTime?: string;
  proceduresLost?: number;
  emergencyCalls?: number;
  familyLTVLoss?: number;
  acuteCalls?: number;
  piLeadLoss?: number;
  retentionLoss?: number;
  onScrollToBreakdown: () => void;
}

// Icon mapping for dynamic rendering
const ICON_MAP = {
  moon: Moon,
  clock: Clock,
  alert: AlertCircle,
  users: Users,
  dollar: DollarSign,
  phone: PhoneOff,
  activity: Activity
};

export function ExecutiveSummary({
  businessName,
  city,
  businessType,
  monthlyLeak,
  annualLeak,
  leadsPerMonth,
  leadsLost,
  conversionGap,
  currentRate,
  topRate,
  avgValue,
  perSecondLoss,
  captureRate,
  afterHoursLoss = 0,
  responseTime = '2+ hours',
  proceduresLost = 0,
  emergencyCalls = 0,
  familyLTVLoss = 0,
  acuteCalls = 0,
  piLeadLoss = 0,
  retentionLoss = 0,
  onScrollToBreakdown
}: ExecutiveSummaryProps) {
  // Get industry configuration
  const config = useMemo(() => getIndustryConfig(businessType), [businessType]);
  
  // Live counter for urgency
  const [liveCounter, setLiveCounter] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => prev + (perSecondLoss || 0.0027) * 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, [perSecondLoss]);

  // Dynamic color classes based on industry
  const colors = useMemo(() => {
    const { primary } = config.colorScheme;
    return {
      badgeBg: `bg-${primary}-600/20`,
      badgeText: `text-${primary}-300`,
      badgeBorder: `border-${primary}-500/30`,
      subtitleText: `text-${primary}-400`,
      bigNumber: `text-${primary}-400`,
      metricBorder: `border-${primary}-500/30`,
      metricIconBg: `bg-${primary}-500/20`,
      metricIconText: `text-${primary}-400`,
      urgencyBg: `bg-${primary}-950/50`,
      urgencyBorder: `border-${primary}-500/30`,
      urgencyTitle: `text-${primary}-300`,
      urgencyKicker: `text-${primary}-400`,
      ctaBg: `bg-${primary}-500`,
      ctaHover: `hover:bg-${primary}-600`
    };
  }, [config]);

  // Industry-specific metric values
  const getIndustryMetrics = () => {
    switch (businessType) {
      case 'medspa':
        return [
          {
            icon: Moon,
            title: 'After-Hours Loss',
            value: formatCurrency(afterHoursLoss || Math.round(monthlyLeak * 0.73)),
            description: '73% of cosmetic inquiries happen outside business hours',
            borderColor: 'border-purple-500/30',
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-400',
            valueColor: 'text-purple-400'
          },
          {
            icon: Clock,
            title: 'Speed-to-Consult',
            value: responseTime,
            description: 'Your response time. Prospects book within 2 hours or move on.',
            borderColor: 'border-orange-500/30',
            iconBg: 'bg-orange-500/20',
            iconColor: 'text-orange-400',
            valueColor: 'text-orange-400'
          },
          {
            icon: DollarSign,
            title: 'Customers Lost',
            value: proceduresLost.toString(),
            description: 'Additional customers recoverable with AI automation',
            borderColor: 'border-red-500/30',
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-400',
            valueColor: 'text-red-400'
          }
        ];
        
      case 'dental':
        return [
          {
            icon: AlertCircle,
            title: 'Emergency Losses',
            value: emergencyCalls || Math.round(leadsLost * 0.42).toString(),
            description: 'Emergency calls/week going to voicemail during business hours',
            borderColor: 'border-red-500/30',
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-400',
            valueColor: 'text-red-400'
          },
          {
            icon: Clock,
            title: 'Response Delays',
            value: responseTime,
            description: 'Average callback time. 80% book with first responder.',
            borderColor: 'border-orange-500/30',
            iconBg: 'bg-orange-500/20',
            iconColor: 'text-orange-400',
            valueColor: 'text-orange-400'
          },
          {
            icon: Users,
            title: 'Family LTV Lost',
            value: formatCurrency(familyLTVLoss || Math.round(leadsLost * 2.8 * avgValue * 4)),
            description: 'Lost families = lost lifetime value (avg 2.8 patients/family)',
            borderColor: 'border-blue-500/30',
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            valueColor: 'text-blue-400'
          }
        ];
        
      case 'chiro':
        return [
          {
            icon: Activity,
            title: 'Acute Pain Losses',
            value: acuteCalls || Math.round(leadsLost * 0.68).toString(),
            description: 'Acute pain calls/week needing same-day appointments',
            borderColor: 'border-red-500/30',
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-400',
            valueColor: 'text-red-400'
          },
          {
            icon: AlertTriangle,
            title: 'PI Lead Loss',
            value: formatCurrency(piLeadLoss || Math.round(monthlyLeak * 0.35)),
            description: 'High-value personal injury leads lost to response delays',
            borderColor: 'border-yellow-500/30',
            iconBg: 'bg-yellow-500/20',
            iconColor: 'text-yellow-400',
            valueColor: 'text-yellow-400'
          },
          {
            icon: Users,
            title: 'Retention Loss',
            value: formatCurrency(retentionLoss || Math.round(monthlyLeak * 0.25)),
            description: 'Maintenance patients falling off without systematic follow-up',
            borderColor: 'border-green-500/30',
            iconBg: 'bg-green-500/20',
            iconColor: 'text-green-400',
            valueColor: 'text-green-400'
          }
        ];
        
      case 'physio':
        return [
          {
            icon: PhoneOff,
            title: 'Referral Response',
            value: '67%',
            description: 'of patients are physician-referred and expect quick response',
            borderColor: 'border-indigo-500/30',
            iconBg: 'bg-indigo-500/20',
            iconColor: 'text-indigo-400',
            valueColor: 'text-indigo-400'
          },
          {
            icon: Clock,
            title: 'Auth Window',
            value: '48 hrs',
            description: 'Insurance authorizations expire if not scheduled promptly',
            borderColor: 'border-orange-500/30',
            iconBg: 'bg-orange-500/20',
            iconColor: 'text-orange-400',
            valueColor: 'text-orange-400'
          },
          {
            icon: Activity,
            title: 'Completion Rate',
            value: '62%',
            description: 'of patients complete full treatment plan (industry: 45%)',
            borderColor: 'border-green-500/30',
            iconBg: 'bg-green-500/20',
            iconColor: 'text-green-400',
            valueColor: 'text-green-400'
          }
        ];
        
      default:
        // Generic metrics
        return [
          {
            icon: PhoneOff,
            title: 'Leads Lost',
            value: leadsLost.toString(),
            description: 'Potential customers lost monthly to gaps in your follow-up',
            borderColor: 'border-red-500/30',
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-400',
            valueColor: 'text-red-400'
          },
          {
            icon: TrendingDown,
            title: 'Conversion Gap',
            value: `${conversionGap}%`,
            description: `Gap between your rate (${currentRate}%) and top performers (${topRate}%)`,
            borderColor: 'border-orange-500/30',
            iconBg: 'bg-orange-500/20',
            iconColor: 'text-orange-400',
            valueColor: 'text-orange-400'
          },
          {
            icon: DollarSign,
            title: '12-Month Cost',
            value: formatCurrency(annualLeak),
            description: 'What these leaks cost you over a full year',
            borderColor: 'border-slate-700',
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            valueColor: 'text-white'
          }
        ];
    }
  };

  const metrics = getIndustryMetrics();

  // Get industry-specific gradient
  const getGradientClass = () => {
    switch (businessType) {
      case 'medspa':
        return 'from-slate-900 via-purple-950 to-slate-900';
      case 'dental':
        return 'from-slate-900 via-blue-950 to-slate-900';
      case 'chiro':
        return 'from-slate-900 via-green-950 to-slate-900';
      case 'physio':
        return 'from-slate-900 via-indigo-950 to-slate-900';
      default:
        return 'from-slate-900 to-slate-800';
    }
  };

  // Get industry-specific primary color for text
  const getPrimaryColor = () => {
    switch (businessType) {
      case 'medspa': return 'text-purple-400';
      case 'dental': return 'text-blue-400';
      case 'chiro': return 'text-green-400';
      case 'physio': return 'text-indigo-400';
      default: return 'text-red-400';
    }
  };

  const getBadgeColors = () => {
    switch (businessType) {
      case 'medspa': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'dental': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'chiro': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'physio': return 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30';
      default: return 'bg-slate-700 text-slate-200 border-slate-600';
    }
  };

  const getCtaColors = () => {
    switch (businessType) {
      case 'medspa': return 'bg-purple-500 hover:bg-purple-600';
      case 'dental': return 'bg-blue-500 hover:bg-blue-600';
      case 'chiro': return 'bg-green-500 hover:bg-green-600';
      case 'physio': return 'bg-indigo-500 hover:bg-indigo-600';
      default: return 'bg-white text-slate-900 hover:bg-slate-100';
    }
  };

  return (
    <section className={`min-h-screen flex items-center justify-center bg-gradient-to-b ${getGradientClass()} text-white px-4 sm:px-8`}>
      <div className="max-w-5xl w-full py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className={`${getBadgeColors()} mb-4 border`}>
            {config.badgeLabel} • {new Date().toLocaleDateString()}
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            {businessName}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">
            {city} • {config.displayName}
          </p>
        </div>

        {/* THE BIG NUMBER */}
        <div className="text-center mb-12">
          <p className={`text-sm uppercase tracking-wide ${getPrimaryColor()} mb-3`}>
            {config.heroSubtitle}
          </p>
          <h2 className={`text-6xl md:text-8xl font-bold ${getPrimaryColor()} mb-4`}>
            {formatCurrency(monthlyLeak)}
          </h2>
          <p className="text-xl text-slate-300 mb-2">
            {config.leakDescription}
          </p>
          <p className="text-sm text-slate-400">
            Based on {leadsPerMonth} {config.language.customerPlural}/month at {formatCurrency(avgValue)} avg {config.language.service} value
          </p>
        </div>

        {/* Industry-Specific Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={index}
                className={`bg-slate-800/50 backdrop-blur border ${metric.borderColor} rounded-xl p-4 sm:p-6`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${metric.iconBg} rounded-full flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${metric.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-slate-200">{metric.title}</h3>
                </div>
                <p className={`text-4xl font-bold ${metric.valueColor} mb-2`}>
                  {metric.value}
                </p>
                <p className="text-sm text-slate-400">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Industry-Specific Urgency Callout */}
        <div className={`bg-${businessType === 'medspa' ? 'purple' : businessType === 'dental' ? 'red' : businessType === 'chiro' ? 'red' : businessType === 'physio' ? 'orange' : 'red'}-950/50 backdrop-blur border border-${businessType === 'medspa' ? 'purple' : 'red'}-500/30 rounded-xl p-6 mb-8`}>
          <div className="flex items-start gap-4">
            <AlertTriangle className={`w-6 h-6 ${businessType === 'medspa' ? 'text-purple-400' : 'text-red-400'} flex-shrink-0 mt-1`} />
            <div>
              <h4 className={`font-semibold ${businessType === 'medspa' ? 'text-purple-300' : businessType === 'dental' ? 'text-red-300' : businessType === 'chiro' ? 'text-red-300' : 'text-orange-300'} mb-2`}>
                {config.urgencyCallout.title}
              </h4>
              <p className="text-slate-300 text-sm mb-3">
                {config.urgencyCallout.body}
              </p>
              <p className={`text-xs ${businessType === 'medspa' ? 'text-purple-400' : businessType === 'dental' ? 'text-red-400' : 'text-red-400'}`}>
                {config.urgencyCallout.kicker}
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Loss Ticker */}
        <div className="bg-red-950/50 backdrop-blur border border-red-500/30 rounded-xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <p className="text-sm text-slate-300">
                {config.language.servicePlural.charAt(0).toUpperCase() + config.language.servicePlural.slice(1)} lost since you started reading
              </p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-red-400 tabular-nums">
              ${liveCounter.toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Based on ${(perSecondLoss || 0.0027).toFixed(4)}/second loss rate
          </p>
        </div>

        {/* What this represents - FIXED: No misleading competitor claim */}
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-6 sm:p-8 text-center mb-8">
          <p className="text-slate-300 mb-4">
            <strong className="text-white">Your current performance:</strong> You're converting{' '}
            <span className="text-green-400 font-bold">{captureRate}%</span> of leads 
            ({Math.round(leadsPerMonth * captureRate / 100)} of {leadsPerMonth}).
            Top performers in your industry convert <span className="text-green-400 font-bold">{topRate}%</span> with 
            AI-powered follow-up.
          </p>
          <p className="text-sm text-slate-400">
            The gap between your {captureRate}% and top performers' {topRate}% is where your recoverable revenue lives.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={onScrollToBreakdown}
            className={`${getCtaColors()} px-8 py-6 text-lg`}
          >
            See Complete Analysis
            <ChevronDown className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-xs text-slate-400 mt-4">
            7-minute read • Confidential competitive analysis
          </p>
        </div>
      </div>
    </section>
  );
}

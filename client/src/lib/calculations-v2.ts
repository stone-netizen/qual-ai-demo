/**
 * LeakDetector.ai v2.0 - Calculation Engine
 * 
 * Industry-standard benchmarks with accurate, realistic calculations.
 * Professional language throughout.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface FormDataV2 {
  // Step 1: Business Info
  business_type: 'medspa' | 'dental' | 'chiro' | 'physio' | 'other';
  clinic_name: string;
  city: string;
  role: string;
  
  // Step 2: Lead Metrics
  leads_per_month: number;
  missed_calls_week: number;
  response_time: ResponseTimeKey;
  
  // Step 3: Funnel Rates (now uses smart defaults)
  contact_rate: number;
  booking_rate: number;
  show_rate: number;
  close_rate: number;
  avg_value: number;
  using_custom_rates?: boolean; // True if user adjusted from defaults
}

export type ResponseTimeKey = 'under_5' | '5_to_15' | '15_to_30' | '30_to_60' | '1_to_2_hours' | '2_to_4_hours' | '4_plus' | '5_to_30' | '30_to_120' | 'hours_plus' | 'next_day';

export interface LeakItem {
  name: string;
  why: string;
  monthly_loss_estimate: number;
  confidence: 'high' | 'medium' | 'low';
  icon: 'phone' | 'clock' | 'users' | 'trending-down' | 'calendar' | 'message';
}

export interface FunnelStage {
  name: string;
  count: number;
  percentage: number;
  dropoff: number;
  lostRevenue: number;
}

export interface CompetitorComparison {
  metric: string;
  yours: string | number;
  competitors: string | number;
  advantage: string;
}

export interface ROIAnalysis {
  monthlyInvestment: number;
  monthlyRevenueIncrease: number;
  paybackPeriodDays: number;
  twelveMonthROI: number;
  threeYearROI: number;
  netProfitYear1: number;
}

export interface ReportDataV2 {
  id: string;
  created_at: string;
  business_name: string;
  business_type: string;
  city: string;
  
  // Input metrics
  inputs: {
    leads_per_month: number;
    missed_calls_week: number;
    response_time: ResponseTimeKey;
    contact_rate: number;
    booking_rate: number;
    show_rate: number;
    close_rate: number;
    avg_value: number;
  };
  
  // Current state calculations
  current: {
    monthly_revenue: number;
    contact_rate_effective: number;
    leads_contacted: number;
    leads_booked: number;
    leads_showed: number;
    leads_closed: number;
  };
  
  // With AI projections
  projected: {
    monthly_revenue: number;
    contact_rate: number;
    leads_contacted: number;
    leads_booked: number;
    leads_showed: number;
    leads_closed: number;
  };
  
  // Loss calculations
  losses: {
    per_second: number;
    per_minute: number;
    per_hour: number;
    daily: number;
    weekly: number;
    monthly: number;
    quarterly: number;
    annual: number;
    three_year: number;
  };
  
  // Revenue recovery potential
  recovery: {
    monthly: number;
    quarterly: number;
    annual: number;
    three_year: number;
  };
  
  // Identified leaks
  leaks: LeakItem[];
  
  // Funnel visualization data
  funnel_current: FunnelStage[];
  funnel_projected: FunnelStage[];
  
  // Competitor comparison
  competitor_comparison: CompetitorComparison[];
  
  // ROI Analysis
  roi: ROIAnalysis;
  
  // Tier classification
  tier: 'priority_install' | 'audit_pilot' | 'waitlist';
  
  // AI-generated content
  executive_summary: string;
  
  // Mermaid diagrams
  mermaid_current_funnel: string;
  mermaid_fix_funnel: string;
}

// =============================================================================
// INDUSTRY BENCHMARKS
// =============================================================================

/**
 * Response Time Impact - potential improvement factors
 * Source: InsideSales.com, Harvard Business Review Lead Response Studies
 * MORE GRANULAR for accuracy
 */
export const RESPONSE_TIME_IMPROVEMENT: Record<ResponseTimeKey, number> = {
  // New granular options
  under_5: 0.05,        // Already fast, 5% improvement possible
  '5_to_15': 0.15,      // 15% improvement possible
  '15_to_30': 0.30,     // 30% improvement possible
  '30_to_60': 0.45,     // 45% improvement possible
  '1_to_2_hours': 0.55, // 55% improvement possible
  '2_to_4_hours': 0.65, // 65% improvement possible
  '4_plus': 0.75,       // 75% improvement possible
  // Legacy options (for backwards compatibility)
  '5_to_30': 0.25,
  '30_to_120': 0.45,
  hours_plus: 0.60,
  next_day: 0.75
};

/**
 * With AI: 95% contact rate (instant response + 24/7 availability)
 */
export const AI_CONTACT_RATE = 0.95;

/**
 * AI-enhanced booking rate improvement
 */
export const AI_BOOKING_RATE_BOOST = 0.15;

/**
 * AI-enhanced show rate improvement
 */
export const AI_SHOW_RATE_BOOST = 0.15;

/**
 * Missed call conversion assumptions
 */
export const MISSED_CALL_RECOVERY_RATE = 0.50; // 50% can be recovered
export const MISSED_CALL_CONVERSION_RATE = 0.15; // 15% of recovered calls convert

/**
 * Service pricing
 */
export const SERVICE_MONTHLY_COST = 497;

// =============================================================================
// CALCULATION FUNCTIONS
// =============================================================================

/**
 * Calculate current funnel performance
 * Uses the user's ENTERED contact rate directly (no penalties)
 */
function calculateCurrentFunnel(
  leads: number,
  contactRate: number,
  bookingRate: number,
  showRate: number,
  closeRate: number,
  avgValue: number
): { stages: FunnelStage[], revenue: number } {
  const contacted = Math.round(leads * contactRate);
  const booked = Math.round(contacted * bookingRate);
  const showed = Math.round(booked * showRate);
  const closed = Math.round(showed * closeRate);
  const revenue = closed * avgValue;
  
  const stages: FunnelStage[] = [
    {
      name: 'Leads',
      count: leads,
      percentage: 100,
      dropoff: 0,
      lostRevenue: 0
    },
    {
      name: 'Contacted',
      count: contacted,
      percentage: Math.round((contacted / leads) * 100),
      dropoff: leads - contacted,
      lostRevenue: (leads - contacted) * bookingRate * showRate * closeRate * avgValue
    },
    {
      name: 'Booked',
      count: booked,
      percentage: Math.round((booked / leads) * 100),
      dropoff: contacted - booked,
      lostRevenue: (contacted - booked) * showRate * closeRate * avgValue
    },
    {
      name: 'Showed',
      count: showed,
      percentage: Math.round((showed / leads) * 100),
      dropoff: booked - showed,
      lostRevenue: (booked - showed) * closeRate * avgValue
    },
    {
      name: 'Closed',
      count: closed,
      percentage: Math.round((closed / leads) * 100),
      dropoff: showed - closed,
      lostRevenue: (showed - closed) * avgValue
    }
  ];
  
  return { stages, revenue };
}

/**
 * Calculate projected funnel with AI enhancement
 * FIXED: Uses same lead count as current - improvement is in conversion rates, not lead volume
 */
function calculateProjectedFunnel(
  leads: number,
  currentContactRate: number,
  currentBookingRate: number,
  currentShowRate: number,
  closeRate: number,
  avgValue: number,
  missedCallsPerWeek: number
): { stages: FunnelStage[], revenue: number } {
  // Improved contact rate (capped at 95%)
  const contactRate = Math.min(0.95, currentContactRate + 0.30);
  
  // Boost booking and show rates
  const bookingRate = Math.min(0.85, currentBookingRate + AI_BOOKING_RATE_BOOST);
  const showRate = Math.min(0.95, currentShowRate + AI_SHOW_RATE_BOOST);
  
  // FIXED: Keep same lead count as current funnel - the improvement is in conversion, not lead volume
  // Missed call recovery is captured in the overall recovery estimate, not as phantom leads
  const totalLeads = leads;
  
  const contacted = Math.round(totalLeads * contactRate);
  const booked = Math.round(contacted * bookingRate);
  const showed = Math.round(booked * showRate);
  const closed = Math.round(showed * closeRate);
  const revenue = closed * avgValue;
  
  const stages: FunnelStage[] = [
    {
      name: 'Leads',
      count: leads, // Same as current funnel
      percentage: 100,
      dropoff: 0,
      lostRevenue: 0
    },
    {
      name: 'Contacted',
      count: contacted,
      percentage: Math.round((contacted / leads) * 100),
      dropoff: leads - contacted, // Fewer lost at this stage
      lostRevenue: 0
    },
    {
      name: 'Booked',
      count: booked,
      percentage: Math.round((booked / leads) * 100),
      dropoff: contacted - booked,
      lostRevenue: 0
    },
    {
      name: 'Showed',
      count: showed,
      percentage: Math.round((showed / leads) * 100),
      dropoff: booked - showed,
      lostRevenue: 0
    },
    {
      name: 'Closed',
      count: closed,
      percentage: Math.round((closed / leads) * 100),
      dropoff: showed - closed,
      lostRevenue: 0
    }
  ];
  
  return { stages, revenue };
}

/**
 * Identify and rank revenue leaks - PROFESSIONAL LANGUAGE
 */
function identifyLeaks(
  formData: Partial<FormDataV2>,
  currentRevenue: number,
  projectedRevenue: number
): LeakItem[] {
  const leaks: LeakItem[] = [];
  const totalOpportunity = projectedRevenue - currentRevenue;
  
  const L = Number(formData.leads_per_month) || 100;
  const MCw = Number(formData.missed_calls_week) || 0;
  const responseTime = formData.response_time || '30_to_120';
  const c = (Number(formData.contact_rate) || 50) / 100;
  const b = (Number(formData.booking_rate) || 40) / 100;
  const s = (Number(formData.show_rate) || 70) / 100;
  const k = (Number(formData.close_rate) || 30) / 100;
  const A = Number(formData.avg_value) || 500;
  
  // 1. Missed Calls - separate opportunity, not penalty
  if (MCw > 0) {
    const missedMonthly = MCw * 4.33;
    const recoverable = missedMonthly * MISSED_CALL_RECOVERY_RATE * MISSED_CALL_CONVERSION_RATE * A;
    leaks.push({
      name: 'Missed Call Recovery',
      why: `${MCw} calls per week go unanswered. With 24/7 AI coverage, approximately ${Math.round(missedMonthly * MISSED_CALL_RECOVERY_RATE)} of these could be captured monthly.`,
      monthly_loss_estimate: Math.round(recoverable),
      confidence: 'high',
      icon: 'phone'
    });
  }
  
  // 2. Response Time Opportunity
  if (['30_to_120', 'hours_plus', 'next_day'].includes(responseTime)) {
    const improvementFactor = RESPONSE_TIME_IMPROVEMENT[responseTime as ResponseTimeKey];
    const responseOpportunity = L * improvementFactor * b * s * k * A;
    
    const responseTimeText: Record<string, string> = {
      '30_to_120': '30+ minutes',
      'hours_plus': '2+ hours',
      'next_day': 'next day'
    };
    
    leaks.push({
      name: 'Response Time Improvement',
      why: `Current ${responseTimeText[responseTime]} response time. Faster response typically improves contact rates by ${Math.round(improvementFactor * 100)}%.`,
      monthly_loss_estimate: Math.round(responseOpportunity),
      confidence: 'high',
      icon: 'clock'
    });
  }
  
  // 3. Contact Rate Opportunity
  if (c < 0.70) {
    const targetContactRate = Math.min(0.85, c + 0.25);
    const contactOpportunity = L * (targetContactRate - c) * b * s * k * A;
    leaks.push({
      name: 'Contact Rate Improvement',
      why: `Currently reaching ${Math.round(c * 100)}% of leads. AI-assisted follow-up can improve this to ${Math.round(targetContactRate * 100)}%.`,
      monthly_loss_estimate: Math.round(contactOpportunity),
      confidence: 'medium',
      icon: 'users'
    });
  }
  
  // 4. No-Show Reduction
  if (s < 0.85) {
    const targetShowRate = Math.min(0.90, s + AI_SHOW_RATE_BOOST);
    const noShowOpportunity = L * c * b * (targetShowRate - s) * k * A;
    leaks.push({
      name: 'Appointment No-Shows',
      why: `${Math.round((1 - s) * 100)}% of booked appointments result in no-shows. Automated reminders typically reduce this by 15-20%.`,
      monthly_loss_estimate: Math.round(noShowOpportunity),
      confidence: 'medium',
      icon: 'calendar'
    });
  }
  
  // 5. After-Hours Coverage
  const afterHoursOpportunity = totalOpportunity * 0.20;
  leaks.push({
    name: 'After-Hours Coverage',
    why: `Approximately 40% of inquiries occur outside business hours. AI provides 24/7 response capability.`,
    monthly_loss_estimate: Math.round(afterHoursOpportunity),
    confidence: 'medium',
    icon: 'clock'
  });
  
  // 6. Follow-up Consistency
  if (b < 0.55) {
    const targetBookingRate = Math.min(0.65, b + AI_BOOKING_RATE_BOOST);
    const followUpOpportunity = L * c * (targetBookingRate - b) * s * k * A;
    leaks.push({
      name: 'Follow-up Optimization',
      why: `Industry data shows 6-8 touchpoints needed for conversion. Automated sequences ensure consistent follow-up.`,
      monthly_loss_estimate: Math.round(followUpOpportunity),
      confidence: 'medium',
      icon: 'message'
    });
  }
  
  // Sort by impact and return top 4
  leaks.sort((a, b) => b.monthly_loss_estimate - a.monthly_loss_estimate);
  return leaks.slice(0, 4);
}

/**
 * Calculate ROI analysis
 */
function calculateROI(monthlyOpportunity: number): ROIAnalysis {
  const monthlyInvestment = SERVICE_MONTHLY_COST;
  
  // Conservative: capture 60% of identified opportunity
  const monthlyRevenueIncrease = Math.round(monthlyOpportunity * 0.60);
  
  // Payback period
  const dailyRevenue = monthlyRevenueIncrease / 30;
  const paybackPeriodDays = dailyRevenue > 0 ? Math.ceil(monthlyInvestment / dailyRevenue) : 999;
  
  // 12-month ROI
  const yearlyRevenue = monthlyRevenueIncrease * 12;
  const yearlyInvestment = monthlyInvestment * 12;
  const twelveMonthROI = yearlyInvestment > 0 ? Math.round(((yearlyRevenue - yearlyInvestment) / yearlyInvestment) * 100) : 0;
  
  // 3-year ROI
  const threeYearRevenue = monthlyRevenueIncrease * 36;
  const threeYearInvestment = monthlyInvestment * 36;
  const threeYearROI = threeYearInvestment > 0 ? Math.round(((threeYearRevenue - threeYearInvestment) / threeYearInvestment) * 100) : 0;
  
  // Net profit year 1
  const netProfitYear1 = yearlyRevenue - yearlyInvestment;
  
  return {
    monthlyInvestment,
    monthlyRevenueIncrease,
    paybackPeriodDays: Math.max(7, paybackPeriodDays), // Minimum 1 week for realism
    twelveMonthROI: Math.min(2000, twelveMonthROI), // Cap at 2000%
    threeYearROI: Math.min(6000, threeYearROI),
    netProfitYear1
  };
}

/**
 * Generate competitor comparison data
 * Uses USER'S ENTERED contact rate (not penalized effective rate)
 */
function generateCompetitorComparison(
  userContactRate: number,
  responseTime: ResponseTimeKey
): CompetitorComparison[] {
  const responseTimeLabels: Record<ResponseTimeKey, string> = {
    under_5: '<5 minutes',
    '5_to_30': '5-30 minutes',
    '30_to_120': '30 min - 2 hrs',
    hours_plus: '2+ hours',
    next_day: 'Next day'
  };
  
  return [
    {
      metric: 'Response Time',
      yours: responseTimeLabels[responseTime],
      competitors: '<1 minute',
      advantage: 'Faster response improves contact rates'
    },
    {
      metric: 'Contact Rate',
      yours: `${Math.round(userContactRate * 100)}%`,
      competitors: '85-95%',
      advantage: 'AI-assisted follow-up reaches more leads'
    },
    {
      metric: 'After-Hours',
      yours: 'Limited',
      competitors: '24/7',
      advantage: 'Captures evening and weekend inquiries'
    },
    {
      metric: 'Follow-up',
      yours: '1-3 attempts',
      competitors: '6-8 attempts',
      advantage: 'Automated sequences ensure persistence'
    },
    {
      metric: 'Lead Capture',
      yours: 'Form/Voicemail',
      competitors: 'AI Conversation',
      advantage: 'Real-time qualification and booking'
    }
  ];
}

/**
 * Generate Mermaid diagram for current funnel
 */
function generateCurrentFunnelDiagram(stages: FunnelStage[], revenue: number): string {
  const leads = stages[0].count;
  const contacted = stages[1].count;
  const booked = stages[2].count;
  const showed = stages[3].count;
  const closed = stages[4].count;
  
  return `
graph TD
  Leads[Leads: ${leads}/mo]
  Contacted[Contacted: ${contacted}]
  Booked[Booked: ${booked}]
  Showed[Showed: ${showed}]
  Revenue[Closed: $${Math.round(revenue).toLocaleString()}]

  Leads -->|${Math.round((contacted/leads) * 100)}%| Contacted
  Contacted -->|${Math.round((booked/contacted) * 100)}%| Booked
  Booked -->|${Math.round((showed/booked) * 100)}%| Showed
  Showed -->|${Math.round((closed/showed) * 100)}%| Revenue
  `;
}

/**
 * Generate Mermaid diagram for projected AI-enhanced funnel
 */
function generateFixFunnelDiagram(stages: FunnelStage[], revenue: number): string {
  const leads = stages[0].count;
  const contacted = stages[1].count;
  const booked = stages[2].count;
  const showed = stages[3].count;
  const closed = stages[4].count;
  
  return `
graph TD
  Leads[Leads: ${leads}/mo]
  AI[AI Response]
  Contacted[Contacted: ${contacted}]
  Booked[Booked: ${booked}]
  Showed[Showed: ${showed}]
  Revenue[Closed: $${Math.round(revenue).toLocaleString()}]

  Leads -->|Instant| AI
  AI -->|${Math.round((contacted/leads) * 100)}%| Contacted
  Contacted -->|${Math.round((booked/contacted) * 100)}%| Booked
  Booked -->|${Math.round((showed/booked) * 100)}%| Showed
  Showed -->|${Math.round((closed/showed) * 100)}%| Revenue
  `;
}

// =============================================================================
// MAIN CALCULATION FUNCTION
// =============================================================================

/**
 * Generate complete report from form data
 * Uses user's entered contact rate DIRECTLY - no aggressive penalties
 */
export function calculateReportV2(formData: Partial<FormDataV2>): ReportDataV2 {
  // Parse inputs with defaults
  const L = Number(formData.leads_per_month) || 100;
  const MCw = Number(formData.missed_calls_week) || 0;
  const responseTime = (formData.response_time || '30_to_120') as ResponseTimeKey;
  
  // Use the user's ENTERED contact rate directly
  const c = (Number(formData.contact_rate) || 50) / 100;
  const b = (Number(formData.booking_rate) || 40) / 100;
  const s = (Number(formData.show_rate) || 70) / 100;
  const k = (Number(formData.close_rate) || 30) / 100;
  const A = Number(formData.avg_value) || 500;
  
  // Current funnel - uses user's entered contact rate
  const currentFunnel = calculateCurrentFunnel(L, c, b, s, k, A);
  
  // Projected funnel with AI improvements
  const projectedFunnel = calculateProjectedFunnel(L, c, b, s, k, A, MCw);
  
  // Monthly opportunity (difference between projected and current)
  const monthlyOpportunity = projectedFunnel.revenue - currentFunnel.revenue;
  
  // Multi-period calculations
  const losses = {
    per_second: monthlyOpportunity / (30 * 24 * 60 * 60),
    per_minute: monthlyOpportunity / (30 * 24 * 60),
    per_hour: monthlyOpportunity / (30 * 24),
    daily: monthlyOpportunity / 30,
    weekly: monthlyOpportunity / 4.33,
    monthly: monthlyOpportunity,
    quarterly: monthlyOpportunity * 3,
    annual: monthlyOpportunity * 12,
    three_year: monthlyOpportunity * 36
  };
  
  // Recovery potential (conservative 60%)
  const recovery = {
    monthly: Math.round(monthlyOpportunity * 0.60),
    quarterly: Math.round(monthlyOpportunity * 3 * 0.60),
    annual: Math.round(monthlyOpportunity * 12 * 0.60),
    three_year: Math.round(monthlyOpportunity * 36 * 0.60)
  };
  
  // Identify leaks/opportunities
  const leaks = identifyLeaks(formData, currentFunnel.revenue, projectedFunnel.revenue);
  
  // Competitor comparison - use user's entered contact rate
  const competitorComparison = generateCompetitorComparison(c, responseTime);
  
  // ROI analysis
  const roi = calculateROI(monthlyOpportunity);
  
  // Determine tier
  let tier: 'priority_install' | 'audit_pilot' | 'waitlist' = 'waitlist';
  if (monthlyOpportunity > 15000) tier = 'priority_install';
  else if (monthlyOpportunity > 5000) tier = 'audit_pilot';
  
  // Executive summary - PROFESSIONAL LANGUAGE
  const executive_summary = `Based on the metrics provided, ${formData.clinic_name || 'your business'} has an estimated ${formatCurrency(monthlyOpportunity)} monthly opportunity gap. With ${L} monthly leads and ${MCw > 0 ? `${MCw} missed calls per week` : 'current response patterns'}, the primary improvement area is ${leaks[0]?.name || 'response time optimization'}. Over 12 months, this represents ${formatCurrency(monthlyOpportunity * 12)} in potential additional revenue.`;
  
  // Generate diagrams
  const mermaid_current_funnel = generateCurrentFunnelDiagram(currentFunnel.stages, currentFunnel.revenue);
  const mermaid_fix_funnel = generateFixFunnelDiagram(projectedFunnel.stages, projectedFunnel.revenue);
  
  return {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    business_name: formData.clinic_name || 'Your Business',
    business_type: formData.business_type || 'other',
    city: formData.city || '',
    
    inputs: {
      leads_per_month: L,
      missed_calls_week: MCw,
      response_time: responseTime,
      contact_rate: c * 100,
      booking_rate: b * 100,
      show_rate: s * 100,
      close_rate: k * 100,
      avg_value: A
    },
    
    current: {
      monthly_revenue: Math.round(currentFunnel.revenue),
      contact_rate_effective: Math.round(c * 100), // User's entered rate
      leads_contacted: currentFunnel.stages[1].count,
      leads_booked: currentFunnel.stages[2].count,
      leads_showed: currentFunnel.stages[3].count,
      leads_closed: currentFunnel.stages[4].count
    },
    
    projected: {
      monthly_revenue: Math.round(projectedFunnel.revenue),
      contact_rate: Math.round(Math.min(95, c * 100 + 30)),
      leads_contacted: projectedFunnel.stages[1].count,
      leads_booked: projectedFunnel.stages[2].count,
      leads_showed: projectedFunnel.stages[3].count,
      leads_closed: projectedFunnel.stages[4].count
    },
    
    losses: {
      per_second: losses.per_second,
      per_minute: losses.per_minute,
      per_hour: losses.per_hour,
      daily: Math.round(losses.daily),
      weekly: Math.round(losses.weekly),
      monthly: Math.round(losses.monthly),
      quarterly: Math.round(losses.quarterly),
      annual: Math.round(losses.annual),
      three_year: Math.round(losses.three_year)
    },
    
    recovery,
    leaks,
    funnel_current: currentFunnel.stages,
    funnel_projected: projectedFunnel.stages,
    competitor_comparison: competitorComparison,
    roi,
    tier,
    executive_summary,
    
    mermaid_current_funnel,
    mermaid_fix_funnel
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Format currency for display
 */
export function formatCurrency(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(value);
}

/**
 * Format large numbers with K/M suffix
 */
export function formatCompact(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/**
 * Pain point options for form
 */
export const PAIN_POINT_OPTIONS = [
  { id: 'voicemail_after_hours', label: 'Calls go to voicemail after hours' },
  { id: 'front_desk_busy', label: 'Front desk too busy to answer' },
  { id: 'no_web_followup', label: 'No follow-up on web forms' },
  { id: 'lose_to_competitors', label: 'Lose leads to faster competitors' },
  { id: 'cant_track_marketing', label: "Can't track which marketing works" },
  { id: 'manual_followup', label: 'Follow-up is manual and inconsistent' },
  { id: 'no_sms', label: 'No SMS communication with leads' },
  { id: 'high_no_shows', label: 'High no-show rate for appointments' }
];

/**
 * Response time options with labels - MORE GRANULAR for accuracy
 */
export const RESPONSE_TIME_OPTIONS = [
  { value: 'under_5', label: 'Under 5 minutes', sublabel: '(instant)' },
  { value: '5_to_15', label: '5 - 15 minutes', sublabel: '(very fast)' },
  { value: '15_to_30', label: '15 - 30 minutes', sublabel: '(fast)' },
  { value: '30_to_60', label: '30 - 60 minutes', sublabel: '(moderate)' },
  { value: '1_to_2_hours', label: '1 - 2 hours', sublabel: '(slow)' },
  { value: '2_to_4_hours', label: '2 - 4 hours', sublabel: '(very slow)' },
  { value: '4_plus', label: '4+ hours / Next day', sublabel: '(too slow)' }
];

/**
 * Business type options
 */
export const BUSINESS_TYPE_OPTIONS = [
  { value: 'dental', label: 'Dental Practice' },
  { value: 'medspa', label: 'MedSpa / Aesthetics' },
  { value: 'chiro', label: 'Chiropractic' },
  { value: 'physio', label: 'Physical Therapy' },
  { value: 'other', label: 'Other Healthcare' }
];

/**
 * Industry benchmarks by business type
 * Based on analysis of 500+ practices
 */
export const INDUSTRY_BENCHMARKS: Record<string, {
  contact: number;
  booking: number;
  show: number;
  close: number;
  avgValue: { min: number; max: number };
  leadsPerMonth: { min: number; max: number };
}> = {
  dental: {
    contact: 45,
    booking: 50,
    show: 75,
    close: 35,
    avgValue: { min: 800, max: 2000 },
    leadsPerMonth: { min: 100, max: 200 }
  },
  medspa: {
    contact: 40,
    booking: 45,
    show: 70,
    close: 30,
    avgValue: { min: 500, max: 1500 },
    leadsPerMonth: { min: 80, max: 180 }
  },
  chiro: {
    contact: 50,
    booking: 45,
    show: 72,
    close: 32,
    avgValue: { min: 300, max: 800 },
    leadsPerMonth: { min: 60, max: 150 }
  },
  physio: {
    contact: 48,
    booking: 50,
    show: 78,
    close: 38,
    avgValue: { min: 400, max: 1000 },
    leadsPerMonth: { min: 70, max: 160 }
  },
  other: {
    contact: 45,
    booking: 40,
    show: 70,
    close: 30,
    avgValue: { min: 500, max: 1500 },
    leadsPerMonth: { min: 80, max: 180 }
  }
};

/**
 * Missed calls range options for visual selection
 */
export const MISSED_CALLS_OPTIONS = [
  { value: '0-5', label: '0-5', sublabel: 'Rare', numericValue: 3 },
  { value: '5-10', label: '5-10', sublabel: 'Some', numericValue: 7 },
  { value: '10-20', label: '10-20', sublabel: 'Many', numericValue: 15 },
  { value: '20+', label: '20+', sublabel: 'A lot', numericValue: 25 }
];

/**
 * Get benchmarks for a specific business type
 */
export function getBenchmarksForType(businessType: string) {
  return INDUSTRY_BENCHMARKS[businessType] || INDUSTRY_BENCHMARKS.other;
}

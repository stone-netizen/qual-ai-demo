import { CalculatorFormData } from "@/hooks/useCalculatorForm";

// Value range for confidence-adjusted estimates
export interface ValueRange {
  conservative: number;  // -30% of expected
  expected: number;      // Base calculation
  aggressive: number;    // +20% of expected
}

// Helper to create a range from a base value
export function createRange(baseValue: number): ValueRange {
  return {
    conservative: Math.round(baseValue * 0.70),  // -30%
    expected: Math.round(baseValue),
    aggressive: Math.round(baseValue * 1.20),    // +20%
  };
}

export interface LeakDetails {
  [key: string]: string | number | boolean | undefined;
}

export interface Leak {
  rank: number;
  type: string;
  label: string;
  monthlyLoss: number;
  annualLoss: number;
  monthlyLossRange: ValueRange;
  annualLossRange: ValueRange;
  displayRange?: { low: number; mid: number; high: number };
  severity: "critical" | "high" | "medium" | "low";
  details: LeakDetails;
  recommendation: string;
  quickWin?: boolean;
  constraintScore?: number;      // Weighted priority score
  constraintLabel?: string;      // "Primary Constraint", etc.
}

// Dormant Leads Result
export interface DormantLeadsResult {
  monthlyLoss: number;
  annualLoss: number;
  monthlyLossRange: ValueRange;
  annualLossRange: ValueRange;
  viableLeads: number;
  expectedCustomers: number;
  bestCaseCustomers: number;
  customersLost: number;
  currentlyRecovered: number;
  databaseAge: string;
  viabilityRate: number;
  expectedResponseRate: number;
  bestCaseResponseRate: number;
  recontactStatus: string;
  upside: number;
}

// Past Customers Result
export interface PastCustomersResult {
  monthlyLoss: number;
  annualLoss: number;
  monthlyLossRange: ValueRange;
  annualLossRange: ValueRange;
  winnableCustomers: number;
  customersLost: number;
  currentlyRecovered: number;
  timeSinceLastPurchase: string;
  winBackRate: number;
  returnPurchaseBonus: number;
  currentStatus: string;
  frequencyScore: number;
  recommendedFrequency: string;
  upside: number;
}

// Reactivation Leak Result
export interface ReactivationLeak {
  type: "reactivation";
  label: string;
  monthlyLoss: number;
  annualLoss: number;
  monthlyLossRange: ValueRange;
  annualLossRange: ValueRange;
  displayRange?: { low: number; mid: number; high: number };
  dormantLeads: DormantLeadsResult | null;
  pastCustomers: PastCustomersResult | null;
  severity: "critical" | "high" | "medium" | "low";
  quickWinScore: number;
  totalUpside: number;
  implementationTime: string;
  expectedROI: string;
  paybackPeriod: string;
  isQuickWin: boolean;
}

export interface CalculationResult {
  totalMonthlyLoss: number;
  totalAnnualLoss: number;
  totalMonthlyLossRange: ValueRange;
  totalAnnualLossRange: ValueRange;
  leaks: Leak[];
  reactivationOpportunity: ReactivationLeak | null;
  operationalLeaks: Leak[];
  allLeaks: Leak[];
  hasReactivationData: boolean;
}

// =====================================================
// CONSTRAINT WEIGHTS - Diagnostic Priority System
// =====================================================
// These weights represent operational leverage - areas where
// intervention has the highest ROI based on industry research.

export const CONSTRAINT_WEIGHTS: Record<string, number> = {
  "missed-calls": 0.35,       // Missed Calls / After Hours - 35%
  "after-hours": 0.35,        // Combined with missed calls
  "slow-response": 0.20,      // Response Time - 20%
  "no-follow-up": 0.15,       // Follow-Up Depth - 15%
  "no-show": 0.15,            // No-Shows - 15%
  "reactivation": 0.10,       // Reactivation - 10%
  "unqualified-leads": 0.05,  // CRM / Team - 5%
  "hold-time": 0.05,          // Included in CRM/Team
};

// Calculate weighted constraint score
export function calculateConstraintScore(leak: Leak): number {
  const weight = CONSTRAINT_WEIGHTS[leak.type] || 0.05;
  return leak.monthlyLoss * weight;
}

// Get constraint label based on score ranking
export function getConstraintLabel(rank: number): string {
  if (rank === 1) return "Primary Constraint";
  if (rank === 2) return "Secondary Constraint";
  if (rank === 3) return "Tertiary Constraint";
  return "Contributing Factor";
}

// Response time conversion - percentage of leads lost due to slow response
const RESPONSE_TIME_LOSS_RATES: Record<string, number> = {
  "<5min": 0.00,      // Optimal - no loss
  "5-30min": 0.05,    // 5% of leads go cold
  "30min-2hr": 0.10,  // 10% loss
  "2-24hr": 0.20,     // 20% loss
  "24hr+": 0.35,      // 35% loss
  "dont-track": 0.20, // Assume moderate loss
};

// Missed call rate conversion
const MISSED_CALL_RATES: Record<string, number> = {
  "0-10": 0.05,
  "10-25": 0.175,
  "25-50": 0.375,
  "50+": 0.65,
  "unknown": 0.30,
};

// Helper: Get average transaction value
function getAvgTransactionValue(data: CalculatorFormData): number {
  return data.avgTransactionValue || 0;
}

// Helper: Get customer lifetime value
function getLTV(data: CalculatorFormData): number {
  const avgTransaction = data.avgTransactionValue || 0;
  const repeatPurchases = data.avgPurchasesPerCustomer || 1;
  return avgTransaction * repeatPurchases;
}

// Helper: Get monthly revenue
function getMonthlyRevenue(data: CalculatorFormData): number {
  return data.monthlyRevenue || 1;
}

// Helper: Get close rate
function getCloseRate(data: CalculatorFormData): number {
  const totalLeads = data.totalMonthlyLeads || 1;
  const closedDeals = data.closedDealsPerMonth || 0;
  return Math.min(closedDeals / totalLeads, 0.5); // Cap at 50%
}

// Helper: Determine severity based on % of monthly revenue
function getSeverityByPercent(percent: number): "critical" | "high" | "medium" | "low" {
  if (percent >= 0.08) return "critical";  // 8%+ of revenue
  if (percent >= 0.04) return "high";      // 4-8%
  if (percent >= 0.02) return "medium";    // 2-4%
  return "low";                            // <2%
}

function createDisplayRange(mid: number) {
  return {
    low: Math.round(mid * 0.85),
    mid: Math.round(mid),
    high: Math.round(mid * 1.15),
  };
}

// =====================================================
// LEAK CALCULATIONS - CORRECTED FORMULAS
// =====================================================

// 1. MISSED CALLS - Lost new leads (use LTV, but value = leads × closeRate × LTV)
export function calculateMissedCallsLeak(data: CalculatorFormData): Leak {
  const missedCallRateKey = data.missedCallRate || "unknown";
  const missedCallRate = MISSED_CALL_RATES[missedCallRateKey] || 0.30;
  const inboundCalls = data.inboundCalls || 0;
  const closeRate = getCloseRate(data);
  const transactionValue = getAvgTransactionValue(data);
  const monthlyRevenue = getMonthlyRevenue(data);

  // Missed calls = lost lead opportunities
  const missedCalls = Math.round(inboundCalls * missedCallRate);

  // Value of each missed call = probability it would have closed × LTV
  const valuePerMissedCall = closeRate * transactionValue;
  const rawLoss = missedCalls * valuePerMissedCall;

  // Cap at 8% of monthly revenue
  const monthlyLoss = Math.min(rawLoss, monthlyRevenue * 0.08);

  const roundedMonthlyLoss = Math.round(monthlyLoss);
  if (!Number.isFinite(monthlyLoss)) {
    // console.error("Calculation error in calculateMissedCallsLeak");
    return {
      rank: 0,
      type: "missed-calls",
      label: "Missed Calls",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: {},
      recommendation: "Check input values for missed calls.",
    };
  }

  return {
    rank: 0,
    type: "missed-calls",
    label: "Missed Calls",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    displayRange: createDisplayRange(roundedMonthlyLoss),
    severity: getSeverityByPercent(monthlyLoss / monthlyRevenue),
    details: {
      missedCallRate: `${(missedCallRate * 100).toFixed(0)}%`,
      missedCallsPerMonth: missedCalls,
      valuePerCall: Math.round(valuePerMissedCall),
      avgTransactionValue: Math.round(transactionValue),
      closeRate: Math.round(closeRate * 100),
      formula: `${missedCalls} × $${Math.round(transactionValue)} × ${Math.round(closeRate * 100)}%`,
    },
    recommendation: missedCallRate > 0.25
      ? "Implement an answering service or AI call handling for 24/7 coverage."
      : "Your missed call rate is reasonable. Focus on other areas first.",
  };
}

// 2. SLOW RESPONSE - Lost leads due to delayed follow-up (use LTV)
export function calculateSlowResponseLeak(data: CalculatorFormData): Leak {
  const responseTime = data.avgResponseTime || "dont-track";
  const lossRate = RESPONSE_TIME_LOSS_RATES[responseTime] || 0.35;
  const totalLeads = data.totalMonthlyLeads || 0;
  const closeRate = getCloseRate(data);
  const transactionValue = getAvgTransactionValue(data);
  const monthlyRevenue = getMonthlyRevenue(data);

  // Leads lost due to slow response
  const leadsLost = totalLeads * lossRate;

  // Value = lost leads × probability of close × LTV
  const rawLoss = leadsLost * closeRate * transactionValue;

  // Cap at 8% of monthly revenue
  const monthlyLoss = Math.min(rawLoss, monthlyRevenue * 0.08);

  const responseTimeLabels: Record<string, string> = {
    "<5min": "Under 5 minutes",
    "5-30min": "5-30 minutes",
    "30min-2hr": "30 min - 2 hours",
    "2-24hr": "2-24 hours",
    "24hr+": "Over 24 hours",
    "dont-track": "Not tracked",
  };

  const roundedMonthlyLoss = Math.round(monthlyLoss);
  if (!Number.isFinite(monthlyLoss)) {
    // console.error("Calculation error in calculateSlowResponseLeak");
    return {
      rank: 0,
      type: "slow-response",
      label: "Slow Response Time",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: {},
      recommendation: "Check response time inputs.",
    };
  }

  return {
    rank: 0,
    type: "slow-response",
    label: "Slow Response Time",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    displayRange: createDisplayRange(roundedMonthlyLoss),
    severity: getSeverityByPercent(monthlyLoss / monthlyRevenue),
    details: {
      currentResponseTime: responseTimeLabels[responseTime] || responseTime,
      leadsLostToSlowResponse: Math.round(leadsLost),
      lossRate: `${(lossRate * 100).toFixed(0)}%`,
      avgTransactionValue: Math.round(transactionValue),
      closeRate: Math.round(closeRate * 100),
      formula: `${Math.round(leadsLost)} leads × $${Math.round(transactionValue)} × ${Math.round(closeRate * 100)}%`,
    },
    recommendation: lossRate > 0.25
      ? "Speed is critical. Implement automated instant responses to dramatically improve contact rates."
      : "Your response time is good. Consider automation for consistency.",
  };
}

// 3. NO FOLLOW-UP - Lost leads from insufficient persistence (use LTV)
export function calculateNoFollowUpLeak(data: CalculatorFormData): Leak {
  const totalLeads = data.totalMonthlyLeads || 0;
  const followsAll = data.followUpAllLeads;
  const percentageFollowedUp = data.percentageFollowedUp || 100;
  const avgAttempts = data.avgFollowUpAttempts || 0;
  const closeRate = getCloseRate(data);
  const transactionValue = getAvgTransactionValue(data);
  const monthlyRevenue = getMonthlyRevenue(data);

  // Leads not followed up at all
  const followUpRate = followsAll ? 1.0 : percentageFollowedUp / 100;
  const leadsNotFollowedUp = totalLeads * (1 - followUpRate);

  // Optimal is 5-6 attempts. Penalty for fewer attempts on followed-up leads
  const optimalAttempts = 5;
  const attemptPenalty = avgAttempts < optimalAttempts
    ? (optimalAttempts - avgAttempts) * 0.03 // 3% penalty per missing attempt
    : 0;

  // Leads with insufficient follow-up
  const leadsWithWeakFollowUp = totalLeads * followUpRate * attemptPenalty;

  // Total lost opportunity
  const totalLostLeads = leadsNotFollowedUp + leadsWithWeakFollowUp;
  const rawLoss = totalLostLeads * closeRate * transactionValue;

  // Cap at 3% of monthly revenue to avoid double-counting with missed calls
  const monthlyLoss = Math.min(rawLoss, monthlyRevenue * 0.03);

  const roundedMonthlyLoss = Math.round(monthlyLoss);
  if (!Number.isFinite(monthlyLoss)) {
    // console.error("Calculation error in calculateNoFollowUpLeak");
    return {
      rank: 0,
      type: "no-follow-up",
      label: "Insufficient Follow-Up",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: {},
      recommendation: "Check follow-up inputs.",
    };
  }

  return {
    rank: 0,
    type: "no-follow-up",
    label: "Insufficient Follow-Up",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    displayRange: createDisplayRange(roundedMonthlyLoss),
    severity: getSeverityByPercent(monthlyLoss / monthlyRevenue),
    details: {
      leadsNotFollowedUp: Math.round(leadsNotFollowedUp),
      currentAttempts: avgAttempts,
      optimalAttempts,
      followUpRate: `${(followUpRate * 100).toFixed(0)}%`,
      avgTransactionValue: Math.round(transactionValue),
      closeRate: Math.round(closeRate * 100),
      formula: `${Math.round(leadsNotFollowedUp)} leads × $${Math.round(transactionValue)} × ${Math.round(closeRate * 100)}%`,
    },
    recommendation: avgAttempts < 5
      ? "Top performers make 5-6 follow-up attempts. Implement an automated follow-up sequence."
      : "Your follow-up process is solid. Consider A/B testing your messaging.",
  };
}

// 4. NO-SHOWS - Lost bookings/appointments (use TRANSACTION VALUE, not LTV)
export function calculateNoShowLeak(data: CalculatorFormData): Leak {
  const requiresAppointments = data.requiresAppointments;

  if (!requiresAppointments) {
    return {
      rank: 0,
      type: "no-show",
      label: "Appointment No-Shows",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: { applicable: false },
      recommendation: "Not applicable to your business model.",
    };
  }

  const appointmentsBooked = data.appointmentsBooked || 0;
  const appointmentsShowUp = data.appointmentsShowUp || 0;
  const sendsReminders = data.sendsReminders;
  // Use single transaction value - these are lost BOOKINGS, not lost leads
  const transactionValue = getAvgTransactionValue(data);
  const monthlyRevenue = getMonthlyRevenue(data);

  const noShows = Math.max(0, appointmentsBooked - appointmentsShowUp);

  // 60% of no-shows are preventable with proper reminder systems
  const preventabilityRate = sendsReminders ? 0.30 : 0.60;
  const preventableNoShows = noShows * preventabilityRate;

  // Use transaction value (not LTV) for lost appointments
  const rawLoss = preventableNoShows * transactionValue;

  // Cap at 6% of monthly revenue
  const monthlyLoss = Math.min(rawLoss, monthlyRevenue * 0.06);

  if (!Number.isFinite(monthlyLoss)) {
    // console.error("Calculation error in calculateNoShowLeak");
    return {
      rank: 0,
      type: "no-show",
      label: "Appointment No-Shows",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: {},
      recommendation: "Check appointment inputs.",
    };
  }

  const roundedMonthlyLoss = Math.round(monthlyLoss);
  return {
    rank: 0,
    type: "no-show",
    label: "Appointment No-Shows",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    displayRange: createDisplayRange(roundedMonthlyLoss),
    severity: getSeverityByPercent(monthlyLoss / monthlyRevenue),
    details: {
      appointmentsBooked,
      noShows,
      preventableNoShows: Math.round(preventableNoShows),
      sendsReminders: sendsReminders ? "Yes" : "No",
      avgTransactionValue: Math.round(transactionValue),
      formula: `${Math.round(preventableNoShows)} × $${Math.round(transactionValue)}`,
    },
    recommendation: !sendsReminders
      ? "Implement automated SMS and email reminders 48hr and 24hr before appointments."
      : "Consider requiring deposits to reduce no-shows further.",
  };
}

// 5. UNQUALIFIED LEADS - Wasted time (opportunity cost, use transaction value)
export function calculateUnqualifiedLeadLeak(data: CalculatorFormData): Leak {
  const qualifiesLeads = data.qualifiesLeads;

  if (qualifiesLeads) {
    return {
      rank: 0,
      type: "unqualified-leads",
      label: "Unqualified Lead Time",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: { qualifiesLeads: true },
      recommendation: "Your lead qualification process is in place.",
    };
  }

  const totalLeads = data.totalMonthlyLeads || 0;
  const percentageUnqualified = data.percentageUnqualified || 20;
  const consultationLength = data.consultationLength || 30;
  const avgHourlyCost = data.avgHourlyLaborCost || 25;
  const monthlyRevenue = getMonthlyRevenue(data);

  const unqualifiedLeads = totalLeads * (percentageUnqualified / 100);
  const hoursWasted = (unqualifiedLeads * consultationLength) / 60;

  // Direct labor cost only (no opportunity cost to avoid inflation)
  const rawLoss = hoursWasted * avgHourlyCost;

  // Cap at 3% of monthly revenue
  const monthlyLoss = Math.min(rawLoss, monthlyRevenue * 0.03);

  const roundedMonthlyLoss = Math.round(monthlyLoss);
  if (!Number.isFinite(monthlyLoss)) {
    // console.error("Calculation error in calculateUnqualifiedLeadLeak");
    return {
      rank: 0,
      type: "unqualified-leads",
      label: "Unqualified Lead Time",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: {},
      recommendation: "Check qualification inputs.",
    };
  }

  return {
    rank: 0,
    type: "unqualified-leads",
    label: "Unqualified Lead Time",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    displayRange: createDisplayRange(roundedMonthlyLoss),
    severity: getSeverityByPercent(monthlyLoss / monthlyRevenue),
    details: {
      unqualifiedLeadsPerMonth: Math.round(unqualifiedLeads),
      hoursWastedPerMonth: hoursWasted.toFixed(1),
      laborCost: Math.round(rawLoss),
      avgHourlyCost: Math.round(avgHourlyCost),
      formula: `${hoursWasted.toFixed(1)} hrs × $${Math.round(avgHourlyCost)}/hr`,
    },
    recommendation: "Add a brief qualification step before booking consultations.",
  };
}

// 6. AFTER-HOURS - Lost leads from no coverage (use LTV)
export function calculateAfterHoursLeak(data: CalculatorFormData): Leak {
  const inboundCalls = data.inboundCalls || 0;
  const answersAfterHours = data.answersAfterHours;
  const answersWeekends = data.answersWeekends;
  const closeRate = getCloseRate(data);
  const transactionValue = getAvgTransactionValue(data);
  const monthlyRevenue = getMonthlyRevenue(data);

  // Industry averages: 25% after hours, 15% weekends (some overlap)
  let missedRate = 0;
  if (!answersAfterHours) missedRate += 0.20;
  if (!answersWeekends) missedRate += 0.10;

  const missedCalls = inboundCalls * missedRate;
  const rawLoss = missedCalls * closeRate * transactionValue;

  // Cap at 6% of monthly revenue
  const monthlyLoss = Math.min(rawLoss, monthlyRevenue * 0.06);

  const roundedMonthlyLoss = Math.round(monthlyLoss);
  if (!Number.isFinite(monthlyLoss)) {
    // console.error("Calculation error in calculateAfterHoursLeak");
    return {
      rank: 0,
      type: "after-hours",
      label: "After-Hours & Weekend Calls",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: {},
      recommendation: "Check after-hours inputs.",
    };
  }

  return {
    rank: 0,
    type: "after-hours",
    label: "After-Hours & Weekend Calls",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    displayRange: createDisplayRange(roundedMonthlyLoss),
    severity: getSeverityByPercent(monthlyLoss / monthlyRevenue),
    details: {
      missedCallsAfterHours: Math.round(missedCalls),
      answersAfterHours: answersAfterHours ? "Yes" : "No",
      answersWeekends: answersWeekends ? "Yes" : "No",
      avgTransactionValue: Math.round(transactionValue),
      closeRate: Math.round(closeRate * 100),
      formula: `${Math.round(missedCalls)} × $${Math.round(transactionValue)} × ${Math.round(closeRate * 100)}%`,
    },
    recommendation: missedRate > 0.20
      ? "An answering service or AI receptionist can capture these leads."
      : "Consider adding coverage for remaining gaps.",
  };
}

// 7. HOLD TIME - Lost leads from hang-ups (use LTV)
export function calculateHoldTimeLeak(data: CalculatorFormData): Leak {
  const inboundCalls = data.inboundCalls || 0;
  const avgHoldTime = data.avgHoldTime || 0;
  const closeRate = getCloseRate(data);
  const ltv = getLTV(data);
  const monthlyRevenue = getMonthlyRevenue(data);

  // 8% hang-up rate per minute of hold (capped at 60%)
  const hangUpRate = Math.min(avgHoldTime * 0.08, 0.60);
  const callsAbandoned = inboundCalls * hangUpRate;
  const rawLoss = callsAbandoned * closeRate * ltv;

  // Cap at 4% of monthly revenue
  const monthlyLoss = Math.min(rawLoss, monthlyRevenue * 0.04);

  const roundedMonthlyLoss = Math.round(monthlyLoss);
  if (!Number.isFinite(monthlyLoss)) {
    // console.error("Calculation error in calculateHoldTimeLeak");
    return {
      rank: 0,
      type: "hold-time",
      label: "Long Hold Times",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      severity: "low",
      details: {},
      recommendation: "Check hold time inputs.",
    };
  }

  return {
    rank: 0,
    type: "hold-time",
    label: "Long Hold Times",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    severity: getSeverityByPercent(monthlyLoss / monthlyRevenue),
    details: {
      avgHoldTimeMinutes: avgHoldTime,
      estimatedHangUpRate: `${(hangUpRate * 100).toFixed(0)}%`,
      callsAbandonedPerMonth: Math.round(callsAbandoned),
    },
    recommendation: avgHoldTime > 2
      ? "Consider a callback system or AI assistant for initial inquiries."
      : "Your hold times are acceptable.",
  };
}

// =====================================================
// REACTIVATION CALCULATIONS
// =====================================================

const DATABASE_VIABILITY_RATES: Record<string, number> = {
  "0-3months": 0.40,
  "3-6months": 0.30,
  "6-12months": 0.20,
  "1-2years": 0.12,
  "2+years": 0.06,
};

const WIN_BACK_RATES: Record<string, number> = {
  "3-6months": 0.22,
  "6-12months": 0.15,
  "1-2years": 0.10,
  "2+years": 0.05,
};

export function calculateReactivationLeak(data: CalculatorFormData): ReactivationLeak | null {
  const hasDormantLeads = data.hasDormantLeads === true;
  const hasPastCustomers = data.hasPastCustomers === true;
  const dormantCount = data.totalDormantLeads ?? 0;
  const pastCustomerCount = data.numPastCustomers ?? 0;

  const hasDormantData = hasDormantLeads && dormantCount > 0;
  const hasPastData = hasPastCustomers && pastCustomerCount > 0;

  if (!hasDormantData && !hasPastData) return null;

  const {
    totalDormantLeads = 0,
    databaseAge,
    numPastCustomers = 0,
    avgTimeSinceLastPurchase,
    avgTransactionValue = 0,
  } = data;
  const monthlyRevenue = getMonthlyRevenue(data);

  const dormantAgeKey = (databaseAge || "6-12months").replace(/\s+/g, "");
  const pastCustomerAgeKey = (avgTimeSinceLastPurchase || "6-12months").replace(/\s+/g, "");

  const viabilityRates: Record<string, number> = {
    "0-3months": 0.45,
    "3-6months": 0.35,
    "6-12months": 0.25,
    "1-2years": 0.15,
    "2+years": 0.08,
  };

  const winbackRates: Record<string, number> = {
    "3-6months": 0.28,
    "6-12months": 0.20,
    "1-2years": 0.12,
    "2+years": 0.06,
  };

  const closeRatePercent = (getCloseRate(data) || 0) * 100;
  const viableLeads = totalDormantLeads * (viabilityRates[dormantAgeKey] || 0.25);
  const responseRate = 0.22;
  const respondingLeads = viableLeads * responseRate;
  const convertedLeads = respondingLeads * (closeRatePercent / 100);
  const dormantRevenue = convertedLeads * avgTransactionValue;

  const winnableCustomers = numPastCustomers * (winbackRates[pastCustomerAgeKey] || 0.20);
  const returningCustomers = winnableCustomers * 0.25;
  const customerRevenue = returningCustomers * avgTransactionValue * 1.3;

  const dormantMonthlyLoss = Math.round(dormantRevenue);
  const pastCustomerMonthlyLoss = Math.round(customerRevenue);
  const totalMonthlyReactivation = dormantMonthlyLoss + pastCustomerMonthlyLoss;

  const monthlyLossRaw = Number.isFinite(totalMonthlyReactivation) ? totalMonthlyReactivation : 0;
  const cappedMonthlyLoss = Math.min(monthlyLossRaw, monthlyRevenue * 0.04);
  const roundedMonthlyLoss = Math.round(cappedMonthlyLoss);

  if (!Number.isFinite(monthlyLossRaw)) {
    // console.error("Calculation error in calculateReactivationLeak");
    return {
      type: "reactivation",
      label: "Dormant Leads & Customer Reactivation",
      monthlyLoss: 0,
      annualLoss: 0,
      monthlyLossRange: createRange(0),
      annualLossRange: createRange(0),
      dormantLeads: null,
      pastCustomers: null,
      severity: "low",
      quickWinScore: 0,
      totalUpside: 0,
      implementationTime: "7-14 days",
      expectedROI: "3-5x in first 30 days",
      paybackPeriod: "7-10 days",
      isQuickWin: true,
    };
  }

  return {
    type: "reactivation",
    label: "Dormant Leads & Customer Reactivation",
    monthlyLoss: roundedMonthlyLoss,
    annualLoss: roundedMonthlyLoss * 12,
    monthlyLossRange: createRange(roundedMonthlyLoss),
    annualLossRange: createRange(roundedMonthlyLoss * 12),
    displayRange: createDisplayRange(roundedMonthlyLoss),
    dormantLeads: {
      monthlyLoss: dormantMonthlyLoss,
      annualLoss: dormantMonthlyLoss * 12,
      monthlyLossRange: createRange(dormantMonthlyLoss),
      annualLossRange: createRange(dormantMonthlyLoss * 12),
      viableLeads: Math.round(viableLeads),
      expectedCustomers: Math.round(convertedLeads),
      bestCaseCustomers: Math.round(convertedLeads * 1.2),
      customersLost: Math.round(convertedLeads),
      currentlyRecovered: 0,
      databaseAge: dormantAgeKey,
      viabilityRate: Math.round((viabilityRates[dormantAgeKey] || 0.25) * 100),
      expectedResponseRate: Math.round(responseRate * 100),
      bestCaseResponseRate: 30,
      recontactStatus: "Never contacted",
      upside: Math.round(dormantRevenue * 1.2),
    },
    pastCustomers: {
      monthlyLoss: pastCustomerMonthlyLoss,
      annualLoss: pastCustomerMonthlyLoss * 12,
      monthlyLossRange: createRange(pastCustomerMonthlyLoss),
      annualLossRange: createRange(pastCustomerMonthlyLoss * 12),
      winnableCustomers: Math.round(winnableCustomers),
      customersLost: Math.round(returningCustomers),
      currentlyRecovered: 0,
      timeSinceLastPurchase: pastCustomerAgeKey,
      winBackRate: Math.round((winbackRates[pastCustomerAgeKey] || 0.20) * 100),
      returnPurchaseBonus: 30,
      currentStatus: "No reactivation campaigns",
      frequencyScore: 0,
      recommendedFrequency: "Monthly",
      upside: Math.round(customerRevenue * 1.2),
    },
    severity: roundedMonthlyLoss > 5000 ? "medium" : "low",
    quickWinScore: 60,
    totalUpside: Math.round((dormantRevenue + customerRevenue) * 1.2),
    implementationTime: "7-14 days",
    expectedROI: "3-5x in first 30 days",
    paybackPeriod: "7-10 days",
    isQuickWin: true,
  };
}

// =====================================================
// MAIN CALCULATION FUNCTION
// =====================================================

interface CalculateAllLeaksOptions {
  includeLeakTypes?: Set<string>;
  targetRange?: { min: number; max: number };
}

export function calculateAllLeaks(
  formData: CalculatorFormData,
  options?: CalculateAllLeaksOptions
): CalculationResult {
  const includeTypes = options?.includeLeakTypes && options.includeLeakTypes.size ? options.includeLeakTypes : undefined;
  const reactivationOpportunity = calculateReactivationLeak(formData);
  const hasReactivationData = !!reactivationOpportunity;
  const monthlyRevenue = getMonthlyRevenue(formData);

  const operationalLeaks: Leak[] = [];

  const shouldInclude = (type: string) => {
    if (!includeTypes) return true;
    return includeTypes.has(type);
  };

  if (shouldInclude("missed-calls")) operationalLeaks.push(calculateMissedCallsLeak(formData));
  if (shouldInclude("slow-response")) operationalLeaks.push(calculateSlowResponseLeak(formData));
  if (shouldInclude("no-follow-up")) operationalLeaks.push(calculateNoFollowUpLeak(formData));
  if (shouldInclude("no-show")) operationalLeaks.push(calculateNoShowLeak(formData));
  if (shouldInclude("unqualified-leads")) operationalLeaks.push(calculateUnqualifiedLeadLeak(formData));
  if (shouldInclude("after-hours")) operationalLeaks.push(calculateAfterHoursLeak(formData));
  if (shouldInclude("hold-time")) operationalLeaks.push(calculateHoldTimeLeak(formData));

  // Calculate constraint scores for each leak (revenue × weight)
  operationalLeaks.forEach(leak => {
    leak.constraintScore = calculateConstraintScore(leak);
  });

  let reactivationAsLeak: Leak | null = null;
  if (reactivationOpportunity) {
    reactivationAsLeak = {
      rank: 1,
      type: "reactivation",
      label: reactivationOpportunity.label,
      monthlyLoss: reactivationOpportunity.monthlyLoss,
      annualLoss: reactivationOpportunity.annualLoss,
      monthlyLossRange: reactivationOpportunity.monthlyLossRange,
      annualLossRange: reactivationOpportunity.annualLossRange,
      severity: reactivationOpportunity.severity,
      quickWin: true,
      details: {
        dormantLeadsValue: reactivationOpportunity.dormantLeads?.monthlyLoss || 0,
        pastCustomersValue: reactivationOpportunity.pastCustomers?.monthlyLoss || 0,
        quickWinScore: reactivationOpportunity.quickWinScore,
      },
      recommendation: "A simple email/SMS campaign to dormant leads can generate revenue within days.",
      constraintScore: reactivationOpportunity.monthlyLoss * (CONSTRAINT_WEIGHTS["reactivation"] || 0.10),
    };
  }

  let allLeaks: Leak[] = reactivationAsLeak
    ? [reactivationAsLeak, ...operationalLeaks]
    : operationalLeaks;

  // Sort by WEIGHTED constraint score (not raw dollar amount)
  allLeaks.sort((a, b) => (b.constraintScore || 0) - (a.constraintScore || 0));

  // Assign ranks and constraint labels based on weighted priority
  allLeaks.forEach((leak, index) => {
    leak.rank = index + 1;
    leak.constraintLabel = getConstraintLabel(index + 1);
  });

  // Update operationalLeaks reference to match new ranking
  const updatedOperationalLeaks = allLeaks.filter(l => l.type !== "reactivation");

  // Calculate total
  let totalMonthlyLoss = allLeaks.reduce((sum, leak) => sum + leak.monthlyLoss, 0);

  // Optional: constrain totals to provided target range (keeps personalized number within quick range)
  const targetRange = options?.targetRange;
  let scaleFactor = 1;
  if (targetRange) {
    const rangeSpan = targetRange.max - targetRange.min;
    const idealMin = targetRange.min + rangeSpan * 0.20;
    const idealMax = targetRange.max - rangeSpan * 0.20;
    const target = Math.max(idealMin, Math.min(idealMax, totalMonthlyLoss));
    if (totalMonthlyLoss > 0 && target !== totalMonthlyLoss) {
      scaleFactor = target / totalMonthlyLoss;
      allLeaks = allLeaks.map((leak) => {
        const scaledMonthly = Math.round(leak.monthlyLoss * scaleFactor);
        const scaledAnnual = scaledMonthly * 12;
        return {
          ...leak,
          monthlyLoss: scaledMonthly,
          annualLoss: scaledAnnual,
          monthlyLossRange: createRange(scaledMonthly),
          annualLossRange: createRange(scaledAnnual),
          constraintScore: scaledMonthly * (CONSTRAINT_WEIGHTS[leak.type] || 0.05),
        };
      });
      if (reactivationOpportunity) {
        const scaledReactivationMonthly = Math.round(reactivationOpportunity.monthlyLoss * scaleFactor);
        reactivationOpportunity.monthlyLoss = scaledReactivationMonthly;
        reactivationOpportunity.annualLoss = scaledReactivationMonthly * 12;
        reactivationOpportunity.monthlyLossRange = createRange(scaledReactivationMonthly);
        reactivationOpportunity.annualLossRange = createRange(scaledReactivationMonthly * 12);
      }
      totalMonthlyLoss = target;
    }
  }

  // GLOBAL CAP: Total loss cannot exceed 45% of monthly revenue
  const maxTotalLoss = monthlyRevenue * 0.45;

  if (totalMonthlyLoss > maxTotalLoss) {
    const reductionFactor = maxTotalLoss / totalMonthlyLoss;
    allLeaks = allLeaks.map(leak => {
      const newMonthlyLoss = Math.round(leak.monthlyLoss * reductionFactor);
      const newConstraintScore = newMonthlyLoss * (CONSTRAINT_WEIGHTS[leak.type] || 0.05);
      return {
        ...leak,
        monthlyLoss: newMonthlyLoss,
        annualLoss: newMonthlyLoss * 12,
        monthlyLossRange: createRange(newMonthlyLoss),
        annualLossRange: createRange(newMonthlyLoss * 12),
        constraintScore: newConstraintScore,
      };
    });
    totalMonthlyLoss = Math.round(maxTotalLoss);
  }

  const roundedTotal = Math.round(totalMonthlyLoss);
  return {
    totalMonthlyLoss: roundedTotal,
    totalAnnualLoss: roundedTotal * 12,
    totalMonthlyLossRange: createRange(roundedTotal),
    totalAnnualLossRange: createRange(roundedTotal * 12),
    leaks: allLeaks,
    reactivationOpportunity,
    operationalLeaks: allLeaks.filter(l => l.type !== "reactivation"),
    allLeaks,
    hasReactivationData,
  };
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export function formatCurrency(value: number): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(value);
  } catch {
    const rounded = Math.round(value);
    const withGrouping = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${withGrouping}`;
  }
}

// Format a currency range (e.g., "$17,430 – $29,880")
export function formatCurrencyRange(range: ValueRange): string {
  return `${formatCurrency(range.conservative)} – ${formatCurrency(range.aggressive)}`;
}

// Compact format for ranges (e.g., "$17k–$30k")
export function formatCurrencyRangeCompact(range: ValueRange): string {
  const formatShort = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `$${Math.round(n / 1000)}k`;
    return formatCurrency(n);
  };
  return `${formatShort(range.conservative)}–${formatShort(range.aggressive)}`;
}

export function getSeverityColor(severity: Leak["severity"]): {
  bg: string;
  text: string;
  border: string;
} {
  switch (severity) {
    case "critical":
      return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
    case "high":
      return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" };
    case "medium":
      return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
    case "low":
      return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };
  }
}

export function getSeverityLabel(severity: Leak["severity"]): string {
  switch (severity) {
    case "critical": return "Critical";
    case "high": return "High Priority";
    case "medium": return "Medium Priority";
    case "low": return "Low Priority";
  }
}

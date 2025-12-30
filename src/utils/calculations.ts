/**
 * SETTER QUALIFICATION COCKPIT - MATH ENGINE (PRODUCTION)
 * 
 * Logic: 4-Step Pipeline
 * 1. Missed Calls = inquiries * (missedRatio / 10)
 * 2. Clients Lost = Missed Calls * (Close Rate / 100)
 * 3. Weekly Exposure = Clients Lost * Avg Ticket
 * 4. Monthly Exposure = Weekly Exposure * 4
 * 
 * Multipliers:
 * - Floor (Conservative) = 0.65
 * - Full (Estimated) = 1.0
 */

export type QualificationStatus = "BOOKED" | "QUALIFIED" | "DISQUALIFIED" | "INCOMPLETE";

export interface CockpitResult {
  missedCalls: number;
  monthlyExposure: number;
  dailyExposure: number;
  yearlyExposure: number;
  status: QualificationStatus;
  statusReason?: string;
  nextStep?: string;
  certaintyLabel: string;
  primaryConstraint: string;
}

export function calculateCockpitResult(data: {
  inquiresPerWeek: number;
  avgTicket: number;
  percentageRatio: number; // 0-10 out of 10
  dmConfirmed: boolean;
  ownerAttending: boolean;
  isBooked?: boolean;
  slowResponse?: boolean;
  afterHoursIssue?: boolean;
  followUpBroken?: boolean;
  manualConstraintOverride?: boolean;
  customConstraint?: string;
  exposureMode: "floor" | "full";
  closeRate: number;
  businessName: string;
}): CockpitResult {
  // 1. Input Normalization (NaN Prevention)
  const inputs = {
    inquiries: Math.max(0, Number(data.inquiresPerWeek) || 0),
    ratio: Math.min(10, Math.max(0, Number(data.percentageRatio) || 0)),
    ticket: Math.max(0, Number(data.avgTicket) || 0),
    closeRate: Math.min(100, Math.max(0, Number(data.closeRate) || 0)) / 100, // Normalized to 0-1
  };

  const isComplete = data.businessName && inputs.inquiries > 0 && inputs.ratio >= 0 && inputs.ticket > 0;

  // 2. Math Engine (4-Step Formula)
  const missedCallsPerWeek = Math.round(inputs.inquiries * (inputs.ratio / 10));
  const clientsLostPerWeek = missedCallsPerWeek * inputs.closeRate;
  const weeklyExposure = clientsLostPerWeek * inputs.ticket;
  let monthlyExposure = weeklyExposure * 4;

  // Multipliers
  if (data.exposureMode === "floor") {
    monthlyExposure = monthlyExposure * 0.65; // Conservative Floor
  } else {
    monthlyExposure = monthlyExposure * 1.0; // Full Estimate
  }

  const dailyExposure = monthlyExposure / 30;
  const yearlyExposure = monthlyExposure * 12;

  const certaintyLabel = `Out of 10 (${inputs.ratio})`;

  // 3. Automated Constraint Identification
  let primaryConstraint = "Lead Capture Failure";
  if (data.manualConstraintOverride && data.customConstraint) {
    primaryConstraint = data.customConstraint;
  } else {
    if (data.followUpBroken) primaryConstraint = "Follow-Up Breakdown";
    else if (data.afterHoursIssue) primaryConstraint = "After-Hours Coverage Gap";
    else if (data.slowResponse) primaryConstraint = "Slow Response Time";
    else if (missedCallsPerWeek > 0) primaryConstraint = "Lead Capture Failure";
  }

  // 4. Deterministic State Machine
  let status: QualificationStatus = "INCOMPLETE";
  let statusReason = "";
  let nextStep = "";

  if (!isComplete) {
    status = "INCOMPLETE";
    statusReason = "Awaiting Core Data";
    nextStep = "Enter volume + missed estimate to generate exposure.";
  } else if (data.isBooked) {
    // Booking supercedes everything if logically valid state
    status = "BOOKED";
    statusReason = "Booking Confirmed";
    nextStep = "Ready for Closer Briefing.";
  } else if (!data.dmConfirmed || !data.ownerAttending) {
    // Only reachable if Complete + Not Booked
    status = "DISQUALIFIED";
    statusReason = "No Authority / Owner Absent";
    nextStep = "Do not book — owner must attend verification.";
  } else {
    // Complete + Authority Confirmed + Not Booked
    status = "QUALIFIED";
    statusReason = "Verification Warranted";
    nextStep = "This is worth a 15-minute verification against actual call logs.";
  }

  return {
    missedCalls: missedCallsPerWeek,
    monthlyExposure, // Can be 0 if inputs are 0, but never NaN
    dailyExposure,
    yearlyExposure,
    status,
    statusReason,
    nextStep,
    certaintyLabel,
    primaryConstraint
  };
}

export const formatCurrency = (value: number) => {
  if (isNaN(value)) return "$0";
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatCurrencyCompact = (value: number) => {
  if (isNaN(value)) return "$0";
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return formatCurrency(value);
};

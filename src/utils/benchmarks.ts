export interface IndustryBenchmark {
  avgTicket: number;
  closeRate: number;
  leadVolume: number;
  missedCallRate: number;
  slowFollowupRate: number;
  afterHoursRate: number;
  noShowRate: number;
  callToLeadRatio: number;
  unqualifiedRate: number;
  optimalFollowUps: number;
}

export const industryBenchmarks: Record<string, IndustryBenchmark> = {
  "Med Spa": {
    avgTicket: 800,
    closeRate: 28,
    leadVolume: 150,
    missedCallRate: 45,
    slowFollowupRate: 60,
    afterHoursRate: 30,
    noShowRate: 25,
    callToLeadRatio: 1.67,
    unqualifiedRate: 40,
    optimalFollowUps: 6,
  },
  "Dental": {
    avgTicket: 2500,
    closeRate: 32,
    leadVolume: 100,
    missedCallRate: 38,
    slowFollowupRate: 55,
    afterHoursRate: 28,
    noShowRate: 22,
    callToLeadRatio: 1.5,
    unqualifiedRate: 35,
    optimalFollowUps: 6,
  },
  "Mortgage Lending": {
    avgTicket: 8000,
    closeRate: 18,
    leadVolume: 200,
    missedCallRate: 50,
    slowFollowupRate: 70,
    afterHoursRate: 35,
    noShowRate: 20,
    callToLeadRatio: 2.0,
    unqualifiedRate: 55,
    optimalFollowUps: 8,
  },
  "Real Estate": {
    avgTicket: 12000,
    closeRate: 12,
    leadVolume: 300,
    missedCallRate: 42,
    slowFollowupRate: 65,
    afterHoursRate: 32,
    noShowRate: 28,
    callToLeadRatio: 1.8,
    unqualifiedRate: 50,
    optimalFollowUps: 8,
  },
  "Roofing": {
    avgTicket: 15000,
    closeRate: 22,
    leadVolume: 80,
    missedCallRate: 55,
    slowFollowupRate: 68,
    afterHoursRate: 38,
    noShowRate: 35,
    callToLeadRatio: 1.9,
    unqualifiedRate: 45,
    optimalFollowUps: 7,
  },
  "Plumbing/HVAC": {
    avgTicket: 600,
    closeRate: 38,
    leadVolume: 200,
    missedCallRate: 48,
    slowFollowupRate: 58,
    afterHoursRate: 40,
    noShowRate: 20,
    callToLeadRatio: 1.6,
    unqualifiedRate: 30,
    optimalFollowUps: 5,
  },
  "Legal Services": {
    avgTicket: 5000,
    closeRate: 24,
    leadVolume: 60,
    missedCallRate: 35,
    slowFollowupRate: 52,
    afterHoursRate: 25,
    noShowRate: 18,
    callToLeadRatio: 1.4,
    unqualifiedRate: 45,
    optimalFollowUps: 6,
  },
  "Financial Planning": {
    avgTicket: 3500,
    closeRate: 20,
    leadVolume: 40,
    missedCallRate: 32,
    slowFollowupRate: 48,
    afterHoursRate: 22,
    noShowRate: 15,
    callToLeadRatio: 1.3,
    unqualifiedRate: 50,
    optimalFollowUps: 7,
  },
  "Fitness/Gyms": {
    avgTicket: 1200,
    closeRate: 35,
    leadVolume: 250,
    missedCallRate: 52,
    slowFollowupRate: 62,
    afterHoursRate: 35,
    noShowRate: 30,
    callToLeadRatio: 1.5,
    unqualifiedRate: 25,
    optimalFollowUps: 5,
  },
  "Senior Care": {
    avgTicket: 4500,
    closeRate: 15,
    leadVolume: 50,
    missedCallRate: 40,
    slowFollowupRate: 55,
    afterHoursRate: 42,
    noShowRate: 12,
    callToLeadRatio: 1.4,
    unqualifiedRate: 35,
    optimalFollowUps: 8,
  },
  "Auto Repair": {
    avgTicket: 450,
    closeRate: 45,
    leadVolume: 180,
    missedCallRate: 50,
    slowFollowupRate: 65,
    afterHoursRate: 32,
    noShowRate: 18,
    callToLeadRatio: 1.7,
    unqualifiedRate: 20,
    optimalFollowUps: 4,
  },
  "Chiropractor": {
    avgTicket: 350,
    closeRate: 40,
    leadVolume: 80,
    missedCallRate: 42,
    slowFollowupRate: 58,
    afterHoursRate: 28,
    noShowRate: 22,
    callToLeadRatio: 1.5,
    unqualifiedRate: 30,
    optimalFollowUps: 5,
  },
  "Marketing Agency": {
    avgTicket: 5000,
    closeRate: 22,
    leadVolume: 30,
    missedCallRate: 28,
    slowFollowupRate: 45,
    afterHoursRate: 20,
    noShowRate: 15,
    callToLeadRatio: 1.2,
    unqualifiedRate: 55,
    optimalFollowUps: 7,
  },
  "SaaS": {
    avgTicket: 2000,
    closeRate: 18,
    leadVolume: 500,
    missedCallRate: 25,
    slowFollowupRate: 40,
    afterHoursRate: 18,
    noShowRate: 20,
    callToLeadRatio: 1.1,
    unqualifiedRate: 60,
    optimalFollowUps: 8,
  },
  "Remodelers": {
    avgTicket: 25000,
    closeRate: 18,
    leadVolume: 50,
    missedCallRate: 48,
    slowFollowupRate: 65,
    afterHoursRate: 35,
    noShowRate: 30,
    callToLeadRatio: 1.8,
    unqualifiedRate: 50,
    optimalFollowUps: 7,
  },
  "General Construction": {
    avgTicket: 35000,
    closeRate: 15,
    leadVolume: 40,
    missedCallRate: 52,
    slowFollowupRate: 70,
    afterHoursRate: 38,
    noShowRate: 32,
    callToLeadRatio: 1.9,
    unqualifiedRate: 55,
    optimalFollowUps: 7,
  },
  "Other": {
    avgTicket: 1500,
    closeRate: 25,
    leadVolume: 100,
    missedCallRate: 45,
    slowFollowupRate: 58,
    afterHoursRate: 30,
    noShowRate: 22,
    callToLeadRatio: 1.6,
    unqualifiedRate: 40,
    optimalFollowUps: 6,
  },
};

// Default benchmark for unknown industries
const DEFAULT_BENCHMARK: IndustryBenchmark = {
  avgTicket: 1500,
  closeRate: 25,
  leadVolume: 100,
  missedCallRate: 45,
  slowFollowupRate: 58,
  afterHoursRate: 30,
  noShowRate: 22,
  callToLeadRatio: 1.6,
  unqualifiedRate: 40,
  optimalFollowUps: 6,
};

/**
 * Get benchmark data for a specific industry
 */
export function getBenchmark(industry: string): IndustryBenchmark {
  return industryBenchmarks[industry] || DEFAULT_BENCHMARK;
}

/**
 * Get all available industry names
 */
export function getIndustryNames(): string[] {
  return Object.keys(industryBenchmarks);
}

/**
 * Metric definitions for percentile calculations
 * lowerIsBetter: true means a lower user value is better (e.g., missed calls)
 */
interface MetricConfig {
  min: number;
  max: number;
  lowerIsBetter: boolean;
}

const METRIC_CONFIGS: Record<string, MetricConfig> = {
  closeRate: { min: 5, max: 50, lowerIsBetter: false },
  missedCallRate: { min: 0, max: 70, lowerIsBetter: true },
  slowFollowupRate: { min: 0, max: 80, lowerIsBetter: true },
  afterHoursRate: { min: 0, max: 50, lowerIsBetter: true },
  noShowRate: { min: 0, max: 50, lowerIsBetter: true },
  unqualifiedRate: { min: 0, max: 70, lowerIsBetter: true },
  responseTimeMinutes: { min: 0, max: 1440, lowerIsBetter: true },
  followUpAttempts: { min: 0, max: 10, lowerIsBetter: false },
  holdTimeMinutes: { min: 0, max: 15, lowerIsBetter: true },
};

/**
 * Calculate what percentile the user is in for a specific metric
 * Returns 0-100 where 100 means the user is better than 100% of the industry
 */
export function getIndustryPercentile(
  industry: string,
  metricName: string,
  userValue: number
): number {
  const benchmark = getBenchmark(industry);
  const config = METRIC_CONFIGS[metricName];
  
  if (!config) {
    // For unknown metrics, assume lower is better and use a default range
    return calculatePercentile(userValue, 0, 100, true);
  }

  // Get the industry average for comparison
  const benchmarkRecord = benchmark as unknown as Record<string, number>;
  const industryAvg = benchmarkRecord[metricName];
  
  if (industryAvg === undefined) {
    return calculatePercentile(userValue, config.min, config.max, config.lowerIsBetter);
  }

  return calculatePercentileVsAverage(
    userValue,
    industryAvg,
    config.min,
    config.max,
    config.lowerIsBetter
  );
}

/**
 * Calculate percentile based on where value falls in a range
 */
function calculatePercentile(
  value: number,
  min: number,
  max: number,
  lowerIsBetter: boolean
): number {
  const clampedValue = Math.max(min, Math.min(max, value));
  const normalized = (clampedValue - min) / (max - min);
  
  if (lowerIsBetter) {
    // Lower values = higher percentile
    return Math.round((1 - normalized) * 100);
  } else {
    // Higher values = higher percentile
    return Math.round(normalized * 100);
  }
}

/**
 * Calculate percentile compared to industry average
 * Uses a bell curve assumption where 50th percentile = industry average
 */
function calculatePercentileVsAverage(
  userValue: number,
  industryAvg: number,
  min: number,
  max: number,
  lowerIsBetter: boolean
): number {
  // Calculate how far the user is from the industry average
  const deviation = userValue - industryAvg;
  const range = max - min;
  
  // Normalize deviation to a -1 to 1 scale
  const normalizedDeviation = deviation / (range * 0.5);
  
  let percentile: number;
  
  if (lowerIsBetter) {
    // Negative deviation (below average) is good
    // Map -1 to 95th percentile, 0 to 50th, +1 to 5th
    percentile = 50 - (normalizedDeviation * 45);
  } else {
    // Positive deviation (above average) is good
    // Map -1 to 5th percentile, 0 to 50th, +1 to 95th
    percentile = 50 + (normalizedDeviation * 45);
  }
  
  // Clamp to valid percentile range
  return Math.round(Math.max(1, Math.min(99, percentile)));
}

/**
 * Get a comparison message for the user's performance
 */
export function getComparisonMessage(
  industry: string,
  metricName: string,
  userValue: number
): { percentile: number; message: string; isGood: boolean } {
  const percentile = getIndustryPercentile(industry, metricName, userValue);
  
  let message: string;
  let isGood: boolean;
  
  if (percentile >= 75) {
    message = `Top ${100 - percentile}% in ${industry}`;
    isGood = true;
  } else if (percentile >= 50) {
    message = `Above average for ${industry}`;
    isGood = true;
  } else if (percentile >= 25) {
    message = `Below average for ${industry}`;
    isGood = false;
  } else {
    message = `Bottom ${percentile}% in ${industry}`;
    isGood = false;
  }
  
  return { percentile, message, isGood };
}

/**
 * Get default value for a metric when user selects "No idea"
 */
export function getDefaultForUnknown(
  industry: string,
  metricName: keyof IndustryBenchmark
): number {
  const benchmark = getBenchmark(industry);
  return benchmark[metricName];
}

/**
 * Calculate overall industry ranking based on multiple metrics
 */
export function getOverallIndustryRanking(
  industry: string,
  metrics: Record<string, number>
): { percentile: number; ranking: "excellent" | "good" | "average" | "poor" | "critical" } {
  const percentiles: number[] = [];
  
  for (const [metricName, userValue] of Object.entries(metrics)) {
    if (METRIC_CONFIGS[metricName]) {
      percentiles.push(getIndustryPercentile(industry, metricName, userValue));
    }
  }
  
  if (percentiles.length === 0) {
    return { percentile: 50, ranking: "average" };
  }
  
  const avgPercentile = percentiles.reduce((a, b) => a + b, 0) / percentiles.length;
  const roundedPercentile = Math.round(avgPercentile);
  
  let ranking: "excellent" | "good" | "average" | "poor" | "critical";
  if (roundedPercentile >= 80) {
    ranking = "excellent";
  } else if (roundedPercentile >= 60) {
    ranking = "good";
  } else if (roundedPercentile >= 40) {
    ranking = "average";
  } else if (roundedPercentile >= 20) {
    ranking = "poor";
  } else {
    ranking = "critical";
  }
  
  return { percentile: roundedPercentile, ranking };
}

/**
 * Format a metric value for display
 */
export function formatMetricValue(
  metricName: string,
  value: number
): string {
  switch (metricName) {
    case "avgTicket":
      return `$${value.toLocaleString()}`;
    case "closeRate":
    case "missedCallRate":
    case "slowFollowupRate":
    case "afterHoursRate":
    case "noShowRate":
    case "unqualifiedRate":
      return `${value}%`;
    case "callToLeadRatio":
      return `${value.toFixed(2)}:1`;
    case "optimalFollowUps":
      return `${value} attempts`;
    case "leadVolume":
      return `${value} leads/mo`;
    default:
      return value.toString();
  }
}

import { getBenchmark } from "@/utils/benchmarks";

export interface QuickScanInput {
  industry: string;
  monthlyRevenue: number;
  leadVolume: number;
}

export interface QuickScanRange {
  minMonthlyLoss: number;
  maxMonthlyLoss: number;
  expectedMonthlyLoss: number;
}

/**
 * Quick scan uses benchmarks to estimate a believable loss range.
 * This is intentionally conservative and designed for speed, not precision.
 */
export function calculateQuickScanRange(input: QuickScanInput): QuickScanRange {
  const benchmark = getBenchmark(input.industry);

  // Convert benchmark rates into a single "operational severity" factor (0..1)
  const severityRaw =
    benchmark.missedCallRate +
    benchmark.slowFollowupRate +
    benchmark.afterHoursRate +
    benchmark.noShowRate +
    benchmark.unqualifiedRate;
  const severityMax = 70 + 80 + 50 + 50 + 70; // 320
  const severityFactor = Math.max(0, Math.min(1, severityRaw / severityMax));

  // Base loss percent: ~16% (low severity) up to ~30% (high severity)
  const baseLossPct = 0.16 + severityFactor * 0.14;

  // Adjust by lead volume vs benchmark (kept mild to avoid wild swings)
  const leadRatio = benchmark.leadVolume > 0 ? input.leadVolume / benchmark.leadVolume : 1;
  const leadFactor = Math.max(0.75, Math.min(1.25, 1 + (leadRatio - 1) * 0.25));

  const expectedMonthlyLoss = Math.round(input.monthlyRevenue * baseLossPct * leadFactor);

  // Range intentionally wide enough so the refined/personalized number will sit inside it
  // Lower bound ~70% of expected; upper bound ~140% of expected
  const minMonthlyLoss = Math.round(expectedMonthlyLoss * 0.70);
  const maxMonthlyLoss = Math.round(expectedMonthlyLoss * 1.4);

  return { minMonthlyLoss, maxMonthlyLoss, expectedMonthlyLoss };
}



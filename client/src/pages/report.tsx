/**
 * LeakDetector.ai - LEAK-FOCUSED Report
 * 
 * Core Principle: Show LEAKS not revenue
 * - "Revenue slipping through the cracks" not "Current Revenue"
 * - Focus on gaps, losses, and recovery potential
 * 
 * 7 Sections:
 * 1. Executive Summary (Leak-focused hero with big leak number)
 * 2. Competitive Intelligence (Leakage comparison)
 * 3. Competitive Reality (Emotional urgency callout)
 * 4. Funnel Breakdown (Where leads are slipping through)
 * 5. Priority Fixes (Recovery potential)
 * 6. ROI Calculator (Recovery vs Investment)
 * 7. What Happens Next + Final CTA
 */

import { useRoute } from "wouter";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, Loader2 } from "lucide-react";
import { 
  ExecutiveSummary,
  CompetitiveIntelligence,
  CompetitiveReality,
  FunnelBreakdown,
  PriorityFixes,
  ROICalculator,
  NextStepsProcess,
  FinalCTA
} from "@/components/report";
import { 
  type ReportDataV2, 
  calculateReportV2,
  getBenchmarksForType,
  SERVICE_MONTHLY_COST
} from "@/lib/calculations-v2";

// Default mock data for development
const DEFAULT_REPORT: ReportDataV2 = calculateReportV2({
  business_type: 'dental',
  clinic_name: 'Acme Dental',
  city: 'New York',
  role: 'owner',
  leads_per_month: 150,
  missed_calls_week: 20,
  response_time: '30_to_120',
  contact_rate: 45,
  booking_rate: 40,
  show_rate: 70,
  close_rate: 30,
  avg_value: 500
});

// Response time to minutes mapping - GRANULAR
const RESPONSE_TIME_MINUTES: Record<string, number> = {
  // New granular options
  under_5: 3,
  '5_to_15': 10,
  '15_to_30': 22,
  '30_to_60': 45,
  '1_to_2_hours': 90,
  '2_to_4_hours': 180,
  '4_plus': 360,
  // Legacy options (for backwards compatibility)
  '5_to_30': 15,
  '30_to_120': 60,
  hours_plus: 180,
  next_day: 1440
};

export default function ReportPage() {
  const [match, params] = useRoute("/report/:id");
  const [data, setData] = useState<ReportDataV2>(DEFAULT_REPORT);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params?.id) {
      const savedReports = JSON.parse(localStorage.getItem("qual_reports") || "{}");
      if (savedReports[params.id]) {
        setData(savedReports[params.id]);
      }
    }
  }, [params?.id]);

  const handleScheduleClick = useCallback(() => {
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/evensonstone/new-meeting";
    window.open(calendlyUrl, '_blank');
  }, []);

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { generatePDF } = await import("@/lib/pdf-generator");
      await generatePDF(data);
    } catch (error) {
      console.error("PDF generation error:", error);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: `Lead Leakage Analysis - ${data.business_name}`,
        text: `Lead leakage analysis for ${data.business_name}`,
        url: shareUrl
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  // Scroll to content section
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate derived values
  const benchmarks = useMemo(() => getBenchmarksForType(data.business_type), [data.business_type]);
  
  const responseTimeMinutes = useMemo(() => 
    RESPONSE_TIME_MINUTES[data.inputs.response_time] || 60
  , [data.inputs.response_time]);

  // ===== LEAK-FOCUSED METRICS =====
  
  // Monthly leak = total opportunity being lost
  const monthlyLeak = data.losses.monthly;
  const annualLeak = data.losses.annual;
  
  // Leads lost = leads that entered funnel but didn't close
  const leadsLost = data.inputs.leads_per_month - data.current.leads_closed;
  
  // Leads recoverable = additional closes with AI
  const leadsRecoverable = data.projected.leads_closed - data.current.leads_closed;
  
  // Conversion rates
  const currentConversionRate = useMemo(() => {
    if (data.inputs.leads_per_month === 0) return 0;
    return Math.round((data.current.leads_closed / data.inputs.leads_per_month) * 100);
  }, [data.current.leads_closed, data.inputs.leads_per_month]);

  // Top performer rate - 10% matches optimized funnel (use consistently everywhere)
  const topPerformerRate = 10;
  
  // Conversion gap
  const conversionGap = topPerformerRate - currentConversionRate;
  
  // Capture rate = what % of leads are they converting
  const captureRate = currentConversionRate;
  
  // Per second loss rate
  const perSecondLoss = useMemo(() => data.losses.per_second, [data.losses.per_second]);

  // ===== COMPETITIVE INTELLIGENCE METRICS (LEAK-FOCUSED) =====
  
  const yourMetrics = useMemo(() => ({
    responseTime: responseTimeMinutes,
    contactRate: data.inputs.contact_rate,
    bookingRate: data.inputs.booking_rate,
    showRate: data.inputs.show_rate,
    closeRate: data.inputs.close_rate,
    leakage: monthlyLeak // LEAKAGE not revenue
  }), [responseTimeMinutes, data.inputs, monthlyLeak]);

  const industryAvg = useMemo(() => ({
    responseTime: 45, // 45 min average
    contactRate: benchmarks.contact,
    bookingRate: benchmarks.booking,
    showRate: benchmarks.show,
    closeRate: benchmarks.close,
    leakage: Math.round(monthlyLeak * 0.85) // Industry loses slightly less
  }), [benchmarks, monthlyLeak]);

  // Top performers: 80% × 55% × 80% × 28% = ~10% overall conversion
  const topPerformers = useMemo(() => ({
    responseTime: 1, // Under 1 min
    contactRate: 80,
    bookingRate: 55,
    showRate: 80,
    closeRate: 28, // Realistic close rate for healthcare
    leakage: Math.round(monthlyLeak * 0.15) // Top performers lose only 15% of what you lose
  }), [monthlyLeak]);

  // ===== FUNNEL METRICS =====
  
  const totalLeakage = monthlyLeak;
  const recoverable = data.recovery.monthly;

  // ===== ROI METRICS (RECOVERY-FOCUSED) =====
  
  const monthlyRecovery = recoverable;
  const netRecovery = monthlyRecovery - SERVICE_MONTHLY_COST;
  const roi = SERVICE_MONTHLY_COST > 0 ? Math.round((netRecovery / SERVICE_MONTHLY_COST) * 100) : 0;
  const paybackDays = data.roi.paybackPeriodDays;
  const weekLeak = Math.round(data.losses.weekly);
  const monthLeak = monthlyLeak;
  const quarterLeak = data.losses.quarterly;
  const yearOneRecovery = netRecovery * 12;

  // Next available slot (dynamic based on current time)
  const nextAvailableSlot = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayName = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
    return `${dayName} at 2:00 PM`;
  }, []);

  return (
    <div className="min-h-screen bg-white" ref={reportRef}>
      
      {/* Fixed Header - Shows on scroll */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-slate-200/50 z-40 opacity-0 translate-y-[-100%] transition-all duration-300" id="header">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xs">
              LD
            </div>
            <span className="font-medium text-slate-700 text-sm">LeakDetector</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShare}
              className="text-slate-500"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              variant="ghost"
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="text-slate-500"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* SECTION 1: EXECUTIVE SUMMARY (Leak-Focused Hero) */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ExecutiveSummary
          businessName={data.business_name}
          city={data.city}
          businessType={data.business_type}
          monthlyLeak={monthlyLeak}
          annualLeak={annualLeak}
          leadsPerMonth={data.inputs.leads_per_month}
          leadsLost={leadsLost}
          conversionGap={conversionGap}
          currentRate={currentConversionRate}
          topRate={topPerformerRate}
          avgValue={data.inputs.avg_value}
          perSecondLoss={perSecondLoss}
          captureRate={captureRate}
          proceduresLost={leadsRecoverable}
          responseTime={
            data.inputs.response_time === 'under_5' ? '< 5 min' : 
            data.inputs.response_time === '5_to_15' ? '5-15 min' :
            data.inputs.response_time === '15_to_30' ? '15-30 min' :
            data.inputs.response_time === '30_to_60' ? '30-60 min' :
            data.inputs.response_time === '1_to_2_hours' ? '1-2 hours' :
            data.inputs.response_time === '2_to_4_hours' ? '2-4 hours' :
            data.inputs.response_time === '4_plus' ? '4+ hours' :
            // Legacy mappings
            data.inputs.response_time === '5_to_30' ? '5-30 min' :
            data.inputs.response_time === '30_to_120' ? '30+ min' :
            data.inputs.response_time === 'hours_plus' ? '2+ hours' : 'Next day'
          }
          onScrollToBreakdown={scrollToContent}
        />
      </motion.div>

      {/* Content sections */}
      <div ref={contentRef}>
        
        {/* ============================================ */}
        {/* SECTION 2: COMPETITIVE INTELLIGENCE (Leakage Comparison) */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <CompetitiveIntelligence
            businessName={data.business_name}
            city={data.city}
            businessType={data.business_type}
            yourMetrics={yourMetrics}
            industryAvg={industryAvg}
            topPerformers={topPerformers}
          />
        </motion.div>

        {/* ============================================ */}
        {/* SECTION 3: COMPETITIVE REALITY CHECK */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="px-4 sm:px-8 py-8 bg-slate-50"
        >
          <div className="max-w-6xl mx-auto">
            <CompetitiveReality
              businessType={data.business_type}
              city={data.city}
              monthlyLoss={monthlyLeak}
              responseTimeMinutes={responseTimeMinutes}
            />
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* SECTION 4: FUNNEL BREAKDOWN (Where Leads Slip Through) */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <FunnelBreakdown
            currentFunnel={data.funnel_current}
            optimizedFunnel={data.funnel_projected}
            leadsPerMonth={data.inputs.leads_per_month}
            avgValue={data.inputs.avg_value}
            totalLeakage={totalLeakage}
            recoverable={recoverable}
            leadsLost={leadsLost}
            leadsRecoverable={leadsRecoverable}
          />
        </motion.div>

        {/* ============================================ */}
        {/* SECTION 5: PRIORITY FIXES (Recovery Potential) */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <PriorityFixes
            leaks={data.leaks}
            avgValue={data.inputs.avg_value}
            totalMonthlyLoss={totalLeakage}
            businessType={data.business_type}
          />
        </motion.div>

        {/* ============================================ */}
        {/* SECTION 6: ROI CALCULATOR (Recovery vs Investment) */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <ROICalculator
            monthlyInvestment={SERVICE_MONTHLY_COST}
            monthlyRecovery={monthlyRecovery}
            netRecovery={netRecovery}
            roi={roi}
            paybackDays={paybackDays}
            weekLeak={weekLeak}
            monthLeak={monthLeak}
            quarterLeak={quarterLeak}
            yearOneRecovery={yearOneRecovery}
          />
        </motion.div>

        {/* ============================================ */}
        {/* SECTION 7: WHAT HAPPENS NEXT */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <NextStepsProcess />
        </motion.div>

        {/* ============================================ */}
        {/* SECTION 8: FINAL CTA */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <FinalCTA
            monthlyRecoverable={recoverable}
            nextAvailableSlot={nextAvailableSlot}
            onScheduleClick={handleScheduleClick}
            businessType={data.business_type}
          />
        </motion.div>

      </div>

      {/* Minimal Footer */}
      <footer className="py-8 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">
          Projections based on industry benchmarks and your stated lead volume. 
          Individual results depend on implementation quality and market conditions.
        </p>
      </footer>

    </div>
  );
}

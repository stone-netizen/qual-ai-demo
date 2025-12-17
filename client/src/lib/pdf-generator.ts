/**
 * LeakDetector.ai v2.0 - PDF Generator
 * 
 * Generates a professional 6-page PDF report using jsPDF
 * with styled layouts and data visualization.
 */

import jsPDF from "jspdf";
import { type ReportDataV2, formatCurrency, formatCompact } from "./calculations-v2";

// PDF Constants
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

// Colors
const COLORS = {
  primary: [20, 184, 166] as [number, number, number],     // Teal
  danger: [239, 68, 68] as [number, number, number],       // Red
  success: [34, 197, 94] as [number, number, number],      // Green
  warning: [245, 158, 11] as [number, number, number],     // Amber
  dark: [15, 23, 42] as [number, number, number],          // Slate 900
  muted: [100, 116, 139] as [number, number, number],      // Slate 500
  light: [248, 250, 252] as [number, number, number],      // Slate 50
};

/**
 * Add header to a page
 */
function addHeader(doc: jsPDF, title: string, pageNum: number, totalPages: number) {
  // Logo area
  doc.setFillColor(...COLORS.primary);
  doc.rect(MARGIN, MARGIN, 10, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Q", MARGIN + 3.5, MARGIN + 7);
  
  // Brand name
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.text("LeakDetector.ai", MARGIN + 14, MARGIN + 7);
  
  // Page indicator
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Page ${pageNum} of ${totalPages}`, PAGE_WIDTH - MARGIN, MARGIN + 7, { align: "right" });
  
  // Section title
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, MARGIN, MARGIN + 25);
  
  // Separator line
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, MARGIN + 30, PAGE_WIDTH - MARGIN, MARGIN + 30);
  
  return MARGIN + 40; // Return Y position for content
}

/**
 * Add footer to a page
 */
function addFooter(doc: jsPDF, businessName: string, date: string) {
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Confidential Report - ${businessName}`, MARGIN, PAGE_HEIGHT - 15);
  doc.text(date, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 15, { align: "right" });
}

/**
 * Draw a metric box
 */
function drawMetricBox(
  doc: jsPDF, 
  x: number, 
  y: number, 
  width: number, 
  height: number,
  label: string, 
  value: string, 
  color: [number, number, number] = COLORS.dark
) {
  // Background
  doc.setFillColor(...COLORS.light);
  doc.roundedRect(x, y, width, height, 3, 3, "F");
  
  // Label
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(label.toUpperCase(), x + 5, y + 10);
  
  // Value
  doc.setTextColor(...color);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(value, x + 5, y + 22);
}

/**
 * Page 1: Executive Summary
 */
function generatePage1(doc: jsPDF, data: ReportDataV2) {
  const y = addHeader(doc, "Executive Summary", 1, 6);
  const reportDate = new Date(data.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  // Business Info
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(data.business_name, MARGIN, y + 10);
  
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${data.city} • ${data.business_type.charAt(0).toUpperCase() + data.business_type.slice(1)}`, MARGIN, y + 18);
  
  // BIG LOSS NUMBER
  doc.setFillColor(254, 226, 226); // Red 100
  doc.roundedRect(MARGIN, y + 30, CONTENT_WIDTH, 50, 5, 5, "F");
  
  doc.setTextColor(...COLORS.danger);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("ESTIMATED QUARTERLY LOSS", MARGIN + 10, y + 45);
  
  doc.setFontSize(36);
  doc.text(formatCurrency(data.losses.quarterly), MARGIN + 10, y + 70);
  
  // Summary Text
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(data.executive_summary, CONTENT_WIDTH);
  doc.text(summaryLines, MARGIN, y + 100);
  
  // Key Metrics Grid
  const metricsY = y + 130;
  const boxWidth = (CONTENT_WIDTH - 10) / 2;
  
  drawMetricBox(doc, MARGIN, metricsY, boxWidth, 30, "Monthly Loss", formatCurrency(data.losses.monthly), COLORS.danger);
  drawMetricBox(doc, MARGIN + boxWidth + 10, metricsY, boxWidth, 30, "Annual Loss", formatCurrency(data.losses.annual), COLORS.danger);
  
  drawMetricBox(doc, MARGIN, metricsY + 35, boxWidth, 30, "Top Leak", data.leaks[0]?.name || "N/A", COLORS.warning);
  drawMetricBox(doc, MARGIN + boxWidth + 10, metricsY + 35, boxWidth, 30, "Recovery Potential", formatCurrency(data.recovery.annual) + "/yr", COLORS.success);
  
  // Tier Badge
  const tierColors: Record<string, [number, number, number]> = {
    priority_install: COLORS.danger,
    audit_pilot: COLORS.warning,
    waitlist: COLORS.muted
  };
  const tierLabels: Record<string, string> = {
    priority_install: "PRIORITY INSTALL",
    audit_pilot: "AUDIT PILOT",
    waitlist: "WAITLIST"
  };
  
  const tierY = metricsY + 80;
  doc.setFillColor(...(tierColors[data.tier] || COLORS.muted));
  doc.roundedRect(MARGIN, tierY, 60, 12, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(tierLabels[data.tier] || data.tier.toUpperCase(), MARGIN + 5, tierY + 8);
  
  addFooter(doc, data.business_name, reportDate);
}

/**
 * Page 2: Current State Analysis
 */
function generatePage2(doc: jsPDF, data: ReportDataV2) {
  doc.addPage();
  const y = addHeader(doc, "Current State Analysis", 2, 6);
  const reportDate = new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  
  // Input Metrics Table
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Your Input Metrics", MARGIN, y + 10);
  
  const inputData = [
    ["Leads per Month", data.inputs.leads_per_month.toString()],
    ["Missed Calls per Week", data.inputs.missed_calls_week.toString()],
    ["Response Time", data.inputs.response_time.replace(/_/g, " ")],
    ["Contact Rate", `${data.inputs.contact_rate}%`],
    ["Booking Rate", `${data.inputs.booking_rate}%`],
    ["Show Rate", `${data.inputs.show_rate}%`],
    ["Close Rate", `${data.inputs.close_rate}%`],
    ["Avg. Client Value", formatCurrency(data.inputs.avg_value)]
  ];
  
  let tableY = y + 20;
  inputData.forEach((row, i) => {
    const isEven = i % 2 === 0;
    if (isEven) {
      doc.setFillColor(...COLORS.light);
      doc.rect(MARGIN, tableY - 4, CONTENT_WIDTH, 10, "F");
    }
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(row[0], MARGIN + 5, tableY + 2);
    doc.setTextColor(...COLORS.dark);
    doc.setFont("helvetica", "bold");
    doc.text(row[1], PAGE_WIDTH - MARGIN - 5, tableY + 2, { align: "right" });
    tableY += 10;
  });
  
  // Funnel Performance
  tableY += 15;
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Funnel Performance", MARGIN, tableY);
  
  const funnelY = tableY + 10;
  const stageWidth = CONTENT_WIDTH / 5;
  
  data.funnel_current.forEach((stage, i) => {
    const x = MARGIN + (i * stageWidth);
    const healthColor = stage.percentage >= 70 ? COLORS.success : stage.percentage >= 40 ? COLORS.warning : COLORS.danger;
    
    // Stage box
    doc.setFillColor(...COLORS.light);
    doc.roundedRect(x + 2, funnelY, stageWidth - 4, 40, 2, 2, "F");
    
    // Health indicator
    doc.setFillColor(...healthColor);
    doc.rect(x + 2, funnelY, stageWidth - 4, 3, "F");
    
    // Stage name
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(stage.name.toUpperCase(), x + (stageWidth / 2), funnelY + 12, { align: "center" });
    
    // Count
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(stage.count.toString(), x + (stageWidth / 2), funnelY + 25, { align: "center" });
    
    // Percentage
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(9);
    doc.text(`${stage.percentage}%`, x + (stageWidth / 2), funnelY + 35, { align: "center" });
  });
  
  // Top Leaks
  const leaksY = funnelY + 60;
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Identified Revenue Leaks", MARGIN, leaksY);
  
  let leakY = leaksY + 10;
  data.leaks.slice(0, 4).forEach((leak, i) => {
    // Leak indicator
    doc.setFillColor(...COLORS.warning);
    doc.circle(MARGIN + 4, leakY + 2, 2, "F");
    
    // Leak name and loss
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(leak.name, MARGIN + 10, leakY + 4);
    
    doc.setTextColor(...COLORS.danger);
    doc.text(formatCurrency(leak.monthly_loss_estimate) + "/mo", PAGE_WIDTH - MARGIN, leakY + 4, { align: "right" });
    
    // Leak description
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const whyLines = doc.splitTextToSize(leak.why, CONTENT_WIDTH - 20);
    doc.text(whyLines[0], MARGIN + 10, leakY + 12);
    
    leakY += 22;
  });
  
  addFooter(doc, data.business_name, reportDate);
}

/**
 * Page 3: Cost of Inaction
 */
function generatePage3(doc: jsPDF, data: ReportDataV2) {
  doc.addPage();
  const y = addHeader(doc, "The Cost of Inaction", 3, 6);
  const reportDate = new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  
  // Loss Breakdown Grid
  const losses = [
    { label: "Daily Loss", value: formatCurrency(data.losses.daily), color: COLORS.muted },
    { label: "Weekly Loss", value: formatCurrency(data.losses.weekly), color: COLORS.muted },
    { label: "Monthly Loss", value: formatCurrency(data.losses.monthly), color: COLORS.warning },
    { label: "Quarterly Loss", value: formatCurrency(data.losses.quarterly), color: COLORS.danger },
    { label: "Annual Loss", value: formatCurrency(data.losses.annual), color: COLORS.danger },
    { label: "3-Year Loss", value: formatCompact(data.losses.three_year), color: COLORS.danger }
  ];
  
  const gridY = y + 10;
  const boxWidth = (CONTENT_WIDTH - 20) / 3;
  const boxHeight = 35;
  
  losses.forEach((loss, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = MARGIN + (col * (boxWidth + 10));
    const boxY = gridY + (row * (boxHeight + 10));
    
    // Box background - darker for bigger losses
    const intensity = i < 2 ? 248 : i < 4 ? 254 : 254;
    doc.setFillColor(intensity, i >= 4 ? 226 : 248, i >= 4 ? 226 : 252);
    doc.roundedRect(x, boxY, boxWidth, boxHeight, 3, 3, "F");
    
    // Label
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(loss.label.toUpperCase(), x + 5, boxY + 12);
    
    // Value
    doc.setTextColor(...loss.color);
    doc.setFontSize(i >= 4 ? 18 : 14);
    doc.setFont("helvetica", "bold");
    doc.text(loss.value, x + 5, boxY + 28);
  });
  
  // Competitor Analysis
  const compY = gridY + 100;
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("While You Wait, Competitors Capture Your Leads", MARGIN, compY);
  
  // Comparison table
  const headers = ["Metric", "You", "AI Competitors"];
  const compTableY = compY + 15;
  
  // Header row
  doc.setFillColor(...COLORS.dark);
  doc.rect(MARGIN, compTableY, CONTENT_WIDTH, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(headers[0], MARGIN + 5, compTableY + 7);
  doc.text(headers[1], MARGIN + 80, compTableY + 7);
  doc.text(headers[2], MARGIN + 130, compTableY + 7);
  
  // Data rows
  let rowY = compTableY + 10;
  data.competitor_comparison.slice(0, 5).forEach((comp, i) => {
    const isEven = i % 2 === 0;
    if (isEven) {
      doc.setFillColor(...COLORS.light);
      doc.rect(MARGIN, rowY, CONTENT_WIDTH, 10, "F");
    }
    
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(comp.metric, MARGIN + 5, rowY + 7);
    
    doc.setTextColor(...COLORS.danger);
    doc.text(String(comp.yours), MARGIN + 80, rowY + 7);
    
    doc.setTextColor(...COLORS.success);
    doc.text(String(comp.competitors), MARGIN + 130, rowY + 7);
    
    rowY += 10;
  });
  
  // Warning callout
  const warnY = rowY + 20;
  doc.setFillColor(254, 243, 199); // Amber 100
  doc.roundedRect(MARGIN, warnY, CONTENT_WIDTH, 25, 3, 3, "F");
  
  doc.setTextColor(...COLORS.warning);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("⚠️ Time is Money", MARGIN + 10, warnY + 10);
  
  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Every day without AI automation costs you ${formatCurrency(data.losses.daily)}`, MARGIN + 10, warnY + 19);
  
  addFooter(doc, data.business_name, reportDate);
}

/**
 * Page 4: The Solution
 */
function generatePage4(doc: jsPDF, data: ReportDataV2) {
  doc.addPage();
  const y = addHeader(doc, "The Solution", 4, 6);
  const reportDate = new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  
  // Projected Improvements
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("With AI Automation", MARGIN, y + 10);
  
  const improvements = [
    { label: "Contact Rate", current: `${data.current.contact_rate_effective}%`, projected: `${data.projected.contact_rate}%` },
    { label: "Response Time", current: data.inputs.response_time.replace(/_/g, " "), projected: "<1 second" },
    { label: "Availability", current: "Business hours", projected: "24/7/365" },
    { label: "Follow-up", current: "Manual (1-2 attempts)", projected: "Automated (8+ touches)" },
    { label: "Leads Contacted", current: data.current.leads_contacted.toString(), projected: data.projected.leads_contacted.toString() },
    { label: "Monthly Revenue", current: formatCurrency(data.current.monthly_revenue), projected: formatCurrency(data.projected.monthly_revenue) }
  ];
  
  const impY = y + 20;
  improvements.forEach((imp, i) => {
    const rowY = impY + (i * 18);
    
    // Alternating background
    if (i % 2 === 0) {
      doc.setFillColor(...COLORS.light);
      doc.rect(MARGIN, rowY - 4, CONTENT_WIDTH, 16, "F");
    }
    
    // Label
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(imp.label, MARGIN + 5, rowY + 6);
    
    // Current (red)
    doc.setTextColor(...COLORS.danger);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(imp.current, MARGIN + 80, rowY + 6);
    
    // Arrow
    doc.setTextColor(...COLORS.muted);
    doc.text("→", MARGIN + 120, rowY + 6);
    
    // Projected (green)
    doc.setTextColor(...COLORS.success);
    doc.text(imp.projected, MARGIN + 135, rowY + 6);
  });
  
  // Revenue Comparison Box
  const revY = impY + 130;
  
  // Current Revenue
  doc.setFillColor(254, 226, 226); // Red 100
  doc.roundedRect(MARGIN, revY, (CONTENT_WIDTH / 2) - 5, 45, 3, 3, "F");
  doc.setTextColor(...COLORS.danger);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("CURRENT MONTHLY", MARGIN + 10, revY + 15);
  doc.setFontSize(20);
  doc.text(formatCurrency(data.current.monthly_revenue), MARGIN + 10, revY + 35);
  
  // Projected Revenue
  doc.setFillColor(220, 252, 231); // Green 100
  doc.roundedRect(MARGIN + (CONTENT_WIDTH / 2) + 5, revY, (CONTENT_WIDTH / 2) - 5, 45, 3, 3, "F");
  doc.setTextColor(...COLORS.success);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("WITH AI (PROJECTED)", MARGIN + (CONTENT_WIDTH / 2) + 15, revY + 15);
  doc.setFontSize(20);
  doc.text(formatCurrency(data.projected.monthly_revenue), MARGIN + (CONTENT_WIDTH / 2) + 15, revY + 35);
  
  // Key Features
  const featY = revY + 60;
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Key Features", MARGIN, featY);
  
  const features = [
    "AI Receptionist - Never miss a call again",
    "Instant Response - <1 second reply to web leads",
    "24/7 Availability - Book appointments while you sleep",
    "Smart Follow-up - Automated 8+ touch sequences",
    "SMS Integration - Text reminders reduce no-shows"
  ];
  
  features.forEach((feat, i) => {
    const fY = featY + 12 + (i * 12);
    doc.setFillColor(...COLORS.success);
    doc.circle(MARGIN + 4, fY, 2, "F");
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(feat, MARGIN + 12, fY + 3);
  });
  
  addFooter(doc, data.business_name, reportDate);
}

/**
 * Page 5: ROI Analysis
 */
function generatePage5(doc: jsPDF, data: ReportDataV2) {
  doc.addPage();
  const y = addHeader(doc, "ROI Analysis", 5, 6);
  const reportDate = new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  
  // Investment Breakdown
  const boxWidth = (CONTENT_WIDTH - 10) / 2;
  
  drawMetricBox(doc, MARGIN, y + 10, boxWidth, 35, "Monthly Investment", formatCurrency(data.roi.monthlyInvestment), COLORS.dark);
  drawMetricBox(doc, MARGIN + boxWidth + 10, y + 10, boxWidth, 35, "Monthly Revenue Increase", formatCurrency(data.roi.monthlyRevenueIncrease), COLORS.success);
  
  drawMetricBox(doc, MARGIN, y + 50, boxWidth, 35, "Payback Period", `${data.roi.paybackPeriodDays} days`, COLORS.primary);
  drawMetricBox(doc, MARGIN + boxWidth + 10, y + 50, boxWidth, 35, "12-Month ROI", `${data.roi.twelveMonthROI}%`, COLORS.success);
  
  // Net Profit Projection
  const profitY = y + 100;
  doc.setFillColor(...COLORS.dark);
  doc.roundedRect(MARGIN, profitY, CONTENT_WIDTH, 50, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("FIRST YEAR NET PROFIT", MARGIN + 15, profitY + 18);
  
  doc.setFontSize(28);
  doc.setTextColor(...COLORS.success);
  doc.text(formatCurrency(data.roi.netProfitYear1), MARGIN + 15, profitY + 40);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`After ${formatCurrency(data.roi.monthlyInvestment * 12)} investment`, MARGIN + 120, profitY + 40);
  
  // ROI Timeline
  const timeY = profitY + 70;
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Return Timeline", MARGIN, timeY);
  
  const timeline = [
    { period: "Month 1", value: formatCurrency(data.roi.monthlyRevenueIncrease - data.roi.monthlyInvestment) },
    { period: "Quarter 1", value: formatCurrency((data.roi.monthlyRevenueIncrease - data.roi.monthlyInvestment) * 3) },
    { period: "Year 1", value: formatCurrency(data.roi.netProfitYear1) },
    { period: "Year 3", value: formatCurrency((data.roi.monthlyRevenueIncrease - data.roi.monthlyInvestment) * 36) }
  ];
  
  const timelineY = timeY + 15;
  timeline.forEach((item, i) => {
    const x = MARGIN + (i * ((CONTENT_WIDTH) / 4));
    
    doc.setFillColor(...COLORS.light);
    doc.roundedRect(x + 2, timelineY, (CONTENT_WIDTH / 4) - 6, 30, 2, 2, "F");
    
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(item.period, x + 6, timelineY + 10);
    
    doc.setTextColor(...COLORS.success);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(item.value, x + 6, timelineY + 24);
  });
  
  // Free Trial CTA
  const ctaY = timelineY + 50;
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(MARGIN, ctaY, CONTENT_WIDTH, 40, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("3-Day Free Trial", MARGIN + 15, ctaY + 18);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("No credit card required • Full access • Cancel anytime", MARGIN + 15, ctaY + 32);
  
  addFooter(doc, data.business_name, reportDate);
}

/**
 * Page 6: Next Steps
 */
function generatePage6(doc: jsPDF, data: ReportDataV2) {
  doc.addPage();
  const y = addHeader(doc, "Next Steps", 6, 6);
  const reportDate = new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  
  // Main CTA
  doc.setFillColor(...COLORS.danger);
  doc.roundedRect(MARGIN, y + 10, CONTENT_WIDTH, 50, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Stop the Bleeding Today", MARGIN + 20, y + 35);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`You're losing ${formatCurrency(data.losses.daily)} every single day.`, MARGIN + 20, y + 50);
  
  // Steps
  const stepsY = y + 80;
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Get Started in 3 Simple Steps", MARGIN, stepsY);
  
  const steps = [
    { num: "1", title: "Book a Demo", desc: "See the AI in action with a live demonstration tailored to your business." },
    { num: "2", title: "Start Free Trial", desc: "3 days of full access. No credit card required. Test with real leads." },
    { num: "3", title: "Watch Revenue Grow", desc: "Our team handles setup. You focus on closing more deals." }
  ];
  
  steps.forEach((step, i) => {
    const stepY = stepsY + 15 + (i * 35);
    
    // Step number circle
    doc.setFillColor(...COLORS.primary);
    doc.circle(MARGIN + 8, stepY + 10, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(step.num, MARGIN + 5.5, stepY + 14);
    
    // Step content
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(step.title, MARGIN + 25, stepY + 8);
    
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(step.desc, MARGIN + 25, stepY + 18);
  });
  
  // Contact Info
  const contactY = stepsY + 130;
  doc.setFillColor(...COLORS.light);
  doc.roundedRect(MARGIN, contactY, CONTENT_WIDTH, 45, 5, 5, "F");
  
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to Start?", MARGIN + 15, contactY + 18);
  
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("📞 Call: (555) 012-3456", MARGIN + 15, contactY + 32);
  doc.text("🌐 Web: leakdetector.ai/demo", MARGIN + 90, contactY + 32);
  
  // Urgency statement
  const urgencyY = contactY + 60;
  doc.setTextColor(...COLORS.danger);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`⏰ Every hour you wait costs ${formatCurrency(data.losses.per_hour)}`, MARGIN, urgencyY);
  
  addFooter(doc, data.business_name, reportDate);
}

/**
 * Main PDF Generation Function
 */
export async function generatePDF(data: ReportDataV2): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Generate all pages
  generatePage1(doc, data);
  generatePage2(doc, data);
  generatePage3(doc, data);
  generatePage4(doc, data);
  generatePage5(doc, data);
  generatePage6(doc, data);

  // Save the PDF
  const filename = `LeakDetector-Report-${data.business_name.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
}


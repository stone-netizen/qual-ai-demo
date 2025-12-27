import { CalculatorFormData } from "@/hooks/useCalculatorForm";
import { CalculationResult, Leak } from "@/utils/calculations";

export interface ReportPayload {
    business: {
        name: string;
        industry: string;
        revenueMonthly: number;
        avgTicket: number;
        leadsTotal: number;
        sourcesBreakdown: {
            calls: number;
            webForms: number;
            social: number;
        };
        responseTime: string;
        missedCallRate: string;
        afterHoursCoverage: string;
    };
    primaryConstraint: {
        id: string;
        title: string;
        summary: string;
    };
    leaks: {
        id: string;
        title: string;
        whatItMeans: string;
        whyCommon: string;
        estimateLow: number;
        estimateHigh: number;
        confidence: string;
        inputsUsed: string[];
    }[];
    assumptions: string[];
    disclaimers: string[];
    reportId: string;
    generatedAt: string;
}

export function buildReportPayload(
    formData: CalculatorFormData,
    results: CalculationResult
): ReportPayload {
    const leaks = results.leaks || [];

    // Find primary constraint (usually the highest rank leak)
    const primary = leaks.find(l => l.rank === 1) || leaks[0];

    const mappedLeaks = leaks.map(l => ({
        id: l.type,
        title: l.label,
        whatItMeans: l.recommendation,
        whyCommon: getWhyCommon(l.type),
        estimateLow: l.monthlyLossRange.conservative,
        estimateHigh: l.monthlyLossRange.aggressive,
        confidence: "Conservative",
        inputsUsed: getInputsUsed(l.type, formData)
    }));

    return {
        business: {
            name: formData.businessName,
            industry: formData.industry,
            revenueMonthly: formData.monthlyRevenue,
            avgTicket: formData.avgTransactionValue,
            leadsTotal: formData.totalMonthlyLeads,
            sourcesBreakdown: {
                calls: formData.inboundCalls,
                webForms: formData.webFormSubmissions,
                social: formData.socialInquiries,
            },
            responseTime: formData.avgResponseTime,
            missedCallRate: formData.missedCallRate,
            afterHoursCoverage: formData.answersAfterHours ? "Yes" : "No",
        },
        primaryConstraint: {
            id: primary?.type || "unknown",
            title: primary?.label || "General Operational Leakage",
            summary: primary?.recommendation || "Systemic gaps in lead processing and follow-up."
        },
        leaks: mappedLeaks,
        assumptions: [
            "Industry-standard lead conversion decay scales applied.",
            "Estimates based on trailing 3-month self-reported performance.",
            "Conservative 70% recovery coefficient applied to all upside projections."
        ],
        disclaimers: [
            "This diagnostic is a directional assessment, not a financial guarantee.",
            "Results are dependent on the accuracy of provided operational data.",
            "Verification is required before implementing any structural changes."
        ],
        reportId: `RLD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        generatedAt: new Date().toISOString()
    };
}

function getWhyCommon(type: string): string {
    switch (type) {
        case "missed-calls":
            return "Front desk staff are often optimized for service, not sales capture, leading to gaps during peak hours.";
        case "after-hours":
            return "30-50% of service demand occurs outside of 9-5 hours; without coverage, this demand is invisible.";
        case "slow-response":
            return "Lead value decays by 400% after 10 minutes of silence. Most manual systems cannot sustain 5-minute SLAs.";
        case "follow-up":
            return "80% of sales occur between the 5th and 12th contact attempt, yet 44% of operators stop after 1.";
        case "no-shows":
            return "Lack of automated multi-channel reminders (SMS/Email) leads to high mental friction for appointments.";
        default:
            return "Systemic handoff gaps and human-reliant processes create friction points that accumulate into revenue loss.";
    }
}

function getInputsUsed(type: string, data: CalculatorFormData): string[] {
    const common = ["Monthly Revenue", "Avg Transaction Value"];
    switch (type) {
        case "missed-calls":
            return [...common, "Inbound Call Volume", "Missed Call Rate"];
        case "after-hours":
            return [...common, "Business Hours", "Weekend/After-Hours Coverage"];
        case "slow-response":
            return [...common, "Avg Response Time", "Total Lead Volume"];
        case "follow-up":
            return [...common, "Follow-up Attempt Count", "Follow-up Percentage"];
        case "no-shows":
            return [...common, "Appt Show Rate", "Reminder System Status"];
        default:
            return common;
    }
}

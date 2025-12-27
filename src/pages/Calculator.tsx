import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendlyModal } from "@/components/CalendlyModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateAllLeaks } from "@/utils/calculations";
import { getBenchmark, getIndustryNames } from "@/utils/benchmarks";
import { calculateQuickScanRange } from "@/utils/quickScan";

const RESULTS_STORAGE_KEY = "leakDetectorResults";

type FlowStep = "scan" | "preview" | "detail" | "processing";

const CHALLENGES = [
  "We miss calls during business hours",
  "No coverage after 5pm or weekends",
  "We have old leads (3+ months) we never followed up with",
  "People book appointments but don't show up",
  "We're slow to respond (30+ min average)",
] as const;

const CHALLENGE_TO_LEAK: Record<(typeof CHALLENGES)[number], string> = {
  "We miss calls during business hours": "missed-calls",
  "No coverage after 5pm or weekends": "after-hours",
  "We have old leads (3+ months) we never followed up with": "no-follow-up",
  "People book appointments but don't show up": "no-show",
  "We're slow to respond (30+ min average)": "slow-response",
};

function formatShortCurrency(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

export default function Calculator() {
  const navigate = useNavigate();

  const [step, setStep] = useState<FlowStep>("scan");
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const stepOrder: FlowStep[] = ["scan", "detail", "processing"];
  const currentStepIndex = stepOrder.indexOf(step);
  const progress = ((currentStepIndex + 1) / stepOrder.length) * 100;

  // Step 1
  const industries = useMemo(() => getIndustryNames(), []);
  const [industry, setIndustry] = useState<string>("");
  const [monthlyRevenueInput, setMonthlyRevenueInput] = useState<string>("100000");
  const [leadVolume, setLeadVolume] = useState<number>(150);

  // Step 2
  const [range, setRange] = useState<{ min: number; max: number } | null>(null);

  // Step 3
  const [cardIndex, setCardIndex] = useState(0);
  const [closedDealsPerMonth, setClosedDealsPerMonth] = useState<number>(50);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [hasDormantLeads, setHasDormantLeads] = useState(false);
  const [dormantLeadCount, setDormantLeadCount] = useState<number>(400);
  const [hasPastCustomers, setHasPastCustomers] = useState(false);
  const [pastCustomerCount, setPastCustomerCount] = useState<number>(200);
  const [email, setEmail] = useState<string>("");

  const monthlyRevenue = useMemo(() => {
    const numeric = parseInt((monthlyRevenueInput || "").replace(/[^\d]/g, ""), 10);
    return Number.isFinite(numeric) ? numeric : 0;
  }, [monthlyRevenueInput]);

  const benchmark = useMemo(() => (industry ? getBenchmark(industry) : null), [industry]);

  const canCalculateScan = industry.length > 0 && monthlyRevenue >= 1000 && leadVolume >= 10;
  const canContinueDetail = useMemo(() => {
    if (cardIndex === 0) return closedDealsPerMonth >= 0;
    if (cardIndex === 1) return challenges.length > 0;
    if (cardIndex === 2) {
      if (hasDormantLeads && dormantLeadCount < 1) return false;
      if (hasPastCustomers && pastCustomerCount < 1) return false;
      return hasDormantLeads || hasPastCustomers || true;
    }
    if (cardIndex === 3) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return true;
  }, [cardIndex, challenges.length, closedDealsPerMonth, dormantLeadCount, email, hasDormantLeads, hasPastCustomers, pastCustomerCount]);

  const handleSkipDetail = () => {
    if (cardIndex < 3) {
      setCardIndex((i) => Math.min(3, i + 1));
    } else {
      void handleRunDetailed();
    }
  };

  const handleBack = () => {
    if (step === "scan") {
      navigate("/");
      return;
    }
    if (step === "detail") {
      if (cardIndex > 0) setCardIndex((i) => i - 1);
      else setStep("scan");
      return;
    }
  };

  const handleScanContinue = () => {
    const r = calculateQuickScanRange({ industry, monthlyRevenue, leadVolume });
    setRange({ min: r.minMonthlyLoss, max: r.maxMonthlyLoss });
    setCardIndex(0);
    setStep("detail");
  };

  const handleRunDetailed = async () => {
    setStep("processing");

    // Small, deliberate delay so the processing card is visible and feels intentional.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const b = benchmark ?? getBenchmark("Other");

    const selected = new Set(challenges);
    const missesCalls = selected.has(CHALLENGES[0]);
    const noAfterHours = selected.has(CHALLENGES[1]);
    const oldLeads = selected.has(CHALLENGES[2]);
    const noShows = selected.has(CHALLENGES[3]);
    const slowResponse = selected.has(CHALLENGES[4]);

    const inboundCalls = Math.round(leadVolume * 0.6);
    const webFormSubmissions = Math.round(leadVolume * 0.25);
    const socialInquiries = Math.max(0, leadVolume - inboundCalls - webFormSubmissions);

    const appointmentsBooked = noShows ? Math.max(10, Math.round(leadVolume * 0.4)) : 0;
    const noShowRate = b.noShowRate / 100;
    const appointmentsShowUp = noShows ? Math.round(appointmentsBooked * (1 - noShowRate)) : 0;

    const formData = {
      businessName: "Your Business",
      industry,
      yearsInBusiness: 3,
      monthlyRevenue,
      avgTransactionValue: b.avgTicket,
      email,

      totalMonthlyLeads: leadVolume,
      inboundCalls,
      webFormSubmissions,
      socialInquiries,

      closedDealsPerMonth: closedDealsPerMonth,
      avgResponseTime: slowResponse ? "30min-2hr" : "5-30min",
      followUpAllLeads: !oldLeads,
      percentageFollowedUp: oldLeads ? 60 : 100,
      avgFollowUpAttempts: oldLeads ? 3 : 4,
      consultationLength: 30,

      businessHoursStart: "09:00",
      businessHoursEnd: "18:00",
      openSaturday: false,
      openSunday: false,
      answersAfterHours: !noAfterHours,
      answersWeekends: !noAfterHours,
      missedCallRate: missesCalls ? "25-50" : "10-25",
      avgHoldTime: 0,

      requiresAppointments: noShows,
      appointmentsBooked,
      appointmentsShowUp,
      sendsReminders: noShows ? true : null,
      reminderCount: 1,
      reminderMethods: ["email"],
      chargesNoShowFee: null,
      daysUntilAppointment: 7,

      numSalesStaff: 3,
      avgHourlyLaborCost: 30,
      qualifiesLeads: false,
      percentageUnqualified: 25,
      usesCRM: null,
      crmName: "",

      hasDormantLeads,
      totalDormantLeads: hasDormantLeads ? dormantLeadCount : 0,
      databaseAge: "6-12months",
      everRecontactedDormant: false,
      percentageRecontactedDormant: 0,
      dormantResponseCount: 0,

      hasPastCustomers,
      numPastCustomers: hasPastCustomers ? pastCustomerCount : 0,
      avgTimeSinceLastPurchase: "6-12months",
      sendsReengagementCampaigns: false,
      reengagementFrequency: "rarely",
      reengagementResponseRate: 0,

      avgPurchasesPerCustomer: 3,
    } as const;

    const includeLeakTypes = new Set<string>();
    selected.forEach((c) => {
      const mapped = CHALLENGE_TO_LEAK[c as (typeof CHALLENGES)[number]];
      if (mapped) includeLeakTypes.add(mapped);
    });

    // Fallback: if somehow no range (deep link), recompute quickly
    const quickRange = range ?? (() => {
      const r = calculateQuickScanRange({ industry, monthlyRevenue, leadVolume });
      return { min: r.minMonthlyLoss, max: r.maxMonthlyLoss };
    })();

    const results = calculateAllLeaks(formData as any, {
      includeLeakTypes: includeLeakTypes.size ? includeLeakTypes : undefined,
      targetRange: quickRange,
    });

    const filteredResults = {
      ...results,
      operationalLeaks: results.operationalLeaks.filter(
        (leak) => includeLeakTypes.size === 0 || includeLeakTypes.has(leak.type)
      ),
      leaks: results.leaks.filter(
        (leak) => leak.type === "reactivation" || includeLeakTypes.size === 0 || includeLeakTypes.has(leak.type)
      ),
    };

    localStorage.setItem(
      RESULTS_STORAGE_KEY,
      JSON.stringify({
        results: filteredResults,
        formData,
        calculatedAt: new Date().toISOString(),
      })
    );

    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-slate-300 hover:text-white hover:bg-white/5 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-sm text-slate-400">
            {step === "scan" && "30 seconds"}
            {step === "preview" && "Instant preview"}
            {step === "detail" && "About 2 minutes"}
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6 mb-4">
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-white/70 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {currentStepIndex + 1} / {stepOrder.length} steps
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "scan" && (
            <motion.section
              key="scan"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto px-6"
            >
              <div className="min-h-[70dvh] flex items-center justify-center">
                <div className="w-full">
                  <h1 className="text-4xl font-black text-white tracking-tight mb-3">Revenue Diagnostic</h1>
                  <p className="text-slate-400 mb-10">
                    Get an instant directional estimate. Our model uses conservative assumptions designed to avoid inflated upside.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Monthly Revenue</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</div>
                        <Input
                          type="number"
                          value={monthlyRevenueInput}
                          onChange={(e) => setMonthlyRevenueInput(e.target.value)}
                          className="h-14 pl-10 bg-white/5 border-white/10 text-white"
                          placeholder="120000"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-slate-300">Rough Lead Volume</label>
                        <div className="text-sm text-slate-400 tabular-nums">{leadVolume} / month</div>
                      </div>
                      <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-5">
                        <Slider
                          min={10}
                          max={500}
                          step={10}
                          value={[leadVolume]}
                          onValueChange={(v) => setLeadVolume(v[0] ?? 150)}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-3">
                          <span>10</span>
                          <span>500</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleScanContinue}
                      disabled={!canCalculateScan}
                      className="w-full h-14 rounded-2xl bg-white text-black hover:bg-white/90 font-bold text-lg"
                    >
                      Calculate My Leaks →
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}



          {step === "detail" && (
            <motion.section
              key="detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto px-6"
            >
              <div className="min-h-[70dvh] flex items-center justify-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-sm text-slate-400">
                      Question {cardIndex + 1} of 4
                    </div>
                    <div className="text-sm text-slate-500">Personalized estimate</div>
                  </div>

                  <AnimatePresence mode="wait">
                    {cardIndex === 0 && (
                      <motion.div
                        key="q1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-3xl bg-white/5 border border-white/10 p-8"
                      >
                        <h2 className="text-2xl font-bold text-white mb-2">What is your average monthly gross revenue?</h2>
                        <p className="text-slate-400 mb-8">Trailing 3-month average is best for directional accuracy</p>
                        <Input
                          type="number"
                          value={closedDealsPerMonth}
                          onChange={(e) => setClosedDealsPerMonth(parseInt(e.target.value || "0", 10))}
                          className="h-14 bg-black/30 border-white/10 text-white"
                          placeholder="52"
                        />
                      </motion.div>
                    )}

                    {cardIndex === 1 && (
                      <motion.div
                        key="q2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-3xl bg-white/5 border border-white/10 p-8"
                      >
                        <h2 className="text-2xl font-bold text-white mb-2">Operational Response Gaps:</h2>
                        <p className="text-slate-400 mb-8">Select the patterns observed in your current operation</p>

                        <div className="space-y-4">
                          {CHALLENGES.map((c) => {
                            const checked = challenges.includes(c);
                            return (
                              <label
                                key={c}
                                className="flex items-start gap-3 rounded-2xl bg-black/30 border border-white/10 px-4 py-4 cursor-pointer hover:border-white/20 transition-colors"
                              >
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={(v) => {
                                    setChallenges((prev) => {
                                      const next = new Set(prev);
                                      if (v) next.add(c);
                                      else next.delete(c);
                                      return Array.from(next);
                                    });
                                  }}
                                />
                                <span className="text-slate-200">{c}</span>
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {cardIndex === 2 && (
                      <motion.div
                        key="q3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-3xl bg-white/5 border border-white/10 p-8"
                      >
                        <h2 className="text-2xl font-bold text-white mb-2">Dormant Leads & Win-Back Potential</h2>
                        <p className="text-slate-400 mb-8">Optional: identify contacts available for reactivation</p>

                        <div className="space-y-6">
                          <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-slate-200 font-medium">Dormant leads (old inquiries)</span>
                              <Checkbox
                                checked={hasDormantLeads}
                                onCheckedChange={(v) => setHasDormantLeads(Boolean(v))}
                              />
                            </label>
                            {hasDormantLeads && (
                              <div className="mt-4">
                                <Input
                                  type="number"
                                  value={dormantLeadCount}
                                  onChange={(e) => setDormantLeadCount(parseInt(e.target.value || "0", 10))}
                                  className="h-12 bg-black/30 border-white/10 text-white"
                                  placeholder="400"
                                />
                              </div>
                            )}
                          </div>

                          <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-slate-200 font-medium">Past customers (win-back)</span>
                              <Checkbox
                                checked={hasPastCustomers}
                                onCheckedChange={(v) => setHasPastCustomers(Boolean(v))}
                              />
                            </label>
                            {hasPastCustomers && (
                              <div className="mt-4">
                                <Input
                                  type="number"
                                  value={pastCustomerCount}
                                  onChange={(e) => setPastCustomerCount(parseInt(e.target.value || "0", 10))}
                                  className="h-12 bg-black/30 border-white/10 text-white"
                                  placeholder="200"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          onClick={() => {
                            setHasDormantLeads(false);
                            setDormantLeadCount(0);
                            setHasPastCustomers(false);
                            setPastCustomerCount(0);
                          }}
                          className="w-full justify-center text-slate-300 hover:text-white hover:bg-white/5 mt-6"
                        >
                          I don&apos;t have these contacts
                        </Button>
                      </motion.div>
                    )}

                    {cardIndex === 3 && (
                      <motion.div
                        key="q4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-3xl bg-white/5 border border-white/10 p-8"
                      >
                        <h2 className="text-2xl font-bold text-white mb-2">Email to send your full report:</h2>
                        <p className="text-slate-400 mb-8">We&apos;ll also save your results locally</p>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-14 bg-black/30 border-white/10 text-white"
                          placeholder="you@business.com"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <Button
                      onClick={() => {
                        if (cardIndex < 3) setCardIndex((i) => i + 1);
                        else void handleRunDetailed();
                      }}
                      disabled={!canContinueDetail}
                      className="h-12 px-8 rounded-2xl bg-emerald-500 text-black hover:bg-emerald-400 font-black uppercase italic shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                    >
                      {cardIndex < 3 ? "Continue →" : "Calculate Personalized Estimate →"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {step === "processing" && (
            <motion.section
              key="processing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto px-6"
            >
              <div className="min-h-[70dvh] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto"
                  >
                    <Loader2 className="w-16 h-16 text-white/80" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white">Generating your full report</h2>
                  <p className="text-slate-400">This takes a few seconds</p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </div>
  );
}

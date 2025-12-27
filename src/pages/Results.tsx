import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Edit3, ArrowUpRight, Loader2, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, CalculationResult } from "@/utils/calculations";
import { CalculatorFormData } from "@/hooks/useCalculatorForm";
import { toast } from "sonner";
import { CalendlyModal } from "@/components/CalendlyModal";
import { HeroSection } from "@/components/results/HeroSection";
import { QuickWinCard } from "@/components/results/QuickWinCard";
import { LeakBreakdownGrid } from "@/components/results/LeakBreakdownGrid";
import { ResultsCTA } from "@/components/results/ResultsCTA";
import { OperationalFlowchart } from "@/components/results/OperationalFlowchart";
import { OperatorInsights } from "@/components/results/OperatorInsights";
import { ConservativeAssumptions } from "@/components/results/ConservativeAssumptions";
import { PDFReportButton } from "@/components/PDFReportButton";
import { buildReportPayload } from "@/lib/report/buildReportPayload";


const RESULTS_STORAGE_KEY = "leakDetectorResults";

interface StoredResults {
  results: CalculationResult;
  formData: CalculatorFormData;
  calculatedAt: string;
}

export default function Results() {
  const navigate = useNavigate();
  const [storedData, setStoredData] = useState<StoredResults | null>(null);
  const [pulseBooking, setPulseBooking] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [showDesktopStickyBar, setShowDesktopStickyBar] = useState(false);
  const [showMobileStickyBar, setShowMobileStickyBar] = useState(false);
  const [showOtherLeaks, setShowOtherLeaks] = useState(false);

  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(RESULTS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: StoredResults = JSON.parse(saved);
        if (parsed.results && parsed.formData) {
          setStoredData(parsed);
        } else {
          navigate("/calculator");
        }
      } catch (e) {
        navigate("/calculator");
      }
    } else {
      navigate("/calculator");
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setShowDesktopStickyBar(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);

    // Mobile sticky bar delay
    const timer = setTimeout(() => {
      setShowMobileStickyBar(true);
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleEditInputs = () => navigate("/calculator");

  const handleNavigateToVSL = () => {
    toast.info("Preparing your walkthrough...");
    navigate("/vsl");
  };

  if (!storedData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 animate-pulse">Analyzing your revenue leaks...</p>
        </div>
      </div>
    );
  }

  const { results, formData } = storedData;

  const monthlyRevenue = formData.monthlyRevenue || 1;
  const percentOfRevenue = Math.min(Math.round((results.totalMonthlyLoss / monthlyRevenue) * 100), 90);
  const operationalLeaks = results.operationalLeaks ?? results.leaks.filter((l) => l.type !== "reactivation");
  const leakCount = operationalLeaks.length;
  const recoveryAmount = Math.round(results.totalMonthlyLoss * 0.65);
  const totalRange = {
    low: operationalLeaks.reduce((sum, leak) => sum + (leak.displayRange?.low || Math.round(leak.monthlyLoss * 0.85)), 0),
    mid: operationalLeaks.reduce((sum, leak) => sum + (leak.displayRange?.mid || leak.monthlyLoss), 0),
    high: operationalLeaks.reduce((sum, leak) => sum + (leak.displayRange?.high || Math.round(leak.monthlyLoss * 1.15)), 0),
  };
  const hasReactivation =
    !!results.reactivationOpportunity &&
    (results.reactivationOpportunity.monthlyLoss ?? 0) > 0 &&
    ((formData.totalDormantLeads ?? 0) > 0 || (formData.numPastCustomers ?? 0) > 0);

  const handleBookingSuccess = () => {
    setIsCalendlyOpen(false);
    setIsBookingComplete(true);
    toast.success("Call booked!", { description: "We've received your booking and are preparing your audit." });
  };

  if (isBookingComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-8"
        >
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-black italic">TECHNICAL REVIEW CONFIRMED</h1>
          <p className="text-slate-400 text-lg">
            We've received your request for a deep-dive audit. We're currently mapping your inputs to our operational benchmarks.
          </p>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400">Next Steps</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-slate-500 font-bold">1.</span>
                <p className="text-sm text-slate-300">Check your email for the confirmation link and calendar invite.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-500 font-bold">2.</span>
                <p className="text-sm text-slate-300">Bring your 30-day trailing data (Show rate, missed calls, etc.) to the 15-min review.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={() => setIsBookingComplete(false)} variant="outline" className="flex-1 h-12 rounded-xl border-white/10">
              Back to Report
            </Button>
            <Button onClick={() => window.open('https://maverickgrowth.com', '_blank')} className="flex-1 h-12 rounded-xl bg-white text-black font-bold">
              Explore Systems →
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white custom-scrollbar">


      {/* Persistent Desktop Header Bar */}
      <AnimatePresence>
        {showDesktopStickyBar && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-0 left-0 right-0 z-[55] hidden lg:block bg-black/90 backdrop-blur-md border-b border-white/10"
          >
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estimated Leakage:</span>
                <span className="text-xl font-black text-white tracking-tight tabular-nums">
                  {formatCurrency(totalRange.low)}–{formatCurrency(totalRange.high)} <span className="text-slate-500 text-sm font-medium">/ mo</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/vsl"
                  className="bg-white hover:bg-white/90 text-black font-black px-8 h-10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center no-underline"
                >
                  Walk Through This With Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-white">
            <div className="text-lg font-bold tracking-tight">Maverick Growth Systems</div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="hidden md:block text-xs text-slate-500 uppercase tracking-widest font-bold">Diagnostic Results</div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/vsl"
              className="hidden sm:flex items-center text-emerald-400 hover:text-emerald-300 font-bold px-3 py-2 rounded-md hover:bg-emerald-500/10 no-underline text-sm transition-colors"
            >
              Confirm Bottleneck
            </Link>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <Button variant="ghost" size="sm" onClick={handleEditInputs} className="text-slate-400 hover:text-white px-2">
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <HeroSection
          businessName={formData.businessName || "Your Business"}
          industry={formData.industry}
          monthlyLoss={results.totalMonthlyLoss}
          annualLoss={results.totalAnnualLoss}
          percentOfRevenue={percentOfRevenue}
          leakCount={leakCount}
          totalRange={totalRange}
          onBookCall={handleNavigateToVSL}
        />
        <div className="h-20" /> {/* Spacer */}


        <OperationalFlowchart leaks={operationalLeaks} onBookCall={handleNavigateToVSL} />

        {/* Other observed leaks section */}
        <div className="max-w-6xl mx-auto px-6 my-20">
          <button
            onClick={() => setShowOtherLeaks(!showOtherLeaks)}
            className="w-full flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                {showOtherLeaks ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Other observed leak details</h3>
                <p className="text-sm text-slate-500">View individual leak breakdowns, severity levels, and specific calculations</p>
              </div>
            </div>
          </button>

          <AnimatePresence>
            {showOtherLeaks && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-8">
                  <LeakBreakdownGrid
                    leaks={operationalLeaks}
                    onBookCall={handleNavigateToVSL}
                    industry={formData.industry || "med-spa"}
                    reactivationCard={hasReactivation ? (
                      <div className="mt-8">
                        <QuickWinCard
                          reactivation={results.reactivationOpportunity}
                          onViewPlan={handleNavigateToVSL}
                          compact
                        />
                      </div>
                    ) : null}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ConservativeAssumptions />

        <OperatorInsights leaks={results.leaks} />

        <div className="max-w-6xl mx-auto px-6 mb-12 flex justify-center">
          <PDFReportButton payload={buildReportPayload(formData, results)} />
        </div>

        <div
          ref={bookingRef}
          className={`transition-all duration-1000 ${pulseBooking ? "scale-[1.02] ring-4 ring-emerald-500/20 rounded-3xl" : ""}`}
        >
          <ResultsCTA
            onBookCall={handleNavigateToVSL}
          />
        </div>
      </main>

      {/* Sticky Mobile Bottom Bar */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-4 flex items-center gap-3 shadow-2xl pb-safe"
        >
          <Link
            to="/vsl"
            className="flex-1 h-14 bg-white text-black font-black text-base rounded-xl shadow-xl flex items-center justify-center gap-2 no-underline"
          >
            Walk Through This With Me
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </AnimatePresence>
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}

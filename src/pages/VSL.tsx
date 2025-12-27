import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Play, ShieldEllipsis, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendlyModal } from "@/components/CalendlyModal";
import { toast } from "sonner";

export default function VSL() {
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    const handleBookingSuccess = () => {
        setIsCalendlyOpen(false);
        toast.success("Call booked!", { description: "We've received your booking and are preparing your audit." });
    };

    return (
        <div className="min-h-screen bg-black text-white custom-scrollbar selection:bg-emerald-500/30 font-sans">
            {/* 1. Above-the-fold */}
            <section className="pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h1 className="text-[clamp(1.75rem,5vw,4.5rem)] font-black italic uppercase leading-[1.0] tracking-tight">
                            Your Business Is Leaking Revenue <br />
                            <span className="text-emerald-500">(And You Probably Can&apos;t See It)</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                            In this free 15-minute walkthrough, we&apos;ll show you exactly where you&apos;re losing money, time, and leads — and how others are fixing it fast with systems and AI.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. VSL Video Section */}
            <section className="pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-video rounded-[2.5rem] bg-black border border-white/5 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)] group cursor-pointer"
                    >
                        {/* Video Placeholder */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                            <div className="w-20 h-20 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 fill-current translate-x-0.5" />
                            </div>
                            <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-slate-500">Click to View the Technical Review Process (No Pitch)</p>
                        </div>

                        {/* Subtle Overlay Lines */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />
                    </motion.div>

                    <div className="mt-12 flex flex-col items-center space-y-4">
                        <Button
                            onClick={() => setIsCalendlyOpen(true)}
                            className="h-20 px-12 bg-emerald-500 hover:bg-emerald-400 text-black text-xl md:text-2xl font-black uppercase italic rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                        >
                            Verify My Results & Check Availability
                        </Button>
                        <div className="flex items-center gap-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                            <span>15 Minutes</span>
                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                            <span>No Sales Pitch</span>
                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                            <span>You Keep The Report</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Post-VSL Reinforcement */}
            <section className="py-24 px-6 border-t border-white/5 bg-black">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-black italic uppercase text-center mb-16">
                        What this call <span className="text-emerald-500">IS</span> — and what it <span className="text-slate-500 font-bold">is not</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* This IS */}
                        <div className="p-8 rounded-[2rem] bg-emerald-500/[0.03] border border-emerald-500/10 space-y-6">
                            <div className="flex items-center gap-3 text-emerald-500">
                                <CheckCircle2 className="w-6 h-6" />
                                <h3 className="text-xl font-black uppercase italic">This IS:</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Technical verification of your report data",
                                    "An honest look at uncaptured revenue gaps",
                                    "A \"worth fixing?\" feasibility check"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-slate-300 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* This IS NOT */}
                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                            <div className="flex items-center gap-3 text-slate-400">
                                <XCircle className="w-6 h-6" />
                                <h3 className="text-xl font-black uppercase italic">This IS NOT:</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "A masked sales pitch or software demo",
                                    "A theoretical academic discussion",
                                    "A high-pressure commitment to buy"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-slate-500 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-2 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. What Happens On The Call (Flowchart Style) */}
            <section className="py-24 px-6 bg-black border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black italic uppercase text-center mb-16 text-slate-500">
                        The 15-Minute Process
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
                        {/* Horizontal Line for Desktop */}
                        <div className="absolute top-[32px] left-[15%] right-[15%] h-px bg-white/5 hidden md:block" />

                        {[
                            { step: 1, label: "Input Verification", sub: "Ensuring your data matches reality", icon: HelpCircle, color: "text-slate-400" },
                            { step: 2, label: "Bottleneck Audit", sub: "Confirming the primary failure point", icon: HelpCircle, color: "text-emerald-500" },
                            { step: 3, label: "Economic Reality", sub: "Determining if the fix ROI exceeds cost", icon: Clock, color: "text-emerald-500" }
                        ].map((s, i) => (
                            <div key={i} className="relative z-10 w-full md:w-1/3 flex flex-col items-center text-center space-y-4">
                                <div className={`w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center ${s.color} shadow-[0_0_30px_rgba(16,185,129,0.05)]`}>
                                    <s.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-1 px-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 font-mono">Stage {s.step}</span>
                                    <h4 className="text-lg font-black uppercase italic text-white leading-tight">{s.label}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{s.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Final Booking CTA */}
            <section className="py-24 px-6 border-t border-white/5 bg-slate-900/10">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-tight">
                            Run a Quick <span className="text-emerald-500">Sanity Check</span> <br className="hidden md:block" /> on Your Math
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
                            If the model doesn&apos;t apply to your operation, we&apos;ll explain exactly why. No pitch, no pressure.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-6">
                        <Button
                            onClick={() => setIsCalendlyOpen(true)}
                            className="h-20 px-12 bg-emerald-500 hover:bg-emerald-400 text-black text-xl md:text-2xl font-black uppercase italic rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                        >
                            Verify Results & Schedule Tech Review
                            <ArrowRight className="w-6 h-6" />
                        </Button>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-2xl">
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                <ShieldEllipsis className="w-5 h-5 text-emerald-500 inline-block mr-2 -mt-1" />
                                <strong>The Verification Guarantee:</strong> If we can&apos;t confirm at least one meaningful operational gap in your workflow during the call, we&apos;ll explain exactly why the diagnostic model doesn&apos;t apply to your specific business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                    <div className="text-sm font-bold tracking-tight">Maverick Growth Systems</div>
                    <p className="text-xs font-medium">© 2025 • High-Resolution Revenue Operations</p>
                </div>
            </footer>

            <CalendlyModal
                isOpen={isCalendlyOpen}
                onClose={() => setIsCalendlyOpen(false)}
                onSuccess={handleBookingSuccess}
            />
        </div>
    );
}

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, TrendingUp, UserPlus, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Leak, formatCurrency } from "@/utils/calculations";
import { Button } from "@/components/ui/button";

interface OperationalFlowchartProps {
    leaks: Leak[];
    onBookCall: () => void;
}

interface FlowchartStep {
    id: string;
    label: string;
    status: 'working' | 'weak' | 'broken';
    icon: string;
    impact: number;
    description: string;
}

function getStepStatus(leaks: Leak[], types: string[]): 'working' | 'weak' | 'broken' {
    const stepLeaks = leaks.filter((l) => types.includes(l.type));
    if (stepLeaks.length === 0) return "working";

    // Primary bottleneck is the one with highest constraintScore
    const primaryLeak = [...leaks].sort((a, b) => (b.constraintScore || 0) - (a.constraintScore || 0))[0];

    if (stepLeaks.some((l) => l.type === primaryLeak?.type && l.monthlyLoss > 0)) return "broken";
    if (stepLeaks.some((l) => l.monthlyLoss > 0)) return "weak";
    return "working";
}

function getStepImpact(leaks: Leak[], types: string[]): number {
    return leaks
        .filter((l) => types.includes(l.type))
        .reduce((sum, l) => sum + l.monthlyLoss, 0);
}

function StepIcon({ name, className }: { name: string, className?: string }) {
    switch (name) {
        case "UserPlus": return <UserPlus className={className} />;
        case "Calendar": return <Calendar className={className} />;
        case "CheckCircle2": return <CheckCircle2 className={className} />;
        case "TrendingUp": return <TrendingUp className={className} />;
        default: return <CheckCircle2 className={className} />;
    }
}

function StatusBadge({ status, isBottleneck }: { status: 'broken' | 'weak' | 'working', isBottleneck: boolean }) {
    if (isBottleneck) {
        return (
            <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-500 rounded-full animate-pulse">
                Primary Bottleneck
            </span>
        );
    }
    if (status === 'weak') {
        return (
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest text-amber-500 rounded-full">
                Weak Point
            </span>
        );
    }
    return (
        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500 rounded-full">
            Optimal
        </span>
    );
}

export function OperationalFlowchart({ leaks, onBookCall }: OperationalFlowchartProps) {
    const flowchartSteps = [
        {
            id: "capture",
            label: "Lead Capture",
            status: getStepStatus(leaks, ["missed-calls", "after-hours", "hold-time"]),
            icon: "UserPlus",
            impact: getStepImpact(leaks, ["missed-calls", "after-hours", "hold-time"]),
            description: "Incoming lead reaches technical entry point.",
        },
        {
            id: "booking",
            label: "Appointment Booking",
            status: getStepStatus(leaks, ["slow-response", "no-follow-up"]),
            icon: "Calendar",
            impact: getStepImpact(leaks, ["slow-response", "no-follow-up"]),
            description: "Speed-to-lead and conversion to confirmed appt.",
        },
        {
            id: "show",
            label: "Show Rate",
            status: getStepStatus(leaks, ["no-show"]),
            icon: "CheckCircle2",
            impact: getStepImpact(leaks, ["no-show"]),
            description: "Prospect physically/digitally arrives for consult.",
        },
        {
            id: "conversion",
            label: "Lead Quality",
            status: getStepStatus(leaks, ["unqualified-leads"]),
            icon: "TrendingUp",
            impact: getStepImpact(leaks, ["unqualified-leads"]),
            description: "Optimizing for high-intent qualified pipeline.",
        }
    ].filter(step => Math.round(step.impact) > 0);

    const bottleneckIndex = flowchartSteps.findIndex(s => s.status === 'broken');

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex flex-col items-center gap-0">
                {flowchartSteps.map((step, index) => {
                    const isBottleneck = index === bottleneckIndex;
                    const isPostBottleneck = bottleneckIndex !== -1 && index > bottleneckIndex;

                    return (
                        <div key={step.id} className="w-full relative flex flex-col items-center">
                            {/* Vertical Connector */}
                            {index > 0 && !isPostBottleneck && (
                                <div className="h-12 flex flex-col items-center justify-center opacity-20">
                                    <ArrowDown className="w-5 h-5 text-white" />
                                </div>
                            )}

                            {/* Special Dependency Label */}
                            {bottleneckIndex !== -1 && index === bottleneckIndex + 1 && (
                                <div className="h-24 flex flex-col items-center justify-center">
                                    <div className="w-px h-10 bg-gradient-to-b from-red-500/50 to-transparent" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/50 my-2 text-center px-4">
                                        Downstream steps depend on fixing this
                                    </span>
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: isPostBottleneck ? 0.4 : 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`w-full max-w-2xl relative transition-all duration-700 ${isBottleneck ? 'z-20' : 'z-10'} ${isPostBottleneck ? 'blur-[1px]' : ''}`}
                            >
                                <div className={`
                  relative p-8 rounded-3xl border-2 transition-all duration-500 backdrop-blur-sm
                  ${isBottleneck
                                        ? "bg-black border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-bottleneck-pulse scale-[1.04]"
                                        : "bg-black border-white/5 hover:border-white/10"
                                    }
                `}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center transition-colors
                        ${step.status === 'broken' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                    step.status === 'weak' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                                        'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}
                      `}>
                                                <StepIcon name={step.icon} className="w-8 h-8" />
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                                    <h3 className={`text-xl font-black uppercase italic ${isBottleneck ? "text-white" : "text-white/90"}`}>
                                                        {step.label}
                                                    </h3>
                                                    <StatusBadge status={step.status} isBottleneck={isBottleneck} />
                                                </div>
                                                <p className="text-sm text-slate-500 max-w-sm font-medium">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <div className={`text-2xl md:text-3xl font-black tabular-nums ${step.status === 'broken' ? 'text-red-500' : 'text-white'}`}>
                                                {formatCurrency(step.impact)}
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                Est. Capacity Leak
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottleneck CTA */}
                                    {isBottleneck && (
                                        <div className="mt-8 pt-6 border-t border-red-500/20">
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                                <div className="space-y-1 text-center sm:text-left">
                                                    <p className="text-red-500 font-black uppercase italic text-sm">Primary Operational Failure Point</p>
                                                    <p className="text-xs text-slate-500 font-medium">Fixing this unlocks the downstream flow capacity.</p>
                                                </div>
                                                <Link
                                                    to="/vsl"
                                                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-black italic uppercase px-8 h-14 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 no-underline text-sm"
                                                >
                                                    Confirm This Bottleneck
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Minimal Connectors for post-bottleneck */}
                            {isPostBottleneck && index < flowchartSteps.length - 1 && (
                                <div className="h-10 w-px bg-white/5 my-2" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

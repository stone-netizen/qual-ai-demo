import { motion } from "framer-motion";
import { Play, ShieldCheck } from "lucide-react";

export function VSLTrustSection() {
    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase">
                        Watch: <span className="text-emerald-500">Why This Call Works</span>
                    </h2>
                    <p className="text-slate-400 font-medium">
                        (Even If You’ve Tried Other “Audits”)
                    </p>
                </div>

                <div className="relative aspect-video rounded-[3rem] bg-slate-900/40 border border-white/5 overflow-hidden group cursor-pointer shadow-[0_0_100px_rgba(16,185,129,0.05)]">
                    {/* Video Placeholder Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                        <div className="w-24 h-24 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                            <Play className="w-10 h-10 fill-current translate-x-1" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 italic">90 Second Trust Walkthrough</p>
                            <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase text-emerald-500/60 tracking-widest">
                                <ShieldCheck className="w-3 h-3" />
                                No Pitch Guarantee
                            </div>
                        </div>
                    </div>

                    {/* Subtle Overlay Lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />
                </div>

                <div className="mt-12 p-8 rounded-[2rem] bg-emerald-500/[0.03] border border-emerald-500/10 max-w-2xl mx-auto">
                    <p className="text-slate-400 text-center font-medium leading-relaxed italic">
                        &ldquo;In this quick call, I&apos;ll break down where you&apos;re likely leaking revenue... and exactly how to fix it — even if you don&apos;t hire us. It&apos;s short, direct, and insanely valuable.&rdquo;
                    </p>
                </div>
            </div>
        </section>
    );
}

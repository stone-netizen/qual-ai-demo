import { motion } from "framer-motion";

export function WhyThisExists() {
    return (
        <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-tight">
                        83% of Service Businesses We Review <br />
                        Are <span className="text-emerald-500">Leaking Money</span> Without Knowing It
                    </h2>
                </div>

                <div className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed space-y-6 max-w-2xl mx-auto">
                    <p>
                        Most owners are too close to their operations to see what&apos;s broken. We use our AI + system framework to spot blind spots — and recover thousands in lost revenue, time, or both.
                    </p>

                    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                        <p className="text-white font-bold italic uppercase tracking-wide">
                            The best part?
                        </p>
                        <p>
                            We do this in <span className="text-emerald-500">15 minutes</span>. And we <span className="text-emerald-500 font-bold uppercase">don&apos;t pitch</span> — we just show you what&apos;s fixable. If you want help after, we can talk.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

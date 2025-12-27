import { motion } from "framer-motion";
import { Search, MapPin, Zap, Layout } from "lucide-react";

const steps = [
    {
        title: "Lead Slippage Audit",
        description: "A breakdown of where your leads and customers are slipping through the cracks.",
        icon: Search
    },
    {
        title: "3 Automation Gaps",
        description: "We pinpoint the 3 most common gaps that we look for in every single business.",
        icon: Zap
    },
    {
        title: "Real-World Fixes",
        description: "Actual examples of how other owners fixed their \"leaks\" fast with systems.",
        icon: Layout
    },
    {
        title: "Personalized Roadmap",
        description: "A custom clarity map you take home — use it solo or with our help.",
        icon: MapPin
    }
];

export function RecoveryMap() {
    return (
        <section className="py-24 bg-black overflow-hidden border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase">
                        What You’ll Get In This <span className="text-emerald-500">Free Walkthrough</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                        This is not a demo. It’s a technical diagnostic of your current revenue operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6 hover:border-emerald-500/20 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                <step.icon className="w-7 h-7" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-black uppercase italic text-white leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

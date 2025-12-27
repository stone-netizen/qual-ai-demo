import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Zap } from "lucide-react";

const outcomes = [
    {
        title: "+$14,770/mo",
        description: "Saved revenue for a scaling gym in 9 days.",
        icon: TrendingUp,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        title: "36 Hours",
        description: "Saved per month with a single automated workflow.",
        icon: Clock,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "3X Reviews",
        description: "Increase in customer reviews using automated follow-ups.",
        icon: Star,
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        title: "< 60 Seconds",
        description: "Lead response time achieved consistently across teams.",
        icon: Zap,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    }
];

export function ProofOutcomes() {
    return (
        <section className="py-24 bg-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase">
                        What happens when you <span className="text-emerald-500">plug the leaks?</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                        Real outcomes from service businesses recovering lost revenue and time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {outcomes.map((outcome, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${outcome.bg} ${outcome.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <outcome.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black italic uppercase mb-2 leading-tight">
                                {outcome.title}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                {outcome.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

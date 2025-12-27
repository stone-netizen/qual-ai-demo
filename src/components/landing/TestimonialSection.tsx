import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";

const testimonials = [
    {
        quote: "I honestly didn't expect much — but I walked away with $14K in recovered monthly revenue. Wild.",
        author: "Service Business Owner",
        location: "Growth Model User"
    },
    {
        quote: "They pointed out 3 things I missed that were costing me time every week. Implemented in 48 hours.",
        author: "Operations Manager",
        location: "Home Services"
    },
    {
        quote: "It felt like he knew more about my customer journey than I did.",
        author: "Med Spa Founder",
        location: "Technical Audit Recipient"
    }
];

export function TestimonialSection() {
    return (
        <section className="py-24 bg-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase">
                        What Business Owners <span className="text-emerald-500">Are Saying</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                        Real feedback from owners who completed the 15-minute Revenue Leak Audit.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative group hover:border-emerald-500/20 transition-all"
                        >
                            <MessageSquareQuote className="w-10 h-10 text-emerald-500/10 absolute top-8 right-10 group-hover:text-emerald-500/20 transition-colors" />
                            <p className="text-xl font-bold italic text-white mb-8 leading-relaxed relative z-10">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                    <span className="text-sm font-black text-emerald-500">0{i + 1}</span>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-black uppercase text-white tracking-widest">{t.author}</p>
                                    <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{t.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { Check } from "lucide-react";

const industries = ["Gyms", "Clinics", "Agencies", "Med Spas", "Contractors", "Coaches", "Consultants", "Law Firms", "HVAC", "Salons", "E-com", "SaaS"];

const stats = [
    { label: "+$22K Saved", sub: "For a gym in 9 days" },
    { label: "76 Hours", sub: "Automated per month" },
    { label: "3X Reviews", sub: "Via auto follow-up" },
    { label: "30 Seconds", sub: "Lead response time" }
];

export function SocialProof() {
    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase">
                        Trusted by <span className="text-emerald-500">80+ Service Businesses</span> <br />
                        Across 12 Industries
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3 pt-8">
                        {industries.map((badge, i) => (
                            <div key={i} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-white/5 pt-16">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center space-y-1">
                            <div className="text-2xl md:text-3xl font-black italic uppercase text-emerald-500">{stat.label}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{stat.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

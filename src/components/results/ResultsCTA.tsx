import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ResultsCTAProps {
  onBookCall: () => void;
}

export function ResultsCTA({ onBookCall }: ResultsCTAProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-black border border-emerald-500/20 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-32 h-32 text-emerald-500" />
        </div>

        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase mb-6 leading-tight">
            Verify Results & <span className="text-emerald-500">Schedule</span> Technical Review
          </h2>

          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            The next step isn&apos;t to buy software or hire more people. It is to verify whether these bottlenecks actually exist in your business.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-1">Technical Review</h4>
                <p className="text-xs text-slate-500">Cross-reference your report against your actual lead logs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-1">No Pitch Guarantee</h4>
                <p className="text-xs text-slate-500">If the model doesn&apos;t apply, we&apos;ll explain why. No sales pitch.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/vsl"
              className="w-full sm:w-auto h-16 px-12 bg-emerald-500 hover:bg-emerald-400 text-black text-xl font-black uppercase italic rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-3 active:scale-95 no-underline shadow-lg"
            >
              Verify Results & Plan Prescription
              <ArrowUpRight className="w-6 h-6" />
            </Link>
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] font-black">
              15 minutes • No pitch • If the model doesn&apos;t apply, we&apos;ll explain why.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

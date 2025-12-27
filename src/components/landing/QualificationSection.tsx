import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

export function QualificationSection() {
  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase text-slate-500">
            Who Should Book This <br />
            <span className="text-white">(And Who Shouldn&apos;t)</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* This IS for you */}
          <div className="p-10 rounded-[2.5rem] bg-emerald-500/[0.03] border border-emerald-500/10 space-y-8">
            <div className="flex items-center gap-3 text-emerald-500">
              <CheckCircle2 className="w-8 h-8" />
              <h3 className="text-2xl font-black italic uppercase">This IS for you if:</h3>
            </div>
            <ul className="space-y-6">
              {[
                "You run a service-based business (local or remote)",
                "You have at least a trickle of leads or customers",
                "You want to grow faster without hiring more people"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-slate-300 font-medium">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                  <span className="text-lg leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* This IS NOT for you */}
          <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
            <div className="flex items-center gap-3 text-slate-600">
              <XCircle className="w-8 h-8" />
              <h3 className="text-2xl font-black italic uppercase">This ISN&apos;T for you if:</h3>
            </div>
            <ul className="space-y-6">
              {[
                "You&apos;re just starting out with no active clients",
                "You aren&apos;t open to using automation or AI",
                "You&apos;re looking for free coaching or tech support"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-slate-600 font-medium">
                  <div className="w-2 h-2 rounded-full bg-slate-800 mt-2.5 shrink-0" />
                  <span className="text-lg leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

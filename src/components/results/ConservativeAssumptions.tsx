import { Shield } from "lucide-react";

export function ConservativeAssumptions() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="rounded-2xl bg-black border border-white/5 p-8 shadow-[0_0_50px_rgba(16,185,129,0.02)]">
        <h3 className="text-xl font-black italic uppercase text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500" />
          Why this estimate is conservative
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-300">
          <div className="space-y-2">
            <div className="font-semibold text-white">Observed Ranges</div>
            <p className="text-slate-400">
              Uses observed response-rate ranges from similar practices in your industry.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-white">Partial Recovery</div>
            <p className="text-slate-400">
              Assumes partial recovery of lost revenue, not immediate full capture of every lead.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-white">Direct Loss Only</div>
            <p className="text-slate-400">
              Excludes upsells, referrals, and lifetime value (LTV) expansion from recovered clients.
            </p>
          </div>
        </div>
        <div className="mt-8 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <p className="text-sm text-slate-300">
            <strong>The goal:</strong> To provide a baseline reality check of the revenue that never makes it to your front desk, using the most conservative math possible.
          </p>
        </div>
      </div>
    </div>
  );
}


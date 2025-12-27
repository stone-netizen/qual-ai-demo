export function ToolExplanation() {
  return (
    <section className="bg-slate-950 text-white py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">What this diagnostic does</h2>
          <p className="text-slate-300 max-w-3xl">
            We estimate revenue loss from operational gaps using conservative assumptions and observed patterns.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-100">What this estimates</h3>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>Missed calls and after-hours coverage gaps</li>
              <li>Slow response and limited follow-up</li>
              <li>No-show appointments</li>
              <li>Dormant leads left untouched</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-black/40 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-200">What this is not</h3>
            <ul className="space-y-1 text-slate-400 text-sm">
              <li>Not a guarantee</li>
              <li>Not a sales pitch</li>
              <li>Not pulling data from your systems</li>
              <li>Not using inflated best-case assumptions</li>
            </ul>
          </div>
        </div>

        <div className="text-sm text-slate-400">
          This is a directional estimate designed to highlight where to look first. Estimates are based on observed patterns across service businesses in the $50K–$500K/month range.
        </div>
      </div>
    </section>
  );
}


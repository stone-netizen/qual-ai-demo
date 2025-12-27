export function QualificationSectionV2() {
  return (
    <section className="bg-slate-950 text-white py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Who this is for (and not for)</h2>
          <p className="text-slate-400">Built for owners with inbound demand who want to see where it leaks.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <h3 className="text-lg font-semibold text-white">Useful if you:</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>Handle inbound calls or leads</li>
              <li>Book appointments or consultations</li>
              <li>Spend money to generate demand</li>
            </ul>
            <p className="text-xs text-slate-500 pt-2">This tool assumes you already generate inbound demand.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <h3 className="text-lg font-semibold text-white">Probably not useful if you:</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>Don’t take calls or inbound leads</li>
              <li>Are pre-revenue</li>
              <li>Are not addressing operational gaps</li>
            </ul>
            <p className="text-xs text-slate-500 pt-2">This tool assumes you already generate inbound demand.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


export function HowItWorks() {
  const steps = [
    {
      title: "Answer a few operational questions",
      copy: "No login or signup. Just the basics about calls, follow-up, and appointments.",
    },
    {
      title: "See where revenue is leaking",
      copy: "Instant breakdown with conservative estimates and system-by-system impact.",
    },
    {
      title: "Optional: validate the numbers with a free review",
      copy: "If the numbers matter, you can book a free review to validate them—no pitch.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-slate-950 text-white py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">How it works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Simple, fast, and built to give you clarity without the sales pressure.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold text-white">
                {idx + 1}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-slate-300">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


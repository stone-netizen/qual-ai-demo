import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950 to-slate-950" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wide text-slate-300">
          Fast, free, diagnostic — no signup
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="text-sm text-slate-300">
            This diagnostic estimates revenue loss from operational gaps — not marketing performance.
          </p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black leading-tight">
            Run a revenue leak diagnostic on your systems.
          </h1>
          <p className="text-lg text-slate-200">
            Most service businesses lose revenue from missed calls, slow response, and broken follow-up.
          </p>
          <p className="text-base text-slate-400">
            Conservative, directional, and fast: under 3 minutes, no credit card, instant results.
          </p>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <Button
            size="lg"
            onClick={onStart}
            className="px-10 py-4 h-auto text-lg font-semibold rounded-xl bg-white text-slate-950 hover:bg-white/90"
          >
            Run Revenue Diagnostic
          </Button>
          <div className="text-sm text-slate-400 flex gap-3">
            <span>≈3 minutes</span>
            <span>•</span>
            <span>No credit card</span>
            <span>•</span>
            <span>Instant results</span>
          </div>
          <div className="text-sm text-slate-500">
            Most owners are surprised by where the losses actually come from.
          </div>
        </div>
      </div>
    </section>
  );
}


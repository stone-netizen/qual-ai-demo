import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  onStart: () => void;
}

export function FinalCTA({ onStart }: FinalCTAProps) {
  return (
    <section className="bg-slate-950 text-white py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold">See what’s leaking. No pressure.</h2>
        <p className="text-slate-300">
          Run the diagnostic, get the numbers, then decide what to do next. No sales pitch—just clarity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4">
          <Button
            size="lg"
            onClick={onStart}
            className="px-10 py-4 h-auto text-lg font-semibold rounded-xl bg-white text-slate-950 hover:bg-white/90"
          >
            Run Revenue Diagnostic
          </Button>
          <button
            onClick={onStart}
            className="text-sm text-slate-300 underline-offset-4 hover:underline"
            type="button"
          >
            See example output
          </button>
        </div>
      </div>
    </section>
  );
}


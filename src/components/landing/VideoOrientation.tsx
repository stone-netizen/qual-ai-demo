interface VideoOrientationProps {
  onStart?: () => void;
}

export function VideoOrientation({ onStart }: VideoOrientationProps) {
  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="space-y-3">
          <p className="text-sm text-slate-400 uppercase tracking-wide">
            Watch before running the diagnostic (2 min)
          </p>
          <div className="relative rounded-2xl border border-slate-800 bg-black/50 aspect-video overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-slate-200">
                <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-lg font-semibold">
                  ▶
                </div>
                <div className="text-center text-sm text-slate-300">
                  Orientation: why this diagnostic exists, how to interpret the results, what to do next.
                </div>
                {onStart && (
                  <button
                    onClick={onStart}
                    className="text-xs text-slate-400 underline-offset-4 hover:underline"
                  >
                    Skip to diagnostic
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import { motion } from "framer-motion";

interface OrientationVideoCardProps {
  onSkip: () => void;
}

export function OrientationVideoCard({ onSkip }: OrientationVideoCardProps) {
  return (
    <section className="bg-black text-white py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="rounded-3xl border border-white/5 bg-black p-4 sm:p-6 lg:p-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start lg:items-center shadow-[0_0_50px_rgba(16,185,129,0.05)]">
          {/* Video Section - Mobile: Full width, Desktop: Left column */}
          <div className="space-y-4 w-full">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-slate-500 text-center lg:text-left">
              Orientation (2 minutes)
            </p>
            <div className="aspect-video w-full rounded-xl border border-white/10 bg-black relative overflow-hidden flex items-center justify-center group/video">
              <div className="flex flex-col items-center gap-3 text-emerald-400 px-4 sm:px-6 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center text-base sm:text-lg font-semibold group-hover/video:bg-emerald-500/10 transition-colors">
                  ▶
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                  "This diagnostic identifies where demand may be leaking after it’s already been generated."
                </div>
                <button
                  onClick={onSkip}
                  className="text-[11px] sm:text-xs text-slate-300 underline-offset-4 hover:underline active:opacity-70 transition-opacity min-h-[44px] px-4"
                  type="button"
                >
                  Skip → Check for Revenue Leaks
                </button>
              </div>
            </div>
          </div>

          {/* Learning Objectives - Mobile: Full width below, Desktop: Right column */}
          <div className="space-y-3 sm:space-y-4 text-sm text-slate-300 w-full">
            <div className="font-semibold text-white text-center lg:text-left text-base sm:text-lg">
              What you&apos;ll learn
            </div>
            <ul className="space-y-2 sm:space-y-2.5 text-slate-300 text-left max-w-md mx-auto lg:mx-0">
              <li className="text-xs sm:text-sm leading-relaxed">
                Why most revenue leaks happen after the lead raises their hand
              </li>
              <li className="text-xs sm:text-sm leading-relaxed">
                What this diagnostic measures (and what it deliberately ignores)
              </li>
              <li className="text-xs sm:text-sm leading-relaxed">
                How to interpret the numbers without overreacting
              </li>
              <li className="text-xs sm:text-sm leading-relaxed">
                What owners usually do after seeing the results
              </li>
            </ul>
            <div className="text-[10px] sm:text-xs text-slate-500 text-center lg:text-left pt-2">
              Optional to watch. You can skip and run the diagnostic immediately.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


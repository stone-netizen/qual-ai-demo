import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ExampleOutputModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-slate-300 hover:text-white hover:bg-white/5"
        type="button"
      >
        See example output
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-950 p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-400">Prototype output</div>
                  <div className="text-lg font-semibold text-white">Revenue Leak Diagnostic (example)</div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white text-sm"
                  type="button"
                >
                  Close
                </button>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
                <div className="text-xs text-slate-400">Estimated monthly leakage</div>
                <div className="text-3xl font-black text-white">$18,000 - $26,000</div>
                <div className="text-xs text-slate-500">Directional. Conservative ranges based on operational gaps.</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                  <div className="text-slate-400 text-xs mb-1">#1</div>
                  <div className="text-white font-semibold">Missed calls</div>
                  <div className="text-slate-500 text-xs">Coverage gaps and slow pickup</div>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                  <div className="text-slate-400 text-xs mb-1">#2</div>
                  <div className="text-white font-semibold">Slow response</div>
                  <div className="text-slate-500 text-xs">Beyond SLA window</div>
                </div>
              </div>

              <div className="text-xs text-slate-500">
                You&apos;ll see a ranked list of system gaps, conservative dollar ranges, and what to verify next. No signup required.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


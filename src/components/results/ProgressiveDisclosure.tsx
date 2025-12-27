import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ProgressiveDisclosureProps {
  summary?: string;
  children: React.ReactNode;
  label?: string;
}

export function ProgressiveDisclosure({ summary, children, label = "Show details" }: ProgressiveDisclosureProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-medium text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-3 hover:bg-white/10 transition"
      >
        <span>{summary || label}</span>
        <span className="text-slate-400 text-xs">{open ? "Hide" : "Show"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-3 text-sm text-slate-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


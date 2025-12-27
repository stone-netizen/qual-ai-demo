import { AnimatePresence, motion } from "framer-motion";
import { DiagnosticContent, DiagnosticSectionId } from "@/utils/diagnosticContent";

interface DiagnosticPanelProps {
  id: string;
  content: DiagnosticContent;
  isOpen: boolean;
}

const sections: { id: DiagnosticSectionId; title: string }[] = [
  { id: "happening", title: "What’s actually happening" },
  { id: "invisible", title: "Why you don’t notice it" },
  { id: "compounds", title: "Why it compounds" },
];

export function DiagnosticPanel({ id, content, isOpen }: DiagnosticPanelProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
          role="region"
          aria-labelledby={`${id}-heading`}
          id={id}
        >
          <div className="mt-3 p-4 rounded-xl bg-black/30 border border-slate-700 text-sm text-slate-200 space-y-4">
            <p className="text-slate-200 text-sm">
              This is the most common failure pattern we see when auditing med spas at your revenue level.
            </p>
            {sections.map((section) => {
              const block = content[section.id];
              return (
                <div key={section.id} className="space-y-2">
                  <div className="flex items-center gap-2" id={`${id}-${section.id}`}>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-slate-100">
                      {section.id === "happening" ? "1" : section.id === "invisible" ? "2" : "3"}
                    </span>
                    <p className="text-white font-semibold">{section.title}</p>
                  </div>
                  <p className="text-slate-300 text-sm">{block.summary}</p>
                  {block.bullets.length > 0 && (
                    <ul className="space-y-1 pl-4 text-slate-300 text-sm list-disc">
                      {block.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.id === "compounds" && (
                    <p className="text-slate-200 text-sm">
                      This is why fixing call capture is usually the fastest revenue win.
                    </p>
                  )}
                  {section.id !== "compounds" && <div className="border-t border-slate-700 pt-3" />}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


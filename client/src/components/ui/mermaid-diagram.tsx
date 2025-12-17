import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  fontFamily: "Inter, sans-serif",
});

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Directly render would be better but simple reload works for now or unique ID
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      ref.current.innerHTML = `<div class="mermaid" id="${id}">${chart}</div>`;
      mermaid.run({ nodes: [ref.current.querySelector('.mermaid') as HTMLElement] });
    }
  }, [chart]);

  return <div ref={ref} className="w-full overflow-x-auto p-4 bg-white rounded-lg border border-border/50" />;
}

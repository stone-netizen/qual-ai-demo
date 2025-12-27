import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function StickyNav() {
  const navigate = useNavigate();
  const [showSolid, setShowSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.15;
      setShowSolid(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${showSolid ? "bg-black/90 border-b border-black/70 backdrop-blur" : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="text-lg font-bold text-white">Maverick Growth Systems</div>
        <Button
          size="sm"
          onClick={() => navigate("/calculator")}
          className="bg-white text-slate-950 hover:bg-white/90"
        >
          Check for Revenue Leaks
        </Button>
      </div>
    </header>
  );
}


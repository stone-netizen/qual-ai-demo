import { useNavigate } from "react-router-dom";
import { StickyNav } from "@/components/landing/StickyNav";
import { HeroSectionV2 } from "@/components/landing/HeroSectionV2";
import { SocialProof } from "@/components/landing/SocialProof";
import { WhyThisExists } from "@/components/landing/WhyThisExists";
import { RecoveryMap } from "@/components/landing/RecoveryMap";
import { QualificationSection } from "@/components/landing/QualificationSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { VSLTrustSection } from "@/components/landing/VSLTrustSection";
import { FinalCTAV2 } from "@/components/landing/FinalCTAV2";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Landing = () => {
  const navigate = useNavigate();

  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* White Light Effect at Center Top */}
      <div className="fixed inset-x-0 top-0 flex justify-center pointer-events-none z-0">
        <div className="relative w-[90vw] max-w-4xl h-[45vh] max-h-[420px]">
          <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-white/5 to-transparent blur-3xl opacity-50" />
        </div>
      </div>

      <StickyNav />

      <main className="relative z-10">
        <HeroSectionV2 onStart={() => navigate("/calculator")} />
        <SocialProof />
        <WhyThisExists />
        <RecoveryMap />
        <QualificationSection />
        <TestimonialSection />
        <VSLTrustSection />
        <FinalCTAV2 onStart={() => navigate("/calculator")} />
      </main>

      <footer className="py-12 border-t border-white/5 px-6 bg-black relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="text-sm font-bold tracking-tight uppercase">Maverick Growth Systems</div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">© 2025 • High-Resolution Revenue Operations</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

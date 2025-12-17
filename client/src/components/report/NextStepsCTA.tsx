/**
 * NextStepsCTA Component - Urgency Version
 * 
 * Adds psychological pressure:
 * - Limited availability badge
 * - Dynamic opportunity amount
 * - Closing statement with choice framing
 */

import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";

interface NextStepsCTAProps {
  monthlyOpportunity: number;
  onScheduleClick?: () => void;
}

export function NextStepsCTA({ 
  monthlyOpportunity,
  onScheduleClick 
}: NextStepsCTAProps) {
  const handleClick = () => {
    if (onScheduleClick) {
      onScheduleClick();
    }
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/evensonstone/new-meeting";
    window.open(calendlyUrl, "_blank");
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to stop the bleeding?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Schedule a 30-minute consultation. We'll show you exactly how to capture the{' '}
            <strong className="text-slate-900">{formatCurrency(monthlyOpportunity)}/month</strong>{' '}
            you're currently leaving on the table.
          </p>
        </div>

        {/* Limited availability indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6 w-fit mx-auto">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Only 2 consultation slots available this week</span>
        </div>

        {/* Main CTA Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="px-12 py-6 text-lg bg-blue-600 hover:bg-blue-700 h-auto"
            onClick={handleClick}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Consultation
          </Button>
        </div>

        <p className="text-sm text-slate-500 text-center mt-4">
          No commitment • Free analysis • Same-day implementation available
        </p>

        {/* The Closer - Choice Framing */}
        <div className="mt-8 pt-8 border-t border-blue-200">
          <p className="text-center text-slate-700 font-medium">
            By next week, you could either be{' '}
            <span className="text-green-600">capturing that revenue</span>{' '}
            or{' '}
            <span className="text-red-600">watching it go to competitors</span>.{' '}
            Your choice.
          </p>
        </div>

      </div>

    </section>
  );
}

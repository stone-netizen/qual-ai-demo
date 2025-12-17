/**
 * NextSteps Component
 * 
 * Clear 3-step process + CTA
 * Removes anxiety by showing exactly what happens next
 * Real availability, not fake scarcity
 */

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";

interface NextStepsProps {
  monthlyOpportunity: number;
  onScheduleClick?: () => void;
}

// Get next available date (tomorrow at 2pm)
function getNextAvailable(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const day = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
  return `${day} at 2:00 PM`;
}

export function NextSteps({ 
  monthlyOpportunity,
  onScheduleClick 
}: NextStepsProps) {
  const handleClick = () => {
    if (onScheduleClick) {
      onScheduleClick();
    }
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/evensonstone/new-meeting";
    window.open(calendlyUrl, "_blank");
  };

  const nextAvailable = getNextAvailable();

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
          What Happens Next
        </h2>
        
        <p className="text-center text-slate-600 mb-12">
          Simple 3-step process to fix your revenue leaks
        </p>

        {/* 3 Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          {/* Step 1 */}
          <div className="text-center group">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <span className="text-xl md:text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 text-lg">
              30-Min Consultation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We review your specific situation and confirm the analysis. 
              No sales pitch—just diagnosis confirmation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center group">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <span className="text-xl md:text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 text-lg">
              Custom Implementation Plan
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We build your specific fix strategy based on your systems, 
              staff, and workflow.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center group">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <span className="text-xl md:text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 text-lg">
              Launch & Optimize
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Same-week activation possible. We monitor results and 
              optimize for maximum recovery.
            </p>
          </div>

        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 text-center border border-blue-100">
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Schedule Your Analysis Call
          </h3>
          
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            We'll walk through your numbers together and show you exactly 
            where the <strong className="text-slate-900">{formatCurrency(monthlyOpportunity)}/month</strong> is going.
          </p>

          <Button 
            size="lg" 
            className="px-12 py-6 text-lg h-auto mb-4"
            onClick={handleClick}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book 30-Minute Call
          </Button>

          <p className="text-sm text-slate-500">
            Next available: {nextAvailable}
          </p>

        </div>

      </div>
    </section>
  );
}


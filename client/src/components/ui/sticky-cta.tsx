import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Calendar } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { useState } from "react";

interface StickyCTAProps {
  metrics: {
    monthly_revenue_lost: number;
    ninety_day_upside: number;
  };
  topLeak: string;
  tier: string; // priority_install / audit_pilot / waitlist
  onBookClick: () => void;
}

export function StickyCTA({ metrics, topLeak, tier, onBookClick }: StickyCTAProps) {
  const [showCalendly, setShowCalendly] = useState(false);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  const handleBookClick = () => {
    onBookClick();
    setShowCalendly(true);
    // Scroll to calendly if needed, or it opens in a modal/expand
  };

  if (showCalendly) {
    return (
      <Card className="sticky top-6 w-full shadow-xl border-primary/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select a Time
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[650px]">
           <InlineWidget 
             url={import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/qual-ai-demo/consultation"} 
             styles={{ height: '100%', width: '100%' }}
           />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop Sticky Card */}
      <Card className="hidden lg:block sticky top-6 w-full shadow-xl border-primary/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-teal-400" />
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-xl font-bold text-primary">
            Stop Losing {formatCurrency(metrics.monthly_revenue_lost)}/mo
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Fix your biggest leak: <span className="font-medium text-foreground">{topLeak}</span>
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What you get on the consult:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <div className="mt-0.5 bg-primary/10 p-1 rounded-full">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span>Your exact <span className="font-medium">Fix Funnel</span> blueprint</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <div className="mt-0.5 bg-primary/10 p-1 rounded-full">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span>Implementation plan & timeline</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <div className="mt-0.5 bg-primary/10 p-1 rounded-full">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span>ROI projection + KPI dashboard</span>
              </li>
            </ul>
          </div>

          <Button 
            size="lg" 
            className="w-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group"
            onClick={handleBookClick}
          >
            Book AI Growth Consultation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Limited spots available for {tier.replace('_', ' ')}
          </p>
        </CardContent>
      </Card>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-50">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex-1">
             <p className="text-xs font-medium text-muted-foreground">Recover Revenue</p>
             <p className="text-sm font-bold text-primary">{formatCurrency(metrics.monthly_revenue_lost)}/mo Upside</p>
          </div>
          <Button onClick={handleBookClick} className="shadow-lg">
            Book Consult
          </Button>
        </div>
      </div>
    </>
  );
}

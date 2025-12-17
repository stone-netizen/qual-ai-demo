/**
 * StickyCTA Component - v2.0
 * 
 * Enhanced sticky call-to-action with urgency messaging,
 * free trial promotion, and scarcity elements.
 */

import { motion } from "framer-motion";
import { useState, memo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ArrowRight,
  Calendar,
  Clock,
  Gift,
  Zap,
  Users,
  Shield,
  Star
} from "lucide-react";
import { InlineWidget } from "react-calendly";
import { formatCurrency } from "@/lib/calculations-v2";

interface StickyCTAProps {
  metrics: {
    monthly_revenue_lost: number;
    ninety_day_upside: number;
  };
  topLeak: string;
  tier: string;
  onBookClick: () => void;
}

export const StickyCTA = memo(function StickyCTA({ metrics, topLeak, tier, onBookClick }: StickyCTAProps) {
  const [showCalendly, setShowCalendly] = useState(false);
  // #region agent log
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  fetch('http://127.0.0.1:7242/ingest/3a47df6e-6cba-41ee-8b46-8b80abd612c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StickyCTA.tsx:render',message:'StickyCTA render',data:{renderCount:renderCountRef.current,metricsMonthly:metrics.monthly_revenue_lost,tier},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  const handleBookClick = () => {
    onBookClick();
    setShowCalendly(true);
  };

  const tierConfig = {
    priority_install: {
      badge: "🔥 Priority Install",
      badgeColor: "bg-red-500 text-white",
      message: "High revenue leak detected - Immediate action recommended"
    },
    audit_pilot: {
      badge: "⚡ Audit Pilot",
      badgeColor: "bg-amber-500 text-white",
      message: "Significant opportunity identified"
    },
    waitlist: {
      badge: "📋 Qualified",
      badgeColor: "bg-slate-500 text-white",
      message: "Good fit for automation"
    }
  };

  const config = tierConfig[tier as keyof typeof tierConfig] || tierConfig.waitlist;

  if (showCalendly) {
    return (
      <Card className="sticky top-24 w-full shadow-xl border-primary/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select a Time
          </CardTitle>
          <p className="text-sm text-slate-500">Pick a time that works for you</p>
        </CardHeader>
        <CardContent className="p-0 h-[650px]">
          <InlineWidget 
            url={import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/evensonstone/new-meeting"} 
            styles={{ height: '100%', width: '100%' }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop Sticky Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="hidden lg:block sticky top-24"
      >
        <Card className="w-full shadow-xl border-primary/20 overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-green-500 to-primary" />
          
          <CardHeader className="bg-gradient-to-b from-primary/5 to-transparent pb-4">
            {/* Tier Badge */}
            <div className="flex items-center justify-between mb-2">
              <Badge className={config.badgeColor}>
                {config.badge}
              </Badge>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
            
            <CardTitle className="text-xl font-bold text-slate-900">
              Stop Losing {formatCurrency(metrics.monthly_revenue_lost)}/mo
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Fix your biggest leak: <span className="font-semibold text-slate-700">{topLeak}</span>
            </p>
          </CardHeader>
          
          <CardContent className="pt-2 space-y-5">
            {/* What You Get */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                On the Consultation:
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Your exact Fix Funnel blueprint",
                  "Implementation plan & timeline",
                  "ROI projection + KPI dashboard",
                  "Live AI demo tailored to you"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 bg-green-100 p-1 rounded-full flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Free Trial Banner */}
            <div className="bg-gradient-to-r from-primary/10 to-green-500/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">3-Day Free Trial</p>
                  <p className="text-xs text-slate-500">No credit card required</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group h-12"
              onClick={handleBookClick}
            >
              <Zap className="w-4 h-4 mr-2" />
              Book Onboarding
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Urgency */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{config.message}</span>
            </div>

            {/* Trust Signals */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                500+ Businesses
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scarcity Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-slate-500">
            🔥 <span className="font-medium">3 spots left</span> this week for new implementations
          </p>
        </motion.div>
      </motion.div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 shadow-2xl">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-500">Recover up to</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(metrics.ninety_day_upside)}</p>
            <p className="text-xs text-slate-400">in 90 days</p>
          </div>
          <Button 
            onClick={handleBookClick} 
            className="shadow-lg px-6"
            size="lg"
          >
            <Zap className="w-4 h-4 mr-2" />
            Book Onboarding
          </Button>
        </div>
      </div>
    </>
  );
});

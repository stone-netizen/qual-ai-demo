/**
 * Final CTA Section - INDUSTRY-SPECIFIC
 * 
 * "Ready to Plug the Leak?" with industry-specific colors and language
 */

import { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Settings, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";
import { getIndustryConfig } from "@/lib/industry-config";

interface FinalCTAProps {
  monthlyRecoverable: number;
  nextAvailableSlot: string;
  onScheduleClick: () => void;
  businessType?: string;
}

export function FinalCTA({
  monthlyRecoverable,
  nextAvailableSlot,
  onScheduleClick,
  businessType = 'other'
}: FinalCTAProps) {
  // Get industry configuration
  const config = useMemo(() => getIndustryConfig(businessType), [businessType]);

  // Get industry-specific colors
  const getColors = () => {
    switch (businessType) {
      case 'medspa':
        return {
          gradient: 'from-purple-900 to-slate-900',
          cardBg: 'bg-purple-900/50',
          iconBg1: 'bg-purple-500',
          iconBg2: 'bg-purple-500',
          iconBg3: 'bg-pink-500',
          ctaBg: 'bg-purple-500 hover:bg-purple-600'
        };
      case 'dental':
        return {
          gradient: 'from-blue-900 to-slate-900',
          cardBg: 'bg-blue-900/50',
          iconBg1: 'bg-blue-500',
          iconBg2: 'bg-blue-500',
          iconBg3: 'bg-cyan-500',
          ctaBg: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'chiro':
        return {
          gradient: 'from-green-900 to-slate-900',
          cardBg: 'bg-green-900/50',
          iconBg1: 'bg-green-500',
          iconBg2: 'bg-green-500',
          iconBg3: 'bg-emerald-500',
          ctaBg: 'bg-green-500 hover:bg-green-600'
        };
      case 'physio':
        return {
          gradient: 'from-indigo-900 to-slate-900',
          cardBg: 'bg-indigo-900/50',
          iconBg1: 'bg-indigo-500',
          iconBg2: 'bg-indigo-500',
          iconBg3: 'bg-violet-500',
          ctaBg: 'bg-indigo-500 hover:bg-indigo-600'
        };
      default:
        return {
          gradient: 'from-slate-800 to-slate-900',
          cardBg: 'bg-slate-800',
          iconBg1: 'bg-blue-500',
          iconBg2: 'bg-blue-500',
          iconBg3: 'bg-green-500',
          ctaBg: 'bg-blue-500 hover:bg-blue-600'
        };
    }
  };

  const colors = getColors();

  // Industry-specific language
  const getLanguage = () => {
    switch (businessType) {
      case 'medspa':
        return {
          headline: `Ready to Capture ${formatCurrency(monthlyRecoverable)}/Month in Lost Consultations?`,
          subtitle: 'Book a 30-minute call to see exactly where high-ticket aesthetic inquiries are slipping away',
          card1Title: 'Consultation Capture Analysis',
          card1Desc: 'We\'ll show exactly when and where cosmetic procedure inquiries are getting lost',
          card2Title: 'Custom Aesthetic Practice Plan',
          card2Desc: 'Get your roadmap for 24/7 consultation booking optimized for high-ticket services',
          card3Title: 'Start Capturing Tonight',
          card3Desc: 'Same-week implementation. Start booking after-hours consultations immediately',
          ctaText: 'Schedule Consultation Capture Review'
        };
      case 'dental':
        return {
          headline: `Ready to Capture ${formatCurrency(monthlyRecoverable)}/Month in Lost Patients?`,
          subtitle: 'Book a 30-minute call to see exactly where new patients are slipping away',
          card1Title: 'Patient Capture Analysis',
          card1Desc: 'We\'ll show exactly when emergency calls and new patient inquiries are getting lost',
          card2Title: 'Custom Dental Practice Plan',
          card2Desc: 'Get your roadmap for 24/7 patient booking optimized for dental practices',
          card3Title: 'Start Capturing Today',
          card3Desc: 'Same-week implementation. Start booking emergency patients immediately',
          ctaText: 'Schedule Patient Capture Review'
        };
      case 'chiro':
        return {
          headline: `Ready to Capture ${formatCurrency(monthlyRecoverable)}/Month in Lost Patients?`,
          subtitle: 'Book a 30-minute call to see exactly where acute pain patients are slipping away',
          card1Title: 'Patient Flow Analysis',
          card1Desc: 'We\'ll show exactly when acute pain and PI leads are getting lost',
          card2Title: 'Custom Chiro Practice Plan',
          card2Desc: 'Get your roadmap for same-day acute care booking and PI lead capture',
          card3Title: 'Start Capturing Today',
          card3Desc: 'Same-week implementation. Start booking acute patients immediately',
          ctaText: 'Schedule Practice Review'
        };
      case 'physio':
        return {
          headline: `Ready to Capture ${formatCurrency(monthlyRecoverable)}/Month in Lost Referrals?`,
          subtitle: 'Book a 30-minute call to see exactly where physician referrals are slipping away',
          card1Title: 'Referral Capture Analysis',
          card1Desc: 'We\'ll show exactly when referrals and scheduled patients are falling through',
          card2Title: 'Custom PT Practice Plan',
          card2Desc: 'Get your roadmap for referral response and treatment plan completion',
          card3Title: 'Start Capturing Today',
          card3Desc: 'Same-week implementation. Start securing more referrals immediately',
          ctaText: 'Schedule Referral Review'
        };
      default:
        return {
          headline: `Ready to Plug the ${formatCurrency(monthlyRecoverable)}/Month Leak?`,
          subtitle: 'Book a 30-minute call to see exactly where you\'re losing leads and how to fix it',
          card1Title: 'Leak Analysis',
          card1Desc: 'We\'ll review exactly where leads are slipping through and confirm the numbers',
          card2Title: 'Fix Plan',
          card2Desc: 'Get your custom roadmap to plug the gaps based on your systems and workflow',
          card3Title: 'Stop the Bleed',
          card3Desc: 'Same-week implementation available. Start capturing lost leads immediately',
          ctaText: 'Schedule Leak Analysis'
        };
    }
  };

  const language = getLanguage();

  return (
    <section className={`py-16 px-4 sm:px-8 bg-gradient-to-b ${colors.gradient} text-white`}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {language.headline}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300">
            {language.subtitle}
          </p>
        </div>

        {/* What they get */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className={`${colors.cardBg} backdrop-blur rounded-lg p-6`}>
            <div className={`w-12 h-12 ${colors.iconBg1} rounded-full flex items-center justify-center mb-4`}>
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">{language.card1Title}</h4>
            <p className="text-sm text-slate-400">
              {language.card1Desc}
            </p>
          </div>

          <div className={`${colors.cardBg} backdrop-blur rounded-lg p-6`}>
            <div className={`w-12 h-12 ${colors.iconBg2} rounded-full flex items-center justify-center mb-4`}>
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">{language.card2Title}</h4>
            <p className="text-sm text-slate-400">
              {language.card2Desc}
            </p>
          </div>

          <div className={`${colors.cardBg} backdrop-blur rounded-lg p-6`}>
            <div className={`w-12 h-12 ${colors.iconBg3} rounded-full flex items-center justify-center mb-4`}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">{language.card3Title}</h4>
            <p className="text-sm text-slate-400">
              {language.card3Desc}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={onScheduleClick}
            className={`px-12 py-6 text-lg ${colors.ctaBg} mb-4`}
          >
            <Calendar className="mr-2 w-5 h-5" />
            {language.ctaText}
          </Button>
          <p className="text-sm text-slate-400 mb-2">
            Next available: {nextAvailableSlot}
          </p>
          <p className="text-xs text-slate-500">
            No commitment • Free consultation • Instant calendar access
          </p>
        </div>

      </div>
    </section>
  );
}
